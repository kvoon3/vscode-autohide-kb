import { throttle } from '@antfu/utils'
import { useActiveTextEditor, useDisposable, useVisibleTextEditors } from 'reactive-vscode'
import { window } from 'vscode'
import { executeHide } from '../core'
import { config } from '../shared/config'
import { logger } from '../shared/log'

/**
 * Auto Detect and execute hide - for AutoMode
 */
export function useAutoHide() {
  const visibleTextEditors = useVisibleTextEditors()
  const activeEditor = useActiveTextEditor()
  const runHide = throttle(config.throttleTime, async () => {
    try {
      if (
        !config.enable
        || !activeEditor.value
        || config.mode !== 'auto'
      ) {
        throw new Error('skip: disabled or not ready')
      }

      const focusedScheme = activeEditor.value.document.uri.scheme
      const visibleScheme = visibleTextEditors.value.map(editor => editor.document.uri.scheme)

      logger.info('focusedScheme: ', focusedScheme)
      logger.info('visibleScheme: ', visibleScheme)

      const isInWhitelist = config.whitelist.find((i) => {
        const {
          match,
          status,
        } = typeof i === 'string'
          ? { match: i, status: ['focus'] }
          : i

        if (!match || !status)
          return false

        if (
          status?.includes('focus')
          && new RegExp(match).test(focusedScheme)
        ) {
          return true
        }

        if (
          status.includes('visible')
          && visibleScheme.some(visibleScheme => new RegExp(match).test(visibleScheme))
        ) {
          return true
        }

        return false
      })

      if (isInWhitelist)
        throw new Error('skip: in whitelist')

      await executeHide()
      logger.info('trigger hide success')
    }
    catch (error: any) {
      logger.warn(error?.message || JSON.stringify(error))
    }
    finally {
      logger.info(new Date().toISOString())
      logger.info('-'.repeat(10))
    }
  })

  return useDisposable(window.onDidChangeTextEditorSelection((e) => {
    if (e.kind)
      runHide()
  }))
}
