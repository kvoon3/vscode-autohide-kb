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
    'autohide.enable': () => configs.enable.value = true,
    'autohide.disable': () => configs.enable.value = false,
    'autohide.toggleHidePanel': () => !configs.autohidePanel.value,
    'autohide.toggleHideSideBar': () => !configs.autohideSideBar.value,
    'autohide.toggleHideAuxiliaryBar': () => !configs.autohideAuxiliaryBar.value,
    'autohide.toggleHideOnlyMouse': () => !configs.hideOnlyMouse.value,
    'autohide.switchToManualMode': () => configs.mode.value = 'manual',
    'autohide.switchToAutoMode': () => configs.mode.value = 'auto',
    'autohide.runHide': () => runHide(),
  }

  objectKeys(commandsMap).forEach((key) => {
    useCommand(key, commandsMap[key])
  })
}
