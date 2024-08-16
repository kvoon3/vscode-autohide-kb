import type { ExtensionContext } from 'vscode'
import { ConfigurationTarget } from 'vscode'
import type { ShallowRef } from 'reactive-vscode'
import { useCommand } from 'reactive-vscode'
import { throttledRunHide } from './core'
import { commands } from './generated/meta'
import { configs } from './config'

export function registerCommands(ctx: ShallowRef<ExtensionContext | null>) {
  if (!ctx.value)
    return

  useCommand(
    commands.toggleEnable,
    () => configs.$update('enable', !configs.enable, ConfigurationTarget.Global),
  )

  useCommand(
    commands.toggleHidePanel,
    () => configs.$update('ui', configs.ui.panel = !configs.ui.panel, ConfigurationTarget.Global),
  )

  useCommand(
    commands.toggleHideSideBar,
    () => configs.$update('ui', configs.ui.sideBar = !configs.ui.sideBar, ConfigurationTarget.Global),
  )

  useCommand(
    commands.toggleHideAuxiliaryBar,
    () => configs.$update('ui', configs.ui.auxiliaryBar = !configs.ui.auxiliaryBar, ConfigurationTarget.Global),
  )

  useCommand(
    commands.toggleHideReferences,
    () => configs.$update('ui', configs.ui.references = !configs.ui.references, ConfigurationTarget.Global),
  )

  useCommand(
    commands.toggleHideNotifications,
    () => configs.$update('ui', configs.ui.notifications = !configs.ui.notifications, ConfigurationTarget.Global),
  )

  useCommand(
    commands.toggleHideOnlyMouse,
    () => configs.$update('triggerOnlyMouse', !configs.triggerOnlyMouse, ConfigurationTarget.Global),
  )

  useCommand(
    commands.toggleHidefromGit,
    () => configs.$update('triggerFromGit', !configs.triggerFromGit, ConfigurationTarget.Global),
  )

  useCommand(
    commands.toggleMode,
    () => configs.$update('mode', configs.mode === 'manual' ? 'auto' : 'manual', ConfigurationTarget.Global),
  )

  useCommand(commands.runHide, () => throttledRunHide())
}
