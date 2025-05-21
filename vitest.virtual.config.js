import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({ 
  test: {
    include: ['./test/screenreader/virtual/**/*.test.jsx', './test/screenreader/virtual/**/*.test.js'],
    environment: 'happy-dom',
    setupFiles: './test/screenreader/virtual/vitest.setup.js',
    passWithNoTests: true,
    reporters: ['default', 'junit'],
    outputFile: './reports/virtual-screenreader.xml',
  }
})
