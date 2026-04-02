import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  slug: z.string().min(1).optional(),
  content: z.string().min(1, "Conteúdo obrigatório"),
  excerpt: z.string().default(""),
  featuredImage: z.string().nullable().optional(),
  featuredImageAlt: z.string().nullable().optional(),
  category: z.string().default("osint"),
  seoKeywords: z.array(z.string()).default([]),
  metaTitle: z.string().nullable().optional(),
  metaDescription: z.string().nullable().optional(),
  status: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED"]).default("DRAFT"),
  scheduledAt: z.string().nullable().optional(),
});

export const shortSchema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  description: z.string().default(""),
  youtubeUrl: z.string().url("URL inválida"),
  thumbnailUrl: z.string().nullable().optional(),
  categoryTags: z.array(z.string()).default([]),
  status: z.enum(["LIVE", "PENDING", "HIDDEN"]).default("LIVE"),
});

export const instagramSchema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  description: z.string().default(""),
  instagramUrl: z.string().url("URL inválida"),
  imageUrl: z.string().nullable().optional(),
  captionOverride: z.string().nullable().optional(),
  categoryTags: z.array(z.string()).default([]),
  status: z.enum(["LIVE", "PENDING", "HIDDEN"]).default("LIVE"),
});

export const bookSchema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  author: z.string().min(1, "Autor obrigatório"),
  coverImage: z.string().nullable().optional(),
  affiliateLink: z.string().nullable().optional(),
  category: z.string().default("osint"),
  description: z.string().default(""),
  showOnHomepage: z.boolean().default(true),
  status: z.enum(["SHOW", "HIDE"]).default("SHOW"),
});

export const faqSchema = z.object({
  question: z.string().min(1, "Pergunta obrigatória"),
  answer: z.string().min(1, "Resposta obrigatória"),
  category: z.string().default("general"),
  displayOrder: z.number().int().default(0),
  published: z.boolean().default(true),
});

export const newsletterSchema = z.object({
  email: z.string().email("Email inválido"),
});

export const siteConfigSchema = z.object({
  siteTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  primaryKeywords: z.array(z.string()).optional(),
  googleAnalyticsId: z.string().nullable().optional(),
  socialLinks: z.record(z.string(), z.string()).optional(),
  logoUrl: z.string().nullable().optional(),
  faviconUrl: z.string().nullable().optional(),
  contactEmail: z.string().nullable().optional(),
  timezone: z.string().optional(),
  maintenanceMode: z.boolean().optional(),
});
