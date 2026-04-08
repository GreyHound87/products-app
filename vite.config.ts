import path from 'path'

import babel from '@rolldown/plugin-babel'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

const useReactCompiler = process.env.VITEST !== 'true'

export default defineConfig({
  plugins: [react(), ...(useReactCompiler ? [babel({ presets: [reactCompilerPreset()] })] : [])],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setupTests.ts'],
  },
})
