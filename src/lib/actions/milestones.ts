"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import type { ActionResult } from "@/types";

const MilestoneSchema = z.object({
  year: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  displayOrder: z.number().int().default(0),
});

export type MilestoneInput = z.infer<typeof MilestoneSchema>;

export async function createMilestone(data: MilestoneInput): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = MilestoneSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro" };
  const item = await prisma.milestone.create({ data: parsed.data });
  revalidatePath("/admin/timeline");
  revalidatePath("/sobre");
  return { success: true, data: { id: item.id } };
}

export async function updateMilestone(id: string, data: MilestoneInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = MilestoneSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro" };
  await prisma.milestone.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/timeline");
  revalidatePath("/sobre");
  return { success: true };
}

export async function deleteMilestone(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  await prisma.milestone.delete({ where: { id } });
  revalidatePath("/admin/timeline");
  revalidatePath("/sobre");
  return { success: true };
}

export async function getMilestone(id: string) {
  return prisma.milestone.findUnique({ where: { id } });
}

export async function listMilestones() {
  return prisma.milestone.findMany({ orderBy: { displayOrder: "asc" } });
}
