import dynamic from "next/dynamic";
import { HeroSection } from "@/components/home/hero-section";
import { TrustBar } from "@/components/home/trust-bar";
import { MissionValues } from "@/components/sobre/mission-values";
import { JsonLd } from "@/components/shared/json-ld";
import { buildPersonJsonLd, buildWebSiteJsonLd } from "@/lib/seo";

// Lazy-load below-fold sections to reduce initial JS bundle
const MediaAppearances = dynamic(() => import("@/components/home/media-appearances").then(m => ({ default: m.MediaAppearances })));
const ShortsCarousel = dynamic(() => import("@/components/home/shorts-carousel").then(m => ({ default: m.ShortsCarousel })));
const InstagramGrid = dynamic(() => import("@/components/home/instagram-grid").then(m => ({ default: m.InstagramGrid })));
const BooksCarousel = dynamic(() => import("@/components/home/books-carousel").then(m => ({ default: m.BooksCarousel })));

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

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildPersonJsonLd()} />
      <JsonLd data={buildWebSiteJsonLd()} />

      <HeroSection />
      <TrustBar />
      <MissionValues />
      <MediaAppearances />
      <ShortsCarousel shorts={mockShorts} />
      <InstagramGrid posts={mockInsta} />
      <BooksCarousel />
    </>
  );
}
