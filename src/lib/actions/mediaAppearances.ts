"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import type { ActionResult } from "@/types";

const MediaAppearanceSchema = z.object({
  title: z.string().min(1),
  source: z.string().min(1),
  url: z.string().url(),
  type: z.enum(["TV", "ARTICLE", "INTERVIEW", "PODCAST", "PRESENTATION"]),
  displayOrder: z.number().int().default(0),
});

export type MediaAppearanceInput = z.infer<typeof MediaAppearanceSchema>;

export async function createMediaAppearance(data: MediaAppearanceInput): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = MediaAppearanceSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro" };
  const item = await prisma.mediaAppearance.create({ data: parsed.data });
  revalidatePath("/admin/media");
  revalidatePath("/");
  return { success: true, data: { id: item.id } };
}

export async function updateMediaAppearance(id: string, data: MediaAppearanceInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = MediaAppearanceSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro" };
  await prisma.mediaAppearance.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/media");
  revalidatePath("/");
  return { success: true };
}

export async function deleteMediaAppearance(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  await prisma.mediaAppearance.delete({ where: { id } });
  revalidatePath("/admin/media");
  revalidatePath("/");
  return { success: true };
}

export async function getMediaAppearance(id: string) {
  return prisma.mediaAppearance.findUnique({ where: { id } });
}

export async function listMediaAppearances() {
  return prisma.mediaAppearance.findMany({
    orderBy: [{ type: "asc" }, { displayOrder: "asc" }],
  });
}

export async function listMediaByType(type: "TV" | "ARTICLE" | "INTERVIEW" | "PODCAST" | "PRESENTATION") {
  return prisma.mediaAppearance.findMany({
    where: { type },
    orderBy: { displayOrder: "asc" },
  });
}
