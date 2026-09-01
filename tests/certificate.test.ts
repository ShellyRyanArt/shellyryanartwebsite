import { describe, expect, it } from "vitest";

import {
  buildCertificateHtml,
  certificateFilename,
  estimatePrintPpi,
  formatCertificateDimensions,
} from "@/sanity/tools/certificate";

const details = {
  title: "Buquet's Jewel Beetle",
  medium: "Hand cut magazine paper collage on wood panel",
  dimensions: "10 × 10 in",
  depth: "1.5 in deep",
  year: "2026",
  imageSource: "https://cdn.sanity.io/images/eq9im1h3/production/example.jpg",
};

describe("certificate generator", () => {
  it("builds a locked Letter-size certificate without cropping the artwork", () => {
    const html = buildCertificateHtml(details);

    expect(html).toContain("@page { size: Letter portrait; margin: 0; }");
    expect(html).toContain("object-fit: contain");
    expect(html).not.toContain("object-fit: cover");
    expect(html).toContain("overflow-wrap: anywhere");
    expect(html).toContain("Buquet&#039;s Jewel Beetle");
    expect(html).toContain("10 × 10 in · 1.5 in deep");
    expect(html).toContain("shellyryan.art");
  });

  it("keeps a long artwork title inside the certificate rather than truncating it", () => {
    const longTitle =
      "Buquet's Jewel Beetle — An Especially Long Certificate Title";
    const html = buildCertificateHtml({ ...details, title: longTitle });

    expect(html).toContain(
      "Buquet&#039;s Jewel Beetle — An Especially Long Certificate Title",
    );
    expect(html).not.toContain("text-overflow: ellipsis");
    expect(html).not.toContain("white-space: nowrap");
  });

  it("escapes artwork text before placing it in the printable document", () => {
    const html = buildCertificateHtml({
      ...details,
      title: '<script>alert("no")</script>',
    });

    expect(html).not.toContain('<script>alert("no")</script>');
    expect(html).toContain("&lt;script&gt;");
  });

  it("rejects image sources outside the original upload and Sanity paths", () => {
    expect(() =>
      buildCertificateHtml({ ...details, imageSource: "javascript:alert(1)" }),
    ).toThrow(/original Sanity image or an attached JPG\/PNG/);
  });

  it("uses stable filenames and combines depth only when supplied", () => {
    expect(certificateFilename("Buquet's Jewel Beetle"))
      .toBe("shelly-ryan-certificate-buquet-s-jewel-beetle.pdf");
    expect(formatCertificateDimensions("10 × 10 in", "1.5 in deep"))
      .toBe("10 × 10 in · 1.5 in deep");
    expect(formatCertificateDimensions("10 × 10 in")).toBe("10 × 10 in");
  });

  it("estimates the effective print resolution for the locked image area", () => {
    expect(estimatePrintPpi(2400, 2400)).toBeGreaterThan(500);
    expect(estimatePrintPpi(600, 600)).toBeLessThan(240);
    expect(estimatePrintPpi()).toBeUndefined();
  });
});
