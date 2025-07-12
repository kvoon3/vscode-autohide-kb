import type { ViewColumn } from 'vscode'
import { computed, executeCommand, useActiveTextEditor, useAllExtensions, useCommand, useCommands, watch } from 'reactive-vscode'
import { ConfigurationTarget } from 'vscode'
import { executeHide } from '../core'
import { commands } from '../generated/meta'
import { config } from './config'
import { uiNameCommandKeyMap } from './constants'
import { logger } from './log'

export function registerCommands() {
  useCommand(
    commands.toggleEnable,
    () => config.$update('enable', !config.enable, ConfigurationTarget.Global),
  )

  useCommand(
    commands.toggleMode,
    () => config.$update('mode', config.mode === 'manual' ? 'auto' : 'manual', ConfigurationTarget.Global),
  )

  useCommand(commands.runHide, () => executeHide())

  useCommands({
    [commands.togglePinSidebar]() {
      config.$set('ui', {
        ...config.ui,
        sidebar: !config.ui.sidebar,
      })

      if (!config.ui.sidebar)
        executeCommand('workbench.action.focusSideBar')
      else
        executeCommand('autoHide.runHide')
    },
    [commands.togglePinAuxiliaryBar]() {
      config.$set('ui', {
        ...config.ui,
        auxiliaryBar: !config.ui.auxiliaryBar,
      })

      if (!config.ui.auxiliaryBar)
        executeCommand('workbench.action.focusAuxiliaryBar')
      else
        executeCommand('autoHide.runHide')
    },
    [commands.togglePinPanel]() {
      config.$set('ui', {
        ...config.ui,
        panel: !config.ui.panel,
      })

      if (!config.ui.panel)
        executeCommand('workbench.action.focusPanel')
      else
        executeCommand('autoHide.runHide')
    },
  })

  const activeEditor = useActiveTextEditor()
  const allExtensions = useAllExtensions()

  /**
   * @see https://github.com/kvoon3/vscode-command-task
   */
  const commandTaskExtension = computed(() => allExtensions.value.find(ext => ext.id === 'kvoon.command-task'))
  const { stop } = watch(commandTaskExtension, async (extension) => {
    const addCommandTask = extension?.exports?.addCommandTask

    if (typeof addCommandTask !== 'function')
      return

    try {
      addCommandTask([
        ...[
          {
            name: 'action.navigateLeft',
            try: 'workbench.action.navigateLeft',
            catch: uiNameCommandKeyMap[config.navigateFallback.left || 'sidebar'],
          },
          {
            name: 'action.navigateRight',
            try: 'workbench.action.navigateRight',
            catch: uiNameCommandKeyMap[config.navigateFallback.right || 'auxiliaryBar'],
          },
          {
            name: 'action.navigateDown',
            try: 'workbench.action.navigateDown',
            catch: uiNameCommandKeyMap[config.navigateFallback.down || 'panel'],
          },
        ].map((i) => {
          let oldViewColumn: ViewColumn | undefined
          let newViewColumn: ViewColumn | undefined
          return {
            ...i,
            type: 'async',
            onBeforeExec: () => oldViewColumn = activeEditor.value?.viewColumn,
            onAfterExec: () => newViewColumn = activeEditor.value?.viewColumn,
            validator: () => oldViewColumn !== newViewColumn,
          }
        }),
        {
          name: 'action.focusActiveEditorGroupWithHide',
          try: 'workbench.action.focusActiveEditorGroupWithHide',
          finally: commands.runHide,
        },
      ].map(i => ({
        ...i,
        scope: 'autoHide',
      })))

      stop()
    }
    catch (error) {
      logger.error(error)
    }
  }, { immediate: true })
}
