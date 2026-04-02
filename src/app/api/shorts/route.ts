import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, jsonError, jsonSuccess } from "@/lib/api-utils";
import { shortSchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(50, parseInt(searchParams.get("limit") || "12"));
  const status = searchParams.get("status");

  const where: Record<string, unknown> = {};
  if (status) where.status = status;

  const [shorts, total] = await Promise.all([
    prisma.short.findMany({
      where,
      orderBy: { dateAdded: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.short.count({ where }),
  ]);

  return jsonSuccess({
    shorts,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}

export async function POST(request: NextRequest) {
  const session = await requireAuth();
  if (!session) return jsonError("Não autorizado", 401);

  const body = await request.json();
  const parsed = shortSchema.safeParse(body);
  if (!parsed.success) return jsonError(parsed.error.issues[0].message);

  const short = await prisma.short.create({ data: parsed.data });
  return jsonSuccess(short, 201);
}
