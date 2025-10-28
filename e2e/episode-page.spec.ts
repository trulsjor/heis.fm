import { test, expect } from '@playwright/test';

test('episode page loads and displays episode 0', async ({ page }) => {
  await page.goto('/episode/0');

  // Check page title contains episode number
  await expect(page).toHaveTitle(/Episode 0.*heis\.fm/i);

  // Check episode number badge
  const episodeNumber = page.locator('span:has-text("#0")');
  await expect(episodeNumber).toBeVisible();

  // Check heading exists
  const main = page.locator('main');
  const heading = main.locator('h1').first();
  await expect(heading).toBeVisible();
});

test('episode page has audio player', async ({ page }) => {
  await page.goto('/episode/0');

  // Check for audio element
  const audio = page.locator('audio');
  await expect(audio).toBeVisible();

  // Check audio has controls
  await expect(audio).toHaveAttribute('controls');

  // Check audio has source
  const source = audio.locator('source');
  await expect(source).toHaveAttribute('src');
});

test('episode page has navigation', async ({ page }) => {
  await page.goto('/episode/1');

  // Check for "All episodes" link
  const allEpisodesLink = page.locator('a:has-text("Alle episoder")');
  await expect(allEpisodesLink).toBeVisible();
  await expect(allEpisodesLink).toHaveAttribute('href', '/episodes');

  // Check for previous episode link
  const prevLink = page.locator('a:has-text("Forrige")');
  await expect(prevLink).toBeVisible();
  await expect(prevLink).toHaveAttribute('href', '/episode/0');

  // Check for next episode link (if not the latest)
  const nextLink = page.locator('a:has-text("Neste")');
  if (await nextLink.count() > 0) {
    await expect(nextLink).toHaveAttribute('href', '/episode/2');
  }
});

test('episode 0 does not have previous link', async ({ page }) => {
  await page.goto('/episode/0');

  // Should not have "previous episode" link
  const prevLink = page.locator('a:has-text("Forrige")');
  await expect(prevLink).not.toBeVisible();
});

test('episode card links to episode page', async ({ page }) => {
  await page.goto('/');

  // Find first episode card
  const firstCard = page.locator('[data-testid="episode-card"]').first();
  await expect(firstCard).toBeVisible();

  // Click the episode title link
  const titleLink = firstCard.locator('h3 a');
  await expect(titleLink).toBeVisible();

  // Get the href and verify it's an episode page
  const href = await titleLink.getAttribute('href');
  expect(href).toMatch(/^\/episode\/\d+$/);
});

test('episode 3 description has formatted lists and links', async ({ page }) => {
  await page.goto('/episode/3');

  // Find the description container
  const description = page.locator('.prose');
  await expect(description).toBeVisible();

  // Check for bullet list items
  const listItems = description.locator('ul li');
  const listItemCount = await listItems.count();
  expect(listItemCount).toBeGreaterThan(0);

  // Check for links in the description
  const links = description.locator('a');
  const linkCount = await links.count();
  expect(linkCount).toBeGreaterThan(0);

  // Check link styling - should have pink color
  const firstLink = links.first();
  const linkColor = await firstLink.evaluate((el) => {
    return window.getComputedStyle(el).color;
  });

  // Check that links have underline
  const textDecoration = await firstLink.evaluate((el) => {
    return window.getComputedStyle(el).textDecoration;
  });
  expect(textDecoration).toContain('underline');

  // Check list has proper list-style
  const list = description.locator('ul').first();
  const listStyle = await list.evaluate((el) => {
    return window.getComputedStyle(el).listStyleType;
  });
  expect(listStyle).toBe('disc');
});

test('episode 3 has subtitle', async ({ page }) => {
  await page.goto('/episode/3');

  // Check for subtitle
  const subtitle = page.locator('p.text-xl.text-gray-400');
  await expect(subtitle).toBeVisible();
  await expect(subtitle).toHaveText('Å lede uten tittel');
});
