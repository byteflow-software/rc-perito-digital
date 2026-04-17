"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import type { ActionResult } from "@/types";

const FaqSchema = z.object({
  question: z.string().min(5, "Pergunta muito curta"),
  answer: z.string().min(5, "Resposta muito curta"),
  category: z.string().default("general"),
  displayOrder: z.number().int().default(0),
  published: z.boolean().default(true),
});

export type FaqInput = z.infer<typeof FaqSchema>;

export async function createFaq(data: FaqInput): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };

  const parsed = FaqSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro de validação" };

  try {
    const faq = await prisma.faq.create({ data: parsed.data });
    revalidatePath("/admin/faq");
    return { success: true, data: { id: faq.id } };
  } catch {
    return { success: false, error: "Erro ao criar FAQ." };
  }
}

export async function updateFaq(id: string, data: FaqInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };

  const parsed = FaqSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro de validação" };

  try {
    await prisma.faq.update({ where: { id }, data: parsed.data });
    revalidatePath("/admin/faq");
    return { success: true };
  } catch {
    return { success: false, error: "Erro ao atualizar FAQ." };
  }
}

export async function deleteFaq(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  try {
    await prisma.faq.delete({ where: { id } });
    revalidatePath("/admin/faq");
  } catch {
    return { success: false, error: "Erro ao excluir FAQ." };
  }
  redirect("/admin/faq");
}

export async function getFaq(id: string) {
  return prisma.faq.findUnique({ where: { id } });
}

export async function listFaqs() {
  return prisma.faq.findMany({ orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }] });
}
