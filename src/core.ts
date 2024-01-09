import { commands } from 'vscode'
import { getConfigs } from './config'

export function runHide() {
  const configs = getConfigs()
  if (configs.autoHideReferences)
    commands.executeCommand('closeReferenceSearch')

  if (configs.autoHidePanel)
    commands.executeCommand('workbench.action.closePanel')

  if (configs.autoHideSideBar)
    commands.executeCommand('workbench.action.closeSidebar')

  if (configs.autoHideAuxiliaryBar)
    commands.executeCommand('workbench.action.closeAuxiliaryBar')
}
