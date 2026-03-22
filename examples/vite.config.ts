import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'node:path'
import { copyFileSync } from 'node:fs'

// SPA fallback: copy index.html to 404.html for GitHub Pages / static hosting
const spaFallbackPlugin = () => ({
  name: 'spa-fallback',
  closeBundle() {
    const distDir = resolve(__dirname, 'dist')
    try {
      copyFileSync(resolve(distDir, 'index.html'), resolve(distDir, '404.html'))
    } catch {}
  },
})

export default defineConfig({
  base: '/js-cool/',
  plugins: [
    vue(),
    components({
      resolvers: [NaiveUiResolver()],
    }),
    spaFallbackPlugin(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router'],
        },
      },
    },
  },
})
