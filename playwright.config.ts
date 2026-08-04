import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  expect: {
    timeout: 10 * 1000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.argv.includes('--headed') ? 1 : (process.env.CI ? 2 : undefined),
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],
  use: {
    baseURL: 'https://www.testmuai.com/selenium-playground',
    trace: 'on',
    screenshot: 'on',
    video: 'on',
  },

  projects: [
    {
      name: 'chromium-local',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox-local',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
