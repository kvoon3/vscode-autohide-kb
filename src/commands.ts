import { ConfigurationTarget } from 'vscode'
import { useCommand } from 'reactive-vscode'
import { commands } from './generated/meta'
import { config } from './config'
import { runHide } from '.'

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
