"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import type { ActionResult } from "@/types";

const CourseModuleSchema = z.object({
  track: z.enum(["THEORETICAL", "PRACTICAL"]),
  title: z.string().min(1),
  topics: z.array(z.string()).default([]),
  displayOrder: z.number().int().default(0),
});

export type CourseModuleInput = z.infer<typeof CourseModuleSchema>;

export async function createCourseModule(data: CourseModuleInput): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = CourseModuleSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro" };
  const item = await prisma.courseModule.create({ data: parsed.data });
  revalidatePath("/admin/course");
  revalidatePath("/curso-osint");
  return { success: true, data: { id: item.id } };
}

export async function updateCourseModule(id: string, data: CourseModuleInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = CourseModuleSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro" };
  await prisma.courseModule.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/course");
  revalidatePath("/curso-osint");
  return { success: true };
}

export async function deleteCourseModule(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  await prisma.courseModule.delete({ where: { id } });
  revalidatePath("/admin/course");
  revalidatePath("/curso-osint");
  return { success: true };
}

export async function listCourseModules() {
  return prisma.courseModule.findMany({ orderBy: [{ track: "asc" }, { displayOrder: "asc" }] });
}

export async function listModulesByTrack(track: "THEORETICAL" | "PRACTICAL") {
  return prisma.courseModule.findMany({
    where: { track },
    orderBy: { displayOrder: "asc" },
  });
}
