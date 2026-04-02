import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonError, jsonSuccess } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  // Verify cron secret for Vercel Cron Jobs
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return jsonError("Não autorizado", 401);
  }

  const now = new Date();

  const updated = await prisma.article.updateMany({
    where: {
      status: "SCHEDULED",
      scheduledAt: { lte: now },
    },
    data: {
      status: "PUBLISHED",
      publishedAt: now,
    },
  });

  return jsonSuccess({
    published: updated.count,
    timestamp: now.toISOString(),
  });
}
