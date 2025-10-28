import Parser from 'rss-parser';

export interface Episode {
  title: string;
  subtitle?: string;
  description: string;
  pubDate: string;
  audioUrl: string;
  duration?: string;
  link?: string;
  episodeNumber?: number;
  imageUrl?: string;
}

/**
 * Convert plain text URLs to clickable HTML links
 */
function linkifyUrls(text: string): string {
  // Regex to match URLs that aren't already in anchor tags
  const urlRegex = /(?<!href=["'])(?<!src=["'])(https?:\/\/[^\s<>"]+)/gi;

  return text.replace(urlRegex, (url) => {
    // Clean up URL if it ends with punctuation that's likely not part of the URL
    const cleanUrl = url.replace(/[.,;!?]+$/, '');
    return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer">${cleanUrl}</a>`;
  });
}

const parser = new Parser({
  customFields: {
    item: [
      ['itunes:episode', 'itunesEpisode'],
      ['itunes:image', 'itunesImage'],
      ['itunes:subtitle', 'itunesSubtitle'],
    ],
  },
});

export async function parseRssFeed(feedUrl: string): Promise<Episode[]> {
  const feed = await parser.parseURL(feedUrl);

  return feed.items.map((item: any) => {
    const rawDescription = item['content:encoded'] || item.content || item.contentSnippet || '';
    const description = linkifyUrls(rawDescription);

    return {
      title: item.title || '',
      subtitle: item.itunesSubtitle || item.itunes?.subtitle || undefined,
      description,
      pubDate: item.pubDate || item.isoDate || '',
      audioUrl: item.enclosure?.url || '',
      duration: item.itunes?.duration || undefined,
      link: item.link || undefined,
      episodeNumber: item.itunesEpisode ? parseInt(item.itunesEpisode) : undefined,
      imageUrl: item.itunesImage?.$ ? item.itunesImage.$.href : undefined,
    };
  });
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
