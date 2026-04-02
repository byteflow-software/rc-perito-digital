import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, Calendar } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { ArticleBody } from "@/components/artigos/article-body";
import { TableOfContents } from "@/components/artigos/table-of-contents";
import { ShareButtons } from "@/components/artigos/share-buttons";
import { RelatedArticles } from "@/components/artigos/related-articles";
import { NewsletterCta } from "@/components/shared/newsletter-cta";
import { JsonLd } from "@/components/shared/json-ld";
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { AUTHOR_NAME } from "@/lib/constants";

// Mock article data until DB is connected
const mockArticle = {
  title: "Introdução à Forense Digital: Conceitos Fundamentais",
  slug: "introducao-forense-digital",
  excerpt:
    "Entenda os conceitos básicos da forense digital e como essa disciplina é essencial para investigações modernas.",
  content: `
    <h2 id="o-que-e-forense-digital">O que é Forense Digital</h2>
    <p>A forense digital é a disciplina que aplica técnicas de investigação e análise para coletar e preservar evidências de dispositivos digitais de maneira que seja legalmente admissível.</p>
    <p>Com o crescimento exponencial dos crimes cibernéticos, a demanda por profissionais qualificados em forense digital nunca foi tão alta. Este campo combina conhecimentos de tecnologia da informação, direito e investigação criminal.</p>

    <h2 id="principios-fundamentais">Princípios Fundamentais</h2>
    <p>Existem quatro princípios fundamentais que guiam toda investigação forense digital:</p>
    <ul>
      <li>Preservação da evidência original</li>
      <li>Documentação completa do processo</li>
      <li>Cadeia de custódia ininterrupta</li>
      <li>Reprodutibilidade dos resultados</li>
    </ul>

    <h3 id="cadeia-de-custodia">Cadeia de Custódia</h3>
    <p>A cadeia de custódia é o registro cronológico e documentado da posse, controle, transferência, análise e disposição de evidências físicas ou eletrônicas.</p>
    <blockquote>A integridade da evidência digital depende diretamente da qualidade da cadeia de custódia mantida durante toda a investigação.</blockquote>

    <h2 id="ferramentas-essenciais">Ferramentas Essenciais</h2>
    <p>Algumas das ferramentas mais utilizadas na forense digital incluem:</p>
    <pre><code># Exemplo de hash para verificação de integridade
sha256sum imagem_disco.dd
md5sum imagem_disco.dd</code></pre>
    <p>A verificação de hashes é fundamental para garantir que a evidência não foi alterada durante o processo de análise.</p>

    <h2 id="conclusao">Conclusão</h2>
    <p>A forense digital é um campo em constante evolução que exige atualização contínua. Dominar os conceitos fundamentais é essencial para qualquer profissional que deseje atuar nesta área.</p>
  `,
  featuredImage: null,
  featuredImageAlt: null,
  category: "forense-digital",
  readingTime: 8,
  author: AUTHOR_NAME,
  publishedAt: new Date("2024-12-15"),
  seoKeywords: ["forense digital", "investigação digital", "evidência digital"],
  metaTitle: null,
  metaDescription: null,
};

const mockRelated = [
  {
    title: "Cadeia de Custódia Digital: Boas Práticas",
    slug: "cadeia-custodia-digital",
    excerpt:
      "A importância da cadeia de custódia em evidências digitais e como manter a integridade das provas.",
    featuredImage: null,
    featuredImageAlt: null,
    category: "forense-digital",
    readingTime: 10,
    publishedAt: new Date("2024-08-22"),
  },
  {
    title: "Ferramentas Essenciais para Análise de Metadados",
    slug: "ferramentas-analise-metadados",
    excerpt:
      "Guia prático das principais ferramentas para extração e análise de metadados em investigações digitais.",
    featuredImage: null,
    featuredImageAlt: null,
    category: "ferramentas",
    readingTime: 6,
    publishedAt: new Date("2024-10-05"),
  },
];

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // TODO: Replace with Prisma query
  if (slug !== mockArticle.slug) {
    return { title: "Artigo nao encontrado" };
  }

  const title = mockArticle.metaTitle || mockArticle.title;
  const description = mockArticle.metaDescription || mockArticle.excerpt;

  return {
    title,
    description,
    keywords: mockArticle.seoKeywords,
    openGraph: {
      title: `${title} | RC Perito Digital`,
      description,
      type: "article",
      publishedTime: mockArticle.publishedAt?.toISOString(),
      authors: [mockArticle.author],
      images: mockArticle.featuredImage
        ? [{ url: mockArticle.featuredImage }]
        : undefined,
    },
  };
}

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.rcperitodigital.com.br";

export default async function ArtigoDetalhePage({ params }: Props) {
  const { slug } = await params;

  // TODO: Replace with Prisma query
  if (slug !== mockArticle.slug) {
    notFound();
  }

  const article = mockArticle;
  const articleUrl = `${siteUrl}/artigos/${article.slug}`;

  const breadcrumbs = [
    { name: "Artigos", href: "/artigos" },
    { name: article.title, href: `/artigos/${article.slug}` },
  ];

  return (
    <>
      <JsonLd data={buildArticleJsonLd(article)} />
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbs)} />

      <article className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={breadcrumbs} />

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge>{article.category}</Badge>
            <span className="flex items-center gap-1 text-text-muted text-xs font-mono">
              <Clock className="w-3 h-3" />
              {article.readingTime} min de leitura
            </span>
          </div>

          <h1 className="font-mono text-2xl md:text-4xl font-bold text-text-primary mb-4">
            {article.title}
          </h1>

          <p className="text-text-secondary text-sm md:text-base mb-4 max-w-3xl">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border">
            <div className="flex items-center gap-4 text-text-muted text-xs font-mono">
              <span>{article.author}</span>
              {article.publishedAt && (
                <time
                  dateTime={article.publishedAt.toISOString()}
                  className="flex items-center gap-1"
                >
                  <Calendar className="w-3 h-3" />
                  {formatDate(article.publishedAt)}
                </time>
              )}
            </div>
            <ShareButtons url={articleUrl} title={article.title} />
          </div>
        </header>

        {/* Featured image */}
        {article.featuredImage && (
          <div className="relative aspect-[16/9] mb-10 border border-border overflow-hidden">
            <Image
              src={article.featuredImage}
              alt={article.featuredImageAlt || article.title}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
          </div>
        )}

        {/* Content + TOC */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-10">
          <div>
            <TableOfContents content={article.content} />
            <ArticleBody content={article.content} />
          </div>
          <aside className="hidden lg:block">
            <TableOfContents content={article.content} />
          </aside>
        </div>

        {/* Bottom share */}
        <div className="mt-10 pt-6 border-t border-border flex justify-end">
          <ShareButtons url={articleUrl} title={article.title} />
        </div>

        {/* Related articles */}
        <RelatedArticles articles={mockRelated} />

        {/* Newsletter */}
        <div className="mt-16">
          <NewsletterCta />
        </div>
      </article>
    </>
  );
}
