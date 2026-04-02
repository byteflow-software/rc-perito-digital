import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SearchDialog } from "@/components/shared/search-dialog";
import { ScrollToTop } from "@/components/shared/scroll-to-top";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-neon focus:text-bg-primary focus:font-mono focus:text-sm"
      >
        Pular para o conteudo
      </a>
      <Header />
      <main id="main-content" className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
      <SearchDialog />
      <ScrollToTop />
    </>
  );
}
