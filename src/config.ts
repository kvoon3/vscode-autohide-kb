import { ConfigurationTarget, workspace } from 'vscode'
import type { ConfigKey, ConfigKeyTypeMap } from './generated-meta'
import { configs } from './generated-meta'

export function getConfigs(): ConfigKeyTypeMap {
  return Object.values(configs).reduce((accu, item) => {
    const { key, default: defaultValue } = item
    return {
      ...accu,
      [key]: workspace.getConfiguration().get(key, defaultValue),
    }
  }, {} as ConfigKeyTypeMap)
}

export async function updateConfig<K extends ConfigKey>(
  key: K,
  value: ConfigKeyTypeMap[K],
  target: ConfigurationTarget = ConfigurationTarget.Workspace,
) {
  await workspace.getConfiguration().update(key, value, target)
}
