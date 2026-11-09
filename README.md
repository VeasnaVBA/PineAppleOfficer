# TETRAD — Editorial & Media Administration System

A curatorial, neo-brutalist admin dashboard inspired by classic high-contrast print editorial design, archival newspapers, and contemporary art curation.

![Theme Preview](https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800)

---

## ✦ Key Aesthetics & Design Philosophy

- **Warm Parchment Canvas**: Handcrafted paper tones (`#ded5be` canvas, `#ede5cf` surfaces) recreating vintage print magazines and newsprint stock.
- **Hairline Brutalist Grid**: Strict `1px` and `2px` ink-black borders (`#111111`) structuring sections into an editorial layout.
- **Classic Editorial Typography**:
  - `Bodoni Moda` & `Playfair Display` for headlines, drop-caps, and mastheads.
  - `Cormorant Garamond` for long-form essays and curatorial descriptions.
  - `Space Mono` for archival timestamps, metrics, badges, and system telemetry.
  - `Inter` for functional micro-copy and clean legibility.
- **Monochrome Curatorial Imagery**: High-contrast black and white photography featuring surrealist portraits, architectural studies, and cinematic silhouettes.
- **Tactile Paper Interaction**: Underline input fields, drop-cap lead paragraphs, and interactive endorsement counters.

---

## ✦ Functional Features

1. **Top Ticker**: Metric counters displaying real-time revenue, active readers, and edge uptime.
2. **Editorial Cards**: 3 featured publications with dark top headers, tags, and quick admin overlays (Edit, Feature, Delete).
3. **Bottom Curatorial Essay**: Classic editorial section with giant drop-cap "A", tabbed views (Essay, Telemetry, Git Audit), and an interactive **231** endorsement counter.
4. **Right Rail Spotlight & Dispatch**:
   - Hero exhibition card (*Kunsthaus Tacheles*).
   - "Subscribe Now" form with underline inputs that dispatches toasts and collects patrons.
5. **Full Admin CMS**:
   - Create, edit, feature, and archive articles.
   - Interactive search and category filters.
6. **Analytics & Audience Telemetry**:
   - Readership velocity chart.
   - Geographic distribution (Berlin, New York, London, Tokyo, Paris).
7. **Patron & Subscriber CRM**:
   - Registered patrons ledger with tier tracking (VIP, Collector, Curator).
   - Export CSV capability.
8. **Curatorial Media Vault**:
   - High-contrast photographic plates gallery.

---

## ✦ Quick Start

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## ✦ Hosting to Vercel

This repository includes a preconfigured `vercel.json` optimized for single-page applications.

### Option 1: Automatic Deployment via GitHub (Recommended)
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: TETRAD Admin Dashboard"
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new) and select your GitHub repository.
3. Keep default settings (Framework: **Vite**, Build Command: `npm run build`, Output Directory: `dist`).
4. Click **Deploy**.

### Option 2: Direct CLI Deployment
```bash
npx vercel
```
Follow the interactive prompts to link your Vercel account and deploy immediately to a production URL.

---

## ✦ Built With
- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Google Fonts](https://fonts.google.com/)
