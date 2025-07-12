import type { NestedScopedConfigs } from '../generated/meta'
import { defineConfigObject } from 'reactive-vscode'
import * as Meta from '../generated/meta'

export const config = defineConfigObject<NestedScopedConfigs>(
  Meta.scopedConfigs.scope,
  Meta.scopedConfigs.defaults,
)
