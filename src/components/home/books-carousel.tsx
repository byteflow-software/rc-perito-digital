"use client";

import Image from "next/image";
import { SectionTitle } from "@/components/ui/section-title";
import { Carousel, CarouselItem } from "@/components/ui/carousel";

interface BookData {
  id: string;
  title: string;
  coverImage: string | null;
  affiliateLink: string | null;
}

export function BooksCarousel({ books }: { books: BookData[] }) {
  if (books.length === 0) return null;

  return (
    <section className="py-16 bg-bg-secondary/30">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>LIVROS RECOMENDADOS</SectionTitle>

        <Carousel>
          {books.map((book) => (
            <CarouselItem key={book.id} className="w-[140px] sm:w-[160px]">
              <a
                href={book.affiliateLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-[2/3] border border-border group-hover:border-neon/40 transition-all overflow-hidden bg-bg-card group-hover:glow-border">
                  {book.coverImage ? (
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                      <span className="font-mono text-neon text-[10px] uppercase tracking-wider">
                        {book.title}
                      </span>
                    </div>
                  )}
                </div>
              </a>
            </CarouselItem>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
