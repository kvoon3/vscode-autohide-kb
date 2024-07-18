// This file is generated by `vscode-ext-gen`. Do not modify manually.
// @see https://github.com/antfu/vscode-ext-gen

// Meta info
export const publisher = "kevin-kwong"
export const name = "vscode-autohide-keyboard"
export const version = "0.1.4"
export const displayName = "Auto Hide KB"
export const description = "Forked from AutoHide with optimized for a better keyboard-only usage experience"
export const extensionId = `${publisher}.${name}`

/**
 * Type union of all commands
 */
export type CommandKey = 
  | "autoHide.toggleHideSideBar"
  | "autoHide.toggleHideAuxiliaryBar"
  | "autoHide.toggleHidePanel"
  | "autoHide.toggleHideOnlyMouse"
  | "autoHide.switchToManualMode"
  | "autoHide.switchToAutoMode"
  | "autoHide.runHide"
  | "autoHide.enable"
  | "autoHide.disable"

/**
 * Commands map registed by `kevin-kwong.vscode-autohide-keyboard`
 */
export const commands = {
  /**
   * Toggle Auto Hide Side Bar for Current Workspace
   * @value `autoHide.toggleHideSideBar`
   */
  autoHideToggleHideSideBar: "autoHide.toggleHideSideBar",
  /**
   * Toggle Auto Hide Auxiliary Bar for Current Workspace
   * @value `autoHide.toggleHideAuxiliaryBar`
   */
  autoHideToggleHideAuxiliaryBar: "autoHide.toggleHideAuxiliaryBar",
  /**
   * Toggle Auto Hide Panel for Current Workspace
   * @value `autoHide.toggleHidePanel`
   */
  autoHideToggleHidePanel: "autoHide.toggleHidePanel",
  /**
   * Toggle hide Only mouse
   * @value `autoHide.toggleHideOnlyMouse`
   */
  autoHideToggleHideOnlyMouse: "autoHide.toggleHideOnlyMouse",
  /**
   * Switch to manual mode
   * @value `autoHide.switchToManualMode`
   */
  autoHideSwitchToManualMode: "autoHide.switchToManualMode",
  /**
   * Switch to auto mode
   * @value `autoHide.switchToAutoMode`
   */
  autoHideSwitchToAutoMode: "autoHide.switchToAutoMode",
  /**
   * Run hide immediately
   * @value `autoHide.runHide`
   */
  autoHideRunHide: "autoHide.runHide",
  /**
   * Enable Auto Hide
   * @value `autoHide.enable`
   */
  autoHideEnable: "autoHide.enable",
  /**
   * Disable Auto Hide
   * @value `autoHide.disable`
   */
  autoHideDisable: "autoHide.disable",
} satisfies Record<string, CommandKey>

/**
 * Type union of all configs
 */
export type ConfigKey = 
  | "autoHide.enable"
  | "autoHide.autoHideSideBar"
  | "autoHide.autoHideAuxiliaryBar"
  | "autoHide.autoHidePanel"
  | "autoHide.autoHideReferences"
  | "autoHide.autoHideNotifications"
  | "autoHide.hideOnOpen"
  | "autoHide.hideOnlyMouse"
  | "autoHide.hideFromGit"
  | "autoHide.mode"

export interface ConfigKeyTypeMap {
  "autoHide.enable": boolean,
  "autoHide.autoHideSideBar": boolean,
  "autoHide.autoHideAuxiliaryBar": boolean,
  "autoHide.autoHidePanel": boolean,
  "autoHide.autoHideReferences": boolean,
  "autoHide.autoHideNotifications": boolean,
  "autoHide.hideOnOpen": boolean,
  "autoHide.hideOnlyMouse": boolean,
  "autoHide.hideFromGit": boolean,
  "autoHide.mode": ("auto" | "manual"),
}

