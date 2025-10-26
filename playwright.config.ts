import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'dev',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: '**/sitemap.spec.ts',
    },
    {
      name: 'preview',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4322',
      },
      testMatch: '**/sitemap.spec.ts',
    },
  ],
  webServer: [
    {
      command: 'npm run dev',
      url: 'http://localhost:4321',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npm run build && npm run preview -- --port 4322',
      url: 'http://localhost:4322',
      reuseExistingServer: !process.env.CI,
    },
  ],
});
