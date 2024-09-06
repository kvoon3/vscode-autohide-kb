import type { ViewColumn } from 'vscode'
import { TextEditorSelectionChangeKind, window } from 'vscode'
import { computed, defineExtension, executeCommand, useActiveTextEditor, useAllExtensions, useDisposable, useStatusBarItem, useTextEditorSelections, useVisibleTextEditors, watch } from 'reactive-vscode'
import { watchThrottled } from '@reactive-vscode/vueuse'
import { config } from './config'
import { logger } from './log'
import { commands, name } from './generated/meta'
import { registerCommands } from './commands'

export async function runHide() {
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

    if (cursor === true || cursor.sidebar)
      await executeCommand('aichat.close-sidebar')
  }
  catch {
    logger.error('Seems like you are not using Cursor(https://cursor.com), but you have enabled Cursor config settings, please turn off settings or make sure Cursor working')
  }
}

export const { activate, deactivate } = defineExtension(async () => {
  logger.info('extension active')

  if (config.enable && config.triggerOnOpen)
    setTimeout(() => runHide(), 300)

  registerCommands()

  const triggerKinds = computed(() =>
    config.triggerKind.map(key => ({
      mouse: TextEditorSelectionChangeKind.Mouse,
      keyboard: TextEditorSelectionChangeKind.Keyboard,
      command: TextEditorSelectionChangeKind.Command,
    }[key])),
  )

  const activeEditor = useActiveTextEditor()
  const textEditorSelections = useTextEditorSelections(activeEditor, triggerKinds)
  const visibleTextEditors = useVisibleTextEditors()
  const allExtensions = useAllExtensions()

  let changeEventKind: TextEditorSelectionChangeKind | undefined

  useDisposable(window.onDidChangeTextEditorSelection(e => changeEventKind = e.kind))

  watchThrottled(textEditorSelections, async () => {
    try {
      if (
        !changeEventKind
        || !config.enable
        || !activeEditor.value
      ) {
        throw new Error('skip: disabled or not ready')
      }

      if (config.mode === 'manual')
        throw new Error('skip: manual mode')

      const focusedScheme = activeEditor.value.document.uri.scheme
      const visibleScheme = visibleTextEditors.value.map(editor => editor.document.uri.scheme)

      logger.info('focusedScheme: ', focusedScheme)
      logger.info('visibleScheme: ', visibleScheme)

      const isInWhitelist = config.whitelist.find((i) => {
        const { match, status } = typeof i === 'string' ? { match: i, status: ['focus'] } : i

        if (
          status.includes('focus')
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

      await runHide()
      logger.info('trigger hide success')
    }
    catch (error: any) {
      logger.warn(error?.message || JSON.stringify(error))
    }
    finally {
      logger.info(new Date().toISOString())
      logger.info('-'.repeat(10))
    }
  }, {
    throttle: () => config.throttleTime,
  })

  /**
   * @see https://github.com/kvoon3/vscode-command-task
   */
  const commandTaskExtension = computed(() => allExtensions.value.find(ext => ext.id === 'kvoon.command-task'))
  watch(commandTaskExtension, async (extension) => {
    const addCommandTask = extension?.exports?.addCommandTask

    if (typeof addCommandTask !== 'function')
      return

    try {
      addCommandTask(
        [
          () => {
            let oldViewColumn: ViewColumn | undefined
            let newViewColumn: ViewColumn | undefined
            return {
              name: 'action.navigateLeft',
              try: 'workbench.action.navigateLeft',
              catch: 'workbench.action.focusSideBar',
              onBeforeExec: () => {
                oldViewColumn = activeEditor.value?.viewColumn
                logger.info('before viewColumn', activeEditor.value?.viewColumn)
              },
              onAfterExec: () => {
                newViewColumn = activeEditor.value?.viewColumn
                logger.info('after viewColumn', activeEditor.value?.viewColumn)
              },
              validator: () => {
                return oldViewColumn !== newViewColumn
              },
              type: 'async',
            }
          },
          () => {
            let oldViewColumn: ViewColumn | undefined
            let newViewColumn: ViewColumn | undefined
            return {
              name: 'action.navigateRight',
              try: 'workbench.action.navigateRight',
              catch: 'workbench.action.focusAuxiliaryBar',
              onBeforeExec: () => {
                oldViewColumn = activeEditor.value?.viewColumn
                logger.info('before viewColumn', oldViewColumn)
              },
              onAfterExec: () => {
                newViewColumn = activeEditor.value?.viewColumn
                logger.info('after viewColumn', newViewColumn)
              },
              validator: () => {
                return oldViewColumn !== newViewColumn
              },
              type: 'async',
            }
          },
          () => {
            let oldViewColumn: ViewColumn | undefined
            let newViewColumn: ViewColumn | undefined
            return {
              name: 'action.navigateDown',
              try: 'workbench.action.navigateDown',
              catch: 'workbench.action.focusPanel',
              onBeforeExec: () => {
                oldViewColumn = activeEditor.value?.viewColumn
                logger.info('before viewColumn', oldViewColumn)
              },
              onAfterExec: () => {
                newViewColumn = activeEditor.value?.viewColumn
                logger.info('after viewColumn', newViewColumn)
              },
              validator: () => {
                return oldViewColumn !== newViewColumn
              },
              type: 'async',
            }
          },
        ],
      )
    }
    catch (error) {
      logger.error(error)
    }
  }, { immediate: true })

  useStatusBarItem({
    id: `${name}-trigger`,
    text: () => config['statusBarText.trigger'].replace('$(mode)', config.mode.toUpperCase()),
    tooltip: 'Trigger hide',
    command: commands.runHide,
  }).show()

  useStatusBarItem({
    id: `${name}-mode`,
    text: () => {
      const { manual, auto } = typeof config['statusBarText.mode'] === 'string'
        ? { manual: config['statusBarText.mode'], auto: config['statusBarText.mode'] }
        : config['statusBarText.mode']

      return config.mode === 'auto'
        ? auto.replace('$(mode)', config.mode.toUpperCase())
        : manual.replace('$(mode)', config.mode.toUpperCase())
    },
    tooltip: 'Toggle hide mode',
    command: commands.toggleMode,
  }).show()
})
