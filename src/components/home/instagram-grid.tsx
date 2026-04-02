import Image from "next/image";
import { Play } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";

interface VideoData {
  id: string;
  imageUrl: string | null;
  instagramUrl: string;
  title: string;
}

export function InstagramGrid({ posts }: { posts: VideoData[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          action={
            <a href="https://youtube.com/@rcperitodigital" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="sm" terminal>
                INSCREVA-SE NO CANAL
              </Button>
            </a>
          }
        >
          VÍDEOS EDUCACIONAIS
        </SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.slice(0, 8).map((post) => (
            <a
              key={post.id}
              href={post.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-video border border-border hover:border-neon/40 transition-colors overflow-hidden bg-bg-card"
            >
              {post.imageUrl ? (
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-text-muted text-xs">[ VIDEO ]</span>
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-10 h-10 text-neon fill-neon" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-[11px] font-mono text-text-primary line-clamp-2">
                  {post.title}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
