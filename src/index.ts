import { TextEditorSelectionChangeKind, commands, window } from 'vscode'
import { computed, defineExtension, useActiveTextEditor, useTextEditorSelections, useVisibleTextEditors, useWindowState } from 'reactive-vscode'
import { watchThrottled } from '@reactive-vscode/vueuse'
import { registerCommands } from './commands'
import { configs } from './config'
import { logger } from './log'

export function runHide() {
  const { executeCommand } = commands

  if (configs.ui.references)
    executeCommand('closeReferenceSearch')

  if (configs.ui.panel)
    executeCommand('workbench.action.closePanel')

  if (configs.ui.sidebar)
    executeCommand('workbench.action.closeSidebar')

  if (configs.ui.auxiliaryBar)
    executeCommand('workbench.action.closeAuxiliaryBar')

  if (configs.ui.notifications) {
    executeCommand('notifications.hideList')
    executeCommand('notifications.hideToasts')
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
    configs.triggerKind.map(key => ({
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
      || !configs.enable
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

    const isInWhitelist = hasMatch(configs.whitelist, visibleShemes)

    if (isInWhitelist)
      return

    runHide()
    logger.info('trigger hide success')
    logger.info('-'.repeat(10))
  }, {
    throttle: configs.throttleTime,
  })

  if (configs.enable && configs.triggerOnOpen)
    setTimeout(() => runHide(), 300)

  logger.info('123')
})
