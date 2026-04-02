import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, jsonError, jsonSuccess } from "@/lib/api-utils";
import { faqSchema } from "@/lib/validators";

interface Context {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: Context) {
  const session = await requireAuth();
  if (!session) return jsonError("Não autorizado", 401);

  const { id } = await params;
  const body = await request.json();
  const parsed = faqSchema.safeParse(body);
  if (!parsed.success) return jsonError(parsed.error.issues[0].message);

  const faq = await prisma.faq.update({ where: { id }, data: parsed.data });
  return jsonSuccess(faq);
}

export async function DELETE(_request: NextRequest, { params }: Context) {
  const session = await requireAuth();
  if (!session) return jsonError("Não autorizado", 401);

  const { id } = await params;
  await prisma.faq.delete({ where: { id } });
  return jsonSuccess({ deleted: true });
}
