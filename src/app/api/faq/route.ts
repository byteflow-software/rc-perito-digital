import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, jsonError, jsonSuccess } from "@/lib/api-utils";
import { faqSchema } from "@/lib/validators";

export async function GET() {
  const faqs = await prisma.faq.findMany({
    orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
  });
  return jsonSuccess({ faqs });
}

export async function POST(request: NextRequest) {
  const session = await requireAuth();
  if (!session) return jsonError("Não autorizado", 401);

  const body = await request.json();
  const parsed = faqSchema.safeParse(body);
  if (!parsed.success) return jsonError(parsed.error.issues[0].message);

  const faq = await prisma.faq.create({ data: parsed.data });
  return jsonSuccess(faq, 201);
}
