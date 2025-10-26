# heis.fm Website Build Plan

## Design System

### Colors
- **Background:** `#000000` (black)
- **Text:** `#FFFFFF` (white)
- **Primary Accent:** `#F472B6` (bright pink from logo)
- **Hover State:** `#FB7BBD` (lighter pink)
- **Secondary:** `#9CA3AF` (gray for metadata)

### Typography
- Modern sans-serif (Inter or similar)
- High contrast for readability

### Style
- Minimalist, clean, high contrast
- Focus on content and listenability

---

## Site Structure

### Pages
1. **Homepage** (`/`) - Hero, latest episodes, hosts
2. **Episodes** (`/episodes`) - Full archive with filters
3. **About** (`/about`) - Podcast & host info
4. **RSS Feed** (`/rss.xml`) - Podcast feed

---

## Implementation Phases

### Phase 1: Design Foundation

- [x] 1.1 Move cover.jpeg to public folder
- [x] 1.2 Configure Tailwind with custom color palette
- [x] 1.3 Add Inter font (or similar)
- [x] 1.4 Update global.css with base styles
- [x] 1.5 Create base Layout component with navigation
- [x] 1.6 Add favicon using podcast branding

### Phase 2: Homepage

- [x] 2.1 Create hero section with cover image
- [x] 2.2 Add podcast title and tagline
- [x] 2.3 Build "Latest Episodes" section component
- [x] 2.4 Add subscribe/listen buttons (placeholder links)
- [ ] 2.5 Create hosts section with photos and bios
- [x] 2.6 Add footer with social links (footer exists in Layout)

### Phase 3: Episode System

- [ ] 3.1 Create content collection for episodes
- [ ] 3.2 Define episode schema (title, date, description, audio URL, duration)
- [ ] 3.3 Add 2-3 sample episodes (mock data)
- [ ] 3.4 Create EpisodeCard component
- [ ] 3.5 Build /episodes page with episode list
- [ ] 3.6 Add basic audio player component
- [ ] 3.7 Create individual episode page template

### Phase 4: About Page

- [ ] 4.1 Create /about page structure
- [ ] 4.2 Add podcast description
- [ ] 4.3 Add detailed host bios for Truls and Audun
- [ ] 4.4 Add contact information
- [ ] 4.5 Include social media links

### Phase 5: RSS Feed

- [ ] 5.1 Install @astrojs/rss package
- [ ] 5.2 Create RSS feed endpoint
- [ ] 5.3 Map episode content to RSS format
- [ ] 5.4 Add podcast-specific RSS tags (iTunes, Spotify)
- [ ] 5.5 Test RSS feed validation

### Phase 6: Polish & Optimization

- [ ] 6.1 Add meta tags for SEO
- [ ] 6.2 Create Open Graph images
- [ ] 6.3 Generate sitemap
- [ ] 6.4 Test responsive design (mobile, tablet, desktop)
- [ ] 6.5 Optimize images
- [ ] 6.6 Add loading states and animations
- [ ] 6.7 Accessibility audit (ARIA labels, keyboard navigation)

### Phase 7: Deployment

- [ ] 7.1 Test production build locally
- [ ] 7.2 Create statichost.eu account
- [ ] 7.3 Configure deployment settings
- [ ] 7.4 Push to git repository
- [ ] 7.5 Connect repo to statichost.eu
- [ ] 7.6 Verify live deployment
- [ ] 7.7 Set up custom domain (if applicable)

---

## Notes

- Hosts: **Truls Jørgensen** & **Audun Fauchald Strand**
- Hosting: statichost.eu (EU-based, GDPR-compliant)
- Framework: Astro + TypeScript + Tailwind CSS
