import { resolve } from 'node:path'

import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import zip from 'vite-plugin-zip-pack'
import tsconfigPaths from 'vite-tsconfig-paths'

import manifest from './manifest.config.ts'

export default defineConfig({
  plugins: [react(), tsconfigPaths(), crx({ manifest }), zip({ outDir: 'release', outFileName: 'release.zip' })],
  server: {
    cors: {
      origin: [/chrome-extension:\/\//],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [resolve(__dirname, 'src/styles')],
      },
    },
  },
})
