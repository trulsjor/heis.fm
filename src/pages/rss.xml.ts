import rss from '@astrojs/rss';
import { parseRssFeed } from '../utils/rss';
import type { APIContext } from 'astro';

const RSS_FEED_URL = 'https://feeds.acast.com/public/shows/68d8f5fdacc34956e6156eec';

export async function GET(context: APIContext) {
  const episodes = await parseRssFeed(RSS_FEED_URL);

  return rss({
    title: 'heis.fm',
    description: 'A podcast by Truls Jørgensen and Audun Fauchald Strand',
    site: context.site || 'https://heis.fm',
    items: episodes.map((episode) => ({
      title: episode.title,
      description: episode.description,
      pubDate: new Date(episode.pubDate),
      link: episode.link || episode.audioUrl,
      enclosure: episode.audioUrl ? {
        url: episode.audioUrl,
        type: 'audio/mpeg',
        length: 0, // Length is optional but RSS spec requires it
      } : undefined,
    })),
    customData: `<language>en-us</language>`,
  });
}
