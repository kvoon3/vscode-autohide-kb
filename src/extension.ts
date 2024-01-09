import { TextEditorSelectionChangeKind, window } from 'vscode'
import type { ExtensionContext } from 'vscode'
import { runHide } from './core'
import { registerCommands } from './commands'
import { getConfigs } from './config'

export function activate(ctx: ExtensionContext) {
  registerCommands(ctx)

  window.onDidChangeTextEditorSelection((e) => {
    const path = window.activeTextEditor?.document.fileName
    const pathIsFile = path?.includes('.') || path?.includes('\\') || path?.includes('/')
    const scheme = e.textEditor.document.uri.scheme
    const configs = getConfigs()

    if (
      e.kind === undefined
      || (configs.hideOnlyMouse && e.kind !== TextEditorSelectionChangeKind.Mouse)
      || e.selections.length !== 1 // no selections or multiselections
      || e.selections.find(a => a.isEmpty) == null // multiselections
      || !pathIsFile // The debug window editor
      || scheme === 'output' // The output window
    )
      return

    runHide()
  })

  if (getConfigs().hideOnOpen)
    runHide()
}

export function deactivate() { }
