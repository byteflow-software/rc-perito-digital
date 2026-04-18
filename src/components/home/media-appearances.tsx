import { listMediaAppearances } from "@/lib/actions/mediaAppearances";
import { listVideoFeatures } from "@/lib/actions/videoFeatures";
import { MediaAppearancesClient } from "./media-appearances-client";

export async function MediaAppearances() {
  const [media, videos] = await Promise.all([
    listMediaAppearances(),
    listVideoFeatures(),
  ]);

  const tvItems = media.filter((m) => m.type === "TV");
  const articleItems = media.filter((m) => m.type === "ARTICLE" || m.type === "INTERVIEW");
  const semanaOsintVideos = videos.filter((v) => v.section === "SEMANA_OSINT");
  const palestrasVideos = videos.filter((v) => v.section === "PALESTRAS_CONGRESSOS");

  return (
    <MediaAppearancesClient
      tvItems={tvItems}
      articleItems={articleItems}
      semanaOsintVideos={semanaOsintVideos}
      palestrasVideos={palestrasVideos}
    />
  );
}
