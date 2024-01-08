import type { ExtensionContext } from 'vscode'
import { workspace } from 'vscode'
import type { ExtensionConfiguration } from './types'
import { Mode } from './types'

export function getConfig<T>(key: string, v?: T) {
  return workspace.getConfiguration('autohide').get(key, v)
}

export function getConfigs(): ExtensionConfiguration {
  return {
    autoHideSideBar: getConfig('autoHideSideBar', true),
    autoHideAuxiliaryBar: getConfig('autoHideAuxiliaryBar', true),
    autoHidePanel: getConfig('autoHidePanel', true),
    autoHideReferences: getConfig('autoHideReferences', false),
    hideOnOpen: getConfig('hideOnOpen', true),
    hideOnlyMouse: getConfig('hideOnlyMouse', true),
    mode: getConfig('mode', Mode.Auto),
  }
}
