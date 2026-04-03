import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const passwordHash = await bcrypt.hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "contato@rcperitodigital.com.br" },
    update: {},
    create: {
      name: "Romullo Carvalho",
      email: "contato@rcperitodigital.com.br",
      passwordHash,
      role: "ADMIN",
    },
  });

  // Create default site config
  await prisma.siteConfig.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteTitle: "RC Perito Digital",
      metaDescription:
        "Romullo Carvalho - Perito Digital e Especialista em Forense, OSINT e CTI. Blog, cursos, investigação digital e inteligência cibernética.",
      primaryKeywords: JSON.parse(
        '["perito digital","OSINT","forense digital","CTI","cibersegurança"]'
      ),
      socialLinks: JSON.parse(
        '{"linkedin":"https://linkedin.com/in/romullocarvalho","instagram":"https://instagram.com/romullo_carvalho","youtube":"https://youtube.com/c/RomulloCarvalho","x":"https://x.com/romullo_c","facebook":"https://facebook.com/romullo.carvalho"}'
      ),
      contactEmail: "contato@rcperitodigital.com.br",
      timezone: "America/Fortaleza",
    },
  });

  // Create published books (author's own books)
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

  // Sample article
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
      seoKeywords: JSON.parse('["OSINT","fontes abertas","investigação"]'),
      author: "Romullo Carvalho",
      status: "PUBLISHED",
      readingTime: 8,
      publishedAt: new Date("2024-05-05"),
    },
  });

  console.log("Seed completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
