"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { slugify, calculateReadingTime } from "@/lib/utils";
import { ensureTagsByNames } from "./tags";
import type { ActionResult } from "@/types";

const ArtigoSchema = z.object({
  title: z.string().min(3, "Título muito curto"),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, "Slug: apenas letras minúsculas, números e hífens"),
  excerpt: z.string().min(10, "Resumo muito curto").max(500, "Resumo muito longo"),
  content: z.string().min(1, "Conteúdo obrigatório"),
  category: z.string().default("osint"),
  tagNames: z.array(z.string()).default([]),
  featuredImage: z.string().url("URL inválida").optional().or(z.literal("")),
  featuredImageAlt: z.string().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  status: z.enum(["DRAFT", "SCHEDULED", "PUBLISHED", "ARCHIVED"]),
  scheduledAt: z.string().optional().or(z.literal("")),
  author: z.string().default("Romullo Carvalho"),
  seoKeywords: z.array(z.string()).default([]),
  metaTitle: z.string().max(70).optional().or(z.literal("")),
  metaDescription: z.string().max(160).optional().or(z.literal("")),
});

export type ArtigoInput = z.infer<typeof ArtigoSchema>;

function toDate(val?: string): Date | null {
  if (!val) return null;
  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d;
}

export async function createArtigo(data: ArtigoInput): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };

  const parsed = ArtigoSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro de validação" };

  const { tagNames, featuredImage, featuredImageAlt, metaTitle, metaDescription, scheduledAt, content, ...rest } = parsed.data;
  const tagIds = await ensureTagsByNames(tagNames);
  const readingTime = calculateReadingTime(content);

  try {
    const artigo = await prisma.article.create({
      data: {
        ...rest,
        content,
        readingTime,
        featuredImage: featuredImage || null,
        featuredImageAlt: featuredImageAlt || null,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        scheduledAt: toDate(scheduledAt),
        publishedAt: rest.status === "PUBLISHED" ? new Date() : null,
        tags: { connect: tagIds.map((id) => ({ id })) },
      },
    });
    revalidatePath("/artigos");
    revalidatePath("/admin/blog");
    return { success: true, data: { id: artigo.id } };
  } catch (e: unknown) {
    if ((e as { code?: string }).code === "P2002") return { success: false, error: "Este slug já está em uso." };
    return { success: false, error: "Erro ao criar artigo." };
  }
}

export async function updateArtigo(id: string, data: ArtigoInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };

  const parsed = ArtigoSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro de validação" };

  const { tagNames, featuredImage, featuredImageAlt, metaTitle, metaDescription, scheduledAt, content, ...rest } = parsed.data;
  const tagIds = await ensureTagsByNames(tagNames);
  const readingTime = calculateReadingTime(content);

  const existing = await prisma.article.findUnique({ where: { id }, select: { publishedAt: true, status: true } });
  const publishedAt =
    rest.status === "PUBLISHED" && existing?.status !== "PUBLISHED"
      ? new Date()
      : existing?.publishedAt ?? null;

  try {
    await prisma.article.update({
      where: { id },
      data: {
        ...rest,
        content,
        readingTime,
        featuredImage: featuredImage || null,
        featuredImageAlt: featuredImageAlt || null,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        scheduledAt: toDate(scheduledAt),
        publishedAt,
        tags: { set: tagIds.map((id) => ({ id })) },
      },
    });
    revalidatePath("/artigos");
    revalidatePath(`/artigos/${data.slug}`);
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (e: unknown) {
    if ((e as { code?: string }).code === "P2002") return { success: false, error: "Este slug já está em uso." };
    return { success: false, error: "Erro ao atualizar artigo." };
  }
}

export async function deleteArtigo(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };

  try {
    await prisma.article.delete({ where: { id } });
    revalidatePath("/artigos");
    revalidatePath("/admin/blog");
  } catch {
    return { success: false, error: "Erro ao excluir artigo." };
  }
  redirect("/admin/blog");
}

export async function getArtigo(id: string) {
  return prisma.article.findUnique({
    where: { id },
    include: { tags: true },
  });
}

export async function listArtigos() {
  return prisma.article.findMany({
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      status: true,
      featured: true,
      publishedAt: true,
      updatedAt: true,
      viewsCount: true,
    },
  });
}
