const artworkFields = `
  "id": _id,
  title,
  "slug": slug.current,
  "mainImage": mainImage {"src": asset->url, alt, caption},
  "detailImages": detailImages[]{"src": asset->url, alt, caption},
  medium,
  year,
  dimensions,
  depth,
  description,
  "collectionSlugs": collections[]->slug.current,
  availability,
  price,
  showPrice,
  galleryName,
  purchaseUrl,
  purchaseButtonLabel,
  certificateNote,
  featured,
  displayOrder,
  isVisible
`;

export const artworksQuery = String.raw`
  *[_type == "artwork" && coalesce(isVisible, true)]
    | order(coalesce(displayOrder, 9999) asc, title asc) {${artworkFields}}
`;

export const artworkBySlugQuery = String.raw`
  *[_type == "artwork" && slug.current == $slug && coalesce(isVisible, true)][0] {${artworkFields}}
`;

export const collectionsQuery = String.raw`
  *[_type == "collection" && coalesce(isVisible, true)]
    | order(coalesce(displayOrder, 9999) asc, title asc) {
      "id": _id,
      title,
      "slug": slug.current,
      description,
      "heroImage": heroImage {"src": asset->url, alt, caption},
      displayOrder,
      isVisible
    }
`;

export const collectionBySlugQuery = String.raw`
  *[_type == "collection" && slug.current == $slug && coalesce(isVisible, true)][0] {
    "id": _id,
    title,
    "slug": slug.current,
    description,
    "heroImage": heroImage {"src": asset->url, alt, caption},
    displayOrder,
    isVisible
  }
`;

export const homePageQuery = String.raw`
  *[_type == "homePage" && _id == "homePage"][0] {
    heroTagline,
    "heroImage": heroImage {"src": asset->url, alt, caption},
    worksEyebrow,
    worksHeading,
    worksBody,
    "featuredArtworkSlug": featuredArtwork->slug.current,
    artistStatement,
    artistStatementAttribution,
    contactHeading,
    contactBody,
    contactButtonLabel
  }
`;

export const aboutPageQuery = String.raw`
  *[_type == "aboutPage" && _id == "aboutPage"][0] {
    eyebrow,
    title,
    "portrait": portrait {"src": asset->url, alt, caption},
    introHeading,
    body,
    quote
  }
`;

export const processPageQuery = String.raw`
  *[_type == "processPage" && _id == "processPage"][0] {
    eyebrow,
    title,
    intro,
    "heroImage": heroImage {"src": asset->url, alt, caption},
    steps[]{number, title, body, "image": image {"src": asset->url, alt, caption}},
    quote
  }
`;

export const contactPageQuery = String.raw`
  *[_type == "contactPage" && _id == "contactPage"][0] {
    eyebrow,
    title,
    intro,
    "heroImage": heroImage {"src": asset->url, alt, caption},
    confirmationHeading,
    confirmationBody
  }
`;

export const siteSettingsQuery = String.raw`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    siteTitle,
    "logo": logo {"src": asset->url, alt, caption},
    contactEmail,
    footerCopyright,
    footerArtworkNotice,
    instagramUrl,
    newsletterHeading,
    newsletterBody,
    newsletterSignupUrl
  }
`;
