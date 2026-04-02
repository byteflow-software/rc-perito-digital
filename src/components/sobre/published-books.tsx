import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";

const books = [
  {
    title: "OSINT do Zero à Investigação Profissional",
    publisher: "Editora Literando",
    description: "Guia completo de OSINT cobrindo desde os fundamentos até técnicas avançadas de investigação em fontes abertas.",
    url: "https://amzn.to/3N9gvZg",
  },
  {
    title: "Manual Prático de Provas Digitais",
    publisher: "Editora Revista dos Tribunais",
    description: "Manual prático sobre coleta, preservação e análise de provas digitais para profissionais do direito e da perícia.",
    url: "https://amzn.to/3SlkEvv",
  },
];

export function PublishedBooks() {
  return (
    <section className="py-16 bg-bg-secondary/30">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>LIVROS PUBLICADOS</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {books.map((book) => (
            <div key={book.title} className="flex flex-col sm:flex-row gap-5 border border-border p-5">
              <div className="w-32 h-44 shrink-0 bg-bg-card border border-neon/20 flex items-center justify-center">
                <span className="font-mono text-neon text-[9px] text-center px-2 uppercase tracking-wider">
                  {book.title}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-mono text-sm font-bold text-text-primary mb-1">{book.title}</h3>
                <p className="text-neon text-xs font-mono mb-3">{book.publisher}</p>
                <p className="text-text-secondary text-xs leading-relaxed mb-4">{book.description}</p>
                <a href={book.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" size="sm" terminal>COMPRAR NA AMAZON</Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
