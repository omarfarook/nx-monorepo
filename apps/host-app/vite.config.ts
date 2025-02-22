/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/host-app',
  server: {
    port: 4200,
    host: 'localhost',
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [
    react(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
    federation({
      name: 'host-app',
      filename: 'remoteEntry.js',
      remotes: {
        'remote-first-fe': 'http://localhost:5001/assets/remoteEntry.js',
        'remote-second-fe': 'http://localhost:5002/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', '@mui/material'],
    }),
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: '../../dist/apps/host-app',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/host-app',
      provider: 'v8',
    },
  },
});
