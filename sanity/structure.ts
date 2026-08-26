import type { StructureResolver } from "sanity/structure";

const singleton = (
  S: Parameters<StructureResolver>[0],
  title: string,
  schemaType: string,
  documentId: string,
) =>
  S.listItem()
    .title(title)
    .id(documentId)
    .child(S.document().schemaType(schemaType).documentId(documentId));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Shelly Ryan Art")
    .items([
      S.documentTypeListItem("artwork").title("Artwork"),
      S.documentTypeListItem("collection").title("Collections / Series"),
      S.divider(),
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              singleton(S, "Home", "homePage", "homePage"),
              singleton(S, "About", "aboutPage", "aboutPage"),
              singleton(S, "Process", "processPage", "processPage"),
              singleton(S, "Contact", "contactPage", "contactPage"),
            ]),
        ),
      singleton(S, "Site Settings", "siteSettings", "siteSettings"),
    ]);
