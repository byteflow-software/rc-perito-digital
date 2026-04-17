"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import type { ActionResult } from "@/types";

const SettingsSchema = z.object({
  siteTitle: z.string().min(1).optional(),
  metaDescription: z.string().optional(),
  primaryKeywords: z.array(z.string()).optional(),
  googleAnalyticsId: z.string().optional().or(z.literal("")),
  socialLinks: z.record(z.string(), z.string()).optional(),
  contactEmail: z.string().email().optional().or(z.literal("")),
  whatsapp: z.string().optional().or(z.literal("")),
  timezone: z.string().optional(),
  maintenanceMode: z.boolean().optional(),
});

export type SettingsInput = z.infer<typeof SettingsSchema>;

export async function saveSettings(data: SettingsInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };

  const parsed = SettingsSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro de validação" };

  const { googleAnalyticsId, contactEmail, whatsapp, ...rest } = parsed.data;
  try {
    await prisma.siteConfig.upsert({
      where: { id: "default" },
      update: {
        ...rest,
        googleAnalyticsId: googleAnalyticsId || null,
        contactEmail: contactEmail || null,
        whatsapp: whatsapp || null,
      },
      create: {
        id: "default",
        ...rest,
        googleAnalyticsId: googleAnalyticsId || null,
        contactEmail: contactEmail || null,
        whatsapp: whatsapp || null,
      },
    });
    revalidatePath("/");
    revalidatePath("/admin/configuracoes");
    return { success: true };
  } catch {
    return { success: false, error: "Erro ao salvar configurações." };
  }
}

export async function getSettings() {
  const config = await prisma.siteConfig.findUnique({ where: { id: "default" } });
  if (!config) return null;
  return {
    ...config,
    primaryKeywords: (config.primaryKeywords as string[]) ?? [],
    socialLinks: (config.socialLinks as Record<string, string>) ?? {},
  };
}
