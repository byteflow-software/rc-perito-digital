"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import type { ActionResult } from "@/types";

export async function listSubscribers() {
  const user = await getCurrentUser();
  if (!user) return [];
  return prisma.newsletterSubscriber.findMany({ orderBy: { subscribedAt: "desc" } });
}

export async function deleteSubscriber(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  try {
    await prisma.newsletterSubscriber.delete({ where: { id } });
    revalidatePath("/admin/newsletter");
    return { success: true };
  } catch {
    return { success: false, error: "Erro ao remover inscrito." };
  }
}
