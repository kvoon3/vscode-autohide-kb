import { commands } from 'vscode'
import { getConfigs } from './config'

export function runHide() {
  const configs = getConfigs()
  const { executeCommand } = commands
  if (configs.autoHideReferences)
    executeCommand('closeReferenceSearch')

  if (configs.autoHidePanel)
    executeCommand('workbench.action.closePanel')

  if (configs.autoHideSideBar)
    executeCommand('workbench.action.closeSidebar')

  if (configs.autoHideAuxiliaryBar)
    executeCommand('workbench.action.closeAuxiliaryBar')

  if (configs.autoHideNotifications) {
    executeCommand('notifications.hideList')
    executeCommand('notifications.hideToasts')
  }
}
