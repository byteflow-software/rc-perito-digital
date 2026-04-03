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

// Real articles from romullocarvalho.com.br
const articlesData: Record<string, {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
  featuredImageAlt: string | null;
  category: string;
  readingTime: number;
  author: string;
  publishedAt: Date;
  seoKeywords: string[];
  metaTitle: string | null;
  metaDescription: string | null;
}> = {
  "hash-pra-que-te-quero": {
    title: "Hash, pra que te quero?",
    slug: "hash-pra-que-te-quero",
    excerpt: "O termo hash é cada vez mais presente em laudos periciais, decisões judiciais e documentos técnicos. Compreender o que significa é essencial para interpretar evidências digitais.",
    content: `
      <h2 id="o-que-e-hash">O que é Hash</h2>
      <p>O termo hash é cada vez mais presente em laudos periciais, decisões judiciais e documentos técnicos relacionados à prova digital. Para operadores do direito — advogados, promotores, juízes, defensores públicos e acadêmicos — compreender de forma clara o que significa e como se aplica esse conceito é essencial para interpretar e avaliar corretamente evidências digitais.</p>
      <p>Em essência, um hash é o resultado da aplicação de uma função matemática unidirecional que transforma qualquer conjunto de dados — como um arquivo, imagem, mensagem ou disco inteiro — em uma sequência fixa de caracteres alfanuméricos, chamada de "valor hash" ou "digest". Essa sequência é única para cada entrada: qualquer alteração, por menor que seja, no conteúdo original, resulta em um hash completamente diferente. Por isso, o hash funciona como uma <strong>impressão digital eletrônica</strong> do dado.</p>

      <h2 id="algoritmos-utilizados">Algoritmos Utilizados</h2>
      <p>Entre os algoritmos mais utilizados estão o <strong>SHA-256</strong> (Secure Hash Algorithm) e o <strong>MD5</strong> (Message Digest Algorithm 5). O SHA-256 gera um hash de 256 bits e é considerado seguro para fins periciais. Já o MD5, embora ainda amplamente utilizado, apresenta vulnerabilidades conhecidas — como a possibilidade teórica de colisões — que devem ser consideradas ao avaliar sua aplicação isolada como prova de integridade.</p>

      <h2 id="normas-tecnicas">Normas Técnicas e Legislação</h2>
      <p>A <strong>ABNT NBR ISO/IEC 27037</strong>, norma técnica que orienta a identificação, coleta, aquisição e preservação de evidências digitais, recomenda expressamente o uso de funções hash como método de verificação da integridade. De acordo com a norma, o hash deve ser calculado no momento da aquisição da evidência e registrado de forma documentada.</p>
      <p>A <strong>RFC 3227</strong>, referência internacional para coleta e preservação de evidências digitais, também enfatiza a necessidade de calcular hashes durante o processo de coleta, como forma de preservar a integridade das provas.</p>
      <p>O <strong>Código de Processo Penal</strong> brasileiro, nos artigos 158-A a 158-F, introduzidos pela Lei 13.964/2019, estabelece a cadeia de custódia como exigência legal para a validade das provas. No caso de evidências digitais, a integridade é frequentemente demonstrada por meio de hashes.</p>
      <p>Os <strong>POPs do SENASP</strong> de 2013 e de 2024, voltados à padronização de procedimentos periciais no Brasil, também incorporam o cálculo de hash como etapa obrigatória nas fases de coleta e preservação de evidências digitais.</p>

      <h2 id="caso-pratico">Caso Prático: HC 828.054/RN</h2>
      <blockquote>Um exemplo concreto da relevância do hash pode ser encontrado no julgamento do HC 828.054/RN pelo Superior Tribunal de Justiça, no qual se destacou que a ausência de registro de procedimentos e a inexistência de cálculo e preservação de valores hash configuraram uma grave quebra da cadeia de custódia.</blockquote>
      <p>Sem essa documentação, não havia como comprovar que os dados apresentados em juízo eram efetivamente os mesmos encontrados nos equipamentos apreendidos. A decisão resultou na anulação dessas provas digitais.</p>

      <h2 id="conclusao">Conclusão</h2>
      <p>Não basta alegar que uma evidência digital é autêntica; é preciso comprovar sua integridade com base em métodos técnicos confiáveis. O cálculo de um hash no momento da coleta, repetido e comparado em cada etapa subsequente, é um desses métodos, e sua ausência fragiliza a credibilidade da prova.</p>
    `,
    featuredImage: null,
    featuredImageAlt: null,
    category: "forense-digital",
    readingTime: 10,
    author: AUTHOR_NAME,
    publishedAt: new Date("2025-03-15"),
    seoKeywords: ["hash", "forense digital", "cadeia de custódia", "SHA-256", "MD5", "evidência digital"],
    metaTitle: null,
    metaDescription: null,
  },
  "metadados-e-a-prova-digital": {
    title: "Metadados e a Prova Digital",
    slug: "metadados-e-a-prova-digital",
    excerpt: "No universo da prova digital, compreender e analisar metadados é tão importante quanto entender o conteúdo principal de um arquivo.",
    content: `
      <h2 id="o-que-sao-metadados">O que são Metadados</h2>
      <p>No universo da prova digital, compreender e analisar metadados é tão importante quanto entender o conteúdo principal de um arquivo. Muitas vezes, eles são a chave para confirmar a autenticidade, a origem e a integridade de uma evidência eletrônica.</p>
      <p>Metadados são <strong>dados sobre dados</strong>. São informações embutidas automaticamente em arquivos digitais — como documentos, imagens, vídeos, e-mails e registros de sistemas — que descrevem características do conteúdo, como data de criação, autor, localização geográfica, dispositivo utilizado, versão do software, entre outros.</p>

      <h2 id="exemplos-comuns">Exemplos Comuns de Metadados</h2>
      <ul>
        <li><strong>Fotografia:</strong> modelo da câmera, data/hora da captura, coordenadas GPS e configurações de exposição (dados EXIF)</li>
        <li><strong>Documento Word ou PDF:</strong> nome do autor, datas de criação e modificação, revisões realizadas e comentários ocultos</li>
        <li><strong>E-mail:</strong> cabeçalhos (headers) que indicam o caminho percorrido pela mensagem entre servidores</li>
        <li><strong>Arquivos de sistema:</strong> registros de log e timestamps de acesso, criação e modificação</li>
      </ul>

      <h2 id="classificacao">Classificação dos Metadados</h2>
      <p>Os metadados podem ser classificados em três categorias principais:</p>
      <ul>
        <li><strong>Descritivos</strong> — identificam o conteúdo, como título e autor</li>
        <li><strong>Estruturais</strong> — descrevem a organização do arquivo</li>
        <li><strong>Administrativos</strong> — registram informações de gerenciamento, como permissões e datas</li>
      </ul>

      <h2 id="importancia-pericial">Importância Pericial</h2>
      <p>A análise de metadados é uma etapa fundamental em perícias digitais, sendo referenciada tanto pela <strong>ABNT NBR ISO/IEC 27037</strong> quanto pela <strong>RFC 3227</strong>. Em muitos casos, os metadados podem revelar contradições entre o que se afirma sobre um documento e o que os dados técnicos efetivamente demonstram.</p>
      <blockquote>Um documento supostamente criado em uma data pode conter metadados que indicam criação em data diferente, o que pode sugerir manipulação.</blockquote>
      <p>Os artigos 158-A a 158-F do CPP exigem que a cadeia de custódia preserve não apenas o conteúdo principal da evidência, mas também todas as informações técnicas associadas a ela — o que inclui os metadados.</p>

      <h2 id="conclusao">Conclusão</h2>
      <p>Em processos judiciais, metadados já foram determinantes para comprovar fraudes documentais, confirmar autorias, estabelecer linhas do tempo e demonstrar a manipulação de evidências. Advogados, promotores e juízes que compreendem a natureza e a importância dos metadados estão mais bem equipados para avaliar criticamente as provas digitais apresentadas.</p>
    `,
    featuredImage: null,
    featuredImageAlt: null,
    category: "forense-digital",
    readingTime: 8,
    author: AUTHOR_NAME,
    publishedAt: new Date("2025-02-20"),
    seoKeywords: ["metadados", "prova digital", "EXIF", "perícia digital", "forense digital"],
    metaTitle: null,
    metaDescription: null,
  },
  "pop-senasp-2013": {
    title: "POP SENASP 2013",
    slug: "pop-senasp-2013",
    excerpt: "O POP — Procedimento Operacional Padrão é um documento da SENASP que padroniza as ações das forças de segurança pública no Brasil.",
    content: `
      <h2 id="o-que-e">O que é o POP SENASP 2013?</h2>
      <p>O POP — Procedimento Operacional Padrão é um documento elaborado pela Secretaria Nacional de Segurança Pública (SENASP), vinculado ao Ministério da Justiça, que tem como objetivo padronizar as ações e procedimentos das forças de segurança pública no Brasil.</p>
      <p>Em 2013, a SENASP publicou versões atualizadas desses POPs, com foco em qualificar a atuação policial e de segurança pública, oferecendo instruções claras e unificadas para situações recorrentes no dia a dia operacional.</p>

      <h2 id="objetivos">Objetivos do POP SENASP 2013</h2>
      <ul>
        <li>Padronizar procedimentos adotados pelas polícias e demais órgãos de segurança</li>
        <li>Garantir segurança jurídica e técnica aos agentes durante suas atividades</li>
        <li>Minimizar riscos para a população e para os próprios agentes</li>
        <li>Melhorar a eficiência e a qualidade do serviço público</li>
        <li>Unificar a linguagem e conduta entre diferentes corporações em âmbito nacional</li>
      </ul>

      <h2 id="temas-abordados">Temas Abordados</h2>
      <p>O POP SENASP 2013 traz instruções para diversos cenários de atuação, como:</p>
      <ul>
        <li>Abordagem a pessoas e veículos</li>
        <li>Uso progressivo da força</li>
        <li>Atendimento a ocorrências com reféns</li>
        <li>Preservação de local de crime</li>
        <li>Apreensão e custódia de evidências (incluindo digitais)</li>
        <li>Procedimentos em blitz e operações ostensivas</li>
      </ul>

      <h2 id="importancia">Importância</h2>
      <p>O POP SENASP 2013 representou um avanço significativo na profissionalização da segurança pública brasileira. Seu conteúdo serve como referência técnica e jurídica para agentes, peritos e operadores do direito, e continua sendo utilizado como base comparativa mesmo após a publicação do POP SENASP 2024.</p>
    `,
    featuredImage: null,
    featuredImageAlt: null,
    category: "forense-digital",
    readingTime: 6,
    author: AUTHOR_NAME,
    publishedAt: new Date("2025-01-10"),
    seoKeywords: ["POP SENASP", "segurança pública", "procedimento operacional", "evidências digitais"],
    metaTitle: null,
    metaDescription: null,
  },
  "pop-senasp-2024": {
    title: "POP SENASP 2024",
    slug: "pop-senasp-2024",
    excerpt: "O POP SENASP 2024 é a atualização do Procedimento Operacional Padrão, incorporando inovações tecnológicas e atualizando diretrizes de preservação de evidências digitais.",
    content: `
      <h2 id="o-que-e">O que é o POP SENASP 2024</h2>
      <p>O POP SENASP 2024 é a atualização do Procedimento Operacional Padrão publicado pela Secretaria Nacional de Segurança Pública (SENASP), ligada ao Ministério da Justiça e Segurança Pública do Brasil. Trata-se de um documento técnico-normativo que define diretrizes, rotinas e boas práticas a serem seguidas pelas forças de segurança pública em todo o território nacional.</p>

      <h2 id="normativa">Normativa e Estrutura</h2>
      <p>O POP SENASP 2024 foi instituído com base em normativas internas do Ministério da Justiça e diretrizes da SENASP, e organizado em módulos temáticos que cobrem desde procedimentos operacionais básicos até técnicas avançadas de investigação e perícia.</p>

      <h2 id="objetivos">Objetivos Principais</h2>
      <ul>
        <li>Padronizar procedimentos operacionais das forças de segurança pública em âmbito nacional</li>
        <li>Incorporar inovações tecnológicas e metodológicas surgidas desde o POP de 2013</li>
        <li>Atualizar diretrizes de preservação de evidências digitais à luz da Lei 13.964/2019</li>
        <li>Reforçar o cumprimento da cadeia de custódia conforme artigos 158-A a 158-F do CPP</li>
        <li>Alinhar procedimentos com normas internacionais (ISO/IEC 27037, RFC 3227)</li>
      </ul>

      <h2 id="importancia">Importância</h2>
      <p>O POP SENASP 2024 representa a evolução necessária dos procedimentos de segurança pública para acompanhar os avanços tecnológicos e jurídicos. Sua adoção fortalece a segurança jurídica das operações policiais e periciais, especialmente no tratamento de evidências digitais, área em constante transformação.</p>
    `,
    featuredImage: null,
    featuredImageAlt: null,
    category: "forense-digital",
    readingTime: 5,
    author: AUTHOR_NAME,
    publishedAt: new Date("2025-01-05"),
    seoKeywords: ["POP SENASP 2024", "segurança pública", "evidências digitais", "cadeia de custódia", "Lei 13.964/2019"],
    metaTitle: null,
    metaDescription: null,
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const article = articlesData[slug];
  if (!article) {
    return { title: "Artigo não encontrado" };
  }

  const title = article.metaTitle || article.title;
  const description = article.metaDescription || article.excerpt;

  return {
    title,
    description,
    keywords: article.seoKeywords,
    openGraph: {
      title: `${title} | RC Perito Digital`,
      description,
      type: "article",
      publishedTime: article.publishedAt?.toISOString(),
      authors: [article.author],
      images: article.featuredImage
        ? [{ url: article.featuredImage }]
        : undefined,
    },
  };
}

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.rcperitodigital.com.br";

export default async function ArtigoDetalhePage({ params }: Props) {
  const { slug } = await params;

  const article = articlesData[slug];
  if (!article) {
    notFound();
  }

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

        {/* Mobile TOC */}
        <div className="lg:hidden">
          <TableOfContents content={article.content} />
        </div>

        {/* Content + Desktop TOC */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-10">
          <ArticleBody content={article.content} />
          <aside className="hidden lg:block">
            <TableOfContents content={article.content} />
          </aside>
        </div>

        {/* Bottom share */}
        <div className="mt-10 pt-6 border-t border-border flex justify-end">
          <ShareButtons url={articleUrl} title={article.title} />
        </div>

        {/* Related articles */}
        <RelatedArticles articles={Object.values(articlesData).filter((a) => a.slug !== slug).slice(0, 2)} />

        {/* Newsletter */}
        <div className="mt-16">
          <NewsletterCta />
        </div>
      </article>
    </>
  );
}
