import { test, expect } from '@playwright/test';

test('cover image is accessible', async ({ page }) => {
  const response = await page.request.get('/cover.jpeg');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('image');
});
