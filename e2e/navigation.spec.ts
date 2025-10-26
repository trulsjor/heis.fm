import { test, expect } from '@playwright/test';

test('navigation bar exists with correct links', async ({ page }) => {
  await page.goto('/');

  // Check nav exists
  const nav = page.locator('nav');
  await expect(nav).toBeVisible();

  // Check navigation links
  const homeLink = nav.locator('a[href="/"]');
  await expect(homeLink).toBeVisible();
  await expect(homeLink).toContainText('heis.fm');

  const episodesLink = nav.locator('a[href="/episodes"]');
  await expect(episodesLink).toBeVisible();
  await expect(episodesLink).toContainText('Episodes');

  const aboutLink = nav.locator('a[href="/about"]');
  await expect(aboutLink).toBeVisible();
  await expect(aboutLink).toContainText('About');
});

test('footer exists with copyright', async ({ page }) => {
  await page.goto('/');

  const footer = page.locator('footer');
  await expect(footer).toBeVisible();
  await expect(footer).toContainText('heis.fm');
});
