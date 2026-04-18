"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import type { ActionResult } from "@/types";

const AboutContentSchema = z.object({
  title: z.string().min(1),
  quote: z.string().default(""),
  quoteAuthor: z.string().default(""),
  paragraph1: z.string().default(""),
  paragraph2: z.string().default(""),
  paragraph3: z.string().default(""),
  photoUrl: z.string().url().optional().or(z.literal("")),
  photoAlt: z.string().optional(),
});

export type AboutContentInput = z.infer<typeof AboutContentSchema>;

export async function getAboutContent() {
  return prisma.aboutContent.upsert({
    where: { id: "default" },
    create: { id: "default" },
    update: {},
  });
}

export async function updateAboutContent(data: AboutContentInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = AboutContentSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro" };
  const { photoUrl, ...rest } = parsed.data;
  await prisma.aboutContent.upsert({
    where: { id: "default" },
    create: { id: "default", ...rest, photoUrl: photoUrl || null },
    update: { ...rest, photoUrl: photoUrl || null },
  });
  revalidatePath("/admin/about");
  revalidatePath("/sobre");
  return { success: true };
}
