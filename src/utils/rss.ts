import Parser from 'rss-parser';

export interface Episode {
  title: string;
  description: string;
  pubDate: string;
  audioUrl: string;
  duration?: string;
  link?: string;
  episodeNumber?: number;
  imageUrl?: string;
}

const parser = new Parser({
  customFields: {
    item: [
      ['itunes:episode', 'itunesEpisode'],
      ['itunes:image', 'itunesImage'],
    ],
  },
});

export async function parseRssFeed(feedUrl: string): Promise<Episode[]> {
  const feed = await parser.parseURL(feedUrl);

  return feed.items.map((item: any) => ({
    title: item.title || '',
    description: item.contentSnippet || item.content || '',
    pubDate: item.pubDate || item.isoDate || '',
    audioUrl: item.enclosure?.url || '',
    duration: item.itunes?.duration || undefined,
    link: item.link || undefined,
    episodeNumber: item.itunesEpisode ? parseInt(item.itunesEpisode) : undefined,
    imageUrl: item.itunesImage?.$ ? item.itunesImage.$.href : undefined,
  }));
}

/**
 * Add sequential episode numbers to episodes, starting from 0 for the oldest episode.
 * The RSS feed returns episodes in reverse chronological order (newest first).
 */
export function addEpisodeNumbers(episodes: Episode[]): Episode[] {
  // Reverse to get oldest first
  const reversed = [...episodes].reverse();

  // Add sequential numbers starting from 0
  return reversed.map((episode, index) => ({
    ...episode,
    episodeNumber: index,
  })).reverse(); // Reverse back to newest first
}
