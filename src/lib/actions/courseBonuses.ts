"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import type { ActionResult } from "@/types";

const CourseBonusSchema = z.object({
  text: z.string().min(1),
  displayOrder: z.number().int().default(0),
});

export type CourseBonusInput = z.infer<typeof CourseBonusSchema>;

export async function createCourseBonus(data: CourseBonusInput): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = CourseBonusSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro" };
  const item = await prisma.courseBonus.create({ data: parsed.data });
  revalidatePath("/admin/course-bonuses");
  revalidatePath("/curso-osint");
  return { success: true, data: { id: item.id } };
}

export async function updateCourseBonus(id: string, data: CourseBonusInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = CourseBonusSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro" };
  await prisma.courseBonus.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/course-bonuses");
  revalidatePath("/curso-osint");
  return { success: true };
}

export async function deleteCourseBonus(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  await prisma.courseBonus.delete({ where: { id } });
  revalidatePath("/admin/course-bonuses");
  revalidatePath("/curso-osint");
  return { success: true };
}

export async function listCourseBonuses() {
  return prisma.courseBonus.findMany({ orderBy: { displayOrder: "asc" } });
}

export async function getCourseBonus(id: string) {
  return prisma.courseBonus.findUnique({ where: { id } });
}
