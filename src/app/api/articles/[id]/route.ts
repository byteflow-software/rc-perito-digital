import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, jsonError, jsonSuccess } from "@/lib/api-utils";
import { articleSchema } from "@/lib/validators";
import { slugify, calculateReadingTime } from "@/lib/utils";

interface Context {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: Context) {
  const { id } = await params;

  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) return jsonError("Artigo não encontrado", 404);

  return jsonSuccess(article);
}

export async function PUT(request: NextRequest, { params }: Context) {
  const session = await requireAuth();
  if (!session) return jsonError("Não autorizado", 401);

  const { id } = await params;
  const body = await request.json();
  const parsed = articleSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0].message);
  }

  const data = parsed.data;
  const slug = slugify(data.title);
  const readingTime = calculateReadingTime(data.content);

  const existing = await prisma.article.findFirst({
    where: { slug, NOT: { id } },
  });
  if (existing) return jsonError("Slug já existe para outro artigo");

  const current = await prisma.article.findUnique({ where: { id } });
  if (!current) return jsonError("Artigo não encontrado", 404);

  const publishedAt =
    data.status === "PUBLISHED" && current.status !== "PUBLISHED"
      ? new Date()
      : current.publishedAt;

  const article = await prisma.article.update({
    where: { id },
    data: { ...data, slug, readingTime, publishedAt },
  });

  return jsonSuccess(article);
}

export async function DELETE(_request: NextRequest, { params }: Context) {
  const session = await requireAuth();
  if (!session) return jsonError("Não autorizado", 401);

  const { id } = await params;

  await prisma.article.delete({ where: { id } });
  return jsonSuccess({ deleted: true });
}
