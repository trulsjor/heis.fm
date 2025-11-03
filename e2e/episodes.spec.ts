import { test, expect } from '@playwright/test';

test('episodes page loads and displays title', async ({ page }) => {
  await page.goto('/episodes');

  // Check page title (in Norwegian)
  await expect(page).toHaveTitle(/Episoder.*heis\.fm/i);

  // Check heading in main content (in Norwegian)
  const main = page.locator('main');
  const heading = main.locator('h1').first();
  await expect(heading).toContainText(/Alle episoder/i);
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

test('episode cards display content', async ({ page }) => {
  await page.goto('/episodes');

  // Get first episode card
  const firstCard = page.locator('[data-testid="episode-card"]').first();
  await expect(firstCard).toBeVisible();

  // Check that card has episode title
  const title = firstCard.locator('h3');
  await expect(title).toBeVisible();

  // Check that card has episode number
  const episodeNumber = firstCard.locator('[data-testid="episode-number"]');
  await expect(episodeNumber).toBeVisible();
});
