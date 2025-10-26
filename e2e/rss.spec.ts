import { test, expect } from '@playwright/test';

test('RSS feed is accessible at /rss.xml', async ({ page }) => {
  const response = await page.request.get('/rss.xml');

  // Check status
  expect(response.status()).toBe(200);

  // Check content type
  const contentType = response.headers()['content-type'];
  expect(contentType).toContain('xml');
});

test('RSS feed contains valid XML structure', async ({ page }) => {
  const response = await page.request.get('/rss.xml');
  const body = await response.text();

  // Check for RSS tags
  expect(body).toContain('<rss');
  expect(body).toContain('<channel>');
  expect(body).toContain('</channel>');
  expect(body).toContain('</rss>');
});

test('RSS feed contains podcast information', async ({ page }) => {
  const response = await page.request.get('/rss.xml');
  const body = await response.text();

  // Check for podcast title
  expect(body).toContain('heis.fm');

  // Check for episodes
  expect(body).toContain('<item>');
  expect(body).toContain('</item>');
});
