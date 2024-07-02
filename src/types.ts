export interface ExtensionConfiguration {
  autoHideSideBar: boolean | undefined
  autoHideAuxiliaryBar: boolean | undefined
  autoHidePanel: boolean | undefined
  autoHideReferences: boolean | undefined
  autoHideNotifications: boolean | undefined
  hideOnOpen: boolean | undefined
  hideOnlyMouse: boolean | undefined
  hideFromGit: boolean | undefined
  mode: Mode | undefined
}

export enum Mode {
  Auto = 'auto',
  Manual = 'manual',
}
