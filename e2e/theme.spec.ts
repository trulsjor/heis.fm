import { test, expect } from '@playwright/test';

test('homepage has heis.fm color scheme', async ({ page }) => {
  await page.goto('/');

  const body = page.locator('body');

  // Check background is black
  const bgColor = await body.evaluate((el) =>
    window.getComputedStyle(el).backgroundColor
  );
  expect(bgColor).toBe('rgb(0, 0, 0)'); // #000000

  // Check text is white
  const color = await body.evaluate((el) =>
    window.getComputedStyle(el).color
  );
  expect(color).toBe('rgb(255, 255, 255)'); // #ffffff
});

test('pink accent color is available', async ({ page }) => {
  await page.goto('/');

  // Check if we can apply pink color class
  const testDiv = await page.evaluate(() => {
    const div = document.createElement('div');
    div.className = 'text-pink';
    document.body.appendChild(div);
    const color = window.getComputedStyle(div).color;
    div.remove();
    return color;
  });

  // Should be bright pink #F472B6 = rgb(244, 114, 182)
  expect(testDiv).toBe('rgb(244, 114, 182)');
});
