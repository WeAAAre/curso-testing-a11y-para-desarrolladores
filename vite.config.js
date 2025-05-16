import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    include: ['./test/testing-library/**/*.test.jsx', './test/testing-library/**/*.test.js'],
    environment: 'happy-dom',
    setupFiles: 'test/testing-library/vitest.setup.js',
    passWithNoTests: true,
    reporters: ['default', 'junit'],
    outputFile: './reports/testing-library.xml',
  }
})
