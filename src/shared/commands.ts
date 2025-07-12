import type { CommandTask } from '@command-run-all/core'
import type { ViewColumn } from 'vscode'
import { addCommandTask } from '@command-run-all/core'
import { executeCommand, useActiveTextEditor, useCommand, useCommands, useDisposable } from 'reactive-vscode'
import { ConfigurationTarget } from 'vscode'
import { executeHide } from '../core'
import { commands } from '../generated/meta'
import { config } from './config'
import { uiNameCommandKeyMap } from './constants'

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

  let oldViewColumn: ViewColumn | undefined
  const updateOldViewColumn = () => (oldViewColumn = activeEditor.value?.viewColumn)

  let newViewColumn: ViewColumn | undefined
  const updateNewViewColumn = () => (newViewColumn = activeEditor.value?.viewColumn)

  const cmds: CommandTask[] = [
    {
      type: 'queue',
      name: 'autoHide.action.navigateLeft',
      try: [
        updateOldViewColumn,
        'workbench.action.navigateLeft',
        updateNewViewColumn,
      ],
      catch: uiNameCommandKeyMap[config.navigateFallback.left || 'sidebar'],
      validator() {
        return oldViewColumn !== newViewColumn
      },
    },
    {
      type: 'queue',
      name: 'autoHide.action.navigateRight',
      try: [
        updateOldViewColumn,
        'workbench.action.navigateRight',
        updateNewViewColumn,
      ],
      catch: uiNameCommandKeyMap[config.navigateFallback.right || 'auxiliaryBar'],
      validator() {
        return oldViewColumn !== newViewColumn
      },
    },
    {
      type: 'queue',
      name: 'autoHide.action.navigateDown',
      try: [
        updateOldViewColumn,
        'workbench.action.navigateDown',
        updateNewViewColumn,
      ],
      catch: uiNameCommandKeyMap[config.navigateFallback.down || 'panel'],
      validator() {
        return oldViewColumn !== newViewColumn
      },
    },
    {
      name: 'autoHide.action.focusActiveEditorGroupWithHide',
      try: 'workbench.action.focusActiveEditorGroup',
      finally() {
        if (config.enable && config.mode === 'auto')
          executeHide()
      },
    },
  ]

  addCommandTask(cmds).forEach(useDisposable)
}
