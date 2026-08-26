import CogIcon from "@sanity/icons/Cog";
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "contact", title: "Contact & social" },
    { name: "footer", title: "Footer" },
    { name: "newsletter", title: "Newsletter (optional)" },
  ],
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site title",
      type: "string",
      group: "identity",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "contentImage",
      group: "identity",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string",
      group: "contact",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram link",
      type: "url",
      group: "contact",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "footerCopyright",
      title: "Copyright text",
      type: "string",
      group: "footer",
    }),
    defineField({
      name: "footerArtworkNotice",
      title: "Artwork notice",
      type: "string",
      group: "footer",
    }),
    defineField({
      name: "newsletterHeading",
      title: "Signup heading",
      type: "string",
      group: "newsletter",
    }),
    defineField({
      name: "newsletterBody",
      title: "Signup text",
      type: "text",
      rows: 3,
      group: "newsletter",
    }),
    defineField({
      name: "newsletterSignupUrl",
      title: "Signup form link",
      description:
        "Add a Kit, Mailchimp, Buttondown, or similar hosted signup URL when ready.",
      type: "url",
      group: "newsletter",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
