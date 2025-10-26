import { beforeAll, describe, expect, it } from 'vitest';
import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { Window } from 'happy-dom';

const projectRoot = process.cwd();
let document: Window['document'];
const globalBuildState = globalThis as typeof globalThis & { __ASTRO_BUILD_DONE__?: boolean };

describe('Homepage listen section', () => {
  beforeAll(() => {
    if (!globalBuildState.__ASTRO_BUILD_DONE__) {
      const indexPath = `${projectRoot}/dist/index.html`;
      if (!existsSync(indexPath)) {
        try {
          execSync('npm run build', { cwd: projectRoot, stdio: 'ignore' });
        } catch (error) {
          if (!existsSync(indexPath)) {
            throw error;
          }
        }
      }
      globalBuildState.__ASTRO_BUILD_DONE__ = true;
    }
    const html = readFileSync(`${projectRoot}/dist/index.html`, 'utf-8');
    const window = new Window();
    window.document.write(html);
    document = window.document;
  });

  it('renders a "Her finner du oss" heading', () => {
    const section = document.querySelector('[data-testid="listen-section"]');
    expect(section).not.toBeNull();
    const heading = section?.querySelector('h2');
    expect(heading).not.toBeNull();
    expect(heading?.textContent?.toLowerCase()).toContain('her finner du oss');
  });

  it('shows exactly six provider links with accessible labels and icons', () => {
    const section = document.querySelector('[data-testid="listen-section"]');
    expect(section).not.toBeNull();
    const links = Array.from(section!.querySelectorAll('a[data-provider]'));
    expect(links).toHaveLength(6);
    links.forEach((link) => {
      expect(link.getAttribute('aria-label')).toBeTruthy();
      const icon = link.querySelector('svg');
      expect(icon).not.toBeNull();
    });
  });
});
