'use strict'

import { ConfigurationTarget, commands, window, workspace } from 'vscode'
import type { ExtensionContext } from 'vscode'

export function activate(context: ExtensionContext) {
  const initialConfig = workspace.getConfiguration('autoHide')

  if (initialConfig.hideOnOpen) {
    if (initialConfig.autoHideReferences)
      commands.executeCommand('closeReferenceSearch')

    if (initialConfig.autoHidePanel)
      commands.executeCommand('workbench.action.closePanel')

    if (initialConfig.autoHideSideBar)
      commands.executeCommand('workbench.action.closeSidebar')

    if (initialConfig.autoHideAuxiliaryBar)
      commands.executeCommand('workbench.action.closeAuxiliaryBar')
  }

  window.onDidChangeTextEditorSelection((selection) => {
    const config = workspace.getConfiguration('autoHide')
    const path = window.activeTextEditor.document.fileName
    const pathIsFile = path.includes('.') || path.includes('\\') || path.includes('/')
    const scheme = selection.textEditor.document.uri.scheme

    if (
      selection.selections.length !== 1 // no selections or multiselections
      || selection.selections.find(a => a.isEmpty) == null // multiselections
      || !pathIsFile // The debug window editor
      || scheme === 'output' // The output window
    )
      return

    if (config.autoHideReferences)
      commands.executeCommand('closeReferenceSearch')

    if (config.autoHidePanel)
      commands.executeCommand('workbench.action.closePanel')

    if (config.autoHideSideBar)
      commands.executeCommand('workbench.action.closeSidebar')

    if (config.autoHideAuxiliaryBar)
      commands.executeCommand('workbench.action.closeAuxiliaryBar')
  })

  context.subscriptions.push(
    commands.registerCommand('autoHide.toggleHidePanel', async () => {
      const config = workspace.getConfiguration('autoHide')
      await config.update(
        'autoHidePanel',
        !config.autoHidePanel,
        ConfigurationTarget.Workspace,
      )
    }),
  )

  context.subscriptions.push(
    commands.registerCommand('autoHide.toggleHideSideBar', async () => {
      const config = workspace.getConfiguration('autoHide')
      await config.update(
        'autoHideSideBar',
        !config.autoHideSideBar,
        ConfigurationTarget.Workspace,
      )
    }),
  )

  context.subscriptions.push(
    commands.registerCommand(
      'autoHide.toggleHideAuxiliaryBar',
      async () => {
        const config = workspace.getConfiguration('autoHide')
        await config.update(
          'autoHideAuxiliaryBar',
          !config.autoHideAuxiliaryBar,
          ConfigurationTarget.Workspace,
        )
      },
    ),
  )
}

export function deactivate() { }
