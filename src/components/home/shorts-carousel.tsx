"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { Carousel, CarouselItem } from "@/components/ui/carousel";

interface ShortData {
  id: string;
  title: string;
  thumbnailUrl: string | null;
  youtubeUrl: string;
}

export function ShortsCarousel({ shorts }: { shorts: ShortData[] }) {
  if (shorts.length === 0) return null;

  return (
    <section className="py-16 bg-bg-secondary/30">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          action={
            <a href="https://youtube.com/@rcperitodigital/shorts" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-neon hover:underline">
              VER MAIS &gt;
            </a>
          }
        >
          SHORTS
        </SectionTitle>

        <Carousel>
          {shorts.map((short) => (
            <CarouselItem key={short.id} className="w-[180px] sm:w-[200px]">
              <a
                href={short.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-[9/16] border border-border group-hover:border-neon/40 transition-colors overflow-hidden bg-bg-card">
                  {short.thumbnailUrl ? (
                    <Image
                      src={short.thumbnailUrl}
                      alt={short.title}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-mono text-text-muted text-xs">[ VIDEO ]</span>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-10 h-10 text-neon fill-neon" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-xs font-mono text-text-primary line-clamp-2">
                      {short.title}
                    </p>
                  </div>
                </div>
              </a>
            </CarouselItem>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
