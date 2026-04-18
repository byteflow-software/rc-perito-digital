"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import type { ActionResult } from "@/types";

const HeroContentSchema = z.object({
  label: z.string().default("> WELCOME"),
  name: z.string().min(1),
  nameHighlight: z.string().min(1),
  subtitle: z.string().min(1),
  bio: z.string().default(""),
  photoUrl: z.string().url().optional().or(z.literal("")),
  photoAlt: z.string().optional(),
  primaryCtaText: z.string().default("CONTATO"),
  primaryCtaUrl: z.string().default(""),
  secondaryCtaText: z.string().default("SAIBA MAIS"),
  secondaryCtaUrl: z.string().default("/sobre"),
});

export type HeroContentInput = z.infer<typeof HeroContentSchema>;

export async function getHeroContent() {
  return prisma.heroContent.upsert({
    where: { id: "default" },
    create: { id: "default" },
    update: {},
  });
}

export async function updateHeroContent(data: HeroContentInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = HeroContentSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro" };
  const { photoUrl, ...rest } = parsed.data;
  await prisma.heroContent.upsert({
    where: { id: "default" },
    create: { id: "default", ...rest, photoUrl: photoUrl || null },
    update: { ...rest, photoUrl: photoUrl || null },
  });
  revalidatePath("/admin/hero");
  revalidatePath("/");
  return { success: true };
}
