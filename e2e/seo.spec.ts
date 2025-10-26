import { test, expect } from '@playwright/test';

test('homepage has SEO meta tags', async ({ page }) => {
  await page.goto('/');

  // Check basic meta tags
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);

  // Check Open Graph tags
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /heis\.fm/i);
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
  await expect(page.locator('meta[property="og:url"]')).toBeAttached();

  // Check Twitter Card tags
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', /heis\.fm/i);
});

test('episodes page has SEO meta tags', async ({ page }) => {
  await page.goto('/episodes');

  // Check basic meta tags
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);

  // Check Open Graph tags
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /Episodes/i);
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
});

test('about page has SEO meta tags', async ({ page }) => {
  await page.goto('/about');

  // Check basic meta tags
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);

  // Check Open Graph tags
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /About/i);
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
});

test('all pages have viewport meta tag', async ({ page }) => {
  const pages = ['/', '/episodes', '/about'];

  for (const path of pages) {
    await page.goto(path);
    await expect(page.locator('meta[name="viewport"]')).toHaveAttribute('content', /width=device-width/);
  }
});
