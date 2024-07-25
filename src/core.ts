import { commands } from 'vscode'
import { configs } from './config'
import { logger } from './log'

export function runHide() {
  logger.info('runHide', new Date().toLocaleString())
  const { executeCommand } = commands
  if (configs.autoHideReferences.value)
    executeCommand('closeReferenceSearch')

  if (configs.autoHidePanel.value)
    executeCommand('workbench.action.closePanel')

  if (configs.autoHideSideBar.value)
    executeCommand('workbench.action.closeSidebar')

  if (configs.autoHideAuxiliaryBar.value)
    executeCommand('workbench.action.closeAuxiliaryBar')

  if (configs.autoHideNotifications.value) {
    executeCommand('notifications.hideList')
    executeCommand('notifications.hideToasts')
  }
}
