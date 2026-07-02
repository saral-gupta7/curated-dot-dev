import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    environmentOptions: {
      jsdom: {
        url: 'http://localhost',
      },
    },
    passWithNoTests: false,
    setupFiles: ['./src/test/setup.ts'],
  },
})
