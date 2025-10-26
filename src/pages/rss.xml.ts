import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { RSS_FEED_URL } from '../config';
import { parseRssFeed } from '../utils/rss';

export async function GET(context: APIContext) {
  const episodes = await parseRssFeed(RSS_FEED_URL);

  return rss({
    title: 'heis.fm',
    description: 'En podcast om teknologiledelse av Truls Jørgensen og Audun Fauchald Strand',
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
    customData: `<language>nb-no</language>`,
  });
}
