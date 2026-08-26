import {
  aboutPage,
  contactPage,
  homePage,
  processPage,
} from "@/sanity/schemaTypes/pages";
import { artwork } from "@/sanity/schemaTypes/artwork";
import { collection } from "@/sanity/schemaTypes/collection";
import { contentImage } from "@/sanity/schemaTypes/shared";
import { siteSettings } from "@/sanity/schemaTypes/siteSettings";

export const schemaTypes = [
  contentImage,
  artwork,
  collection,
  homePage,
  aboutPage,
  processPage,
  contactPage,
  siteSettings,
];
