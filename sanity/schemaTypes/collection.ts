import FolderIcon from "@sanity/icons/Folder";
import { defineField, defineType } from "sanity";

export const collection = defineType({
  name: "collection",
  title: "Collection / Series",
  type: "document",
  icon: FolderIcon,
  fields: [
    defineField({
      name: "title",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Website address",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Optional collection image",
      type: "contentImage",
    }),
    defineField({
      name: "displayOrder",
      title: "Display order",
      description: "Lower numbers appear first.",
      type: "number",
      initialValue: 100,
    }),
    defineField({
      name: "isVisible",
      title: "Show on website",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Website order",
      name: "displayOrder",
      by: [
        { field: "displayOrder", direction: "asc" },
        { field: "title", direction: "asc" },
      ],
    },
  ],
  preview: { select: { title: "title", media: "heroImage" } },
});
