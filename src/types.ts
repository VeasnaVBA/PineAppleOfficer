export interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  imageUrl: string;
  author: string;
  views: number;
  likes: number;
  status: 'Published' | 'Draft' | 'Featured' | 'Archived';
  excerpt: string;
  content?: string;
  slug?: string;
}

export interface MetricItem {
  id: number;
  label: string;
  title: string;
  date: string;
  value?: string;
  change?: string;
}

export interface Subscriber {
  id: string;
  name: string;
  email: string;
  mobile: string;
  tier: 'VIP' | 'Collector' | 'Curator' | 'Standard';
  joinedDate: string;
  status: 'Active' | 'Pending' | 'Unsubscribed';
}

export interface SystemNotification {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
  timestamp: string;
}
