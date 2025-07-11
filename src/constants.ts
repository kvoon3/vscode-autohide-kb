import { ThemeColor } from 'vscode'

export const uiNameCommandKeyMap = {
  panel: 'workbench.action.focusPanel',
  auxiliaryBar: 'workbench.action.focusAuxiliaryBar',
  sidebar: 'workbench.action.focusSideBar',
}

export const defaultPinActiveColor = undefined // vscode default color
export const defaultPinInActiveColor = new ThemeColor('disabledForeground')
