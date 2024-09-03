import { TextEditorSelectionChangeKind, window } from 'vscode'
import { computed, defineExtension, executeCommand, useActiveTextEditor, useDisposable, useStatusBarItem, useTextEditorSelections, useVisibleTextEditors } from 'reactive-vscode'
import { watchThrottled } from '@reactive-vscode/vueuse'
import { registerCommands } from './commands'
import { config } from './config'
import { logger } from './log'
import { commands, name } from './generated/meta'

export async function runHide() {
  const {
    ui: {
      sidebar,
      cursor,
      auxiliaryBar,
      panel,
      references,
      notifications,
    },
  } = config

  if (references)
    executeCommand('closeReferenceSearch')

  if (panel)
    executeCommand('workbench.action.closePanel')

  if (sidebar)
    executeCommand('workbench.action.closeSidebar')

  if (auxiliaryBar)
    executeCommand('workbench.action.closeAuxiliaryBar')

  if (notifications) {
    executeCommand('notifications.hideList')
    executeCommand('notifications.hideToasts')
  }

  try {
    if (cursor === false)
      return

    if (cursor === true || cursor.sidebar)
      await executeCommand('aichat.close-sidebar')
  }
  catch {
    logger.error('Seems like you are not using Cursor(https://cursor.com), but you have enabled Cursor config settings, please turn off settings or make sure Cursor working')
  }
}

export const { activate, deactivate } = defineExtension(() => {
  logger.info('extension active')

  if (config.enable && config.triggerOnOpen)
    setTimeout(() => runHide(), 300)

  registerCommands()

  const triggerKinds = computed(() =>
    config.triggerKind.map(key => ({
      mouse: TextEditorSelectionChangeKind.Mouse,
      keyboard: TextEditorSelectionChangeKind.Keyboard,
      command: TextEditorSelectionChangeKind.Command,
    }[key])),
  )

  const activeEditor = useActiveTextEditor()
  const textEditorSelections = useTextEditorSelections(activeEditor, triggerKinds)
  const visibleTextEditors = useVisibleTextEditors()

  let changeEventKind: TextEditorSelectionChangeKind | undefined

  useDisposable(window.onDidChangeTextEditorSelection(e => changeEventKind = e.kind))

  watchThrottled(textEditorSelections, () => {
    if (
      !changeEventKind
      || !config.enable
      || !activeEditor.value
    ) {
      return
    }

    const focusedScheme = activeEditor.value.document.uri.scheme
    const visibleScheme = visibleTextEditors.value.map(editor => editor.document.uri.scheme)

    logger.info('focusedScheme', focusedScheme)
    logger.info('visibleScheme', visibleScheme)

    const isInWhitelist = config.whitelist.find((i) => {
      const { match, status } = typeof i === 'string' ? { match: i, status: ['focus'] } : i

      if (
        status.includes('focus')
        && new RegExp(match).test(focusedScheme)
      ) {
        return true
      }

      if (
        status.includes('visible')
        && visibleScheme.some(visibleScheme => new RegExp(match).test(visibleScheme))
      ) {
        return true
      }

      return false
    })

    if (isInWhitelist)
      return

    runHide()
    logger.info('trigger hide success')
    logger.info('-'.repeat(10))
  }, {
    throttle: config.throttleTime,
  })

  useStatusBarItem({
    id: name,
    text: () => config.label,
    tooltip: 'Trigger hide',
    command: commands.runHide,
  }).show()
})
