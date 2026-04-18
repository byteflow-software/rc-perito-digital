"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import type { ActionResult } from "@/types";

const CertificationSchema = z.object({
  name: z.string().min(1),
  issuer: z.string().optional().or(z.literal("")),
  area: z.string().default("geral"),
  displayOrder: z.number().int().default(0),
});

export type CertificationInput = z.infer<typeof CertificationSchema>;

export async function createCertification(data: CertificationInput): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = CertificationSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro" };
  const item = await prisma.certification.create({
    data: { ...parsed.data, issuer: parsed.data.issuer || null },
  });
  revalidatePath("/admin/certifications");
  revalidatePath("/sobre");
  return { success: true, data: { id: item.id } };
}

export async function updateCertification(id: string, data: CertificationInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = CertificationSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro" };
  await prisma.certification.update({
    where: { id },
    data: { ...parsed.data, issuer: parsed.data.issuer || null },
  });
  revalidatePath("/admin/certifications");
  revalidatePath("/sobre");
  return { success: true };
}

export async function deleteCertification(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  await prisma.certification.delete({ where: { id } });
  revalidatePath("/admin/certifications");
  revalidatePath("/sobre");
  return { success: true };
}

export async function getCertification(id: string) {
  return prisma.certification.findUnique({ where: { id } });
}

export async function listCertifications() {
  return prisma.certification.findMany({
    orderBy: [{ area: "asc" }, { displayOrder: "asc" }],
  });
}

export async function listCertificationsGrouped() {
  const items = await listCertifications();
  const groups = new Map<string, typeof items>();
  for (const item of items) {
    const list = groups.get(item.area) ?? [];
    list.push(item);
    groups.set(item.area, list);
  }
  return Array.from(groups.entries()).map(([area, certs]) => ({ area, certs }));
}
