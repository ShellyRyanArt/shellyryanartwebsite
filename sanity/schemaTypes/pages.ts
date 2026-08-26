import EnvelopeIcon from "@sanity/icons/Envelope";
import HomeIcon from "@sanity/icons/Home";
import InfoOutlineIcon from "@sanity/icons/InfoOutline";
import SparklesIcon from "@sanity/icons/Sparkles";
import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "heroTagline",
      title: "Hero tagline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Optional hero background",
      type: "contentImage",
    }),
    defineField({
      name: "worksEyebrow",
      title: "Featured work label",
      type: "string",
    }),
    defineField({
      name: "worksHeading",
      title: "Featured work heading",
      type: "string",
    }),
    defineField({
      name: "worksBody",
      title: "Featured work description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "featuredArtwork",
      title: "Featured artwork",
      type: "reference",
      to: [{ type: "artwork" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "artistStatement",
      title: "Artist statement",
      type: "text",
      rows: 7,
    }),
    defineField({
      name: "artistStatementAttribution",
      title: "Statement attribution",
      type: "string",
    }),
    defineField({
      name: "contactHeading",
      title: "Contact section heading",
      type: "string",
    }),
    defineField({
      name: "contactBody",
      title: "Contact section text",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "contactButtonLabel",
      title: "Contact button text",
      type: "string",
    }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  icon: InfoOutlineIcon,
  fields: [
    defineField({ name: "eyebrow", title: "Small heading", type: "string" }),
    defineField({
      name: "title",
      title: "Page title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "portrait",
      title: "Artist photo",
      type: "contentImage",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "introHeading",
      title: "Introduction heading",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Biography paragraphs",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 5 })],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "quote",
      title: "Closing quote",
      type: "text",
      rows: 5,
    }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});

export const processPage = defineType({
  name: "processPage",
  title: "Process Page",
  type: "document",
  icon: SparklesIcon,
  fields: [
    defineField({ name: "eyebrow", title: "Small heading", type: "string" }),
    defineField({
      name: "title",
      title: "Page title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "heroImage",
      title: "Optional process photo",
      type: "contentImage",
    }),
    defineField({
      name: "steps",
      title: "Process steps",
      type: "array",
      validation: (rule) => rule.min(1),
      of: [
        defineArrayMember({
          type: "object",
          name: "processStep",
          title: "Step",
          fields: [
            defineField({
              name: "number",
              title: "Number",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "body",
              title: "Description",
              type: "text",
              rows: 5,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "image",
              title: "Optional photo",
              type: "contentImage",
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "number", media: "image" },
          },
        }),
      ],
    }),
    defineField({
      name: "quote",
      title: "Closing quote",
      type: "text",
      rows: 4,
    }),
  ],
  preview: { prepare: () => ({ title: "Process Page" }) },
});

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({ name: "eyebrow", title: "Small heading", type: "string" }),
    defineField({
      name: "title",
      title: "Page title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "heroImage",
      title: "Optional contact photo",
      type: "contentImage",
    }),
    defineField({
      name: "confirmationHeading",
      title: "Form confirmation heading",
      type: "string",
    }),
    defineField({
      name: "confirmationBody",
      title: "Form confirmation text",
      type: "text",
      rows: 3,
    }),
  ],
  preview: { prepare: () => ({ title: "Contact Page" }) },
});
