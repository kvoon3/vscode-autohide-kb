import { TextEditorSelectionChangeKind, window } from 'vscode'
import type { ExtensionContext } from 'vscode'
import { runHide } from './core'
import { registerCommands } from './commands'
import { getConfigs } from './config'
import { Mode } from './types'

export function activate(ctx: ExtensionContext) {
  registerCommands(ctx)

  window.onDidChangeTextEditorSelection((e) => {
    const configs = getConfigs()

    if (!configs['autoHide.enable'])
      return

    const path = window.activeTextEditor?.document.fileName
    const pathIsFile = path?.includes('.') || path?.includes('\\') || path?.includes('/')
    const scheme = e.textEditor.document.uri.scheme

    if (
      configs['autoHide.mode'] === Mode.Manual
      || e.kind === undefined
      || (configs['autoHide.hideOnlyMouse'] && e.kind !== TextEditorSelectionChangeKind.Mouse)
      || e.selections.length !== 1 // no selections or multiselections
      || e.selections.find(a => a.isEmpty) == null // multiselections
      || !pathIsFile // The debug window editor
      || scheme === 'output' // The output window
      || (
        !configs['autoHide.hideFromGit']
        && window.visibleTextEditors.find(i => i.document.uri.scheme === 'git')
      )
    )
      return

    runHide()
  })

  const { 'autoHide.enable': enable, 'autoHide.hideOnOpen': hideOnOpen } = getConfigs()

  if (enable && hideOnOpen)
    runHide()
}

export function deactivate() { }
