import { executeCommand } from 'reactive-vscode'
import { config } from './shared/config'
import { logger } from './shared/log'

/**
 * Execute hide immediately
 */
export async function executeHide() {
  const {
    ui: {
      sidebar,
      cursor,
      auxiliaryBar,
      panel,
      references,
      notifications,
    },
  } = config

  if (references)
    executeCommand('closeReferenceSearch')

  if (panel)
    executeCommand('workbench.action.closePanel')

  if (sidebar)
    executeCommand('workbench.action.closeSidebar')

  if (auxiliaryBar)
    executeCommand('workbench.action.closeAuxiliaryBar')

  if (notifications) {
    executeCommand('notifications.hideList')
    executeCommand('notifications.hideToasts')
  }

  try {
    if (cursor === false)
      return

    if (cursor === true || cursor?.sidebar)
      await executeCommand('aichat.close-sidebar')
  }
  catch {
    logger.error('Seems like you are not using Cursor(https://cursor.com), but you have enabled Cursor config settings, please turn off settings or make sure Cursor working')
  }
}
