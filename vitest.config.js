import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({ 
  test: {
    include: ['./test/testing-library/**/*.test.jsx', './test/testing-library/**/*.test.js'],
    environment: 'jsdom',
    setupFiles: './test/testing-library/vitest.setup.js',
    passWithNoTests: true,
    reporters: ['default', 'junit'],
    outputFile: './reports/testing-library.xml',
  }
})