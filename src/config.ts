import { ConfigurationTarget, workspace } from 'vscode'
import { objectEntries } from '@antfu/utils'
import type { ExtensionConfiguration } from './types'
import { Mode } from './types'
import { EXT_NAMESPACE } from './meta'
import { log } from './log'

const defaultConfigs: ExtensionConfiguration = {
  autoHideSideBar: true,
  autoHideAuxiliaryBar: true,
  autoHidePanel: true,
  autoHideReferences: false,
  autoHideNotifications: false,
  hideOnOpen: true,
  hideOnlyMouse: true,
  hideFromGit: false,
  mode: Mode.Auto,
}

export function getConfig<K extends keyof ExtensionConfiguration>(
  key: K,
  defaultValue?: ExtensionConfiguration[K],
) {
  return workspace.getConfiguration(`${EXT_NAMESPACE}`).get(key, defaultValue)
}

export function getConfigs(): ExtensionConfiguration {
  return objectEntries(defaultConfigs)
    .reduce((configs, [key, defaultValue]) => ({
      ...configs,
      [key]: getConfig(key, defaultValue),
    }), {} as ExtensionConfiguration)
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
