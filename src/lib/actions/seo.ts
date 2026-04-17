"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import type { ActionResult } from "@/types";

const SeoSchema = z.object({
  pageKey: z.string(),
  title: z.string().min(5).max(70),
  description: z.string().min(10).max(160),
  ogTitle: z.string().max(70).optional().or(z.literal("")),
  ogDesc: z.string().max(160).optional().or(z.literal("")),
  noIndex: z.boolean().default(false),
});

export type SeoInput = z.infer<typeof SeoSchema>;

export async function saveSeo(data: SeoInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };

  const parsed = SeoSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro de validação" };

  const { pageKey, ogTitle, ogDesc, ...rest } = parsed.data;
  try {
    await prisma.pageSeo.upsert({
      where: { pageKey },
      update: { ...rest, ogTitle: ogTitle || null, ogDesc: ogDesc || null },
      create: { pageKey, ...rest, ogTitle: ogTitle || null, ogDesc: ogDesc || null },
    });
    revalidatePath("/");
    revalidatePath(`/${pageKey === "home" ? "" : pageKey}`);
    revalidatePath("/admin/seo");
    return { success: true };
  } catch {
    return { success: false, error: "Erro ao salvar SEO." };
  }
}

export async function listPageSeo() {
  return prisma.pageSeo.findMany({ orderBy: { pageKey: "asc" } });
}

export async function getPageSeo(pageKey: string) {
  return prisma.pageSeo.findUnique({ where: { pageKey } });
}
