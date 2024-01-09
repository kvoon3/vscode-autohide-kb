import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/extensions.ts',
  ],
  format: ['cjs'],
  shims: false,
  dts: false,
  external: [
    'vscode',
  ],
})
