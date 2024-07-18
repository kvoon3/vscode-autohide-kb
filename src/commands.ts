import type { ExtensionContext } from 'vscode'
import { commands } from 'vscode'
import { objectKeys } from '@antfu/utils'
import { Mode } from './types'
import { runHide } from './core'
import { getConfigs, updateConfig } from './config'
import type { CommandKey } from './generated-meta'

export function registerCommands({ subscriptions }: ExtensionContext) {
  const { registerCommand } = commands

  const commandsMap: Record<CommandKey, () => void> = {
    'autoHide.enable': () => updateConfig('autoHide.enable', true),
    'autoHide.disable': () => updateConfig('autoHide.enable', false),
    'autoHide.toggleHidePanel': () => updateConfig('autoHide.autoHidePanel', !getConfigs()['autoHide.autoHidePanel']),
    'autoHide.toggleHideSideBar': () => updateConfig('autoHide.autoHideSideBar', !getConfigs()['autoHide.autoHideSideBar']),
    'autoHide.toggleHideAuxiliaryBar': () => updateConfig('autoHide.autoHideAuxiliaryBar', !getConfigs()['autoHide.autoHideAuxiliaryBar']),
    'autoHide.toggleHideOnlyMouse': () => updateConfig('autoHide.hideOnlyMouse', !getConfigs()['autoHide.hideOnlyMouse']),
    'autoHide.switchToManualMode': () => updateConfig('autoHide.mode', Mode.Manual),
    'autoHide.switchToAutoMode': () => updateConfig('autoHide.mode', Mode.Auto),
    'autoHide.runHide': () => runHide(),
  }

  objectKeys(commandsMap).forEach((key) => {
    subscriptions.push(
      registerCommand(key, commandsMap[key]),
    )
  })
}
