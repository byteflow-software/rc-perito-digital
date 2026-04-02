import { SITE_NAME, AUTHOR_NAME, SOCIAL_LINKS } from "./constants";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.rcperitodigital.com.br";

export function buildPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR_NAME,
    jobTitle: "Perito Digital",
    description: "Especialista em Forense Digital, OSINT e CTI",
    url: siteUrl,
    image: `${siteUrl}/images/perfil.png`,
    sameAs: Object.values(SOCIAL_LINKS),
    worksFor: {
      "@type": "Organization",
      name: "RC Perito Digital",
      url: siteUrl,
    },
    knowsAbout: [
      "OSINT",
      "Digital Forensics",
      "Cyber Threat Intelligence",
      "Cybersecurity",
    ],
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: siteUrl,
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/artigos?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildArticleJsonLd(article: {
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string | null;
  publishedAt: Date | string | null;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImage || `${siteUrl}/images/og/default.webp`,
    url: `${siteUrl}/artigos/${article.slug}`,
    datePublished: article.publishedAt
      ? new Date(article.publishedAt).toISOString()
      : undefined,
    author: {
      "@type": "Person",
      name: article.author,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: siteUrl,
    },
  };
}

export function buildCourseJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Formação em OSINT",
    description:
      "Capacitação em investigação virtual utilizando metodologia de fontes abertas. Mais de 60 horas de conteúdo.",
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: siteUrl,
    },
    offers: {
      "@type": "Offer",
      price: "6.95",
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
    },
  };
}

export function buildBreadcrumbJsonLd(
  items: { name: string; href: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.href}`,
    })),
  };
}
