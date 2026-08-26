import ContactPageContent from "@/components/ContactPageContent";
import { getContactPage, getSiteSettings } from "@/sanity/lib/content";

export default async function ContactPage() {
  const [content, settings] = await Promise.all([
    getContactPage(),
    getSiteSettings(),
  ]);
  return (
    <ContactPageContent
      content={content}
      contactEmail={settings.contactEmail}
    />
  );
}
