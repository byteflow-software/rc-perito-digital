import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, jsonError, jsonSuccess } from "@/lib/api-utils";
import { shortSchema } from "@/lib/validators";

interface Context {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: Context) {
  const { id } = await params;
  const short = await prisma.short.findUnique({ where: { id } });
  if (!short) return jsonError("Short não encontrado", 404);
  return jsonSuccess(short);
}

export async function PUT(request: NextRequest, { params }: Context) {
  const session = await requireAuth();
  if (!session) return jsonError("Não autorizado", 401);

  const { id } = await params;
  const body = await request.json();
  const parsed = shortSchema.safeParse(body);
  if (!parsed.success) return jsonError(parsed.error.issues[0].message);

  const short = await prisma.short.update({ where: { id }, data: parsed.data });
  return jsonSuccess(short);
}

export async function DELETE(_request: NextRequest, { params }: Context) {
  const session = await requireAuth();
  if (!session) return jsonError("Não autorizado", 401);

  const { id } = await params;
  await prisma.short.delete({ where: { id } });
  return jsonSuccess({ deleted: true });
}
