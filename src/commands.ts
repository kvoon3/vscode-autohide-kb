import type { ExtensionContext } from 'vscode'
import { commands } from 'vscode'
import { EXT_NAMESPACE } from './meta'
import { Mode } from './types'
import { runHide } from './core'
import { getConfigs, updateConfig } from './config'

export function registerCommands(ctx: ExtensionContext) {
  ctx.subscriptions.push(
    commands.registerCommand(`${EXT_NAMESPACE}.toggleHidePanel`, () => {
      updateConfig('autoHidePanel', !getConfigs().autoHidePanel)
    }),
  )

  ctx.subscriptions.push(
    commands.registerCommand(`${EXT_NAMESPACE}.toggleHideSideBar`, () => {
      updateConfig('autoHideSideBar', !getConfigs().autoHideSideBar)
    }),
  )

  ctx.subscriptions.push(
    commands.registerCommand(`${EXT_NAMESPACE}.toggleHideAuxiliaryBar`, () => {
      updateConfig('autoHideAuxiliaryBar', !getConfigs().autoHideAuxiliaryBar)
    }),
  )

  ctx.subscriptions.push(
    commands.registerCommand(`${EXT_NAMESPACE}.toggleHideOnlyMouse`, () => {
      updateConfig('hideOnlyMouse', !getConfigs().hideOnlyMouse)
    }),
  )

  ctx.subscriptions.push(
    commands.registerCommand(`${EXT_NAMESPACE}.switchToManualMode`, () => {
      updateConfig('mode', Mode.Manual)
    }),
  )

  ctx.subscriptions.push(
    commands.registerCommand(`${EXT_NAMESPACE}.switchToAutoMode`, () => {
      updateConfig('mode', Mode.Auto)
    }),
  )

  ctx.subscriptions.push(
    commands.registerCommand(`${EXT_NAMESPACE}.runHide`, runHide),
  )
}
