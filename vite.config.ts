import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        serviceWorker: 'src/serviceWorker.ts',
      },
      output: {
        entryFileNames: (assetInfo) => {
          return assetInfo.name === 'serviceWorker'
            ? 'serviceWorker.js'
            : 'assets/[name]-[hash].js';
        },
      },
    },
  },
});