"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import type { ActionResult } from "@/types";

const LanguageSchema = z.object({
  name: z.string().min(1),
  level: z.string().min(1),
  skills: z.string().default(""),
  percentage: z.number().int().min(0).max(100).default(0),
  displayOrder: z.number().int().default(0),
});

export type LanguageInput = z.infer<typeof LanguageSchema>;

export async function createLanguage(data: LanguageInput): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = LanguageSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro" };
  const item = await prisma.spokenLanguage.create({ data: parsed.data });
  revalidatePath("/admin/languages");
  revalidatePath("/sobre");
  return { success: true, data: { id: item.id } };
}

export async function updateLanguage(id: string, data: LanguageInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = LanguageSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro" };
  await prisma.spokenLanguage.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/languages");
  revalidatePath("/sobre");
  return { success: true };
}

export async function deleteLanguage(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  await prisma.spokenLanguage.delete({ where: { id } });
  revalidatePath("/admin/languages");
  revalidatePath("/sobre");
  return { success: true };
}

export async function getLanguage(id: string) {
  return prisma.spokenLanguage.findUnique({ where: { id } });
}

export async function listLanguages() {
  return prisma.spokenLanguage.findMany({ orderBy: { displayOrder: "asc" } });
}
