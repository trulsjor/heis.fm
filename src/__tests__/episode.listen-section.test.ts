import { beforeAll, describe, expect, it } from 'vitest';
import { execSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { Window } from 'happy-dom';

const projectRoot = process.cwd();
const episodePages: Array<{ number: string; document: Window['document'] }> = [];
const globalBuildState = globalThis as typeof globalThis & { __ASTRO_BUILD_DONE__?: boolean };

describe('Episode detail listen section', () => {
  beforeAll(() => {
    if (!globalBuildState.__ASTRO_BUILD_DONE__) {
      const indexPath = path.join(projectRoot, 'dist', 'index.html');
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
    const episodeDir = path.join(projectRoot, 'dist', 'episode');
    const entries = readdirSync(episodeDir).filter((entry) =>
      statSync(path.join(episodeDir, entry)).isDirectory()
    );

    entries.forEach((entry) => {
      const html = readFileSync(path.join(episodeDir, entry, 'index.html'), 'utf-8');
      const window = new Window();
      window.document.write(html);
      episodePages.push({ number: entry, document: window.document });
    });
  });

  it('renders the listen section on every episode page', () => {
    expect(episodePages.length).toBeGreaterThan(0);

    episodePages.forEach(({ number, document }) => {
      const section = document.querySelector('[data-testid="listen-section"]');
      expect(section, `missing listen section on episode ${number}`).not.toBeNull();
    });
  });
});
