import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seedAuth() {
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
}

async function seedSiteConfig() {
  await prisma.siteConfig.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteTitle: "RC Perito Digital",
      metaDescription:
        "Romullo Carvalho - Perito Digital e Especialista em Forense, OSINT e CTI. Blog, cursos, investigação digital e inteligência cibernética.",
      primaryKeywords: [
        "perito digital",
        "OSINT",
        "forense digital",
        "CTI",
        "cibersegurança",
      ],
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
}

async function seedHero() {
  await prisma.heroContent.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      label: "> WELCOME",
      name: "ROMULLO",
      nameHighlight: "CARVALHO",
      subtitle: "Perito Digital e Especialista em Forense, OSINT e CTI",
      bio: 'Autor dos livros "OSINT do zero à Investigação Profissional" e "Manual Prático de Provas Digitais", palestrante, Diretor de Comunicação da APECOF, CEO da RC Perito Digital, professor de OSINT e Segurança Cibernética. 15+ anos de experiência em TI, cibersegurança e investigação digital. Fundador da COBRA e organizador da #semanaOSINT.',
      photoUrl: "/images/hero.png",
      photoAlt: "Romullo Carvalho - Perito Digital",
      primaryCtaText: "CONTATO",
      primaryCtaUrl: "https://wa.me/5585988405936",
      secondaryCtaText: "SAIBA MAIS",
      secondaryCtaUrl: "/sobre",
    },
  });
}

async function seedAbout() {
  await prisma.aboutContent.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      title: "Romullo Carvalho",
      quote:
        "Mesmo uma imprensa regimentada repetidamente trairá os interesses de sua nação para um observador meticuloso.",
      quoteAuthor: "William Donovan",
      paragraph1:
        'Cristão, casado, pai. Autor dos livros "OSINT do zero à Investigação Profissional" (Editora Literando) e "Manual Prático de Provas Digitais" (Editora Revista dos Tribunais). Palestrante, perito e Diretor de Comunicação na APECOF. Expert na Criminal Player, Especialista de Inteligência de Ameaças, CEO na RC Perito Digital.',
      paragraph2:
        "Professor do curso de Segurança Cibernética com Foco em DEVOPS da UNIFOR e professor de OSINT. Mais de 15 anos de experiência em TI. Graduado em Gestão de TI pela UNIFANOR, pós-graduado em Auditoria de TI pela UNIFOR, pós-graduando em Direito Digital pelo IBMEC, MBA em Inteligência Artificial pela FIAP.",
      paragraph3:
        "Perito em Computação Forense pela CertFOr, certificado em Fundamentos em Cibersegurança e Analista de Cibersegurança pela IBSEC, Fundamental and Advanced Technical Certification Axonius. Fundador da COBRA, organizador da #semanaOSINT, voluntário na ONG Marias da Internet e Projeto Justiceiras.",
      photoUrl: "/images/sobre.png",
      photoAlt: "Romullo Carvalho",
    },
  });
}

async function seedPartners() {
  const partners = [
    "APECOF",
    "ISH Tecnologia",
    "Criminal Player",
    "COBRA",
    "Verifact",
    "Editora Literando",
    "Ed. Revista dos Tribunais",
    "UNIFOR",
    "MM Forense",
    "WB Educacional",
    "Search Perícia Digital",
    "ONG Marias da Internet",
    "Projeto Justiceiras",
  ];
  for (let i = 0; i < partners.length; i++) {
    const name = partners[i];
    const existing = await prisma.partner.findFirst({ where: { name } });
    if (!existing) {
      await prisma.partner.create({
        data: { name, displayOrder: i, active: true },
      });
    }
  }
}

