import { HeroSection } from "@/components/home/hero-section";
import { TrustBar } from "@/components/home/trust-bar";
import { SelectedWorks } from "@/components/home/selected-works";
import { StjStfCitations } from "@/components/home/stj-stf-citations";
import { ShortsCarousel } from "@/components/home/shorts-carousel";
import { InstagramGrid } from "@/components/home/instagram-grid";
import { BooksCarousel } from "@/components/home/books-carousel";
import { MediaAppearances } from "@/components/home/media-appearances";
import { JsonLd } from "@/components/shared/json-ld";
import { buildPersonJsonLd, buildWebSiteJsonLd } from "@/lib/seo";

// TODO: Replace with real Prisma queries when DB is connected
const mockShorts = [
  { id: "1", title: "OSINT na Prática", thumbnailUrl: "https://i.ytimg.com/vi/zPKf5UdxM54/oar2.jpg", youtubeUrl: "https://youtube.com/shorts/zPKf5UdxM54" },
  { id: "2", title: "Dica de Segurança Digital", thumbnailUrl: "https://i.ytimg.com/vi/MTkUQFQ7Y7g/oar2.jpg", youtubeUrl: "https://youtube.com/shorts/MTkUQFQ7Y7g" },
  { id: "3", title: "Investigação em Fontes Abertas", thumbnailUrl: "https://i.ytimg.com/vi/fly31z3o9vk/oar2.jpg", youtubeUrl: "https://youtube.com/shorts/fly31z3o9vk" },
  { id: "4", title: "OSINT e Cibersegurança", thumbnailUrl: "https://i.ytimg.com/vi/wDdkMsVHlYA/oar2.jpg", youtubeUrl: "https://youtube.com/shorts/wDdkMsVHlYA" },
  { id: "5", title: "Forense Digital", thumbnailUrl: "https://i.ytimg.com/vi/RMhFVCMC9KY/oar2.jpg", youtubeUrl: "https://youtube.com/shorts/RMhFVCMC9KY" },
  { id: "6", title: "Dicas de OSINT", thumbnailUrl: "https://i.ytimg.com/vi/sauiU-kEag8/oar2.jpg", youtubeUrl: "https://youtube.com/shorts/sauiU-kEag8" },
];

const mockInsta = [
  { id: "1", imageUrl: "https://i.ytimg.com/vi/3zPMxQsCv60/hqdefault.jpg", instagramUrl: "https://youtube.com/watch?v=3zPMxQsCv60", title: "Possibilidades em Fontes Abertas" },
  { id: "2", imageUrl: "https://i.ytimg.com/vi/uxD_Zj38CqA/hqdefault.jpg", instagramUrl: "https://youtube.com/watch?v=uxD_Zj38CqA", title: "Coleta em OSINT" },
  { id: "3", imageUrl: "https://i.ytimg.com/vi/S2Mps60h21E/hqdefault.jpg", instagramUrl: "https://youtube.com/watch?v=S2Mps60h21E", title: "Por Que Você Precisa se Proteger na Internet?" },
  { id: "4", imageUrl: "https://i.ytimg.com/vi/xwh4NmoP9ao/hqdefault.jpg", instagramUrl: "https://youtube.com/watch?v=xwh4NmoP9ao", title: "Você sabe o que é OSINT?" },
];

const mockBooks = [
  { id: "1", title: "OSINT do Zero à Investigação Profissional", coverImage: "https://m.media-amazon.com/images/I/71a-PnFEqlL._SY466_.jpg", affiliateLink: "https://amzn.to/3N9gvZg" },
  { id: "2", title: "Manual Prático de Provas Digitais", coverImage: "https://m.media-amazon.com/images/I/51hN2PXrp4L._SY466_.jpg", affiliateLink: "https://amzn.to/3SlkEvv" },
  { id: "3", title: "Livro 3", coverImage: null, affiliateLink: "https://amzn.to/4krgs92" },
  { id: "4", title: "Livro 4", coverImage: null, affiliateLink: "https://amzn.to/44HOgqW" },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildPersonJsonLd()} />
      <JsonLd data={buildWebSiteJsonLd()} />

      <HeroSection />
      <TrustBar />
      <SelectedWorks />
      <StjStfCitations />
      <MediaAppearances />
      <ShortsCarousel shorts={mockShorts} />
      <InstagramGrid posts={mockInsta} />
      <BooksCarousel books={mockBooks} />
    </>
  );
}
