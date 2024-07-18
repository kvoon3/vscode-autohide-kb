import { resolve } from 'node:path'
import fs from 'fs-extra'

async function prepare() {
  await fs.ensureDir(resolve(__dirname, '../src/generated'))
}

prepare()
