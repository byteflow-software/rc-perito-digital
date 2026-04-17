"use server";

import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function listTags() {
  return prisma.tag.findMany({ orderBy: { name: "asc" } });
}

export async function ensureTagsByNames(names: string[]): Promise<string[]> {
  const ids: string[] = [];
  for (const name of names) {
    const slug = slugify(name);
    const tag = await prisma.tag.upsert({
      where: { slug },
      update: {},
      create: { name: name.trim(), slug },
    });
    ids.push(tag.id);
  }
  return ids;
}
