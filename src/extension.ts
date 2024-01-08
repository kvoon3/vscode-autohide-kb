'use strict'

import { ConfigurationTarget, TextEditorSelectionChangeKind, commands, window, workspace } from 'vscode'
import type { ExtensionContext } from 'vscode'
import type { ExtensionConfiguration } from './types'
import { Mode } from './types'
import { getConfigs } from './config'

function runHide(config: ExtensionConfiguration) {
  if (config.autoHideReferences)
    commands.executeCommand('closeReferenceSearch')

  if (config.autoHidePanel)
    commands.executeCommand('workbench.action.closePanel')

  if (config.autoHideSideBar)
    commands.executeCommand('workbench.action.closeSidebar')

  if (config.autoHideAuxiliaryBar)
    commands.executeCommand('workbench.action.closeAuxiliaryBar')
}

export function activate(context: ExtensionContext) {
  const initialConfig = getConfigs()

  runHide(initialConfig)

  window.onDidChangeTextEditorSelection((e) => {
    const config = workspace.getConfiguration('autoHide')

    if (config.get<Mode>('mode') === Mode.Manual)
      return

    const path = window.activeTextEditor.document.fileName
    const pathIsFile = path.includes('.') || path.includes('\\') || path.includes('/')
    const scheme = e.textEditor.document.uri.scheme

    if (
      e.kind === undefined
      || (!config.hideByMouse && e.kind === TextEditorSelectionChangeKind.Mouse)
      || e.selections.length !== 1 // no selections or multiselections
      || e.selections.find(a => a.isEmpty) == null // multiselections
      || !pathIsFile // The debug window editor
      || scheme === 'output' // The output window
    )
      return

    runHide(getConfigs())
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

  context.subscriptions.push(
    commands.registerCommand(
      'autoHide.toggleHideByMouse',
      async () => {
        const config = workspace.getConfiguration('autoHide')
        await config.update(
          'hideByMouse',
          !config.get('hideByMouse'),
          ConfigurationTarget.Workspace,
        )
      },
    ),
  )

  context.subscriptions.push(
    commands.registerCommand(
      'autoHide.switchToManualMode',
      async () => {
        const config = workspace.getConfiguration('autoHide')
        await config.update(
          'mode',
          Mode.Manual,
          ConfigurationTarget.Workspace,
        )
      },
    ),
  )

  context.subscriptions.push(
    commands.registerCommand(
      'autoHide.switchToAutoMode',
      async () => {
        const config = workspace.getConfiguration('autoHide')
        await config.update(
          'mode',
          Mode.Auto,
          ConfigurationTarget.Workspace,
        )
      },
    ),
  )

  context.subscriptions.push(
    commands.registerCommand('autoHide.runHide', () => runHide(getConfigs())),
  )
}

export function deactivate() { }
