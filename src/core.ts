import { commands } from 'vscode'
import { configs } from './config'
import { logger } from './log'

export function runHide() {
  logger.info('runHide', new Date().toLocaleString())
  const { executeCommand } = commands
  if (configs.autohideReferences.value)
    executeCommand('closeReferenceSearch')

  if (configs.autohidePanel.value)
    executeCommand('workbench.action.closePanel')

  if (configs.autohideSideBar.value)
    executeCommand('workbench.action.closeSidebar')

  if (configs.autohideAuxiliaryBar.value)
    executeCommand('workbench.action.closeAuxiliaryBar')

  if (configs.autohideNotifications.value) {
    executeCommand('notifications.hideList')
    executeCommand('notifications.hideToasts')
  }
}
