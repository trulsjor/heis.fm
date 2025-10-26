import { test, expect } from '@playwright/test';

test('homepage has hero section with cover image', async ({ page }) => {
  await page.goto('/');

  // Check for hero section
  const hero = page.locator('[data-testid="hero"]');
  await expect(hero).toBeVisible();

  // Check cover image is displayed
  const coverImage = page.locator('img[src="/cover.jpeg"]');
  await expect(coverImage).toBeVisible();

  // Check alt text
  await expect(coverImage).toHaveAttribute('alt', /heis/i);
});

test('homepage has podcast title and tagline', async ({ page }) => {
  await page.goto('/');

  // Check for main heading within hero section
  const hero = page.locator('[data-testid="hero"]');
  const heading = hero.locator('h1');
  await expect(heading).toContainText('heis');

  // Check for tagline/description
  const description = page.getByText(/Truls.*Audun/i);
  await expect(description).toBeVisible();
});
