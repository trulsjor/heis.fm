import { test, expect } from '@playwright/test';

test('about page loads and displays title', async ({ page }) => {
  await page.goto('/about');

  // Check page title
  await expect(page).toHaveTitle(/About.*heis\.fm/i);

  // Check heading
  const main = page.locator('main');
  const heading = main.locator('h1').first();
  await expect(heading).toContainText(/About/i);
});

test('about page displays podcast description', async ({ page }) => {
  await page.goto('/about');

  // Check for podcast description section
  const main = page.locator('main');
  await expect(main).toContainText(/podcast/i);
});

test('about page displays both hosts', async ({ page }) => {
  await page.goto('/about');

  // Check for hosts section
  const hostsSection = page.locator('[data-testid="hosts-section"]');
  await expect(hostsSection).toBeVisible();

  // Check both host names
  await expect(hostsSection.getByText('Truls Jørgensen')).toBeVisible();
  await expect(hostsSection.getByText('Audun Fauchald Strand')).toBeVisible();
});

test('about page has working navigation', async ({ page }) => {
  await page.goto('/about');

  // Check navigation exists
  const nav = page.locator('nav');
  await expect(nav).toBeVisible();

  // Check home link
  const homeLink = nav.locator('a[href="/"]');
  await expect(homeLink).toBeVisible();
});
