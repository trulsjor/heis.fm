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
