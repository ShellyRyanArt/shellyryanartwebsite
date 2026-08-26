export type SiteImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type Availability = "available" | "reserved" | "sold" | "not-for-sale";

export type Artwork = {
  id: string;
  slug: string;
  title: string;
  mainImage: SiteImage;
  detailImages: SiteImage[];
  medium: string;
  year?: string;
  dimensions: string;
  depth?: string;
  description: string;
  collectionSlugs: string[];
  availability: Availability;
  price?: number;
  showPrice: boolean;
  galleryName?: string;
  purchaseUrl?: string;
  purchaseButtonLabel?: string;
  certificateNote?: string;
  featured: boolean;
  displayOrder: number;
  isVisible: boolean;
};

export type Collection = {
  id: string;
  slug: string;
  title: string;
  description: string;
  heroImage?: SiteImage;
  displayOrder: number;
  isVisible: boolean;
};

export type HomePageContent = {
  heroTagline: string;
  heroImage?: SiteImage;
  worksEyebrow: string;
  worksHeading: string;
  worksBody: string;
  featuredArtworkSlug: string;
  artistStatement: string;
  artistStatementAttribution: string;
  contactHeading: string;
  contactBody: string;
  contactButtonLabel: string;
};

export type AboutPageContent = {
  eyebrow: string;
  title: string;
  portrait: SiteImage;
  introHeading: string;
  body: string[];
  quote: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  body: string;
  image?: SiteImage;
};

export type ProcessPageContent = {
  eyebrow: string;
  title: string;
  intro: string;
  heroImage?: SiteImage;
  steps: ProcessStep[];
  quote: string;
};

export type ContactPageContent = {
  eyebrow: string;
  title: string;
  intro: string;
  heroImage?: SiteImage;
  confirmationHeading: string;
  confirmationBody: string;
};

export type SiteSettings = {
  siteTitle: string;
  logo: SiteImage;
  contactEmail: string;
  footerCopyright: string;
  footerArtworkNotice: string;
  instagramUrl?: string;
  newsletterHeading?: string;
  newsletterBody?: string;
  newsletterSignupUrl?: string;
};

export type PageContent = {
  home: HomePageContent;
  about: AboutPageContent;
  process: ProcessPageContent;
  contact: ContactPageContent;
};