async function seedMissionValues() {
  const values = [
    {
      icon: "Shield",
      title: "Verdade Digital",
      description:
        "Compromisso com a verdade dos fatos digitais, fundamentado em metodologias rigorosas de investigação e análise forense.",
    },
    {
      icon: "Lock",
      title: "Ética e Segurança",
      description:
        "Atuação pautada pela ética profissional e respeito à legislação de segurança, com compromisso com a privacidade e LGPD.",
    },
    {
      icon: "Cpu",
      title: "Inovação Contínua",
      description:
        "Busca constante por novas tecnologias, ferramentas e metodologias para aprimorar a investigação digital e a cibersegurança.",
    },
  ];
  for (let i = 0; i < values.length; i++) {
    const v = values[i];
    const existing = await prisma.missionValue.findFirst({
      where: { title: v.title },
    });
    if (!existing) {
      await prisma.missionValue.create({
        data: { ...v, displayOrder: i, active: true },
      });
    }
  }
}

async function seedMilestones() {
  const milestones = [
    { year: "2012", title: "Início na Carreira de TI", description: "Suporte Técnico na FANOR — Faculdade Nordeste (09/2012 – 03/2013)." },
    { year: "2013", title: "SEJUS", description: "Suporte Técnico na Secretaria de Justiça e Cidadania (05/2013 – 05/2016)." },
    { year: "2017", title: "Segurança da Informação", description: "SAP — Secretaria de Administração Penitenciária (10/2017 – 06/2021)." },
    { year: "2019", title: "Graduação em Gestão de TI", description: "Graduado em Gestão de Tecnologia da Informação pela UNIFANOR Wyden." },
    { year: "2020", title: "Pós-graduação & Docência", description: "Audio and Image Forensics pela BLUEAD. Professor de Forense em Imagem e Internet na The Forense." },
    { year: "2021", title: "RC Perito Digital & Apura", description: "Fundação da RC Perito Digital. Cybersecurity Analyst Sales Engineer e CTI Analyst na Apura Cyber Intelligence. Professor na MM Forense e WB Educacional." },
    { year: "2022", title: "ISH Tecnologia", description: "Especialista de Inteligência de Ameaças na ISH Tecnologia. Fundação da COBRA — Comunidade de OSINT Brasileira." },
    { year: "2024", title: "Reconhecimento & Ciberseg Ofensiva", description: "Obras citadas por Ministros do STJ e STF. Pós-graduação em Cibersegurança Ofensiva pela ACADI-TI. 5ª turma do Curso de Formação em OSINT." },
  ];
  for (let i = 0; i < milestones.length; i++) {
    const m = milestones[i];
    const existing = await prisma.milestone.findFirst({ where: { year: m.year, title: m.title } });
    if (!existing) {
      await prisma.milestone.create({ data: { ...m, displayOrder: i } });
    }
  }
}

async function seedCertifications() {
  const groups: { area: string; certs: string[] }[] = [
    {
      area: "Investigação & OSINT",
      certs: [
        "Cyberwarfare (ESA OAB-SP)",
        "Threat Intelligence Starter (AFD)",
        "Combate à Fraude e Compliance em Transações Digitais (CAF Academy)",
        "Fraudes e Investigação Corporativa (Gloobal Compliance)",
        "Google Hacking Basics (XPSEC)",
        "Inteligência Cibernética em Fontes Abertas OSINT (Daryus)",
        "Inteligência Cibernética e Contrainteligência para Agentes Investigativos (Daryus)",
        "Crimes Cibernéticos: Riscos e Técnicas de Prevenção (Acadepol PCMG)",
        "Investigações Digitais: OSINT para Jornalistas e Ativistas (Open Knowledge Brasil)",
        "Inteligência e Investigação Criminal em Fontes Abertas (Revista Eletrônica Direito & TI)",
      ],
    },
    {
      area: "Análise Forense",
      certs: [
        "Expert na Comunidade Criminal Player",
        "Forense Áudio, Imagem e Vídeo Forense (Marcos Monteiro)",
        "Perito Computacional Forense (Marcos Monteiro)",
        "Investigação Forense na Internet (MM Forense)",
        "The Cyber | Congresso The Cyber Security & Forensic",
        "Curso Pedofilia: Definição e Proteção (Acadepol PCMG)",
      ],
    },
    {
      area: "Cybersecurity & Tecnologia",
      certs: [
        "CNSE — Certified Network Security Expert (ACADITI)",
        "CSAE — Certified Security Architecture Expert (ACADITI)",
        "Fundamental and Advanced Technical Certification Axonius",
        "Analista de Cibersegurança — Governança (IBSEC)",
        "Fundamentos em Cibersegurança (IBSEC)",
        "Fundamentos LGPD (CertProf)",
        "White Belt (EDTI)",
        "Segurança em Tecnologia da Informação (Fundação Bradesco)",
        "Gestão de Processos — BPM (Fundação Bradesco)",
        "Modelagem de Banco de Dados (Fundação Bradesco)",
      ],
    },
  ];
  for (const group of groups) {
    for (let i = 0; i < group.certs.length; i++) {
      const name = group.certs[i];
      const existing = await prisma.certification.findFirst({ where: { name } });
      if (!existing) {
        await prisma.certification.create({
          data: { name, area: group.area, displayOrder: i },
        });
      }
    }
  }
}

