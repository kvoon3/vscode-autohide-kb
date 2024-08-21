import { ConfigurationTarget } from 'vscode'
import { useCommand } from 'reactive-vscode'
import { commands } from './generated/meta'
import { configs } from './config'
import { runHide } from '.'

export function registerCommands() {
  useCommand(
    commands.toggleEnable,
    () => configs.$update('enable', !configs.enable, ConfigurationTarget.Global),
  )

  useCommand(
    commands.toggleMode,
    () => configs.$update('mode', configs.mode === 'manual' ? 'auto' : 'manual', ConfigurationTarget.Global),
  )

  useCommand(commands.runHide, () => runHide())
}
