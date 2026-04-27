"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import type { ActionResult } from "@/types";

const CourseInfoSchema = z.object({
  tagline: z.string().default("#OSINT — CURSO FORMAÇÃO EM OSINT"),
  heroTitle: z.string().default("Curso Formação em"),
  heroHighlight: z.string().default("OSINT"),
  description1: z.string().default(""),
  description2: z.string().default(""),
  description3: z.string().default(""),
  hoursLabel: z.string().default("60h+"),
  hoursDescription: z.string().default("de aula"),
  groupLabel: z.string().default("5ª"),
  groupDescription: z.string().default("turma"),
  certificateLabel: z.string().default("Certificado"),
  certificateDescription: z.string().default("de 60h"),
  instructor: z.string().default("Romullo Carvalho"),
  ctaUrl: z.string().url(),
  ctaLabel: z.string().default("INSCREVA-SE AGORA"),
  priceLabel: z.string().default("Primeiro Mês"),
  priceValue: z.string().default("R$6,95"),
  priceOriginal: z.string().default("R$14,90"),
  priceSuffix: z.string().default("por mês"),
});

export type CourseInfoInput = z.infer<typeof CourseInfoSchema>;

export async function getCourseInfo() {
  return prisma.courseInfo.upsert({
    where: { id: "default" },
    create: { id: "default" },
    update: {},
  });
}

export async function updateCourseInfo(data: CourseInfoInput): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Não autorizado" };
  const parsed = CourseInfoSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Erro" };
  await prisma.courseInfo.upsert({
    where: { id: "default" },
    create: { id: "default", ...parsed.data },
    update: parsed.data,
  });
  revalidatePath("/admin/curso");
  revalidatePath("/curso-osint");
  return { success: true };
}
