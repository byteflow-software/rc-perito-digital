"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import type { ActionResult } from "@/types";

const CourtCitationSchema = z.object({
  court: z.enum(["STJ", "STF", "TST", "TSE", "OUTRO"]),
  title: z.string().min(1),
  description: z.string().min(1),
  documentUrl: z.string().url(),
  displayOrder: z.number().int().default(0),
});

export type CourtCitationInput = z.infer<typeof CourtCitationSchema>;

export async function createCourtCitation(data: CourtCitationInput): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = CourtCitationSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro" };
  const item = await prisma.courtCitation.create({ data: parsed.data });
  revalidatePath("/admin/court-citations");
  revalidatePath("/artigos");
  return { success: true, data: { id: item.id } };
}

export async function updateCourtCitation(id: string, data: CourtCitationInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = CourtCitationSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro" };
  await prisma.courtCitation.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/court-citations");
  revalidatePath("/artigos");
  return { success: true };
}

export async function deleteCourtCitation(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  await prisma.courtCitation.delete({ where: { id } });
  revalidatePath("/admin/court-citations");
  revalidatePath("/artigos");
  return { success: true };
}

export async function getCourtCitation(id: string) {
  return prisma.courtCitation.findUnique({ where: { id } });
}

export async function listCourtCitations() {
  return prisma.courtCitation.findMany({ orderBy: { displayOrder: "asc" } });
}
