import { TextEditorSelectionChangeKind, window } from 'vscode'
import { computed, defineExtension, executeCommand, useActiveTextEditor, useTextEditorSelections, useVisibleTextEditors } from 'reactive-vscode'
import { watchThrottled } from '@reactive-vscode/vueuse'
import { registerCommands } from './commands'
import { config } from './config'
import { logger } from './log'

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

export function hasMatch(REList: string[], targets: string[]) {
  return targets.find((target) => {
    return REList.some((re) => {
      return new RegExp(re).test(target)
    })
  })
}

export const { activate, deactivate } = defineExtension(() => {
  logger.info('extension active')

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

  window.onDidChangeTextEditorSelection(e => changeEventKind = e.kind)

  watchThrottled(textEditorSelections, () => {
    if (
      !changeEventKind
      || !config.enable
      || !activeEditor.value
    ) {
      return
    }

    const curScheme = activeEditor.value.document.uri.scheme
    const visibleShemes = visibleTextEditors.value.map(editor => editor.document.uri.scheme)

    logger.info('curScheme', curScheme)
    logger.info('visibleShemes', visibleShemes)

    if (curScheme === 'output')
      return

    const isInWhitelist = hasMatch(config.whitelist, visibleShemes)

    if (isInWhitelist)
      return

    runHide()
    logger.info('trigger hide success')
    logger.info('-'.repeat(10))
  }, {
    throttle: config.throttleTime,
  })

  if (config.enable && config.triggerOnOpen)
    setTimeout(() => runHide(), 300)
})
