import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, jsonError, jsonSuccess } from "@/lib/api-utils";
import { siteConfigSchema } from "@/lib/validators";

export async function GET() {
  const config = await prisma.siteConfig.findUnique({
    where: { id: "default" },
  });
  return jsonSuccess(config);
}

export async function PUT(request: NextRequest) {
  const session = await requireAuth();
  if (!session) return jsonError("Não autorizado", 401);

  const body = await request.json();
  const parsed = siteConfigSchema.safeParse(body);
  if (!parsed.success) return jsonError(parsed.error.issues[0].message);

  const config = await prisma.siteConfig.update({
    where: { id: "default" },
    data: parsed.data,
  });

  return jsonSuccess(config);
}
