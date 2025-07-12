import type { UseStatusBarItemOptions } from 'reactive-vscode'
import type { StatusBarItem } from 'vscode'
import type { ConfigKeyTypeMap } from '../generated/meta'
import { objectEntries, watchImmediate } from '@reactive-vscode/vueuse'
import { useStatusBarItem } from 'reactive-vscode'
import { commands, name } from '../generated/meta'
import { config } from '../shared/config'
import { defaultPinActiveColor, defaultPinInActiveColor } from '../shared/constants'

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

export function useStatusBars() {
  const items: StatusBarItem[] = []
  watchImmediate(() => config.statusBar, () => {
    if (items.length)
      items.forEach(i => i.dispose())

    objectEntries(config.statusBar).forEach(([tooltip, value]) => {
      const { text, visible, priority } = value || {}
      if (text && visible) {
        const item = useStatusBarItem({
          ...statusBarIdOptionsMap[tooltip],
          id: `${name}-${tooltip}`,
          text: () => replaceCustomTextSlot(text),
          tooltip,
          priority,
        })
        item.show()
        items.push(item)
      }
    })
  })

  watchImmediate(() => config.enable, (value) => {
    if (value)
      items.forEach(i => i.show())
    else
      items.forEach(i => i.hide())
  })

  return items
}

function replaceCustomTextSlot(text: string) {
  text = text.replaceAll('$(mode)', config.mode.toUpperCase())

  if (config.enable === false)
    text.replaceAll('$(mode)', 'DISABLED')

  return text
}
