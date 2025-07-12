import type { NestedScopedConfigs } from './generated/meta'
import { computed, defineConfigObject } from 'reactive-vscode'
import { TextEditorSelectionChangeKind } from 'vscode'
import * as Meta from './generated/meta'

export const config = defineConfigObject<NestedScopedConfigs>(
  Meta.scopedConfigs.scope,
  Meta.scopedConfigs.defaults,
)

export const triggerKinds = computed(() =>
  config.triggerKind.map(key => ({
    mouse: TextEditorSelectionChangeKind.Mouse,
    keyboard: TextEditorSelectionChangeKind.Keyboard,
    command: TextEditorSelectionChangeKind.Command,
  }[key])),
)