export interface ConfigShorthandMap {
  autoHideEnable: "autoHide.enable",
  autoHideAutoHideSideBar: "autoHide.autoHideSideBar",
  autoHideAutoHideAuxiliaryBar: "autoHide.autoHideAuxiliaryBar",
  autoHideAutoHidePanel: "autoHide.autoHidePanel",
  autoHideAutoHideReferences: "autoHide.autoHideReferences",
  autoHideAutoHideNotifications: "autoHide.autoHideNotifications",
  autoHideHideOnOpen: "autoHide.hideOnOpen",
  autoHideHideOnlyMouse: "autoHide.hideOnlyMouse",
  autoHideHideFromGit: "autoHide.hideFromGit",
  autoHideMode: "autoHide.mode",
}

export interface ConfigItem<T extends keyof ConfigKeyTypeMap> {
  key: T,
  default: ConfigKeyTypeMap[T],
}


/**
 * Configs map registed by `kevin-kwong.vscode-autohide-keyboard`
 */
export const configs = {
  /**
   * Enable Auto Hide
   * @key `autoHide.enable`
   * @default `true`
   * @type `boolean`
   */
  autoHideEnable: {
    key: "autoHide.enable",
    default: true,
  } as ConfigItem<"autoHide.enable">,
  /**
   * Hide the side bar when the user clicks into a text editor.
   * @key `autoHide.autoHideSideBar`
   * @default `true`
   * @type `boolean`
   */
  autoHideAutoHideSideBar: {
    key: "autoHide.autoHideSideBar",
    default: true,
  } as ConfigItem<"autoHide.autoHideSideBar">,
  /**
   * Hide the auxiliary bar (second side bar) when the user clicks into a text editor.
   * @key `autoHide.autoHideAuxiliaryBar`
   * @default `true`
   * @type `boolean`
   */
  autoHideAutoHideAuxiliaryBar: {
    key: "autoHide.autoHideAuxiliaryBar",
    default: true,
  } as ConfigItem<"autoHide.autoHideAuxiliaryBar">,
  /**
   * Hide the panel (output, terminal, etc.) when the user clicks into a text editor.
   * @key `autoHide.autoHidePanel`
   * @default `true`
   * @type `boolean`
   */
  autoHideAutoHidePanel: {
    key: "autoHide.autoHidePanel",
    default: true,
  } as ConfigItem<"autoHide.autoHidePanel">,
  /**
   * Hide the References panel (`Go to References`) when the user clicks into a text editor.
   * @key `autoHide.autoHideReferences`
   * @default `false`
   * @type `boolean`
   */
  autoHideAutoHideReferences: {
    key: "autoHide.autoHideReferences",
    default: false,
  } as ConfigItem<"autoHide.autoHideReferences">,
  /**
   * Hide the notifications when the user clicks into a text editor.
   * @key `autoHide.autoHideNotifications`
   * @default `false`
   * @type `boolean`
   */
  autoHideAutoHideNotifications: {
    key: "autoHide.autoHideNotifications",
    default: false,
  } as ConfigItem<"autoHide.autoHideNotifications">,
  /**
   * Hide side bar and panel when VSCode first opens.
   * @key `autoHide.hideOnOpen`
   * @default `true`
   * @type `boolean`
   */
  autoHideHideOnOpen: {
    key: "autoHide.hideOnOpen",
    default: true,
  } as ConfigItem<"autoHide.hideOnOpen">,
  /**
   * Enable/Disable hide only with mouse
   * @key `autoHide.hideOnlyMouse`
   * @default `true`
   * @type `boolean`
   */
  autoHideHideOnlyMouse: {
    key: "autoHide.hideOnlyMouse",
    default: true,
  } as ConfigItem<"autoHide.hideOnlyMouse">,
  /**
   * Enable/Disable run hide when open git changes
   * @key `autoHide.hideFromGit`
   * @default `false`
   * @type `boolean`
   */
  autoHideHideFromGit: {
    key: "autoHide.hideFromGit",
    default: false,
  } as ConfigItem<"autoHide.hideFromGit">,
  /**
   * set auto/manual mode
   * @key `autoHide.mode`
   * @default `"auto"`
   * @type `string`
   */
  autoHideMode: {
    key: "autoHide.mode",
    default: "auto",
  } as ConfigItem<"autoHide.mode">,
}

export interface ScopedConfigKeyTypeMap {
}

export const scopedConfigs = {
  scope: "vscode-autohide-keyboard",
  defaults: {
  } satisfies ScopedConfigKeyTypeMap,
}

