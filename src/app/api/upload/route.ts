import { NextRequest } from "next/server";
import { put, del } from "@vercel/blob";
import { requireAuth, jsonError, jsonSuccess } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  const session = await requireAuth();
  if (!session) return jsonError("Não autorizado", 401);

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const folder = (formData.get("bucket") as string) || "general";
  const kind = (formData.get("kind") as string) || "image";

  if (!file) return jsonError("Nenhum arquivo enviado");

  if (kind === "pdf") {
    if (file.type !== "application/pdf") return jsonError("Apenas PDFs são permitidos");
    if (file.size > 20 * 1024 * 1024) return jsonError("PDF deve ter no máximo 20MB");
  } else {
    if (!file.type.startsWith("image/")) return jsonError("Apenas imagens são permitidas");
    if (file.size > 5 * 1024 * 1024) return jsonError("Imagem deve ter no máximo 5MB");
  }

  const filename = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

  const blob = await put(filename, file, {
    access: "public",
    addRandomSuffix: false,
  });

  return jsonSuccess({ url: blob.url }, 201);
}

export async function DELETE(request: NextRequest) {
  const session = await requireAuth();
  if (!session) return jsonError("Não autorizado", 401);

  const { url } = await request.json();
  if (!url) return jsonError("URL obrigatória");

  await del(url);

  return jsonSuccess({ deleted: true });
}
