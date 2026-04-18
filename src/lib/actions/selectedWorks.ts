"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import type { ActionResult } from "@/types";

const SelectedWorkSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  type: z.string().default("Documento"),
  author: z.string().default(""),
  url: z.string().url(),
  previewUrl: z.string().url().optional().or(z.literal("")),
  displayOrder: z.number().int().default(0),
});

export type SelectedWorkInput = z.infer<typeof SelectedWorkSchema>;

export async function createSelectedWork(data: SelectedWorkInput): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = SelectedWorkSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro" };
  const item = await prisma.selectedWork.create({
    data: { ...parsed.data, previewUrl: parsed.data.previewUrl || null },
  });
  revalidatePath("/admin/selected-works");
  revalidatePath("/artigos");
  return { success: true, data: { id: item.id } };
}

export async function updateSelectedWork(id: string, data: SelectedWorkInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = SelectedWorkSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro" };
  await prisma.selectedWork.update({
    where: { id },
    data: { ...parsed.data, previewUrl: parsed.data.previewUrl || null },
  });
  revalidatePath("/admin/selected-works");
  revalidatePath("/artigos");
  return { success: true };
}

export async function deleteSelectedWork(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  await prisma.selectedWork.delete({ where: { id } });
  revalidatePath("/admin/selected-works");
  revalidatePath("/artigos");
  return { success: true };
}

export async function getSelectedWork(id: string) {
  return prisma.selectedWork.findUnique({ where: { id } });
}

export async function listSelectedWorks() {
  return prisma.selectedWork.findMany({ orderBy: { displayOrder: "asc" } });
}
