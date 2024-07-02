import type { ExtensionContext } from 'vscode'
import { commands } from 'vscode'
import { EXT_NAMESPACE } from './meta'
import { Mode } from './types'
import { runHide } from './core'
import { getConfigs, updateConfig } from './config'

export function registerCommands({ subscriptions }: ExtensionContext) {
  const { registerCommand } = commands
  subscriptions.push(
    registerCommand(`${EXT_NAMESPACE}.toggleHidePanel`, () => {
      updateConfig('autoHidePanel', !getConfigs().autoHidePanel)
    }),
  )

  subscriptions.push(
    registerCommand(`${EXT_NAMESPACE}.toggleHideSideBar`, () => {
      updateConfig('autoHideSideBar', !getConfigs().autoHideSideBar)
    }),
  )

  subscriptions.push(
    registerCommand(`${EXT_NAMESPACE}.toggleHideAuxiliaryBar`, () => {
      updateConfig('autoHideAuxiliaryBar', !getConfigs().autoHideAuxiliaryBar)
    }),
  )

  subscriptions.push(
    registerCommand(`${EXT_NAMESPACE}.toggleHideOnlyMouse`, () => {
      updateConfig('hideOnlyMouse', !getConfigs().hideOnlyMouse)
    }),
  )

  subscriptions.push(
    registerCommand(`${EXT_NAMESPACE}.switchToManualMode`, () => {
      updateConfig('mode', Mode.Manual)
    }),
  )

  subscriptions.push(
    registerCommand(`${EXT_NAMESPACE}.switchToAutoMode`, () => {
      updateConfig('mode', Mode.Auto)
    }),
  )

  subscriptions.push(
    registerCommand(`${EXT_NAMESPACE}.runHide`, runHide),
  )
}
