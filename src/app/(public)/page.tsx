import { HeroSection } from "@/components/home/hero-section";
import { TrustBar } from "@/components/home/trust-bar";
import { SelectedWorks } from "@/components/home/selected-works";
import { StjStfCitations } from "@/components/home/stj-stf-citations";
import { ShortsCarousel } from "@/components/home/shorts-carousel";
import { InstagramGrid } from "@/components/home/instagram-grid";
import { BooksCarousel } from "@/components/home/books-carousel";
import { JsonLd } from "@/components/shared/json-ld";
import { buildPersonJsonLd, buildWebSiteJsonLd } from "@/lib/seo";

// TODO: Replace with real Prisma queries when DB is connected
const mockShorts = [
  { id: "1", title: "OSINT Dica Rapida", thumbnailUrl: null, youtubeUrl: "https://youtube.com/shorts/example1" },
  { id: "2", title: "Romullo Carvalho e OSINT", thumbnailUrl: null, youtubeUrl: "https://youtube.com/shorts/example2" },
  { id: "3", title: "Forense Digital Tips", thumbnailUrl: null, youtubeUrl: "https://youtube.com/shorts/example3" },
  { id: "4", title: "Investigação na Internet", thumbnailUrl: null, youtubeUrl: "https://youtube.com/shorts/example4" },
];

const mockInsta = [
  { id: "1", imageUrl: null, instagramUrl: "https://instagram.com/p/example1", title: "Post 1" },
  { id: "2", imageUrl: null, instagramUrl: "https://instagram.com/p/example2", title: "Post 2" },
  { id: "3", imageUrl: null, instagramUrl: "https://instagram.com/p/example3", title: "Post 3" },
  { id: "4", imageUrl: null, instagramUrl: "https://instagram.com/p/example4", title: "Post 4" },
];

const mockBooks = [
  { id: "1", title: "OSINT do Zero à Investigação Profissional", coverImage: null, affiliateLink: "#" },
  { id: "2", title: "Manual Prático de Provas Digitais", coverImage: null, affiliateLink: "#" },
  { id: "3", title: "Cyber Security", coverImage: null, affiliateLink: "#" },
  { id: "4", title: "OSINT Techniques", coverImage: null, affiliateLink: "#" },
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
      <ShortsCarousel shorts={mockShorts} />
      <InstagramGrid posts={mockInsta} />
      <BooksCarousel books={mockBooks} />
    </>
  );
}
