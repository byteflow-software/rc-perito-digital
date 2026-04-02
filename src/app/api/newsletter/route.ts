import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { jsonError, jsonSuccess } from "@/lib/api-utils";
import { newsletterSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) return jsonError(parsed.error.issues[0].message);

  const { email } = parsed.data;

  const existing = await prisma.newsletterSubscriber.findUnique({
    where: { email },
  });

  if (existing) {
    return jsonError("Este email já está inscrito");
  }

  await prisma.newsletterSubscriber.create({
    data: { email },
  });

  // TODO: Send welcome email via Resend

  return jsonSuccess({ message: "Inscrição realizada com sucesso" }, 201);
}
