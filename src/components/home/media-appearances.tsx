"use client";

import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/card";

const videos = [
  { id: "_P9yhLtU2YY", title: "Entrevista sobre OSINT e investigação digital" },
  { id: "2dFhbcYdfSA", title: "Forense digital e provas eletrônicas" },
  { id: "BZOiUVZ2OVs", title: "Cibersegurança e proteção de dados" },
  { id: "GtSlMVO0o0s", title: "O que a internet sabe sobre você" },
  { id: "oNQzcUkFZP8", title: "OSINT aplicado a investigações" },
  { id: "sqxV2JCasR0", title: "Golpes cibernéticos e prevenção" },
  { id: "tZwu3Gl6XRk", title: "Perícia digital no Brasil" },
  { id: "yIp0c9N8ouk", title: "Inteligência de fontes abertas" },
  { id: "mL9FdaZ7UZY", title: "Segurança digital no cotidiano" },
  { id: "81AP_ACog-I", title: "Investigação e tecnologia" },
];

const mediaLinks = [
  {
    title: "O que a internet sabe sobre você — Entrevista CEPEDI UFSM",
    source: "CEPEDI UFSM",
    url: "https://cepediufsm.wordpress.com/2021/05/20/o-que-a-internet-sabe-sobre-voce-entrevista-com-romullo-carvalho-perito-digital/",
  },
  {
    title: "APECOF no Congresso Nacional de Direito Informático — OAB/MS",
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
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full group"
          >
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt={title}
              className="w-full h-full object-cover"
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
  const [showAll, setShowAll] = useState(false);
  const visibleVideos = showAll ? videos : videos.slice(0, 4);

  return (
    <section className="py-16 bg-bg-secondary/30">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>APARIÇÕES EM MÍDIA</SectionTitle>

        {/* Videos grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {visibleVideos.map((v) => (
            <VideoCard key={v.id} {...v} />
          ))}
        </div>

        {!showAll && videos.length > 4 && (
          <div className="text-center mb-10">
            <button
              onClick={() => setShowAll(true)}
              className="font-mono text-xs text-neon border border-neon/40 px-4 py-2 hover:bg-neon/10 transition-colors"
            >
              [ VER TODOS OS {videos.length} VÍDEOS ]
            </button>
          </div>
        )}

        {/* Media links */}
        <div className="mt-8">
          <h3 className="font-mono text-xs text-neon uppercase tracking-widest mb-4">Matérias e Entrevistas</h3>
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
      </div>
    </section>
  );
}
