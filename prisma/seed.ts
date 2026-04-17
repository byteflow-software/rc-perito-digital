import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 12);

  await prisma.adminUser.upsert({
    where: { email: "contato@rcperitodigital.com.br" },
    update: {},
    create: {
      name: "Romullo Carvalho",
      email: "contato@rcperitodigital.com.br",
      passwordHash,
    },
  });

  await prisma.siteConfig.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteTitle: "RC Perito Digital",
      metaDescription:
        "Romullo Carvalho - Perito Digital e Especialista em Forense, OSINT e CTI. Blog, cursos, investigação digital e inteligência cibernética.",
      primaryKeywords: ["perito digital", "OSINT", "forense digital", "CTI", "cibersegurança"],
      socialLinks: {
        linkedin: "https://linkedin.com/in/romullo-carvalho",
        instagram: "https://instagram.com/rcperitodigital",
        youtube: "https://youtube.com/@rcperitodigital",
      },
      contactEmail: "contato@rcperitodigital.com.br",
      whatsapp: "5585988405936",
      timezone: "America/Fortaleza",
    },
  });

  await prisma.book.upsert({
    where: { id: "book-osint" },
    update: {},
    create: {
      id: "book-osint",
      title: "OSINT do Zero à Investigação Profissional",
      author: "Romullo Carvalho",
      category: "osint",
      description:
        "Guia completo de OSINT cobrindo desde os fundamentos até técnicas avançadas de investigação em fontes abertas.",
      showOnHomepage: true,
      status: "SHOW",
    },
  });

  await prisma.book.upsert({
    where: { id: "book-provas" },
    update: {},
    create: {
      id: "book-provas",
      title: "Manual Prático de Provas Digitais",
      author: "Romullo Carvalho",
      category: "forensics",
      description:
        "Manual prático sobre coleta, preservação e análise de provas digitais para profissionais do direito e da perícia.",
      showOnHomepage: true,
      status: "SHOW",
    },
  });

  const osintTag = await prisma.tag.upsert({
    where: { slug: "osint" },
    update: {},
    create: { name: "OSINT", slug: "osint" },
  });

  await prisma.article.upsert({
    where: { slug: "introducao-osint" },
    update: {},
    create: {
      title: "Introdução a OSINT: O que é e como funciona",
      slug: "introducao-osint",
      content:
        "<h2>1. Definição de OSINT</h2><p>OSINT (Open Source Intelligence) é a prática de coletar e analisar informações de fontes publicamente disponíveis.</p><h2>2. Tipos de Fonte</h2><p>As fontes incluem redes sociais, registros públicos, fóruns e muito mais.</p>",
      excerpt:
        "Aprenda os fundamentos da inteligência de fontes abertas e como aplicá-la em investigações digitais.",
      category: "osint",
      seoKeywords: ["OSINT", "fontes abertas", "investigação"],
      author: "Romullo Carvalho",
      status: "PUBLISHED",
      readingTime: 8,
      publishedAt: new Date("2024-05-05"),
      tags: { connect: [{ id: osintTag.id }] },
    },
  });

  // Seed PageSeo
  const pages = [
    { pageKey: "home", title: "RC Perito Digital — Forense, OSINT e CTI", description: "Romullo Carvalho, Perito Digital e especialista em Forense Digital, OSINT e CTI." },
    { pageKey: "artigos", title: "Artigos — RC Perito Digital", description: "Blog de Forense Digital, OSINT e CTI por Romullo Carvalho." },
    { pageKey: "sobre", title: "Sobre — RC Perito Digital", description: "Conheça Romullo Carvalho, Perito Digital, autor e especialista em OSINT." },
    { pageKey: "curso-osint", title: "Curso OSINT — RC Perito Digital", description: "Curso prático de OSINT por Romullo Carvalho. Do zero à investigação profissional." },
  ];

  for (const p of pages) {
    await prisma.pageSeo.upsert({
      where: { pageKey: p.pageKey },
      update: {},
      create: p,
    });
  }

  console.log("Seed concluído com sucesso");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
