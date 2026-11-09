import { defineArrayMember, defineField, defineType } from "sanity";

export const contentImage = defineType({
  name: "contentImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Description for screen readers",
      description:
        "Briefly describe what is visible in the image. Optional for close-ups: if left blank, the website uses “Detail of” plus the artwork title.",
      type: "string",
      // Close-up images may leave this blank; the site supplies a fallback.
      // Every other image (main images, page images) still requires it.
      validation: (rule) =>
        rule.custom((value, context) => {
          const isCloseUp = context.path?.[0] === "detailImages";
          if (isCloseUp || (typeof value === "string" && value.trim())) {
            return true;
          }
          return "Required";
        }),
    }),
    defineField({ name: "caption", title: "Optional caption", type: "string" }),
  ],
});

export const paragraphArray = defineArrayMember({
  type: "text",
  rows: 5,
});
