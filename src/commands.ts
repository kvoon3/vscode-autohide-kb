import type { ExtensionContext } from 'vscode'
import { objectKeys } from '@antfu/utils'
import type { ShallowRef } from 'reactive-vscode'
import { useCommand } from 'reactive-vscode'
import { runHide } from './core'
import type { CommandKey } from './generated/meta'
import { configs } from './config'

export function registerCommands(ctx: ShallowRef<ExtensionContext | null>) {
  if (!ctx.value)
    return

  const commandsMap: Record<CommandKey, () => void> = {
    'autoHide.enable': () => configs.enable.value = true,
    'autoHide.disable': () => configs.enable.value = false,
    'autoHide.toggleHidePanel': () => !configs.autoHidePanel.value,
    'autoHide.toggleHideSideBar': () => !configs.autoHideSideBar.value,
    'autoHide.toggleHideAuxiliaryBar': () => !configs.autoHideAuxiliaryBar.value,
    'autoHide.toggleHideOnlyMouse': () => !configs.hideOnlyMouse.value,
    'autoHide.switchToManualMode': () => configs.mode.value = 'manual',
    'autoHide.switchToAutoMode': () => configs.mode.value = 'auto',
    'autoHide.runHide': () => runHide(),
  }

  objectKeys(commandsMap).forEach((key) => {
    useCommand(key, commandsMap[key])
  })
}
