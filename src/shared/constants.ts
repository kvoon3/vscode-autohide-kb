import { computed } from 'reactive-vscode'
import { TextEditorSelectionChangeKind, ThemeColor } from 'vscode'
import { config } from './config'

export const uiNameCommandKeyMap = {
  panel: 'workbench.action.focusPanel',
  auxiliaryBar: 'workbench.action.focusAuxiliaryBar',
  sidebar: 'workbench.action.focusSideBar',
}

export const defaultPinActiveColor = undefined // vscode default color
export const defaultPinInActiveColor = new ThemeColor('disabledForeground')

export const triggerKinds = computed(() => config.triggerKind.map(key => ({
  mouse: TextEditorSelectionChangeKind.Mouse,
  keyboard: TextEditorSelectionChangeKind.Keyboard,
  command: TextEditorSelectionChangeKind.Command,
}[key])))
