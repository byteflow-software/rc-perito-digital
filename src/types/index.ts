export type ArticleStatus = "DRAFT" | "SCHEDULED" | "PUBLISHED";
export type ContentStatus = "LIVE" | "PENDING" | "HIDDEN";
export type BookStatus = "SHOW" | "HIDE";

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
  status: ArticleStatus;
  viewsCount: number;
  readingTime: number;
  scheduledAt: Date | null;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Short {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  thumbnailUrl: string | null;
  categoryTags: string[];
  status: ContentStatus;
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
  status: ContentStatus;
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
  socialLinks: {
    linkedin?: string;
    instagram?: string;
    youtube?: string;
    x?: string;
    facebook?: string;
  };
  logoUrl: string | null;
  faviconUrl: string | null;
  contactEmail: string | null;
  timezone: string;
  maintenanceMode: boolean;
  updatedAt: Date;
}
