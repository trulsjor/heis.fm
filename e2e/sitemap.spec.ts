import { test, expect } from '@playwright/test';

test('sitemap is accessible at /sitemap-index.xml', async ({ page }) => {
  const response = await page.request.get('/sitemap-index.xml');

  // Check status
  expect(response.status()).toBe(200);

  // Check content type
  const contentType = response.headers()['content-type'];
  expect(contentType).toContain('xml');
});

test('sitemap contains valid XML structure', async ({ page }) => {
  const response = await page.request.get('/sitemap-index.xml');
  const body = await response.text();

  // Check for sitemap tags
  expect(body).toContain('<sitemapindex');
  expect(body).toContain('<sitemap>');
  expect(body).toContain('</sitemap>');
  expect(body).toContain('</sitemapindex>');
});

test('sitemap contains main pages', async ({ page }) => {
  const response = await page.request.get('/sitemap-index.xml');
  const body = await response.text();

  // Check for main pages URLs (will be in sitemap-0.xml)
  const sitemapResponse = await page.request.get('/sitemap-0.xml');
  const sitemapBody = await sitemapResponse.text();

  expect(sitemapBody).toMatch(/\/episodes/);
  expect(sitemapBody).toMatch(/\/about/);
});
