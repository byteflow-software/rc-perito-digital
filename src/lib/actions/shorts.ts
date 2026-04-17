"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import type { ActionResult } from "@/types";

const ShortSchema = z.object({
  title: z.string().min(2, "Título obrigatório"),
  description: z.string().default(""),
  youtubeUrl: z.string().url("URL inválida"),
  thumbnailUrl: z.string().url().optional().or(z.literal("")),
  categoryTags: z.array(z.string()).default([]),
  status: z.enum(["LIVE", "HIDDEN"]),
});

export type ShortInput = z.infer<typeof ShortSchema>;

export async function createShort(data: ShortInput): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };

  const parsed = ShortSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro de validação" };

  const { thumbnailUrl, ...rest } = parsed.data;
  try {
    const short = await prisma.short.create({
      data: { ...rest, thumbnailUrl: thumbnailUrl || null },
    });
    revalidatePath("/admin/shorts");
    return { success: true, data: { id: short.id } };
  } catch {
    return { success: false, error: "Erro ao criar short." };
  }
}

export async function updateShort(id: string, data: ShortInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };

  const parsed = ShortSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro de validação" };

  const { thumbnailUrl, ...rest } = parsed.data;
  try {
    await prisma.short.update({ where: { id }, data: { ...rest, thumbnailUrl: thumbnailUrl || null } });
    revalidatePath("/admin/shorts");
    return { success: true };
  } catch {
    return { success: false, error: "Erro ao atualizar short." };
  }
}

export async function deleteShort(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  try {
    await prisma.short.delete({ where: { id } });
    revalidatePath("/admin/shorts");
  } catch {
    return { success: false, error: "Erro ao excluir short." };
  }
  redirect("/admin/shorts");
}

export async function getShort(id: string) {
  return prisma.short.findUnique({ where: { id } });
}

export async function listShorts() {
  return prisma.short.findMany({ orderBy: { dateAdded: "desc" } });
}
