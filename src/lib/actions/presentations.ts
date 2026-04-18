"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import type { ActionResult } from "@/types";

const PresentationSchema = z.object({
  event: z.string().min(1),
  year: z.string().min(1),
  url: z.string().url().optional().or(z.literal("")),
  displayOrder: z.number().int().default(0),
});

export type PresentationInput = z.infer<typeof PresentationSchema>;

export async function createPresentation(data: PresentationInput): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = PresentationSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro" };
  const item = await prisma.presentation.create({
    data: { ...parsed.data, url: parsed.data.url || null },
  });
  revalidatePath("/admin/presentations");
  revalidatePath("/sobre");
  return { success: true, data: { id: item.id } };
}

export async function updatePresentation(id: string, data: PresentationInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = PresentationSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro" };
  await prisma.presentation.update({
    where: { id },
    data: { ...parsed.data, url: parsed.data.url || null },
  });
  revalidatePath("/admin/presentations");
  revalidatePath("/sobre");
  return { success: true };
}

export async function deletePresentation(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  await prisma.presentation.delete({ where: { id } });
  revalidatePath("/admin/presentations");
  revalidatePath("/sobre");
  return { success: true };
}

export async function getPresentation(id: string) {
  return prisma.presentation.findUnique({ where: { id } });
}

export async function listPresentations() {
  return prisma.presentation.findMany({ orderBy: { displayOrder: "asc" } });
}
