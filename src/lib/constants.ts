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
  linkedin: "https://linkedin.com/in/romullo-carvalho",
  instagram: "https://instagram.com/rcperitodigital",
  youtube: "https://youtube.com/@rcperitodigital",
  x: "",
  facebook: "",
} as const;

export const CONTACT = {
  email: "contato@rcperitodigital.com.br",
  emailApecof: "romullo.carvalho@apecof.org.br",
  whatsapp: "5585988405936",
  whatsappFormatted: "(85) 98840-5936",
} as const;

export const HOTMART_CURSO_OSINT = "https://go.hotmart.com/T77442903S";

export const BOOKS = [
  {
    title: "OSINT do zero a Investigacao Profissional",
    publisher: "Editora Literando",
    url: "https://amzn.to/3N9gvZg",
  },
  {
    title: "Manual Pratico de Provas Digitais",
    publisher: "Editora Revista dos Tribunais",
    url: "https://amzn.to/3SlkEvv",
  },
  {
    title: "Livro 3",
    url: "https://amzn.to/4krgs92",
  },
  {
    title: "Livro 4",
    url: "https://amzn.to/44HOgqW",
  },
] as const;

export const YOUTUBE_VIDEOS = {
  semanaOsint: [
    { title: "Direito e OSINT", id: "" },
    { title: "Pericia e OSINT", id: "" },
    { title: "CyberIntelligence e OSINT", id: "" },
    { title: "Hacker e OSINT", id: "" },
    { title: "Policia e OSINT", id: "" },
    { title: "Jornalismo e OSINT", id: "" },
  ],
  workshops: [
    { title: "Workshop - OSINT Aplicado a Pericia", id: "wPNyOz6-HzA" },
    { title: "II Congresso Nacional de Direito Informatico e Novas Tecnologias", id: "gcH6mUUM5c0" },
  ],
  educacionais: [
    { title: "Possibilidades em Fontes Abertas", id: "" },
    { title: "Coleta em OSINT", id: "" },
    { title: "Por Que Voce Precisa se Proteger na Internet?", id: "" },
    { title: "Voce sabe o que e OSINT?", id: "" },
  ],
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
