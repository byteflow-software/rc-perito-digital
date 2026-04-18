import dynamic from "next/dynamic";
import { HeroSection } from "@/components/home/hero-section";
import { TrustBar } from "@/components/home/trust-bar";
import { MissionValues } from "@/components/sobre/mission-values";
import { MediaAppearances } from "@/components/home/media-appearances";
import { JsonLd } from "@/components/shared/json-ld";
import { buildPersonJsonLd, buildWebSiteJsonLd } from "@/lib/seo";
import { listPublicShorts } from "@/lib/actions/shorts";
import { listPublicInstagram } from "@/lib/actions/instagram";

const ShortsCarousel = dynamic(() => import("@/components/home/shorts-carousel").then(m => ({ default: m.ShortsCarousel })));
const InstagramGrid = dynamic(() => import("@/components/home/instagram-grid").then(m => ({ default: m.InstagramGrid })));
const BooksCarousel = dynamic(() => import("@/components/home/books-carousel").then(m => ({ default: m.BooksCarousel })));

export default async function HomePage() {
  const [shorts, instagram] = await Promise.all([
    listPublicShorts(),
    listPublicInstagram(),
  ]);

  return (
    <>
      <JsonLd data={buildPersonJsonLd()} />
      <JsonLd data={buildWebSiteJsonLd()} />

      <HeroSection />
      <TrustBar />
      <MissionValues />
      <MediaAppearances />
      <ShortsCarousel shorts={shorts} />
      <InstagramGrid posts={instagram} />
      <BooksCarousel />
    </>
  );
}
