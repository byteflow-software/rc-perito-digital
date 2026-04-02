import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAuth, jsonError, jsonSuccess } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  const session = await requireAuth();
  if (!session) return jsonError("Não autorizado", 401);

  const body = await request.json();
  const { path } = body;

  if (!path) return jsonError("Path obrigatório");

  revalidatePath(path);

  return jsonSuccess({ revalidated: true, path });
}
