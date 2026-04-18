"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, ExternalLink, Tv, Mic } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/card";

interface MediaItem {
  id: string;
  title: string;
  source: string;
  url: string;
  type: string;
}

interface VideoItem {
  id: string;
  title: string;
  youtubeId: string;
  section: string;
}

interface Props {
  tvItems: MediaItem[];
  articleItems: MediaItem[];
  semanaOsintVideos: VideoItem[];
  palestrasVideos: VideoItem[];
}

function VideoCard({ youtubeId, title }: { youtubeId: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <Card hover className="overflow-hidden">
      <div className="relative aspect-video bg-bg-card">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button onClick={() => setPlaying(true)} className="absolute inset-0 w-full h-full group">
            <Image
              src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
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

export function MediaAppearancesClient({ tvItems, articleItems, semanaOsintVideos, palestrasVideos }: Props) {
  const [showAllOsint, setShowAllOsint] = useState(false);
  const visibleOsint = showAllOsint ? semanaOsintVideos : semanaOsintVideos.slice(0, 4);

  return (
    <section className="py-16 bg-bg-secondary/30">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>APARIÇÕES EM MÍDIA</SectionTitle>

        {tvItems.length > 0 && (
          <div className="mb-10">
            <h3 className="font-mono text-xs text-neon uppercase tracking-widest mb-4 flex items-center gap-2">
              <Tv className="w-3.5 h-3.5" />Participações em TV
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {tvItems.map((item) => (
                <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer"
                  className="group border border-border hover:border-neon/40 p-4 flex items-start gap-3 transition-colors">
                  <Tv className="w-4 h-4 text-neon shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono text-xs text-text-primary group-hover:text-neon transition-colors line-clamp-2">{item.title}</p>
                    <p className="text-text-muted text-[10px] font-mono mt-1">{item.source}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {articleItems.length > 0 && (
          <div className="mb-10">
            <h3 className="font-mono text-xs text-neon uppercase tracking-widest mb-4 flex items-center gap-2">
              <Mic className="w-3.5 h-3.5" />Matérias e Entrevistas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {articleItems.map((link) => (
                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="group border border-border hover:border-neon/40 p-4 flex items-start gap-3 transition-colors">
                  <ExternalLink className="w-4 h-4 text-neon shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono text-xs text-text-primary group-hover:text-neon transition-colors line-clamp-2">{link.title}</p>
                    <p className="text-text-muted text-[10px] font-mono mt-1">{link.source}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {palestrasVideos.length > 0 && (
          <div className="mb-10">
            <h3 className="font-mono text-xs text-neon uppercase tracking-widest mb-4">Palestras e Congressos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {palestrasVideos.map((v) => <VideoCard key={v.id} youtubeId={v.youtubeId} title={v.title} />)}
            </div>
          </div>
        )}

        {semanaOsintVideos.length > 0 && (
          <div>
            <h3 className="font-mono text-xs text-neon uppercase tracking-widest mb-4">#semanaOSINT</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {visibleOsint.map((v) => <VideoCard key={v.id} youtubeId={v.youtubeId} title={v.title} />)}
            </div>
            {!showAllOsint && semanaOsintVideos.length > 4 && (
              <div className="text-center">
                <button onClick={() => setShowAllOsint(true)}
                  className="font-mono text-xs text-neon border border-neon/40 px-4 py-2 hover:bg-neon/10 transition-colors">
                  [ VER TODOS OS {semanaOsintVideos.length} EPISÓDIOS ]
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
