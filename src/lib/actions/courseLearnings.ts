"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import type { ActionResult } from "@/types";

const CourseLearningSchema = z.object({
  text: z.string().min(1),
  displayOrder: z.number().int().default(0),
});

export type CourseLearningInput = z.infer<typeof CourseLearningSchema>;

export async function createCourseLearning(data: CourseLearningInput): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = CourseLearningSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro" };
  const item = await prisma.courseLearning.create({ data: parsed.data });
  revalidatePath("/admin/course-learnings");
  revalidatePath("/curso-osint");
  return { success: true, data: { id: item.id } };
}

export async function updateCourseLearning(id: string, data: CourseLearningInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = CourseLearningSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro" };
  await prisma.courseLearning.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/course-learnings");
  revalidatePath("/curso-osint");
  return { success: true };
}

export async function deleteCourseLearning(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  await prisma.courseLearning.delete({ where: { id } });
  revalidatePath("/admin/course-learnings");
  revalidatePath("/curso-osint");
  return { success: true };
}

export async function listCourseLearnings() {
  return prisma.courseLearning.findMany({ orderBy: { displayOrder: "asc" } });
}

export async function getCourseLearning(id: string) {
  return prisma.courseLearning.findUnique({ where: { id } });
}
