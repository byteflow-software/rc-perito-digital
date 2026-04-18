"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import type { ActionResult } from "@/types";

const VideoFeatureSchema = z.object({
  title: z.string().min(1),
  youtubeId: z.string().min(1),
  section: z.enum(["SEMANA_OSINT", "PALESTRAS_CONGRESSOS"]),
  displayOrder: z.number().int().default(0),
});

export type VideoFeatureInput = z.infer<typeof VideoFeatureSchema>;

export async function createVideoFeature(data: VideoFeatureInput): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = VideoFeatureSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro" };
  const item = await prisma.videoFeature.create({ data: parsed.data });
  revalidatePath("/admin/video-features");
  revalidatePath("/");
  return { success: true, data: { id: item.id } };
}

export async function updateVideoFeature(id: string, data: VideoFeatureInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = VideoFeatureSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro" };
  await prisma.videoFeature.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/video-features");
  revalidatePath("/");
  return { success: true };
}

export async function deleteVideoFeature(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  await prisma.videoFeature.delete({ where: { id } });
  revalidatePath("/admin/video-features");
  revalidatePath("/");
  return { success: true };
}

export async function getVideoFeature(id: string) {
  return prisma.videoFeature.findUnique({ where: { id } });
}

export async function listVideoFeatures() {
  return prisma.videoFeature.findMany({
    orderBy: [{ section: "asc" }, { displayOrder: "asc" }],
  });
}

export async function listVideosBySection(section: "SEMANA_OSINT" | "PALESTRAS_CONGRESSOS") {
  return prisma.videoFeature.findMany({
    where: { section },
    orderBy: { displayOrder: "asc" },
  });
}
