import HomePageContent from "@/components/HomePageContent";
import {
  getArtworkBySlug,
  getHomePage,
  getSiteSettings,
} from "@/sanity/lib/content";

export default async function HomePage() {
  const [content, settings] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
  ]);
  const featuredArtwork = await getArtworkBySlug(content.featuredArtworkSlug);

  return (
    <HomePageContent
      content={content}
      featuredArtwork={featuredArtwork}
      settings={settings}
    />
  );
}
