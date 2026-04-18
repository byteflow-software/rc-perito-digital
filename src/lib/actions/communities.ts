"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import type { ActionResult } from "@/types";

const CommunitySchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  description: z.string().default(""),
  url: z.string().url().optional().or(z.literal("")),
  displayOrder: z.number().int().default(0),
});

export type CommunityInput = z.infer<typeof CommunitySchema>;

export async function createCommunity(data: CommunityInput): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = CommunitySchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro" };
  const item = await prisma.community.create({
    data: { ...parsed.data, url: parsed.data.url || null },
  });
  revalidatePath("/admin/communities");
  revalidatePath("/sobre");
  return { success: true, data: { id: item.id } };
}

export async function updateCommunity(id: string, data: CommunityInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = CommunitySchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro" };
  await prisma.community.update({
    where: { id },
    data: { ...parsed.data, url: parsed.data.url || null },
  });
  revalidatePath("/admin/communities");
  revalidatePath("/sobre");
  return { success: true };
}

export async function deleteCommunity(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  await prisma.community.delete({ where: { id } });
  revalidatePath("/admin/communities");
  revalidatePath("/sobre");
  return { success: true };
}

export async function getCommunity(id: string) {
  return prisma.community.findUnique({ where: { id } });
}

export async function listCommunities() {
  return prisma.community.findMany({ orderBy: { displayOrder: "asc" } });
}
