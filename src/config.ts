import { defineConfigObject } from 'reactive-vscode'
import type { ScopedConfigKeyTypeMap } from './generated/meta'
import * as Meta from './generated/meta'

export const config = defineConfigObject<ScopedConfigKeyTypeMap>(
  Meta.scopedConfigs.scope,
  Meta.scopedConfigs.defaults,
)
