export interface ExtensionConfiguration {
  autoHideSideBar: boolean
  autoHideAuxiliaryBar: boolean
  autoHidePanel: boolean
  autoHideReferences: boolean
  hideOnOpen: boolean
  hideOnlyMouse: boolean
  mode: Mode
}

export enum Mode {
  Auto = 0,
  Manual = 1,
}
