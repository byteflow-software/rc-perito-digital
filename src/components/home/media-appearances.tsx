"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, ExternalLink, Tv, Mic } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/card";

// Videos from the original site, organized by category
const semanaOsintVideos = [
  { id: "_P9yhLtU2YY", title: "#semanaOSINT — Episódio 1" },
  { id: "2dFhbcYdfSA", title: "#semanaOSINT — Episódio 2" },
  { id: "BZOiUVZ2OVs", title: "#semanaOSINT — Episódio 3" },
  { id: "GtSlMVO0o0s", title: "#semanaOSINT — Episódio 4" },
  { id: "oNQzcUkFZP8", title: "#semanaOSINT — Episódio 5" },
  { id: "sqxV2JCasR0", title: "#semanaOSINT — Episódio 6" },
  { id: "tZwu3Gl6XRk", title: "#semanaOSINT — Episódio 7" },
  { id: "yIp0c9N8ouk", title: "#semanaOSINT — Episódio 8" },
  { id: "mL9FdaZ7UZY", title: "#semanaOSINT — Episódio 9" },
  { id: "81AP_ACog-I", title: "#semanaOSINT — Episódio 10" },
];

const otherVideos = [
  { id: "wPNyOz6-HzA", title: "Workshop — OSINT Aplicado à Perícia" },
  { id: "gcH6mUUM5c0", title: "II Congresso Nacional de Direito Informático e Novas Tecnologias" },
];

// TV appearances (CETV / Globoplay)
const tvAppearances = [
  { title: "Saiba como se proteger do golpe do pix agendado", source: "CETV 1ª Edição — Globoplay", url: "https://globoplay.globo.com/v/12557292/" },
  { title: "24% da população brasileira caiu em golpe digital", source: "CETV 1ª Edição — Globoplay", url: "https://globoplay.globo.com/v/13330287/" },
  { title: "Cuidado com o dinheiro fácil nas redes sociais", source: "CETV 1ª Edição — Globoplay", url: "https://globoplay.globo.com/v/12706798/" },
  { title: "Operação contra fraudes bancárias é realizada no Ceará", source: "CETV 2ª Edição — Globoplay", url: "https://globoplay.globo.com/v/13481761/" },
  { title: "Golpe dos Correios: veja como identificar golpes", source: "CETV 2ª Edição — Globoplay", url: "https://globoplay.globo.com/v/12821012/" },
  { title: "Especialista alerta para golpe com a chave pix", source: "CETV 1ª Edição — Globoplay", url: "https://globoplay.globo.com/v/12835569/" },
];

// Online media links
const mediaLinks = [
  {
    title: "O que a internet sabe sobre você — Entrevista com Romullo Carvalho, perito digital",
    source: "CEPEDI UFSM",
    url: "https://cepediufsm.wordpress.com/2021/05/20/o-que-a-internet-sabe-sobre-voce-entrevista-com-romullo-carvalho-perito-digital/",
  },
  {
    title: "APECOF no Congresso Nacional de Direito Informático e Novas Tecnologias — OAB/MS",
    source: "APECOF",
    url: "https://www.apecof.org.br/index.php/noticias/17-apecof-no-congresso-nacional-de-direito-informatico-e-novas-tecnologias-da-comissao-de-direito-digital-e-startups-oab-ms",
  },
  {
    title: "Três principais golpes cibernéticos de fim de ano",
    source: "O Povo",
    url: "https://www.opovo.com.br/noticias/tecnologia/opovotecnologia/2022/12/23/tres-principais-golpes-ciberneticos-de-fim-de-ano.html",
  },
];

function VideoCard({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <Card hover className="overflow-hidden">
      <div className="relative aspect-video bg-bg-card">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full group"
          >
            <Image
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="w-14 h-14 border-2 border-neon bg-bg-primary/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-neon ml-0.5" fill="currentColor" />
              </div>
            </div>
          </button>
        )}
      </div>
      <div className="p-3">
        <p className="font-mono text-xs text-text-primary line-clamp-2">{title}</p>
      </div>
    </Card>
  );
}

export function MediaAppearances() {
  const [showAllOsint, setShowAllOsint] = useState(false);
  const visibleOsint = showAllOsint ? semanaOsintVideos : semanaOsintVideos.slice(0, 4);

  return (
    <section className="py-16 bg-bg-secondary/30">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>APARIÇÕES EM MÍDIA</SectionTitle>

        {/* TV Appearances */}
        <div className="mb-10">
          <h3 className="font-mono text-xs text-neon uppercase tracking-widest mb-4 flex items-center gap-2">
            <Tv className="w-3.5 h-3.5" />
            Participações em TV
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {tvAppearances.map((item) => (
              <a
                key={item.title}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-border hover:border-neon/40 p-4 flex items-start gap-3 transition-colors"
              >
                <Tv className="w-4 h-4 text-neon shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono text-xs text-text-primary group-hover:text-neon transition-colors line-clamp-2">
                    {item.title}
                  </p>
                  <p className="text-text-muted text-[10px] font-mono mt-1">{item.source}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Online media links */}
        <div className="mb-10">
          <h3 className="font-mono text-xs text-neon uppercase tracking-widest mb-4 flex items-center gap-2">
            <Mic className="w-3.5 h-3.5" />
            Matérias e Entrevistas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mediaLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-border hover:border-neon/40 p-4 flex items-start gap-3 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-neon shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono text-xs text-text-primary group-hover:text-neon transition-colors line-clamp-2">
                    {link.title}
                  </p>
                  <p className="text-text-muted text-[10px] font-mono mt-1">{link.source}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Palestras / Congressos */}
        <div className="mb-10">
          <h3 className="font-mono text-xs text-neon uppercase tracking-widest mb-4">
            Palestras e Congressos
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherVideos.map((v) => (
              <VideoCard key={v.id} {...v} />
            ))}
          </div>
        </div>

        {/* #semanaOSINT */}
        <div>
          <h3 className="font-mono text-xs text-neon uppercase tracking-widest mb-4">
            #semanaOSINT
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {visibleOsint.map((v) => (
              <VideoCard key={v.id} {...v} />
            ))}
          </div>

          {!showAllOsint && semanaOsintVideos.length > 4 && (
            <div className="text-center">
              <button
                onClick={() => setShowAllOsint(true)}
                className="font-mono text-xs text-neon border border-neon/40 px-4 py-2 hover:bg-neon/10 transition-colors"
              >
                [ VER TODOS OS {semanaOsintVideos.length} EPISÓDIOS ]
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
