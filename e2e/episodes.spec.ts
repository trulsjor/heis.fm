import { test, expect } from '@playwright/test';

test('episodes page loads and displays title', async ({ page }) => {
  await page.goto('/episodes');

  // Check page title
  await expect(page).toHaveTitle(/Episodes.*heis\.fm/i);

  // Check heading in main content
  const main = page.locator('main');
  const heading = main.locator('h1').first();
  await expect(heading).toContainText(/Episodes/i);
});

test('episodes page displays episode cards', async ({ page }) => {
  await page.goto('/episodes');

  // Check that episode cards are visible
  const episodeCards = page.locator('[data-testid="episode-card"]');
  await expect(episodeCards.first()).toBeVisible();

  // Should have at least 1 episode
  const count = await episodeCards.count();
  expect(count).toBeGreaterThanOrEqual(1);
});

test('episodes page has working navigation', async ({ page }) => {
  await page.goto('/episodes');

  // Check navigation exists
  const nav = page.locator('nav');
  await expect(nav).toBeVisible();

  // Check home link
  const homeLink = nav.locator('a[href="/"]');
  await expect(homeLink).toBeVisible();
});

test('episode cards have audio player', async ({ page }) => {
  await page.goto('/episodes');

  // Get first episode card
  const firstCard = page.locator('[data-testid="episode-card"]').first();
  await expect(firstCard).toBeVisible();

  // Check for audio element
  const audio = firstCard.locator('audio');
  await expect(audio).toBeVisible();

  // Check audio has controls
  await expect(audio).toHaveAttribute('controls');

  // Check audio has source
  const source = audio.locator('source');
  await expect(source).toHaveAttribute('src');
});
