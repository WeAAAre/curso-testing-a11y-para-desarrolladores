// @ts-check
import { defineConfig, devices } from '@playwright/experimental-ct-react';
import process from 'node:process';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  reportSlowTests: null,
  timeout: 2 * 60 * 1000,
  testDir: './test/screenreader/voiceover',
  /* The base directory, relative to the config file, for snapshot files created with toMatchSnapshot and toHaveScreenshot. */
  snapshotDir: './test/screenreader/voiceover/__snapshots__',
  /* Run tests in files in parallel */
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    [process.env.CI ? 'github' : 'list']
  ],

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], headless: false },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
  webServer: {
    command: 'npm run storybook',
    url: 'http://localhost:6006',
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
  },
  use: {
    baseURL: 'http://localhost:6006',
  },
});