async function seedCommunities() {
  const orgs = [
    { name: "APECOF", role: "Diretor de Comunicação", description: "Associação Nacional dos Peritos em Computação Forense" },
    { name: "COBRA", role: "Fundador", description: "Comunidade de OSINT Brasileira" },
    { name: "#semanaOSINT", role: "Organizador", description: "Série de eventos e vídeos educacionais sobre OSINT" },
    { name: "Criminal Player", role: "Expert", description: "Comunidade de profissionais de investigação e forense" },
    { name: "Verifact", role: "Membro", description: "Plataforma de captura e preservação de provas digitais" },
    { name: "Search Perícia Digital", role: "Membro", description: "Rede de peritos digitais" },
    { name: "ONG Marias da Internet", role: "Perito Voluntário", description: "Segurança digital para mulheres" },
    { name: "Projeto Justiceiras", role: "Perito Voluntário", description: "Combate à violência contra a mulher" },
  ];
  for (let i = 0; i < orgs.length; i++) {
    const o = orgs[i];
    const existing = await prisma.community.findFirst({ where: { name: o.name } });
    if (!existing) {
      await prisma.community.create({ data: { ...o, displayOrder: i } });
    }
  }
}

async function seedPresentations() {
  const presentations = [
    { event: "IX Congresso Brasileiro de Direito Penal", year: "2024" },
    { event: "Media Week 2023 | SMD (UFC)", year: "2023" },
    { event: "TDIXP 2023 — Técnicas de Invasão", year: "2023" },
    { event: "Media Week 2022 | SMD (UFC)", year: "2022" },
    { event: "Congresso Nacional de Direito Informático e Novas Tecnologias | OAB-MS", year: "2022" },
    { event: "Webinário | Laforense", year: "2022" },
    { event: "Webinário | CEPEDI", year: "2022" },
    { event: "Webinário | DACLOBE", year: "2022" },
    { event: "I Cybersecurity Week | CEUPI", year: "2022" },
    { event: "Bootcamp de Proteção à Criança Online | TechKids Day", year: "2022" },
    { event: "I Taller Básico de Búsqueda de Información en Fuentes Abiertas | Policía Nacional Perú", year: "2022" },
  ];
  for (let i = 0; i < presentations.length; i++) {
    const p = presentations[i];
    const existing = await prisma.presentation.findFirst({
      where: { event: p.event, year: p.year },
    });
    if (!existing) {
      await prisma.presentation.create({ data: { ...p, displayOrder: i } });
    }
  }
}

