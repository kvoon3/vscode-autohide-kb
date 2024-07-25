import { commands } from 'vscode'
import { configs } from './config'
import { logger } from './log'

export function throttle(callback: () => void) {
  let lastRunTime: number | undefined

  return () => {
    const now = Date.now()

    if (
      lastRunTime
      && now - lastRunTime < configs.throttleTime.value
    ) {
      return
    }

    callback()
    logger.info('runHide', new Date().toLocaleString())
    lastRunTime = now
  }
}

function runHide() {
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

export const throttledRunHide = throttle(runHide)
