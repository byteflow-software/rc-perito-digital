"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import type { ActionResult } from "@/types";

const PartnerSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  logoUrl: z.string().url().optional().or(z.literal("")),
  url: z.string().url().optional().or(z.literal("")),
  displayOrder: z.number().int().default(0),
  active: z.boolean().default(true),
});

export type PartnerInput = z.infer<typeof PartnerSchema>;

function normalize(data: PartnerInput) {
  return {
    name: data.name,
    logoUrl: data.logoUrl || null,
    url: data.url || null,
    displayOrder: data.displayOrder,
    active: data.active,
  };
}

export async function createPartner(data: PartnerInput): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = PartnerSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro de validação" };
  const item = await prisma.partner.create({ data: normalize(parsed.data) });
  revalidatePath("/admin/partners");
  revalidatePath("/");
  return { success: true, data: { id: item.id } };
}

export async function updatePartner(id: string, data: PartnerInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = PartnerSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro de validação" };
  await prisma.partner.update({ where: { id }, data: normalize(parsed.data) });
  revalidatePath("/admin/partners");
  revalidatePath("/");
  return { success: true };
}

export async function deletePartner(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  await prisma.partner.delete({ where: { id } });
  revalidatePath("/admin/partners");
  revalidatePath("/");
  return { success: true };
}

export async function listPartners() {
  return prisma.partner.findMany({ orderBy: { displayOrder: "asc" } });
}

export async function getPartner(id: string) {
  return prisma.partner.findUnique({ where: { id } });
}

export async function listActivePartners() {
  return prisma.partner.findMany({
    where: { active: true },
    orderBy: { displayOrder: "asc" },
  });
}
