import { describe, it, expect } from 'vitest';

const RSS_FEED_URL = 'https://feeds.acast.com/public/shows/68d8f5fdacc34956e6156eec';

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
