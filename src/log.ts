import process from 'node:process'
import { window } from 'vscode'

export const isDebug = process.env.NODE_ENV === 'development'

export const channel = window.createOutputChannel('Auto Hide KB')

export function log(...args: any[]) {
  channel.appendLine(args.map(i => String(i)).join(' '))
}

export function debug(...args: any[]) {
  if (!isDebug)
    return
    // eslint-disable-next-line no-console
  console.log(...args)
  log(...args)
}
