import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonError, jsonSuccess } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  if (!q || q.length < 2) return jsonError("A busca deve ter pelo menos 2 caracteres");

  const articles = await prisma.article.findMany({
    where: {
      status: "PUBLISHED",
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { excerpt: { contains: q, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      category: true,
      readingTime: true,
    },
    take: 10,
    orderBy: { publishedAt: "desc" },
  });

  return jsonSuccess({ results: articles });
}
