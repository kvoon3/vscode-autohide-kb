import { ConfigurationTarget, workspace } from 'vscode'
import type { ExtensionConfiguration } from './types'
import { Mode } from './types'
import { EXT_NAMESPACE } from './meta'
import { log } from './log'

export function getConfig<T>(key: string, v?: T) {
  return workspace.getConfiguration(`${EXT_NAMESPACE}`).get(key, v)
}

export function getConfigs(): ExtensionConfiguration {
  return {
    autoHideSideBar: getConfig('autoHideSideBar', true),
    autoHideAuxiliaryBar: getConfig('autoHideAuxiliaryBar', true),
    autoHidePanel: getConfig('autoHidePanel', true),
    autoHideReferences: getConfig('autoHideReferences', false),
    autoHideNotifications: getConfig('autoHideNotifications', false),
    hideOnOpen: getConfig('hideOnOpen', true),
    hideOnlyMouse: getConfig('hideOnlyMouse', true),
    hideFromGit: getConfig('hideFromGit', false),
    mode: getConfig('mode', Mode.Auto),
  }
}

export async function updateConfig<K extends keyof ExtensionConfiguration>(
  key: K,
  value: ExtensionConfiguration[K],
  target: ConfigurationTarget = ConfigurationTarget.Workspace,
) {
  log.log('updateconifg: before', key, value)
  await workspace.getConfiguration(`${EXT_NAMESPACE}`).update(key, value, target)
  log.log('updateConfig: after', getConfig(key))
}
