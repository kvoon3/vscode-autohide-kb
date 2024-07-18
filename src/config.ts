import { defineConfigs } from 'reactive-vscode'
import type { ScopedConfigKeyTypeMap } from './generated-meta'
import * as Meta from './generated-meta'

export const configs = defineConfigs<ScopedConfigKeyTypeMap>(
  Meta.scopedConfigs.scope,
  Meta.scopedConfigs.defaults,
)
