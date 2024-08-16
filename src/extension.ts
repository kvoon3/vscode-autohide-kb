import { TextEditorSelectionChangeKind, window } from 'vscode'
import { defineExtension, extensionContext } from 'reactive-vscode'
import { throttledRunHide } from './core'
import { registerCommands } from './commands'
import { configs } from './config'
import { logger } from './log'

export const { activate, deactivate } = defineExtension(() => {
  logger.info('extension active')

  registerCommands(extensionContext)

  window.onDidChangeTextEditorSelection((e) => {
    if (!configs.enable)
      return

    const path = window.activeTextEditor?.document.fileName
    const pathIsFile = path?.includes('.') || path?.includes('\\') || path?.includes('/')
    const scheme = e.textEditor.document.uri.scheme

    if (
      configs.mode === 'manual'
      || e.kind === undefined
      || (configs.triggerOnlyMouse && e.kind !== TextEditorSelectionChangeKind.Mouse)
      || e.selections.length !== 1 // no selections or multiselections
      || e.selections.find(a => a.isEmpty) == null // multiselections
      || !pathIsFile // The debug window editor
      || scheme === 'output' // The output window
      || (
        !configs.triggerFromGit
        && window.visibleTextEditors.find(i => i.document.uri.scheme.includes('git'))
      )
    ) {
      return
    }

    throttledRunHide ()
  })

  if (configs.enable && configs.triggerOnOpen)
    throttledRunHide()
})
