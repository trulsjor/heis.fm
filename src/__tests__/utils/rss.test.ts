import { describe, it, expect } from 'vitest';
import { RSS_FEED_URL } from '../../config';
import type { Episode } from '../../utils/rss';
import { addEpisodeNumbers } from '../../utils/rss';

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

  it('should assign sequential numbers starting from the oldest episode', () => {
    const episodes: Episode[] = [
      {
        title: 'Newest',
        description: '',
        pubDate: '2024-01-03',
        audioUrl: 'https://example.com/newest.mp3',
      },
      {
        title: 'Middle',
        description: '',
        pubDate: '2024-01-02',
        audioUrl: 'https://example.com/middle.mp3',
      },
      {
        title: 'Oldest',
        description: '',
        pubDate: '2024-01-01',
        audioUrl: 'https://example.com/oldest.mp3',
      },
    ];

    const numberedEpisodes = addEpisodeNumbers(episodes);

    expect(numberedEpisodes.map((episode) => episode.episodeNumber)).toEqual([2, 1, 0]);
    expect(numberedEpisodes[2].title).toBe('Oldest');
    expect(numberedEpisodes[2].episodeNumber).toBe(0);
  });
});
