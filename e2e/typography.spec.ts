import { test, expect } from '@playwright/test';

test('Inter font is loaded and applied', async ({ page }) => {
  await page.goto('/');

  const body = page.locator('body');

  const fontFamily = await body.evaluate((el) =>
    window.getComputedStyle(el).fontFamily
  );

  // Check that Inter is in the font stack
  expect(fontFamily).toContain('Inter');
});