async function seedLanguages() {
  const languages = [
    { name: "Português", level: "Nativo", skills: "Conversação, Leitura e Escrita", percentage: 100 },
    { name: "Espanhol", level: "Intermediário", skills: "Conversação, Leitura e Escrita", percentage: 60 },
    { name: "Inglês", level: "Básico", skills: "Conversação, Leitura e Escrita", percentage: 35 },
    { name: "Libras", level: "Básico", skills: "Conversação", percentage: 25 },
  ];
  for (let i = 0; i < languages.length; i++) {
    const l = languages[i];
    const existing = await prisma.spokenLanguage.findFirst({ where: { name: l.name } });
    if (!existing) {
      await prisma.spokenLanguage.create({ data: { ...l, displayOrder: i } });
    }
  }
}

async function seedMediaAppearances() {
  const tvAppearances = [
    { title: "Saiba como se proteger do golpe do pix agendado", source: "CETV 1ª Edição — Globoplay", url: "https://globoplay.globo.com/v/12557292/", type: "TV" as const },
    { title: "24% da população brasileira caiu em golpe digital", source: "CETV 1ª Edição — Globoplay", url: "https://globoplay.globo.com/v/13330287/", type: "TV" as const },
    { title: "Cuidado com o dinheiro fácil nas redes sociais", source: "CETV 1ª Edição — Globoplay", url: "https://globoplay.globo.com/v/12706798/", type: "TV" as const },
    { title: "Operação contra fraudes bancárias é realizada no Ceará", source: "CETV 2ª Edição — Globoplay", url: "https://globoplay.globo.com/v/13481761/", type: "TV" as const },
    { title: "Golpe dos Correios: veja como identificar golpes", source: "CETV 2ª Edição — Globoplay", url: "https://globoplay.globo.com/v/12821012/", type: "TV" as const },
    { title: "Especialista alerta para golpe com a chave pix", source: "CETV 1ª Edição — Globoplay", url: "https://globoplay.globo.com/v/12835569/", type: "TV" as const },
  ];
  const articles = [
    { title: "O que a internet sabe sobre você — Entrevista com Romullo Carvalho, perito digital", source: "CEPEDI UFSM", url: "https://cepediufsm.wordpress.com/2021/05/20/o-que-a-internet-sabe-sobre-voce-entrevista-com-romullo-carvalho-perito-digital/", type: "INTERVIEW" as const },
    { title: "APECOF no Congresso Nacional de Direito Informático e Novas Tecnologias — OAB/MS", source: "APECOF", url: "https://www.apecof.org.br/index.php/noticias/17-apecof-no-congresso-nacional-de-direito-informatico-e-novas-tecnologias-da-comissao-de-direito-digital-e-startups-oab-ms", type: "ARTICLE" as const },
    { title: "Três principais golpes cibernéticos de fim de ano", source: "O Povo", url: "https://www.opovo.com.br/noticias/tecnologia/opovotecnologia/2022/12/23/tres-principais-golpes-ciberneticos-de-fim-de-ano.html", type: "ARTICLE" as const },
  ];
  const all = [...tvAppearances, ...articles];
  for (let i = 0; i < all.length; i++) {
    const m = all[i];
    const existing = await prisma.mediaAppearance.findFirst({ where: { url: m.url } });
    if (!existing) {
      await prisma.mediaAppearance.create({ data: { ...m, displayOrder: i } });
    }
  }
}

