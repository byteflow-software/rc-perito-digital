import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, jsonError, jsonSuccess } from "@/lib/api-utils";
import { bookSchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(50, parseInt(searchParams.get("limit") || "12"));
  const category = searchParams.get("category");

  const where: Record<string, unknown> = {};
  if (category) where.category = category;

  const [books, total] = await Promise.all([
    prisma.book.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.book.count({ where }),
  ]);

  return jsonSuccess({
    books,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}

export async function POST(request: NextRequest) {
  const session = await requireAuth();
  if (!session) return jsonError("Não autorizado", 401);

  const body = await request.json();
  const parsed = bookSchema.safeParse(body);
  if (!parsed.success) return jsonError(parsed.error.issues[0].message);

  const book = await prisma.book.create({ data: parsed.data });
  return jsonSuccess(book, 201);
}
