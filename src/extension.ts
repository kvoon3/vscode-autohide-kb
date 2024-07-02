import { TextEditorSelectionChangeKind, window } from 'vscode'
import type { ExtensionContext } from 'vscode'
import { runHide } from './core'
import { registerCommands } from './commands'
import { getConfigs } from './config'
import { Mode } from './types'
import { log } from './log'

export function activate(ctx: ExtensionContext) {
  registerCommands(ctx)

  window.onDidChangeTextEditorSelection((e) => {
    const path = window.activeTextEditor?.document.fileName
    const pathIsFile = path?.includes('.') || path?.includes('\\') || path?.includes('/')
    const scheme = e.textEditor.document.uri.scheme
    const configs = getConfigs()

    if (
      configs.mode === Mode.Manual
      || e.kind === undefined
      || (configs.hideOnlyMouse && e.kind !== TextEditorSelectionChangeKind.Mouse)
      || e.selections.length !== 1 // no selections or multiselections
      || e.selections.find(a => a.isEmpty) == null // multiselections
      || !pathIsFile // The debug window editor
      || scheme === 'output' // The output window
      || (
        !configs.hideFromGit
        && window.visibleTextEditors.find(i => i.document.uri.scheme === 'git')
      )
    )
      return

    runHide()
  })

  if (getConfigs().hideOnOpen)
    runHide()
}

export function deactivate() { }
