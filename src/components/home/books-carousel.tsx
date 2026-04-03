import Image from "next/image";
import { SectionTitle } from "@/components/ui/section-title";
import { Book } from "lucide-react";

const books = [
  {
    title: "Manual Prático de Provas Digitais — 1ª Edição",
    cover: "https://yy7vynyrezpvfapo.public.blob.vercel-storage.com/books/manual-provas-digitais-1ed.jpg",
    authors: "Bernardo de Azevedo e Souza, Alexandre Munhoz, Romullo Carvalho",
    publisher: "Thomson Reuters — Revista dos Tribunais",
  },
  {
    title: "Manual Prático de Provas Digitais — 2ª Edição",
    cover: "https://yy7vynyrezpvfapo.public.blob.vercel-storage.com/books/manual-provas-digitais-2ed.jpg",
    authors: "Bernardo de Azevedo e Souza, Alexandre Munhoz, Romullo Carvalho",
    publisher: "Thomson Reuters — Revista dos Tribunais",
  },
  {
    title: "Manual Prático de Provas Digitais — 3ª Edição",
    cover: "https://yy7vynyrezpvfapo.public.blob.vercel-storage.com/books/manual-provas-digitais-3ed.jpg",
    authors: "Bernardo de Azevedo e Souza, Alexandre Munhoz, Romullo Carvalho",
    publisher: "Thomson Reuters — Revista dos Tribunais",
  },
  {
    title: "OSINT do Zero à Investigação Profissional",
    cover: "https://yy7vynyrezpvfapo.public.blob.vercel-storage.com/books/osint-zero-investigacao.jpg",
    authors: "Romullo W. R. de Carvalho (Organizador)",
    publisher: "Literando",
  },
];

export function BooksCarousel() {
  return (
    <section className="py-16 bg-bg-secondary/30">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>LIVROS PUBLICADOS</SectionTitle>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {books.map((book) => (
            <div key={book.title} className="group">
              <div className="relative aspect-[2/3] border border-border group-hover:border-neon/40 transition-all overflow-hidden bg-bg-card">
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, 280px"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity p-3 w-full bg-gradient-to-t from-black/80 to-transparent">
                    <p className="font-mono text-[10px] text-neon uppercase tracking-wider mb-1">
                      {book.publisher}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-start gap-2 mb-1">
                  <Book className="w-3 h-3 text-neon shrink-0 mt-0.5" />
                  <h3 className="font-mono text-xs text-text-primary group-hover:text-neon transition-colors line-clamp-2">
                    {book.title}
                  </h3>
                </div>
                <p className="text-text-muted text-[10px] font-mono line-clamp-2 pl-5">
                  {book.authors}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
