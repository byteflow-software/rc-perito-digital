"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import type { ActionResult } from "@/types";

const MissionValueSchema = z.object({
  icon: z.string().default("Shield"),
  title: z.string().min(1, "Título obrigatório"),
  description: z.string().min(1, "Descrição obrigatória"),
  displayOrder: z.number().int().default(0),
  active: z.boolean().default(true),
});

export type MissionValueInput = z.infer<typeof MissionValueSchema>;

export async function createMissionValue(data: MissionValueInput): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = MissionValueSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro de validação" };
  const item = await prisma.missionValue.create({ data: parsed.data });
  revalidatePath("/admin/mission-values");
  revalidatePath("/");
  return { success: true, data: { id: item.id } };
}

export async function updateMissionValue(id: string, data: MissionValueInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = MissionValueSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro de validação" };
  await prisma.missionValue.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/mission-values");
  revalidatePath("/");
  return { success: true };
}

export async function deleteMissionValue(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  await prisma.missionValue.delete({ where: { id } });
  revalidatePath("/admin/mission-values");
  revalidatePath("/");
  return { success: true };
}

export async function getMissionValue(id: string) {
  return prisma.missionValue.findUnique({ where: { id } });
}

export async function listMissionValues() {
  return prisma.missionValue.findMany({ orderBy: { displayOrder: "asc" } });
}

export async function listActiveMissionValues() {
  return prisma.missionValue.findMany({
    where: { active: true },
    orderBy: { displayOrder: "asc" },
  });
}
