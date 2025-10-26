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

  // Check for tagline/description within hero section
  const description = hero.getByText(/Truls.*Audun/i);
  await expect(description).toBeVisible();
});

test('homepage displays latest episodes section', async ({ page }) => {
  await page.goto('/');

  // Check for latest episodes section
  const latestEpisodesSection = page.locator('[data-testid="latest-episodes"]');
  await expect(latestEpisodesSection).toBeVisible();

  // Check section has heading
  const heading = latestEpisodesSection.locator('h2');
  await expect(heading).toContainText(/Latest Episodes/i);

  // Check at least one episode card is visible
  const episodeCards = page.locator('[data-testid="episode-card"]');
  await expect(episodeCards.first()).toBeVisible();

  // Check episode card has required elements
  const firstCard = episodeCards.first();
  await expect(firstCard.locator('h3')).toBeVisible(); // title
  await expect(firstCard.locator('time')).toBeVisible(); // date
});
