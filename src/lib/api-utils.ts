import { NextResponse } from "next/server";
import { getCurrentUser } from "./auth";

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) return null;
  return user;
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function jsonSuccess<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}
