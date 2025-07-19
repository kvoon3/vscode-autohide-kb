import { defineLogger, toValue, watchEffect } from 'reactive-vscode'
import { displayName } from '../generated/meta'

const _logger = defineLogger(displayName)

export const logger = {
  ..._logger,
  log(...args: any[]) {
    for (const arg of args) {
      logger.info('arg', JSON.stringify(toValue(arg), null, 2))
    }
  },
}

export function $inspect(...args: any[]) {
  watchEffect(() => {
    logger.log(...args)
  })
}
