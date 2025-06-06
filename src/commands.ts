import { useCommand } from 'reactive-vscode'
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
}
