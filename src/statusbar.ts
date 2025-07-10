import type { UseStatusBarItemOptions } from 'reactive-vscode'
import type { ConfigKeyTypeMap } from './generated/meta'
import { objectEntries } from '@reactive-vscode/vueuse'
import { computed, useStatusBarItem } from 'reactive-vscode'
import { ThemeColor } from 'vscode'
import { config } from './config'
import { commands, name } from './generated/meta'
import { logger } from './log'

const pinActiveColor = undefined // default color
const pinInactiveColor = computed(() => config.pinButtonInactiveColor || new ThemeColor('disabledForeground'))

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
    color: () => config.ui.sidebar ? pinInactiveColor.value : pinActiveColor,
    command: commands.togglePinSidebar,
  },
  'Pin Panel': {
    color: () => config.ui.panel ? pinInactiveColor.value : pinActiveColor,
    command: commands.togglePinPanel,
  },
  'Pin AuxiliaryBar': {
    color: () => config.ui.auxiliaryBar ? pinInactiveColor.value : pinActiveColor,
    command: commands.togglePinAuxiliaryBar,
  },
}

export function useStatusBar() {
  objectEntries(config.statusBar)
    .reverse()
    .forEach(([key, text], priority) => {
      logger.info('key', key)
      logger.info('text', text)
      const item = useStatusBarItem({
        ...statusBarIdOptionsMap[key],
        id: `${name}-${key}`,
        // FIXME: type
        text: () => (text as string).replace('$(mode)', config.mode.toUpperCase()),
        tooltip: key,
        visible: true,
        priority,
      })
      logger.info('item', item)
      item.show()
    })
}