async function seedVideoFeatures() {
  const semana = [
    { youtubeId: "_P9yhLtU2YY", title: "#semanaOSINT — Episódio 1" },
    { youtubeId: "2dFhbcYdfSA", title: "#semanaOSINT — Episódio 2" },
    { youtubeId: "BZOiUVZ2OVs", title: "#semanaOSINT — Episódio 3" },
    { youtubeId: "GtSlMVO0o0s", title: "#semanaOSINT — Episódio 4" },
    { youtubeId: "oNQzcUkFZP8", title: "#semanaOSINT — Episódio 5" },
    { youtubeId: "sqxV2JCasR0", title: "#semanaOSINT — Episódio 6" },
    { youtubeId: "tZwu3Gl6XRk", title: "#semanaOSINT — Episódio 7" },
    { youtubeId: "yIp0c9N8ouk", title: "#semanaOSINT — Episódio 8" },
    { youtubeId: "mL9FdaZ7UZY", title: "#semanaOSINT — Episódio 9" },
    { youtubeId: "81AP_ACog-I", title: "#semanaOSINT — Episódio 10" },
  ];
  const palestras = [
    { youtubeId: "wPNyOz6-HzA", title: "Workshop — OSINT Aplicado à Perícia" },
    { youtubeId: "gcH6mUUM5c0", title: "II Congresso Nacional de Direito Informático e Novas Tecnologias" },
  ];
  for (let i = 0; i < semana.length; i++) {
    const v = semana[i];
    const existing = await prisma.videoFeature.findFirst({ where: { youtubeId: v.youtubeId } });
    if (!existing) {
      await prisma.videoFeature.create({
        data: { ...v, section: "SEMANA_OSINT", displayOrder: i },
      });
    }
  }
  for (let i = 0; i < palestras.length; i++) {
    const v = palestras[i];
    const existing = await prisma.videoFeature.findFirst({ where: { youtubeId: v.youtubeId } });
    if (!existing) {
      await prisma.videoFeature.create({
        data: { ...v, section: "PALESTRAS_CONGRESSOS", displayOrder: i },
      });
    }
  }
}

async function seedSelectedWorks() {
  const works = [
    {
      title: "A Importância da Cadeia de Custódia",
      description:
        "Visão geral sobre Cadeia de Custódia no âmbito de evidências informáticas, baseado no Código de Processo Penal.",
      url: "https://drive.google.com/file/d/1KvZdhbk8bdM-BKS4mxGqf0Od_xHSVKW0/view",
      previewUrl:
        "https://yy7vynyrezpvfapo.public.blob.vercel-storage.com/works/cadeia-custodia-preview.jpg",
      type: "PDF Acadêmico",
      author: "Romullo Wheryko Rodrigues de Carvalho",
    },
    {
      title: "O que a internet sabe sobre você",
      description:
        "Entrevista com Romullo Carvalho sobre OSINT, privacidade digital e o que suas informações públicas revelam sobre você.",
      url: "https://cepediufsm.wordpress.com/2021/05/20/o-que-a-internet-sabe-sobre-voce-entrevista-com-romullo-carvalho-perito-digital/",
      previewUrl:
        "https://cepediufsm.wordpress.com/wp-content/uploads/2021/05/2021-05-27-thumbnail-cepedi-webinario.png?w=1080",
      type: "Webinário — CEPEDI",
      author: "Romullo Carvalho",
    },
  ];
  for (let i = 0; i < works.length; i++) {
    const w = works[i];
    const existing = await prisma.selectedWork.findFirst({ where: { url: w.url } });
    if (!existing) {
      await prisma.selectedWork.create({ data: { ...w, displayOrder: i } });
    }
  }
}

async function seedCourtCitations() {
  const citations = [
    {
      court: "STJ" as const,
      title: "Citação em Acórdão do STJ",
      description:
        "AgRg no RECURSO EM HABEAS CORPUS Nº 143.169 — Decisão do Ministro Ribeiro Dantas sobre grave quebra da cadeia de custódia em provas digitais.",
      documentUrl: "https://drive.google.com/file/d/1QNch6PKcCPba0ldFp5U0tvu56dBZjpS1/view",
    },
    {
      court: "STF" as const,
      title: "Referência em Decisão do STF",
      description:
        "AG.REG. NO HABEAS CORPUS 171.557 PARANÁ — Referência em decisão do Supremo Tribunal Federal sobre provas digitais e investigação.",
      documentUrl: "https://drive.google.com/file/d/1D69ca1eESYsRFT7YIntQ_LNLpY_LwbkX/view",
    },
  ];
  for (let i = 0; i < citations.length; i++) {
    const c = citations[i];
    const existing = await prisma.courtCitation.findFirst({ where: { documentUrl: c.documentUrl } });
    if (!existing) {
      await prisma.courtCitation.create({ data: { ...c, displayOrder: i } });
    }
  }
}

