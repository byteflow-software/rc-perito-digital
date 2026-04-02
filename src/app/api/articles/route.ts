import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, jsonError, jsonSuccess } from "@/lib/api-utils";
import { articleSchema } from "@/lib/validators";
import { slugify, calculateReadingTime } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(50, parseInt(searchParams.get("limit") || "9"));
  const category = searchParams.get("category");
  const status = searchParams.get("status");
  const q = searchParams.get("q");

  const where: Record<string, unknown> = {};
  if (category) where.category = category;
  if (status) where.status = status;
  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { excerpt: { contains: q, mode: "insensitive" } },
    ];
  }

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.article.count({ where }),
  ]);

  return jsonSuccess({
    articles,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}

export async function POST(request: NextRequest) {
  const session = await requireAuth();
  if (!session) return jsonError("Não autorizado", 401);

  const body = await request.json();
  const parsed = articleSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0].message);
  }

  const data = parsed.data;
  const slug = slugify(data.title);
  const readingTime = calculateReadingTime(data.content);

  const existing = await prisma.article.findUnique({ where: { slug } });
  if (existing) {
    return jsonError("Já existe um artigo com este título");
  }

  const article = await prisma.article.create({
    data: {
      ...data,
      slug,
      readingTime,
      publishedAt: data.status === "PUBLISHED" ? new Date() : null,
    },
  });

  return jsonSuccess(article, 201);
}
