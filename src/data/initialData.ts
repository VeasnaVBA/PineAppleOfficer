import { Article, MetricItem, Subscriber } from '../types';

export const initialMetrics: MetricItem[] = [
  {
    id: 1,
    label: '1.',
    title: "The Understated Charm of Jack Johnstone's Photography",
    date: '01.11.2026',
    value: '$148,290.00',
    change: '+14.2% MoM'
  },
  {
    id: 2,
    label: '2.',
    title: 'Photographer Drew Vickers Shoots The Spectrum Of Emotion',
    date: '17.01.2026',
    value: '24,819 Active',
    change: '+820 this week'
  },
  {
    id: 3,
    label: '3.',
    title: "The Understated Charm of Jack Johnstone's Photography",
    date: '08.03.2026',
    value: '99.98% Uptime',
    change: 'Vercel Edge 2.4'
  }
];

export const initialArticles: Article[] = [
  {
    id: 'art-1',
    title: 'Surreal Portraits Exploring Isolation By Ben Zank',
    subtitle: 'Photography, Conceptual',
    category: 'Photography, Concept',
    date: '08.03.2026',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    author: 'Ben Zank',
    views: 4820,
    likes: 312,
    status: 'Published',
    excerpt: 'Surreal geometric compositions captured in natural landscapes, reflecting the human psyche through stark isolation.',
    content: 'American photographer Ben Zank shot a series of surreal portraits exploring isolation, physical boundaries, and the silent tension between human emotion and stark environments.'
  },
  {
    id: 'art-2',
    title: 'The Art Of Waiting By Ignant Production',
    subtitle: 'Art, Conceptual',
    category: 'Art, Conceptual',
    date: '08.03.2026',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
    author: 'Ignant Studio',
    views: 6190,
    likes: 488,
    status: 'Featured',
    excerpt: 'A quiet photographic study on stillness, temporal suspension, and architectural contemplation.',
    content: 'Waiting as an active meditative state. This series examines how empty halls, subtle light shifts, and still silhouettes reveal the interior architecture of mindfulness.'
  },
  {
    id: 'art-3',
    title: 'Time Is Defined As The Indefinite Continued Progress',
    subtitle: 'Philosophy, Concept',
    category: 'Philosophy, Concept',
    date: '08.03.2026',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    author: 'Julian M.',
    views: 3420,
    likes: 215,
    status: 'Published',
    excerpt: 'A philosophical visual essay exploring the linear illusion of chronological progression.',
    content: 'Exploration into entropy, duration, and human perception. Through monochrome lighting and strict perspective, time appears frozen yet unyielding.'
  },
  {
    id: 'art-4',
    title: 'Brutalist Monoliths & Sacred Concrete Shadows',
    subtitle: 'Architecture, Structure',
    category: 'Architecture',
    date: '02.03.2026',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600',
    author: 'Elena Rostova',
    views: 5210,
    likes: 390,
    status: 'Published',
    excerpt: 'Post-modern brutalist monuments across eastern Europe photographed under heavy winter skies.',
    content: 'Concrete as poetry. Monolithic structures that carry historical weight while slicing light into geometric forms.'
  }
];

export const heroArticle: Article = {
  id: 'hero-1',
  title: 'Tacheles Reopens Its Doors For A Visually Stimulating Cinematic Exhibition',
  subtitle: 'Culture, Berlin Archival',
  category: 'Exhibition',
  date: '08.03.2026',
  imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=800',
  author: 'Karin Von Berg',
  views: 12956,
  likes: 874,
  status: 'Featured',
  excerpt: "As an impressive testament to Berlin's post-soviet era, the former iconic Kunsthaus Tacheles in the Berlin district of Mitte will reopen as a multi-disciplinary exhibition space dedicated to immersive photographic installations and cinematic retrospectives.",
  content: "As an impressive testament to Berlin's post-soviet era, the former iconic Kunsthaus Tacheles in the Berlin district of Mitte will reopen as a multi-disciplinary exhibition space dedicated to immersive photographic installations and cinematic retrospectives."
};

export const initialSubscribers: Subscriber[] = [
  {
    id: 'sub-1',
    name: 'Ben Zank',
    email: 'ben.zank@archive-tetrad.com',
    mobile: '+1 (212) 555-0192',
    tier: 'VIP',
    joinedDate: '12.01.2026',
    status: 'Active'
  },
  {
    id: 'sub-2',
    name: 'Drew Vickers',
    email: 'drew.vickers@spectrum.photo',
    mobile: '+44 20 7946 0912',
    tier: 'Collector',
    joinedDate: '15.01.2026',
    status: 'Active'
  },
  {
    id: 'sub-3',
    name: 'Jack Johnstone',
    email: 'j.johnstone@studio-curate.org',
    mobile: '+64 21 498 712',
    tier: 'Curator',
    joinedDate: '22.02.2026',
    status: 'Active'
  },
  {
    id: 'sub-4',
    name: 'Helena Berg',
    email: 'helena@tacheles-berlin.de',
    mobile: '+49 30 2894 110',
    tier: 'VIP',
    joinedDate: '01.03.2026',
    status: 'Active'
  },
  {
    id: 'sub-5',
    name: 'Marcus Vance',
    email: 'vance@monolith.press',
    mobile: '+1 (415) 890-2341',
    tier: 'Standard',
    joinedDate: '05.03.2026',
    status: 'Pending'
  }
];
