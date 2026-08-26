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
      description: "Briefly describe what is visible in the image.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "caption", title: "Optional caption", type: "string" }),
  ],
});

export const paragraphArray = defineArrayMember({
  type: "text",
  rows: 5,
});
