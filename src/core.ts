import { commands } from 'vscode'
import { getConfigs } from './config'

export function runHide() {
  const configs = getConfigs()
  const { executeCommand } = commands
  if (configs['autoHide.autoHideReferences'])
    executeCommand('closeReferenceSearch')

  if (configs['autoHide.autoHidePanel'])
    executeCommand('workbench.action.closePanel')

  if (configs['autoHide.autoHideSideBar'])
    executeCommand('workbench.action.closeSidebar')

  if (configs['autoHide.autoHideAuxiliaryBar'])
    executeCommand('workbench.action.closeAuxiliaryBar')

  if (configs['autoHide.autoHideNotifications']) {
    executeCommand('notifications.hideList')
    executeCommand('notifications.hideToasts')
  }
}
