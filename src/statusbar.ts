import type { UseStatusBarItemOptions } from 'reactive-vscode'
import type { ConfigKeyTypeMap } from './generated/meta'
import { objectEntries } from '@reactive-vscode/vueuse'
import { useStatusBarItem } from 'reactive-vscode'
import { config } from './config'
import { defaultPinActiveColor, defaultPinInActiveColor } from './constants'
import { commands, name } from './generated/meta'

const statusBarIdOptionsMap: Record<
  keyof ConfigKeyTypeMap['autoHide.statusBar'],
  UseStatusBarItemOptions
> = {
  'Trigger Hide': {
    command: commands.runHide,
  },
  'AutoHide Mode': {
    command: commands.toggleMode,
  },
  'Pin Sidebar': {
    color: () => config.ui.sidebar
      ? config.statusBar['Pin Sidebar']?.inactiveColor || defaultPinInActiveColor
      : defaultPinActiveColor,
    command: commands.togglePinSidebar,
  },
  'Pin Panel': {
    color: () => config.ui.panel
      ? config.statusBar['Pin Sidebar']?.inactiveColor || defaultPinInActiveColor
      : defaultPinActiveColor,
    command: commands.togglePinPanel,
  },
  'Pin AuxiliaryBar': {
    color: () => config.ui.auxiliaryBar
      ? config.statusBar['Pin AuxiliaryBar']?.inactiveColor || defaultPinInActiveColor
      : defaultPinActiveColor,
    command: commands.togglePinAuxiliaryBar,
  },
}

export function useStatusBar() {
  objectEntries(config.statusBar)
    .reverse()
    .forEach(([tooltip, value]) => {
      const { text, priority } = value || {}
      if (text) {
        const item = useStatusBarItem({
          ...statusBarIdOptionsMap[tooltip],
          id: `${name}-${tooltip}`,
          text: () => (text as string).replace('$(mode)', config.mode.toUpperCase()),
          tooltip,
          visible: true,
          priority,
        })
        item.show()
      }
    })
}
