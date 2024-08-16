import { commands } from 'vscode'
import { configs } from './config'
import { logger } from './log'

export function throttle(callback: () => void) {
  let lastRunTime: number | undefined

  return () => {
    const now = Date.now()

    if (
      lastRunTime
      && now - lastRunTime < configs.throttleTime
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

  if (configs.ui!.references)
    executeCommand('closeReferenceSearch')

  if (configs.ui!.panel)
    executeCommand('workbench.action.closePanel')

  if (configs.ui!.sideBar)
    executeCommand('workbench.action.closeSidebar')

  if (configs.ui!.auxiliaryBar)
    executeCommand('workbench.action.closeAuxiliaryBar')

  if (configs.ui!.notifications) {
    executeCommand('notifications.hideList')
    executeCommand('notifications.hideToasts')
  }
}

export const throttledRunHide = throttle(runHide)
