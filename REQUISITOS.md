# DOCUMENTO DE REQUISITOS - RC Perito Digital

## Site pessoal/profissional de Romullo Carvalho - Perito Digital e Especialista em Forense, OSINT e CTI

---

## 1. VISAO GERAL DO PROJETO

### 1.1 Descricao
Site profissional para **Romullo Carvalho**, especialista em computacao forense e pericia digital. O site serve como portfolio, blog tecnico, vitrine de cursos e hub de conteudo multimedia (YouTube Shorts, Instagram). Possui painel administrativo completo com tema visual "Cyber-Noir" (dark theme com estetica hacker/matrix).

> **Nota:** O site atual (romullocarvalho.com.br) esta hospedado no Google Sites, com limitacoes severas de SEO, performance e customizacao. O novo site substituira completamente essa versao.

### 1.2 Perfil Profissional Completo (conteudo real do site atual)
- **Nome:** Romullo Carvalho
- **Titulo:** Perito Digital e Especialista em Forense, OSINT e CTI
- **Cargos atuais:**
  - CEO da RC Perito Digital
  - Professor de OSINT e Investigacao (RC Perito Digital, desde 04/2021)
  - Especialista em Inteligencia de Ameacas (ISH Tecnologia, desde 08/2022)
  - Professor OSINT e Forense na Internet (MM Forense, desde 03/2023)
  - Professor OSINT (WB Educacional, desde 05/2022)
  - Professor de Cybersecurity com foco em DevOps (UNIFOR)
  - Diretor de Comunicacao da APECOF (Associacao Nacional de Peritos em Computacao Forense)
  - Expert no Criminal Player
- **Experiencia anterior:**
  - Cybersecurity Analyst Sales Engineer (Apura Cyber Intelligence, 02/2021 - 07/2022)
  - Cyber Threat Intelligence Analyst (Apura Cyber Intelligence, 10/2021 - 03/2022)
  - Professor Forense em Imagem e Internet (The Forense, 07/2020 - 10/2020)
  - Seguranca da Informacao (SAP - Secretaria de Administracao Penitenciaria, 10/2017 - 06/2021)
  - Suporte Tecnico (SEJUS, 05/2013 - 05/2016)
  - Suporte Tecnico (FANOR, 09/2012 - 03/2013)
- **Formacao academica:**
  - Ciberseguranca Ofensiva (ACADI-TI, 2023, cursando)
  - Pos-graduacao em Audio e Pericia em Imagem (BLUEAD, 2020)
  - Graduacao em Gestao de TI (UNIFANOR Wyden, 2019)
- **Certificacoes:**
  - CNSE (Certified Network Security Expert)
  - CSAE (Certified Security Architecture Expert)
  - White Belt (EDTI)
  - LGPD Fundamentals
  - Cybersecurity Fundamentals e Analyst (IBSEC)
  - Axonius Technical Certifications
  - Cyberwarfare (ESA OAB-SP)
  - Threat Intelligence Starter (AFD)
  - Combate a Fraude e Compliance em Transacoes Digitais (CAF Academy)
  - Fraudes e Investigacao Corporativa (Gloobal Compliance)
  - Google Hacking Basics (XPSEC)
  - Inteligencia Cibernetica em Fontes Abertas OSINT (Daryus)
  - Inteligencia Cibernetica e Contrainteligencia (Daryus)
  - Crimes Ciberneticos
- **Livros publicados:**
  - "OSINT do Zero a Investigacao Profissional" (Editora Literando)
  - "Manual Pratico de Provas Digitais" (Editora Revista dos Tribunais)
- **Comunidades e voluntariado:**
  - Fundador da COBRA (Comunidade de OSINT Brasileira)
  - Organizador da #semanaOSINT
  - Voluntario na ONG Marias da Internet
  - Voluntario no Projeto Justiceiras
  - Membro da APECOF
  - Membro do Verifact
- **15+ anos de experiencia em TI**
- **Contato profissional:** contato@rcperitodigital.com.br | WhatsApp: (85) 98840-5936
- **Redes sociais:**
  - LinkedIn: linkedin.com/in/romullocarvalho
  - Instagram: instagram.com/romullo_carvalho
  - YouTube: youtube.com/c/RomulloCarvalho
  - X (Twitter): x.com/romullo_c
  - Facebook: facebook.com/romullo.carvalho

