"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import type { ActionResult } from "@/types";

const LivroSchema = z.object({
  title: z.string().min(2, "Título obrigatório"),
  author: z.string().min(2, "Autor obrigatório"),
  coverImage: z.string().url().optional().or(z.literal("")),
  affiliateLink: z.string().url().optional().or(z.literal("")),
  category: z.string().default("osint"),
  description: z.string().default(""),
  showOnHomepage: z.boolean().default(true),
  status: z.enum(["SHOW", "HIDDEN"]),
});

export type LivroInput = z.infer<typeof LivroSchema>;

export async function createLivro(data: LivroInput): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };

  const parsed = LivroSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro de validação" };

  const { coverImage, affiliateLink, ...rest } = parsed.data;
  try {
    const livro = await prisma.book.create({
      data: { ...rest, coverImage: coverImage || null, affiliateLink: affiliateLink || null },
    });
    revalidatePath("/admin/livros");
    return { success: true, data: { id: livro.id } };
  } catch {
    return { success: false, error: "Erro ao criar livro." };
  }
}

export async function updateLivro(id: string, data: LivroInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };

  const parsed = LivroSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro de validação" };

  const { coverImage, affiliateLink, ...rest } = parsed.data;
  try {
    await prisma.book.update({
      where: { id },
      data: { ...rest, coverImage: coverImage || null, affiliateLink: affiliateLink || null },
    });
    revalidatePath("/admin/livros");
    return { success: true };
  } catch {
    return { success: false, error: "Erro ao atualizar livro." };
  }
}

export async function deleteLivro(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  try {
    await prisma.book.delete({ where: { id } });
    revalidatePath("/admin/livros");
  } catch {
    return { success: false, error: "Erro ao excluir livro." };
  }
  redirect("/admin/livros");
}

export async function getLivro(id: string) {
  return prisma.book.findUnique({ where: { id } });
}

export async function listLivros() {
  return prisma.book.findMany({ orderBy: { createdAt: "desc" } });
}
