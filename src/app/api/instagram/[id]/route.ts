import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, jsonError, jsonSuccess } from "@/lib/api-utils";
import { instagramSchema } from "@/lib/validators";

interface Context {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: Context) {
  const { id } = await params;
  const post = await prisma.instagramPost.findUnique({ where: { id } });
  if (!post) return jsonError("Post não encontrado", 404);
  return jsonSuccess(post);
}

export async function PUT(request: NextRequest, { params }: Context) {
  const session = await requireAuth();
  if (!session) return jsonError("Não autorizado", 401);

  const { id } = await params;
  const body = await request.json();
  const parsed = instagramSchema.safeParse(body);
  if (!parsed.success) return jsonError(parsed.error.issues[0].message);

  const post = await prisma.instagramPost.update({ where: { id }, data: parsed.data });
  return jsonSuccess(post);
}

export async function DELETE(_request: NextRequest, { params }: Context) {
  const session = await requireAuth();
  if (!session) return jsonError("Não autorizado", 401);

  const { id } = await params;
  await prisma.instagramPost.delete({ where: { id } });
  return jsonSuccess({ deleted: true });
}
