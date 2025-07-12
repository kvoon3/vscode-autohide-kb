import { defineExtension } from 'reactive-vscode'
import { useAutoHide } from './composables/useAutoHide'
import { useStatusBars } from './composables/useStatusBar'
import { executeHide } from './core'
import { registerCommands } from './shared/commands'
import { config } from './shared/config'
import { logger } from './shared/log'

export const { activate, deactivate } = defineExtension(async () => {
  logger.info('extension active')

  if (config.enable && config.triggerOnOpen)
    setTimeout(() => executeHide(), 300)

  registerCommands()

  useAutoHide()

  useStatusBars()
})
