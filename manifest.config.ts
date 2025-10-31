import { defineManifest } from '@crxjs/vite-plugin'

import pkg from './package.json'

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  icons: {
    16: 'public/icon16.png',
    48: 'public/icon48.png',
    128: 'public/icon128.png',
  },
  action: {
    default_icon: {
      16: 'public/icon16.png',
      48: 'public/icon48.png',
      128: 'public/icon128.png',
    },
  },
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  side_panel: {
    default_path: 'src/sidepanel/index.html',
  },
  content_scripts: [
    {
      js: ['src/content/main.tsx'],
      matches: ['https://*/*'],
    },
  ],
  permissions: ['storage', 'sidePanel'],
})