async function seedCourse() {
  await prisma.courseInfo.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      tagline: "#OSINT — CURSO FORMAÇÃO EM OSINT",
      heroTitle: "Curso Formação em",
      heroHighlight: "OSINT",
      description1:
        "O curso de OSINT mais completo do mercado, com mais de 60h de aula e muita atividade prática para treinar suas habilidades. Agora você terá acesso ao maior curso de OSINT do Brasil e poderá se capacitar para iniciar sua carreira ainda este ano.",
      description2:
        "Um curso completo, voltado para a capacitação dos princípios de investigação no ambiente virtual, utilizando a metodologia de OSINT (fontes abertas). Possui material complementar, gravação das aulas disponibilizadas até 30 dias após o curso, e exercícios práticos para imergir e treinar as habilidades de investigação na prática.",
      description3:
        "Sem pré-requisitos — voltado para advogados, peritos, policiais, investigadores particulares, jornalistas, profissionais de TI, auditores e qualquer pessoa que deseje conhecer e iniciar uma carreira como analista OSINT.",
      hoursLabel: "60h+",
      hoursDescription: "de aula",
      groupLabel: "5ª",
      groupDescription: "turma",
      certificateLabel: "Certificado",
      certificateDescription: "de 60h",
      instructor: "Romullo Carvalho",
      ctaUrl: "https://go.hotmart.com/T77442903S",
      ctaLabel: "INSCREVA-SE AGORA",
      priceLabel: "Primeiro Mês",
      priceValue: "R$6,95",
      priceOriginal: "R$14,90",
      priceSuffix: "por mês",
    },
  });

  const learnings = [
    "Identificar rastros digitais",
    "Mapear redes de influência",
    "Verificar autenticidade de mídia",
    "Ferramentas e scripts exclusivos",
    "Metodologia OSINT para investigação",
    "Entregáveis periciais profissionais",
  ];
  for (let i = 0; i < learnings.length; i++) {
    const text = learnings[i];
    const existing = await prisma.courseLearning.findFirst({ where: { text } });
    if (!existing) {
      await prisma.courseLearning.create({ data: { text, displayOrder: i } });
    }
  }

  const theoretical = [
    { title: "Apresentação e Forense Digital", topics: ["Conceitos fundamentais", "Marco legal", "Cenário brasileiro"] },
    { title: "Fundamentação Teórica e Jurídica", topics: ["Legislação aplicada", "Cadeia de custódia", "Provas digitais"] },
    { title: "Verificação de Fatos (Verifact)", topics: ["Metodologia Verifact", "Ferramentas de verificação", "Estudos de caso"] },
    { title: "Consultas Processuais", topics: ["Bases de dados públicas", "Tribunais", "Registros oficiais"] },
    { title: "Prospecção de Clientes e Formalização", topics: ["Mercado de perícia", "Propostas técnicas", "Formalização de demandas"] },
  ];
  for (let i = 0; i < theoretical.length; i++) {
    const m = theoretical[i];
    const existing = await prisma.courseModule.findFirst({
      where: { title: m.title, track: "THEORETICAL" },
    });
    if (!existing) {
      await prisma.courseModule.create({
        data: { title: m.title, topics: m.topics, track: "THEORETICAL", displayOrder: i },
      });
    }
  }

  const practical = [
    { title: "OPSEC, Buscas Online e Cyber", topics: ["Segurança operacional", "Técnicas de busca avançada", "Cyber intelligence"] },
    { title: "Investigação de Governo, Pessoas e Empresas", topics: ["Bases governamentais", "Perfis pessoais", "Due diligence"] },
    { title: "Criptomoedas e HUMINT", topics: ["Rastreamento blockchain", "Inteligência humana", "Engenharia social"] },
    { title: "Telecomunicações e SOCMINT", topics: ["Análise de telecom", "Redes sociais", "Monitoramento"] },
    { title: "Deep/Dark Web, IMINT e GEOINT", topics: ["Navegação segura", "Análise de imagens", "Geolocalização"] },
    { title: "Atuação e Entregáveis Periciais", topics: ["Laudos técnicos", "Relatórios", "Apresentação de resultados"] },
  ];
  for (let i = 0; i < practical.length; i++) {
    const m = practical[i];
    const existing = await prisma.courseModule.findFirst({
      where: { title: m.title, track: "PRACTICAL" },
    });
    if (!existing) {
      await prisma.courseModule.create({
        data: { title: m.title, topics: m.topics, track: "PRACTICAL", displayOrder: i },
      });
    }
  }

  const bonuses = [
    "Certificado de 60h",
    "Grupo WhatsApp exclusivo",
    "Atividades práticas por aula",
    "Desafios práticos",
    "Casos reais com professores",
  ];
  for (let i = 0; i < bonuses.length; i++) {
    const text = bonuses[i];
    const existing = await prisma.courseBonus.findFirst({ where: { text } });
    if (!existing) {
      await prisma.courseBonus.create({ data: { text, displayOrder: i } });
    }
  }
}

