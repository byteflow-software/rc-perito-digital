export type ActionResult<T = undefined> =
  | { success: true; data?: T }
  | { success: false; error: string };

export type ArticleStatus = "DRAFT" | "SCHEDULED" | "PUBLISHED" | "ARCHIVED";
export type MediaStatus = "LIVE" | "HIDDEN";
export type BookStatus = "SHOW" | "HIDDEN";

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string | null;
  featuredImageAlt: string | null;
  category: string;
  seoKeywords: string[];
  metaTitle: string | null;
  metaDescription: string | null;
  author: string;
  featured: boolean;
  status: ArticleStatus;
  viewsCount: number;
  readingTime: number;
  scheduledAt: Date | null;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  tags?: { id: string; name: string; slug: string }[];
}

export interface Short {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  thumbnailUrl: string | null;
  categoryTags: string[];
  status: MediaStatus;
  dateAdded: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface InstagramPost {
  id: string;
  title: string;
  description: string;
  instagramUrl: string;
  imageUrl: string | null;
  captionOverride: string | null;
  categoryTags: string[];
  status: MediaStatus;
  dateAdded: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string | null;
  affiliateLink: string | null;
  category: string;
  description: string;
  showOnHomepage: boolean;
  status: BookStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SiteConfig {
  id: string;
  siteTitle: string;
  metaDescription: string;
  primaryKeywords: string[];
  googleAnalyticsId: string | null;
  socialLinks: Record<string, string>;
  logoUrl: string | null;
  faviconUrl: string | null;
  contactEmail: string | null;
  whatsapp: string | null;
  timezone: string;
  maintenanceMode: boolean;
  updatedAt: Date;
}

export interface PageSeo {
  id: string;
  pageKey: string;
  title: string;
  description: string;
  ogTitle: string | null;
  ogDesc: string | null;
  noIndex: boolean;
  updatedAt: Date;
}
