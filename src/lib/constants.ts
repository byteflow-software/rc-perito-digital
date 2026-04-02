export const SITE_NAME = "RC Perito Digital";
export const SITE_DESCRIPTION =
  "Romullo Carvalho - Perito Digital e Especialista em Forense, OSINT e CTI.";
export const AUTHOR_NAME = "Romullo Carvalho";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/artigos", label: "Artigos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/curso-osint", label: "Curso OSINT" },
] as const;

export const SOCIAL_LINKS = {
  linkedin: "https://linkedin.com/in/romullocarvalho",
  instagram: "https://instagram.com/romullo_carvalho",
  youtube: "https://youtube.com/c/RomulloCarvalho",
  x: "https://x.com/romullo_c",
  facebook: "https://facebook.com/romullo.carvalho",
} as const;

export const CONTACT = {
  email: "contato@rcperitodigital.com.br",
  whatsapp: "5585988405936",
} as const;

export const ARTICLE_CATEGORIES = [
  { value: "forense-digital", label: "Forense Digital", icon: "Search" },
  { value: "osint", label: "OSINT", icon: "Eye" },
  { value: "cti", label: "CTI", icon: "Shield" },
  { value: "ferramentas", label: "Ferramentas", icon: "Wrench" },
  { value: "webinarios", label: "Webinários", icon: "Video" },
] as const;

export const BOOK_CATEGORIES = [
  { value: "forensics", label: "Forensics" },
  { value: "intelligence", label: "Intelligence" },
  { value: "malware", label: "Malware" },
  { value: "programming", label: "Programming" },
  { value: "osint", label: "OSINT" },
  { value: "cybersecurity", label: "Cibersegurança" },
] as const;

export const ITEMS_PER_PAGE = 9;
