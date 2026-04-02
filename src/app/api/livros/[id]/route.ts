import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, jsonError, jsonSuccess } from "@/lib/api-utils";
import { bookSchema } from "@/lib/validators";

interface Context {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: Context) {
  const { id } = await params;
  const book = await prisma.book.findUnique({ where: { id } });
  if (!book) return jsonError("Livro não encontrado", 404);
  return jsonSuccess(book);
}

export async function PUT(request: NextRequest, { params }: Context) {
  const session = await requireAuth();
  if (!session) return jsonError("Não autorizado", 401);

  const { id } = await params;
  const body = await request.json();
  const parsed = bookSchema.safeParse(body);
  if (!parsed.success) return jsonError(parsed.error.issues[0].message);

  const book = await prisma.book.update({ where: { id }, data: parsed.data });
  return jsonSuccess(book);
}

export async function DELETE(_request: NextRequest, { params }: Context) {
  const session = await requireAuth();
  if (!session) return jsonError("Não autorizado", 401);

  const { id } = await params;
  await prisma.book.delete({ where: { id } });
  return jsonSuccess({ deleted: true });
}