async function seedBooks() {
  const books = [
    {
      title: "Manual Prático de Provas Digitais — 1ª Edição",
      author: "Bernardo de Azevedo e Souza, Alexandre Munhoz, Romullo Carvalho",
      coverImage: "https://yy7vynyrezpvfapo.public.blob.vercel-storage.com/books/manual-provas-digitais-1ed.jpg",
      category: "forensics",
      description: "Thomson Reuters — Revista dos Tribunais",
      showOnHomepage: true,
    },
    {
      title: "Manual Prático de Provas Digitais — 2ª Edição",
      author: "Bernardo de Azevedo e Souza, Alexandre Munhoz, Romullo Carvalho",
      coverImage: "https://yy7vynyrezpvfapo.public.blob.vercel-storage.com/books/manual-provas-digitais-2ed.jpg",
      category: "forensics",
      description: "Thomson Reuters — Revista dos Tribunais",
      showOnHomepage: true,
    },
    {
      title: "Manual Prático de Provas Digitais — 3ª Edição",
      author: "Bernardo de Azevedo e Souza, Alexandre Munhoz, Romullo Carvalho",
      coverImage: "https://yy7vynyrezpvfapo.public.blob.vercel-storage.com/books/manual-provas-digitais-3ed.jpg",
      category: "forensics",
      description: "Thomson Reuters — Revista dos Tribunais",
      showOnHomepage: true,
    },
    {
      title: "OSINT do Zero à Investigação Profissional",
      author: "Romullo W. R. de Carvalho (Organizador)",
      coverImage: "https://yy7vynyrezpvfapo.public.blob.vercel-storage.com/books/osint-zero-investigacao.jpg",
      category: "osint",
      description: "Literando",
      showOnHomepage: true,
    },
  ];
  for (const b of books) {
    const existing = await prisma.book.findFirst({ where: { title: b.title } });
    if (!existing) {
      await prisma.book.create({ data: b });
    }
  }
}

async function seedPageSeo() {
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
}

async function main() {
  await seedAuth();
  await seedSiteConfig();
  await seedHero();
  await seedAbout();
  await seedPartners();
  await seedMissionValues();
  await seedMilestones();
  await seedCertifications();
  await seedCommunities();
  await seedPresentations();
  await seedLanguages();
  await seedMediaAppearances();
  await seedVideoFeatures();
  await seedSelectedWorks();
  await seedCourtCitations();
  await seedCourse();
  await seedBooks();
  await seedPageSeo();
  console.log("Seed concluído com sucesso");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
