import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, jsonError, jsonSuccess } from "@/lib/api-utils";
import { instagramSchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(50, parseInt(searchParams.get("limit") || "12"));
  const status = searchParams.get("status");

  const where: Record<string, unknown> = {};
  if (status) where.status = status;

  const [posts, total] = await Promise.all([
    prisma.instagramPost.findMany({
      where,
      orderBy: { dateAdded: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.instagramPost.count({ where }),
  ]);

  return jsonSuccess({
    posts,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}

export async function POST(request: NextRequest) {
  const session = await requireAuth();
  if (!session) return jsonError("Não autorizado", 401);

  const body = await request.json();
  const parsed = instagramSchema.safeParse(body);
  if (!parsed.success) return jsonError(parsed.error.issues[0].message);

  const post = await prisma.instagramPost.create({ data: parsed.data });
  return jsonSuccess(post, 201);
}
