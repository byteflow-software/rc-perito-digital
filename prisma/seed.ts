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
        "Romullo Carvalho - Perito Digital e Especialista em Forense, OSINT e CTI. Blog, cursos, investigacao digital e inteligencia cibernetica.",
      primaryKeywords: JSON.parse(
        '["perito digital","OSINT","forense digital","CTI","ciberseguranca"]'
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
      title: "OSINT do Zero a Investigacao Profissional",
      author: "Romullo Carvalho",
      category: "osint",
      description:
        "Guia completo de OSINT cobrindo desde os fundamentos ate tecnicas avancadas de investigacao em fontes abertas.",
      showOnHomepage: true,
      status: "SHOW",
    },
  });

  await prisma.book.upsert({
    where: { id: "book-provas" },
    update: {},
    create: {
      id: "book-provas",
      title: "Manual Pratico de Provas Digitais",
      author: "Romullo Carvalho",
      category: "forensics",
      description:
        "Manual pratico sobre coleta, preservacao e analise de provas digitais para profissionais do direito e da pericia.",
      showOnHomepage: true,
      status: "SHOW",
    },
  });

  // Sample article
  await prisma.article.upsert({
    where: { slug: "introducao-osint" },
    update: {},
    create: {
      title: "Introducao a OSINT: O que e e como funciona",
      slug: "introducao-osint",
      content:
        "<h2>1. Definicao de OSINT</h2><p>OSINT (Open Source Intelligence) e a pratica de coletar e analisar informacoes de fontes publicamente disponiveis.</p><h2>2. Tipos de Fonte</h2><p>As fontes incluem redes sociais, registros publicos, forums e muito mais.</p>",
      excerpt:
        "Aprenda os fundamentos da inteligencia de fontes abertas e como aplica-la em investigacoes digitais.",
      category: "osint",
      seoKeywords: JSON.parse('["OSINT","fontes abertas","investigacao"]'),
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