### 1.3 Identidade Visual
- **Tema:** Dark/Cyber-Noir - fundo escuro (#0a0a0a a #0d1117) com acentos em verde neon (#00ff41 / #00d632)
- **Tipografia:** Fonte monoesoacada estilo terminal (ex: JetBrains Mono, Fira Code, Source Code Pro) para titulos; sans-serif limpa para corpo de texto
- **Elementos visuais:** Bordas com glow verde neon, efeitos de scanline/matrix, molduras hexagonais para fotos de perfil, icones estilo terminal/hacker, circuitos decorativos nos cantos
- **Logo:** Simbolo "RC" estilizado com lupa digital e impressao digital em verde, disponivel em versoes: completa (horizontal), icone (favicon), branca, branca+verde
- **Paleta de cores:**
  - Fundo principal: #0a0a0a / #0d1117
  - Fundo secundario/cards: #161b22 / #1a1f26
  - Verde neon primario: #00ff41
  - Verde secundario: #00d632
  - Texto principal: #e6edf3
  - Texto secundario: #8b949e
  - Bordas: #30363d com glow verde
  - Destaque/hover: verde neon com opacidade

---

## 2. ARQUITETURA DO SITE

### 2.1 Paginas Publicas (Frontend)
1. **Home** (`/`)
2. **Artigos/Blog** (`/artigos`)
3. **Artigo Detalhe** (`/artigos/:slug`)
4. **Sobre** (`/sobre`)
5. **Curso OSINT** (`/curso-osint`)

### 2.2 Paginas Administrativas (Backend/CMS)
1. **Dashboard** (`/admin`)
2. **Blog - Listagem** (`/admin/blog`)
3. **Blog - Editor** (`/admin/blog/:id`)
4. **Shorts - Listagem** (`/admin/shorts`)
5. **Shorts - Editor** (`/admin/shorts/:id`)
6. **Instagram - Listagem** (`/admin/instagram`)
7. **Instagram - Editor** (`/admin/instagram/:id`)
8. **Livros - Listagem** (`/admin/livros`)
9. **Livros - Editor** (`/admin/livros/:id`)
10. **FAQ - Listagem** (`/admin/faq`)
11. **FAQ - Editor** (`/admin/faq/:id`)
12. **Configuracoes - SEO Metadata** (`/admin/configuracoes/seo`)
13. **Configuracoes - Redes Sociais** (`/admin/configuracoes/social`)
14. **Configuracoes - Geral** (`/admin/configuracoes/geral`)

---

## 3. PAGINAS PUBLICAS - REQUISITOS DETALHADOS

### 3.1 HEADER (Global - todas as paginas)
- Logo "RC Perito Digital" no canto esquerdo
- Menu de navegacao centralizado com links: **Home**, **Artigos**, **Sobre**, **Curso OSINT**
- Icone de busca (lupa) no canto direito
- Header fixo (sticky) no topo ao rolar a pagina
- **Responsivo:** menu hamburguer em telas menores (< 768px) com drawer lateral ou dropdown

### 3.2 FOOTER (Global - todas as paginas)
- Links de navegacao: RC Perito Digital | Artigos | Sobre | Curso OSINT
- Icones de redes sociais com links reais:
  - Instagram: instagram.com/romullo_carvalho
  - YouTube: youtube.com/c/RomulloCarvalho
  - LinkedIn: linkedin.com/in/romullocarvalho
  - X (Twitter): x.com/romullo_c
  - Facebook: facebook.com/romullo.carvalho
- E-mail de contato: contato@rcperitodigital.com.br
- Copyright: "© 2024 RC Perito Digital"
- **Responsivo:** links empilhados verticalmente em mobile

---

### 3.3 HOME (`/`)

#### 3.3.1 Hero Section
- **Layout:** Texto a esquerda, foto de Romullo a direita
- **Conteudo:**
  - Seta decorativa "> " antes do nome
  - Nome grande: "ROMULLO CARVALHO"
  - Subtitulo: "PERITO DIGITAL E ESPECIALISTA EM FORENSE, OSINT E CTI"
  - Bio resumida: Autor de dois livros, palestrante, diretor de comunicacao da APECOF, CEO da RC Perito Digital, 15+ anos em TI
  - Botao CTA verde: "CONTATO >" (estilo terminal)
- **Foto:** Imagem do profissional com moldura hexagonal e borda com glow verde
- **Responsivo:** Em mobile, foto acima e texto abaixo, centralizado

#### 3.3.2 Trust Bar (Barra de Confianca)
- Faixa horizontal abaixo do hero
- Logos de parceiros, instituicoes e certificacoes reais:
  - APECOF, ISH Tecnologia, Criminal Player, COBRA, Verifact
  - Editora Literando, Editora Revista dos Tribunais (livros publicados)
  - UNIFOR, MM Forense, WB Educacional (instituicoes de ensino)
- Scroll horizontal automatico (marquee infinito) ou estilizado
- **Responsivo:** Scroll horizontal touch-friendly em mobile

#### 3.3.3 Secao "Trabalhos Selecionados"
- Titulo com seta decorativa: "> TRABALHOS SELECIONADOS"
- Grid de 3 cards com imagens de trabalhos/relatorios
- Conteudo real inclui:
  - "A Importancia da Cadeia de Custodia" (PDF/documento)
  - Entrevistas publicadas (ex: "O que a internet sabe sobre voce" - CEPED UFSM)
  - Trabalhos citados em investigacoes e casos reais
- Cada card possui:
  - Imagem de capa (relatorio forense, investigacao etc.)
  - Titulo do trabalho
  - Efeito hover com overlay verde
  - Link para o conteudo (PDF externo, artigo etc.)
- **Responsivo:** 1 coluna em mobile, 2 em tablet, 3 em desktop

#### 3.3.3b Secao "Obras Citadas por Ministros do STJ e STF" (NOVA)
- Titulo: "> OBRAS CITADAS POR MINISTROS DO STJ E STF"
- Secao de destaque/credibilidade mostrando que os trabalhos do profissional foram referenciados por ministros dos tribunais superiores brasileiros
- Cards ou lista com:
  - Nome da obra/trabalho citado
  - Contexto da citacao (qual ministro, qual caso)
  - Link para a decisao/acordao se disponivel
- Visual com destaque especial (borda dourada ou verde mais intensa) para enfatizar a autoridade
- **Responsivo:** Cards empilhados em mobile

#### 3.3.4 Secao "Shorts"
- Titulo: "> SHORTS" com link "VER MAIS" a direita
- Carrossel horizontal com 4-5 thumbnails de videos do YouTube Shorts
- Cada card possui:
  - Thumbnail vertical (proporcao 9:16)
  - Icone de play overlay
  - Titulo do video na parte inferior
  - Borda verde neon
- Clique abre o video (modal ou link externo para YouTube)
- **Responsivo:** Carrossel deslizavel com touch/swipe em mobile, mostrando 2-3 cards

#### 3.3.5 Secao "Instagram"
- Titulo: "> INSTAGRAM"
- Botao "FOLLOW @ROMULLO" centralizado
- Grid de posts do Instagram (4-6 imagens)
- Cada card possui:
  - Preview da imagem do post
  - Efeito hover mostrando overlay
  - Moldura com borda verde
- **Responsivo:** Grid 2x2 em mobile, 3x2 em tablet, 4+ em desktop

#### 3.3.6 Secao "Livros Recomendados"
- Titulo: "> LIVROS RECOMENDADOS"
- Carrossel horizontal com capas de livros
- Cada item possui:
  - Capa do livro
  - Borda/moldura estilo terminal
- Clique redireciona para link de afiliado
- **Responsivo:** Scroll horizontal em mobile

---

### 3.4 ARTIGOS / BLOG (`/artigos`)

#### 3.4.1 Hero do Blog
- Artigo em destaque no topo com:
  - Imagem de fundo grande
  - Tag/label "ARTIGO EM DESTAQUE"
  - Titulo do artigo em fonte grande
  - Descricao/resumo do artigo
  - Data de publicacao + tempo de leitura (ex: "05 MAI 2024 | 8 MIN LEITURA")
  - Botao "LER MAIS"
- **Responsivo:** Imagem de fundo com overlay escuro e texto sobre a imagem em mobile

#### 3.4.2 Filtro por Categorias
- Icones circulares clicaveis para filtrar artigos por categoria:
  - **Forense Digital** (icone de lupa)
  - **OSINT** (icone de olho/alvo)
  - **CTI** (icone de escudo)
  - **Ferramentas** (icone de engrenagem)
  - **Webinarios** (icone de video)
- **Responsivo:** Scroll horizontal em mobile

#### 3.4.3 Grid de Artigos
- Cards de artigo em grid com:
  - Imagem de capa a esquerda (ou acima em cards menores)
  - Titulo do artigo
  - Descricao/resumo (2-3 linhas)
  - Data + tempo de leitura
  - Botao "LER MAIS" verde
  - Borda verde sutil
- Paginacao ou "load more" no final
- **Responsivo:** Cards empilhados verticalmente (1 coluna) em mobile, 2 colunas em tablet

---

### 3.5 ARTIGO DETALHE (`/artigos/:slug`)

#### 3.5.1 Cabecalho do Artigo
- Titulo grande (H1)
- Informacoes do autor: avatar + nome "Romullo Carvalho" + data de publicacao

#### 3.5.2 Corpo do Artigo
- Texto formatado com suporte a Markdown/Rich Text:
  - Titulos (H1, H2, H3)
  - Paragrafos
  - **Blocos de codigo** com syntax highlighting (tema escuro/terminal) - essencial para artigos tecnicos
  - Listas ordenadas e nao-ordenadas
  - Imagens inline
  - Links
  - Blockquotes
  - Tabelas
- **Blocos de codigo** com estilo de terminal (fundo preto, texto verde, com prompt `$` ou `>`)

#### 3.5.3 Sidebar Direita
- **Sumario (Table of Contents):**
  - Lista de links para as secoes do artigo (H2/H3)
  - Navegacao sticky que acompanha a rolagem
  - Destaque visual da secao ativa
- **Artigos Relacionados:**
  - Lista de 3-4 artigos relacionados com links

#### 3.5.4 Area Inferior
- **Compartilhamento social:** Icones para LinkedIn, X, Facebook, copiar link
- **Newsletter CTA:**
  - Texto: "Inscreva-se na minha Newsletter"
  - Campo de e-mail
  - Botao "INSCREVER-SE" verde
- **Responsivo:** Sidebar vai para baixo do artigo em mobile; sumario vira dropdown colapsavel

---

### 3.6 SOBRE (`/sobre`)

#### 3.6.1 Hero da Pagina Sobre
- Nome grande: "Romullo Carvalho"
- Epigrafe/citacao de destaque: *"Mesmo uma imprensa regimentada repetidamente traira os interesses de sua nacao para um observador meticuloso"* - William Donovan
- Texto descritivo sobre expertise em pericia digital, forense, OSINT, CTI, inteligencia de ameacas ciberneticas e pericia em audio/imagem
- Foto com moldura hexagonal a direita (ou acima em mobile)
- **Responsivo:** Layout empilhado em mobile

#### 3.6.2 Secao "Missao e Valores"
- 3 cards em grid horizontal:
  - **Verdade Digital** - icone de escudo + texto descritivo
  - **Etica e Seguranca** - icone de cadeado + texto descritivo
  - **Inovacao Continua** - icone de foguete/chip + texto descritivo
- Cada card com icone verde, titulo e paragrafo
- **Responsivo:** Cards empilhados verticalmente em mobile

#### 3.6.3 Linha do Tempo Profissional (dados reais)
- Timeline vertical com marcos cronologicos reais:
  - **2012** - Inicio na carreira de TI (Suporte Tecnico na FANOR)
  - **2013-2016** - Suporte Tecnico na SEJUS (Secretaria de Justica e Cidadania)
  - **2017-2021** - Seguranca da Informacao na SAP (Secretaria de Administracao Penitenciaria)
  - **2019** - Graduacao em Gestao de TI (UNIFANOR Wyden)
  - **2020** - Pos-graduacao em Audio e Pericia em Imagem (BLUEAD)
  - **2021** - Fundacao da RC Perito Digital + Ingresso na Apura Cyber Intelligence
  - **2022** - Especialista em Inteligencia de Ameacas na ISH Tecnologia
  - **2023** - Pos-graduacao em Ciberseguranca Ofensiva (ACADI-TI) + Lancamento do Curso OSINT (5a turma)
- Cada marco com:
  - Ano destacado em verde grande
  - Titulo do evento
  - Descricao breve
  - Linha vertical conectando os marcos com ponto verde
- **Responsivo:** Timeline se adapta para formato linear em mobile mantendo legibilidade

#### 3.6.4 Secao "Certificacoes e Formacao" (NOVA - dados do site atual)
- Grid ou lista visual das certificacoes obtidas (ver secao 1.2 para lista completa)
- Agrupadas por area: Investigacao/OSINT, Cybersecurity, Compliance/LGPD
- Cada certificacao com: nome, instituicao emissora, icone/badge
- **Responsivo:** Grid 2 colunas em tablet, 1 coluna em mobile

#### 3.6.5 Secao "Comunidades e Voluntariado" (NOVA - dados do site atual)
- Cards ou badges das organizacoes:
  - APECOF (Diretor de Comunicacao)
  - COBRA - Comunidade de OSINT Brasileira (Fundador)
  - #semanaOSINT (Organizador)
  - Verifact (Membro)
  - ONG Marias da Internet (Voluntario)
  - Projeto Justiceiras (Voluntario)
- **Responsivo:** Grid flexivel

#### 3.6.6 Secao "Livros Publicados" (NOVA - dados do site atual)
- Destaque para os 2 livros de autoria propria:
  - "OSINT do Zero a Investigacao Profissional" (Editora Literando) - capa + sinopse + link de compra
  - "Manual Pratico de Provas Digitais" (Editora Revista dos Tribunais) - capa + sinopse + link de compra
- Layout com capa do livro a esquerda e descricao a direita
- Botao de compra/afiliado para cada livro
- **Responsivo:** Layout empilhado em mobile

---

### 3.7 CURSO OSINT (`/curso-osint`)

#### 3.7.1 Hero do Curso
- Titulo grande: "Domine a Investigacao Digital"
- Video de apresentacao com thumbnail (player embutido)
- **Responsivo:** Video responsivo 16:9

#### 3.7.2 Curriculum / Ementa (dados reais do curso - 5a turma, 60h+)
- Accordion/Dropdown com modulos organizados em duas trilhas:

  **Trilha Teorica:**
  - Apresentacao e Forense Digital
  - Fundamentacao Teorica e Juridica
  - Verificacao de Fatos (Verifact)
  - Consultas Processuais
  - Prospeccao de Clientes e Formalizacao de Demandas

  **Trilha Pratica:**
  - OPSEC, Buscas Online e Cyber
  - Investigacao de Governo, Pessoas e Empresas
  - Criptomoedas e HUMINT
  - Telecomunicacoes e SOCMINT
  - Deep/Dark Web, IMINT e GEOINT
  - Atuacao e Entregaveis Periciais

- Icone de seta para expandir/colapsar cada modulo
- **Responsivo:** Full-width com padding ajustado

#### 3.7.3 "O que voce vai aprender"
- Grid 2x3 com checkmarks verdes:
  - Identificar rastros digitais
  - Mapear redes de influencia
  - Verificar autenticidade de midia
  - Ferramentas e scripts exclusivos
  - Uso de metodologia OSINT para investigacao virtual
  - Entregaveis periciais profissionais
- **Responsivo:** 1 coluna em mobile

#### 3.7.4 Pricing (Preco)
- Card de preco centralizado com:
  - Label: "Primeiro Mes" (ou plano)
  - Preco destacado em verde: "R$6,95"
  - Preco original riscado: "R$14,90"
  - Texto "por mes"
  - Lista de bonus inclusos:
    - Certificado de 60h
    - Grupo WhatsApp exclusivo para networking
    - Atividades praticas por aula
    - Desafios praticos
    - Possibilidade de casos reais com professores
  - Botao CTA grande verde: "INSCREVER-SE AGORA" (link Hotmart)
- **Responsivo:** Card full-width em mobile

#### 3.7.5b Secao de Contato do Curso (NOVA)
- E-mail: contato@rcperitodigital.com.br
- WhatsApp: (85) 98840-5936 com botao direto para WhatsApp
- CTA alternativo para quem tem duvidas antes de comprar

#### 3.7.5 Newsletter CTA
- Mesmo componente reutilizado do artigo detalhe
- Campo de e-mail + botao "INSCREVER-SE"

---

## 4. PAINEL ADMINISTRATIVO - REQUISITOS DETALHADOS

### 4.1 LAYOUT GERAL DO ADMIN
- **Tema visual:** Cyber-Noir Admin - fundo escuro, bordas verdes neon, tipografia monoesoacada
- **Sidebar esquerda fixa** com:
  - Titulo "CYBER-NOIR ADMIN"
  - Icones + labels para cada secao: Dashboard, Blog, Shorts, Instagram, Livros, FAQ
  - "System Terminal" decorativo na parte inferior (exibe usuario e status)
- **Barra inferior:** Informacoes de sessao - USER, ROLE (ADMIN), SESSION ID, ENCRYPTION
- **Responsivo Admin:** Sidebar colapsavel em icones em tablet; drawer overlay em mobile

---

### 4.2 DASHBOARD (`/admin`)

#### 4.2.1 System Status
- **Grafico de linha:** Page Views dos ultimos 7 dias (grafico com linha verde em fundo escuro)
- **Metricas numéricas:**
  - ACTIVE_USERS
  - SERVER_UPTIME (porcentagem)
  - SECURITY_ALERTS
  - LAST_BACKUP (data/hora UTC)
- **Gauges circulares (3):**
  - CPU Load (porcentagem)
  - RAM Usage (porcentagem)
  - Network Traffic (porcentagem)

#### 4.2.2 Recent Articles Management
- Tabela com colunas: ARTICLE ID | TITLE | AUTHOR | DATE PUBLISHED | STATUS | ACTIONS
- Status com badges coloridos: PUBLISHED (verde), DRAFT (amarelo)
- Acoes: [EDIT] [DELETE]

#### 4.2.3 Content Integration
- Campo para colar link de post do Instagram com botao de copiar/fetch
- Campo para colar link de YouTube Shorts com botao de copiar/fetch
- Esses campos servem para importacao rapida de conteudo externo

---

### 4.3 BLOG - LISTAGEM (`/admin/blog`)

#### 4.3.1 Barra Superior
- Campo de busca: "Search articles..."
- Botao "+ NOVO ARTIGO" (verde)

#### 4.3.2 Tabela de Artigos
- Colunas: TITLE | DATE | CATEGORY | STATUS | VIEWS | ACTIONS
- Categorias: OSINT, FORENSE, etc.
- Status: PUBLISHED, DRAFT
- Views: contador numerico
- Acoes: [VISUALIZAR] [EDITAR] [EXCLUIR] — cada acao como botao de texto verde entre colchetes
- Paginacao na parte inferior

---

### 4.4 BLOG - EDITOR (`/admin/blog/:id`)

#### 4.4.1 Campo de Titulo
- Input de texto grande para o titulo do artigo

#### 4.4.2 Editor Rich Text (WYSIWYG)
- Toolbar com botoes:
  - **B** (bold), **I** (italico), **U** (underline)
  - Lista ordenada, lista nao-ordenada
  - Link
  - Imagem
  - Codigo inline `<>`
  - H1, H2
  - Bloco de codigo
- Area de edicao grande com preview de conteudo
- Toggle "PREVIEW ON/OFF" para visualizar como ficara publicado

#### 4.4.3 Sidebar de Metadata (direita)
- **Category:** Dropdown com opcoes (Digital Forensics, OSINT, Cybersecurity)
- **SEO Keywords:** Tags clicaveis (ex: [OSINT] [Malware Analysis] [2025]) com possibilidade de adicionar novas
- **Featured Image:** Area de upload com preview da imagem + botao "UPLOAD IMAGE"
- **Scheduling:** Campos de data (date picker) + hora para agendamento
- **Status:** Dropdown com opcoes (Draft, Scheduled, Published)

#### 4.4.4 Botoes de Acao
- "SALVAR RASCUNHO" (botao outline/secundario)
- "PUBLICAR AGORA" (botao verde solido/primario)

---

### 4.5 SHORTS - LISTAGEM (`/admin/shorts`)

#### 4.5.1 Cabecalho
- Titulo: "SHORTS CONTENT MANAGEMENT"
- Contador: "Total Shorts: 42"
- Botao "+ ADD NEW SHORT"

#### 4.5.2 Tabela de Shorts
- Colunas: THUMBNAIL | TITLE/DESCRIPTION | YOUTUBE LINK | DATE ADDED | STATUS | ACTIONS
- Thumbnail: miniatura do video
- YouTube Link: URL truncada
- Status: LIVE (verde), PENDING (amarelo)
- Acoes: [EDIT] [DELETE] [REMOVE]

---

### 4.6 SHORTS - EDITOR (`/admin/shorts/:id`)

#### 4.6.1 Preview de Video
- Player de video embutido a esquerda com controles (play, timeline, duracao)

#### 4.6.2 Formulario (direita)
- **Video Title:** input de texto
- **Short Description:** textarea
- **Category Tags:** tags estilizadas (ex: #OSINT, #Forensics, #CyberSecurity) + campo para adicionar nova tag
- **Botao "REFRESH LINK":** para atualizar metadados do YouTube
- **Botao "UPDATE":** verde grande para salvar

---

### 4.7 INSTAGRAM - LISTAGEM (`/admin/instagram`)

#### 4.7.1 Cabecalho
- Titulo: "INSTAGRAM CONTENT MANAGEMENT"
- Contador: "Total Instagram: 42"
- Botao "+ ADD INSTAGRAM LINK"

#### 4.7.2 Tabela de Posts
- Colunas: THUMBNAIL | TITLE/DESCRIPTION | INSTAGRAM URL | DATE ADDED | STATUS | ACTIONS
- Status: LIVE, HIDDEN
- Acoes: [EDIT] [DELETE] [REMOVE]

---

### 4.8 INSTAGRAM - EDITOR (`/admin/instagram/:id`)

#### 4.8.1 Preview do Post
- Mockup de post do Instagram a esquerda (simulando o frame do app Instagram)
- Exibe a imagem com layout visual de post

#### 4.8.2 Formulario (direita)
- **Original Link:** input com URL do post original
- **Botao "FETCH METADATA":** para buscar dados automaticamente do link
- **Post Caption Override:** textarea para editar/sobrescrever a legenda
- **Category Tags:** campo de tags
- **Botao "UPDATE POST":** verde grande

---

### 4.9 LIVROS - LISTAGEM (`/admin/livros`)

#### 4.9.1 Cabecalho
- Titulo: "RECOMMENDED BOOKS LISTING"
- Botao "+ ADD NEW BOOK"

#### 4.9.2 Tabela de Livros
- Colunas: BOOK COVER | TITLE | AUTHOR | CATEGORY | STATUS | ACTIONS
- Book Cover: miniatura da capa do livro
- Category: FORENSICS, INTELLIGENCE, MALWARE, PROGRAMMING
- Status: SHOW, HIDE
- Acoes: [EDIT] [REMOVE] — entre colchetes, estilo terminal

---

### 4.10 LIVROS - EDITOR (`/admin/livros/:id`)

#### 4.10.1 Preview da Capa
- Imagem grande da capa do livro a esquerda com moldura verde

#### 4.10.2 Formulario (direita)
- **Book Title:** input de texto
- **Author:** input de texto
- **Affiliate Link:** input de URL para link de afiliado
- **Category:** dropdown (OSINT, Digital Forensics, Cybersecurity)
- **Show on Homepage:** toggle switch ON/OFF
- **Description:** editor rich text com toolbar (B, I, U, listas, links etc.)
- **Botao "SAVE CHANGES":** verde grande

---

### 4.11 FAQ - LISTAGEM (`/admin/faq`)

#### 4.11.1 Cabecalho
- Titulo: "FAQ MANAGEMENT LISTING"
- Botao "+ ADICIONAR PERGUNTA"

#### 4.11.2 Tabela de FAQs
- Colunas: QUESTION | CATEGORY | ORDER | STATUS | ACTIONS
- Category: GENERAL, OSINT, FORENSIC
- Order: numero (1, 2, 3...) para controle de ordenacao
- Status: VISIBLE, HIDDEN
- Acoes: [EDITAR] [REMOVE]

---

### 4.12 FAQ - EDITOR (`/admin/faq/:id`)

#### 4.12.1 Formulario
- **Question:** input de texto grande
- **Answer:** editor rich text com toolbar (B, I, U, link, listas)
- **Category:** dropdown (Account Management, OSINT, Forensic, General)
- **Display Order:** input numerico
- **Publish to Site:** toggle switch ON/OFF
- **Botao "SAVE CHANGES":** verde grande

---

### 4.13 CONFIGURACOES - SEO METADATA (`/admin/configuracoes/seo`)

#### 4.13.1 Formulario
- **Site Title:** input de texto
- **Meta Description:** editor rich text com toolbar para formatacao
- **Primary Keywords:** tags clicaveis com botao de remover (ex: [DIGITAL FORENSICS] [OSINT] [VLORIUM] [FORENSICS])
- **Google Analytics ID:** input de texto para inserir o tracking ID
- **Botao "SAVE CONFIGURATION":** verde grande

---

### 4.14 CONFIGURACOES - REDES SOCIAIS (`/admin/configuracoes/social`)

#### 4.14.1 Formulario
- Campos de URL para cada rede social, cada um com icone da rede a esquerda:
  - **LinkedIn:** input com URL (ex: https://linkedin.com/in/romullocarvalho)
  - **Instagram:** input com URL (ex: https://instagram.com/romullo_carvalho)
  - **YouTube:** input com URL (ex: https://youtube.com/c/RomulloCarvalho)
  - **X (Twitter):** input com URL (ex: https://x.com/romullo_c)
  - **Facebook:** input com URL (ex: https://facebook.com/romullo.carvalho)
- **Botao "SAVE CONFIGURATION":** verde grande

---

### 4.15 CONFIGURACOES - GERAL (`/admin/configuracoes/geral`)

#### 4.15.1 Formulario
- **Logo Upload:** area de upload com preview circular/hexagonal da logo atual
- **Favicon Upload:** area de upload com preview do favicon
- **Contact Email:** input de texto (ex: support@pericia.com)
- **System Timezone:** dropdown de timezones
- **Maintenance Mode:** toggle switch ON/OFF
- **Botao "SAVE CONFIGURATION":** verde grande

---

## 5. REQUISITOS DE RESPONSIVIDADE

### 5.1 Breakpoints
| Breakpoint | Largura | Dispositivo |
|---|---|---|
| xs | < 480px | Smartphones pequenos |
| sm | 480px - 767px | Smartphones |
| md | 768px - 1023px | Tablets |
| lg | 1024px - 1279px | Laptops |
| xl | 1280px - 1535px | Desktops |
| 2xl | >= 1536px | Monitores grandes |

### 5.2 Regras Gerais de Responsividade
- **Mobile-first:** CSS escrito primeiro para mobile, expandindo para desktop com media queries
- **Grids fluidos:** Uso de CSS Grid e Flexbox com unidades relativas (%, vw, rem)
- **Imagens responsivas:** Uso de `srcset`, `sizes`, tag `<picture>` e formatos modernos (WebP, AVIF)
- **Tipografia fluida:** `clamp()` para font-sizes que escalam suavemente entre breakpoints
- **Touch targets:** Minimo de 44x44px para areas clicaveis em mobile
- **Sem scroll horizontal:** Nenhum conteudo deve causar overflow horizontal
- **Carrosseis:** Todos os carrosseis devem suportar swipe/touch em dispositivos moveis
- **Tabelas admin:** Em mobile, tabelas devem virar cards empilhados ou ter scroll horizontal com indicador visual
- **Sidebar admin:** Em mobile, vira drawer overlay com botao hamburguer; em tablet, colapsa para somente icones
- **Modais/overlays:** Full-screen em mobile com botao de fechar acessivel
- **Video players:** Responsivos mantendo aspect ratio (16:9 ou 9:16 conforme o conteudo)

---

## 6. REQUISITOS DE SEO

### 6.1 SEO Tecnico
- **SSR/SSG:** Renderizacao no servidor (Server-Side Rendering) ou geracao estatica (Static Site Generation) para garantir que crawlers indexem todo o conteudo
- **Meta tags por pagina:**
  - `<title>` unico e descritivo (max 60 caracteres)
  - `<meta name="description">` unico (max 160 caracteres)
  - `<meta name="keywords">` com palavras-chave relevantes
  - `<meta name="robots" content="index, follow">`
  - `<link rel="canonical">` para evitar conteudo duplicado
- **Open Graph (Facebook/LinkedIn):**
  - `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`
- **Twitter Cards:**
  - `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:site`
- **Favicon:** Multiplos tamanhos (16x16, 32x32, 180x180 Apple Touch, Android Chrome 192x192 e 512x512)

### 6.2 Estrutura de HTML Semantico
- Uso correto de tags semanticas: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`
- Hierarquia de headings correta: apenas 1 `<h1>` por pagina, seguido de `<h2>`, `<h3>` etc.
- Atributo `alt` descritivo em todas as imagens
- Atributo `lang="pt-BR"` no `<html>`
- Links com texto descritivo (nao "clique aqui")
- Breadcrumbs com markup semantico nas paginas internas

### 6.3 Schema.org / Structured Data (JSON-LD)
- **Pagina Home:**
  - `Person` schema para Romullo Carvalho (nome, cargo, imagem, redes sociais, sameAs com todas as URLs sociais)
  - `WebSite` schema com SearchAction
  - `Organization` schema para RC Perito Digital (CEO: Romullo Carvalho)
- **Paginas de Artigos:**
  - `Article` ou `BlogPosting` schema (titulo, autor, data publicacao, imagem, descricao)
  - `BreadcrumbList` schema
- **Pagina Sobre:**
  - `Person` schema completo com:
    - `hasOccupation` (Perito Digital, Professor, Especialista em Inteligencia de Ameacas)
    - `alumniOf` (UNIFANOR Wyden, BLUEAD, ACADI-TI)
    - `memberOf` (APECOF, COBRA, Verifact)
    - `worksFor` (RC Perito Digital, ISH Tecnologia, UNIFOR, MM Forense, WB Educacional)
    - `author` (referencia aos 2 livros publicados)
    - `hasCredential` (CNSE, CSAE, certificacoes listadas)
    - `knowsAbout` (OSINT, Digital Forensics, CTI, Cybersecurity)
- **Pagina Curso:**
  - `Course` schema (nome: "Formacao em OSINT", descricao, provedor: RC Perito Digital, duracao: 60h+)
  - `Offer` schema para pricing (R$6,95/mes)
  - `EducationalOccupationalProgram` com syllabus
- **FAQ (se exibido publicamente):**
  - `FAQPage` schema com `Question` e `Answer`
- **Livros publicados pelo autor:**
  - `Book` schema com `author`: Romullo Carvalho, `publisher`: Editora Literando / Editora Revista dos Tribunais
- **Livros recomendados:**
  - `Book` schema (titulo, autor, imagem) com `review` ou `endorsedBy`

### 6.4 Performance (Core Web Vitals)
- **LCP (Largest Contentful Paint):** < 2.5s - otimizar imagem hero, usar preload para imagens acima da dobra
- **FID/INP (Interaction to Next Paint):** < 200ms - minimizar JavaScript bloqueante
- **CLS (Cumulative Layout Shift):** < 0.1 - definir dimensoes em imagens/videos, usar font-display: swap
- **Otimizacoes:**
  - Lazy loading para imagens abaixo da dobra (`loading="lazy"`)
  - Preconnect/preload para recursos criticos (fontes, CSS)
  - Minificacao de CSS/JS
  - Compressao Brotli/Gzip
  - CDN para assets estaticos
  - Cache headers adequados
  - Code splitting por rota

### 6.5 Sitemap e Robots
- **sitemap.xml** gerado automaticamente com todas as URLs publicas
- **robots.txt** configurado para:
  - Permitir crawling das paginas publicas
  - Bloquear `/admin/` e rotas privadas
  - Referenciar sitemap.xml
- **URLs amigaveis:** Slugs em portugues, sem caracteres especiais (ex: `/artigos/introducao-osint`)

### 6.6 SEO de Conteudo
- Cada artigo deve suportar:
  - Slug customizavel (URL amigavel)
  - Meta title e meta description editaveis no admin
  - Keywords/tags por artigo
  - Imagem destaque com alt text
  - Tempo de leitura calculado automaticamente
- **Internacionalizacao:** Conteudo em portugues (pt-BR), com `hreflang` se necessario no futuro

---

## 7. REQUISITOS FUNCIONAIS GERAIS

### 7.1 Autenticacao e Autorizacao
- Login seguro para acesso ao painel administrativo
- Protecao de todas as rotas `/admin/*`
- Sessoes com timeout e renovacao
- Possibilidade de roles (ADMIN)

### 7.2 Newsletter
- Formulario de captura de e-mail presente em:
  - Pagina de detalhe do artigo
  - Pagina do curso OSINT
- Integracao com servico de e-mail marketing (ex: Mailchimp, ConvertKit, Resend)
- Validacao de e-mail no frontend e backend

### 7.3 Busca
- Campo de busca no header que filtra artigos por titulo, conteudo e tags
- Resultados exibidos em pagina dedicada ou dropdown

### 7.4 Analytics
- Integracao com Google Analytics (GA4) configuravel pelo admin
- Contagem de visualizacoes por artigo

### 7.5 Agendamento de Publicacao
- Artigos podem ser agendados para publicacao futura (data + hora)
- Status automatico muda de "Scheduled" para "Published" no horario definido

### 7.6 Upload de Imagens
- Upload de imagens para artigos, livros, logos
- Otimizacao automatica (resize, compressao, conversao para WebP)
- Armazenamento em servico de storage (ex: Cloudinary, S3, Supabase Storage)

### 7.7 Importacao de Conteudo Externo
- **Shorts:** Colar link do YouTube e buscar automaticamente thumbnail, titulo e descricao
- **Instagram:** Colar link do Instagram e buscar automaticamente imagem e caption
- Botoes "FETCH METADATA" / "REFRESH LINK" para atualizar dados

---

## 8. REQUISITOS NAO-FUNCIONAIS

### 8.1 Acessibilidade (WCAG 2.1 AA)
- Contraste adequado texto/fundo (especialmente no tema escuro)
- Navegacao completa por teclado
- Atributos ARIA onde necessario
- Focus states visiveis
- Skip navigation link
- Textos alternativos em imagens

### 8.2 Performance
- Lighthouse score minimo: 90+ em todas as categorias
- Tempo de carregamento inicial < 3 segundos em 3G
- Bundle size otimizado com tree shaking e code splitting

### 8.3 Seguranca
- HTTPS obrigatorio
- Headers de seguranca: CSP, X-Frame-Options, X-Content-Type-Options
- Protecao contra XSS, CSRF, SQL Injection
- Sanitizacao de inputs no editor rich text
- Rate limiting em formularios (newsletter, login)
- Painel admin protegido e nao indexavel

### 8.4 Compatibilidade de Navegadores
- Chrome 90+, Firefox 90+, Safari 15+, Edge 90+
- iOS Safari 15+, Chrome Mobile 90+

---

## 9. ASSETS DISPONIVEIS

### 9.1 Logos
| Arquivo | Descricao |
|---|---|
| `Logo 02.png` | Logo completa horizontal (preto + verde) |
| `Logo 02 - branca.png` | Logo completa horizontal (branca) |
| `Logo 02 - branca e verde.png` | Logo completa horizontal (branca + verde) |
| `Logo 01 - branca.png` | Logo nome empilhado (branca) |
| `Logo 01 - branca e verde.png` | Logo nome empilhado (branca + verde) |
| `cone.png` | Icone/simbolo isolado (preto + verde) |
| `cone - branco.png` | Icone/simbolo isolado (branco) |
| `cone - branco e verde.png` | Icone/simbolo isolado (branco + verde) |
| `Prancheta 1.png` | Logo nome empilhado (preto) |

### 9.2 Uso Recomendado
- **Header do site:** `Logo 02 - branca e verde.png` (fundo escuro)
- **Favicon:** `cone - branco e verde.png` (reduzido)
- **Footer:** `Logo 02 - branca e verde.png` ou versao simplificada
- **Admin sidebar:** Versao monocromatica ou icone isolado
- **OG Image:** Composicao com logo + fundo escuro

---

## 10. RESUMO DE ENTIDADES DO BANCO DE DADOS

### 10.1 Artigos (Blog)
```
- id (PK)
- title
- slug (unique)
- content (rich text/HTML)
- excerpt (resumo)
- featured_image (URL)
- featured_image_alt (texto alternativo)
- category (FK ou enum)
- seo_keywords (array de tags)
- meta_title
- meta_description
- author
- status (draft | scheduled | published)
- views_count
- reading_time (minutos)
- scheduled_at (datetime, nullable)
- published_at (datetime)
- created_at
- updated_at
```

### 10.2 Shorts (YouTube)
```
- id (PK)
- title
- description
- youtube_url
- thumbnail_url
- category_tags (array)
- status (live | pending)
- date_added
- created_at
- updated_at
```

### 10.3 Instagram Posts
```
- id (PK)
- title
- description
- instagram_url
- image_url
- caption_override
- category_tags (array)
- status (live | hidden)
- date_added
- created_at
- updated_at
```

### 10.4 Livros Recomendados
```
- id (PK)
- title
- author
- cover_image (URL)
- affiliate_link (URL)
- category (enum)
- description (rich text)
- show_on_homepage (boolean)
- status (show | hide)
- created_at
- updated_at
```

### 10.5 FAQ
```
- id (PK)
- question
- answer (rich text)
- category
- display_order (integer)
- published (boolean)
- created_at
- updated_at
```

### 10.6 Configuracoes do Site
```
- id (PK)
- site_title
- meta_description
- primary_keywords (array)
- google_analytics_id
- social_links (JSON: linkedin, instagram, youtube, x, facebook)
- logo_url
- favicon_url
- contact_email
- system_timezone
- maintenance_mode (boolean)
- updated_at
```

### 10.7 Newsletter Subscribers
```
- id (PK)
- email (unique)
- subscribed_at
- status (active | unsubscribed)
```

### 10.8 Usuarios (Admin)
```
- id (PK)
- username
- email
- password_hash
- role (admin)
- last_login
- created_at
```

---

## 11. STACK TECNOLOGICA SUGERIDA

| Camada | Tecnologia Sugerida | Justificativa |
|---|---|---|
| Frontend | **Next.js 14+ (App Router)** | SSR/SSG nativo, SEO excelente, React ecosystem |
| Estilizacao | **Tailwind CSS** | Utilitario, responsividade facilitada, dark theme nativo |
| Backend/API | **Next.js API Routes** ou **tRPC** | Full-stack unificado, type-safe |
| Banco de Dados | **PostgreSQL** (via Supabase ou Neon) | Relacional, robusto, suporte a JSON |
| ORM | **Prisma** ou **Drizzle** | Type-safe, migrations, DX excelente |
| Autenticacao | **NextAuth.js** ou **Supabase Auth** | Seguro, facil de configurar |
| Storage | **Supabase Storage** ou **Cloudinary** | Upload de imagens otimizado |
| Rich Text Editor | **Tiptap** ou **Novel** | Extensivel, headless, suporte a markdown |
| Deploy | **Vercel** | Otimizado para Next.js, CDN global |
| Analytics | **Google Analytics 4** | Configuravel pelo admin |
| Email | **Resend** ou **ConvertKit** | Newsletter e emails transacionais |
