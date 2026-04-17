"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import type { ActionResult } from "@/types";

const InstagramSchema = z.object({
  title: z.string().min(2, "Título obrigatório"),
  description: z.string().default(""),
  instagramUrl: z.string().url("URL inválida"),
  imageUrl: z.string().url().optional().or(z.literal("")),
  captionOverride: z.string().optional().or(z.literal("")),
  categoryTags: z.array(z.string()).default([]),
  status: z.enum(["LIVE", "HIDDEN"]),
});

export type InstagramInput = z.infer<typeof InstagramSchema>;

export async function createInstagram(data: InstagramInput): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };

  const parsed = InstagramSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro de validação" };

  const { imageUrl, captionOverride, ...rest } = parsed.data;
  try {
    const post = await prisma.instagramPost.create({
      data: { ...rest, imageUrl: imageUrl || null, captionOverride: captionOverride || null },
    });
    revalidatePath("/admin/instagram");
    return { success: true, data: { id: post.id } };
  } catch {
    return { success: false, error: "Erro ao criar post." };
  }
}

export async function updateInstagram(id: string, data: InstagramInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };

  const parsed = InstagramSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro de validação" };

  const { imageUrl, captionOverride, ...rest } = parsed.data;
  try {
    await prisma.instagramPost.update({
      where: { id },
      data: { ...rest, imageUrl: imageUrl || null, captionOverride: captionOverride || null },
    });
    revalidatePath("/admin/instagram");
    return { success: true };
  } catch {
    return { success: false, error: "Erro ao atualizar post." };
  }
}

export async function deleteInstagram(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  try {
    await prisma.instagramPost.delete({ where: { id } });
    revalidatePath("/admin/instagram");
  } catch {
    return { success: false, error: "Erro ao excluir post." };
  }
  redirect("/admin/instagram");
}

export async function getInstagram(id: string) {
  return prisma.instagramPost.findUnique({ where: { id } });
}

export async function listInstagram() {
  return prisma.instagramPost.findMany({ orderBy: { dateAdded: "desc" } });
}
