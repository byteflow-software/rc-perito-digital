import Image from "next/image";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/lib/constants";

interface InstaData {
  id: string;
  imageUrl: string | null;
  instagramUrl: string;
  title: string;
}

export function InstagramGrid({ posts }: { posts: InstaData[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          action={
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="sm" terminal>
                FOLLOW @ROMULLO
              </Button>
            </a>
          }
        >
          INSTAGRAM
        </SectionTitle>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {posts.slice(0, 8).map((post) => (
            <a
              key={post.id}
              href={post.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square border border-border hover:border-neon/40 transition-colors overflow-hidden bg-bg-card"
            >
              {post.imageUrl ? (
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-text-muted text-xs">[ POST ]</span>
                </div>
              )}
              <div className="absolute inset-0 bg-neon/0 group-hover:bg-neon/10 transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
