import { executeCommand, useCommand, useCommands } from 'reactive-vscode'
import { ConfigurationTarget } from 'vscode'
import { runHide } from '.'
import { config } from './config'
import { commands } from './generated/meta'

export function registerCommands() {
  useCommand(
    commands.toggleEnable,
    () => config.$update('enable', !config.enable, ConfigurationTarget.Global),
  )

  useCommand(
    commands.toggleMode,
    () => config.$update('mode', config.mode === 'manual' ? 'auto' : 'manual', ConfigurationTarget.Global),
  )

  useCommand(commands.runHide, () => runHide())

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
}
