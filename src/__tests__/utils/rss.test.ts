import { describe, it, expect } from 'vitest';
import { RSS_FEED_URL } from '../../config';

describe('RSS feed parser', () => {
  it('should fetch and parse the RSS feed', async () => {
    // This test will fail until we implement the parser
    const { parseRssFeed } = await import('../../utils/rss');

    const episodes = await parseRssFeed(RSS_FEED_URL);

    expect(episodes).toBeDefined();
    expect(Array.isArray(episodes)).toBe(true);
    expect(episodes.length).toBeGreaterThan(0);
  });

  it('should parse episode properties correctly', async () => {
    const { parseRssFeed } = await import('../../utils/rss');

    const episodes = await parseRssFeed(RSS_FEED_URL);
    const firstEpisode = episodes[0];

    expect(firstEpisode).toHaveProperty('title');
    expect(firstEpisode).toHaveProperty('description');
    expect(firstEpisode).toHaveProperty('pubDate');
    expect(firstEpisode).toHaveProperty('audioUrl');
    expect(firstEpisode).toHaveProperty('duration');

    expect(typeof firstEpisode.title).toBe('string');
    expect(firstEpisode.title.length).toBeGreaterThan(0);
  });
});
