export type CertificateDetails = {
  title: string;
  medium: string;
  dimensions: string;
  depth?: string;
  year: string;
  imageSource: string;
};

const allowedImageSource =
  /^(data:image\/(?:jpeg|png);base64,|https:\/\/cdn\.sanity\.io\/images\/)/i;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function certificateFilename(title: string) {
  const safeTitle = title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 72);

  return `shelly-ryan-certificate-${safeTitle || "artwork"}.pdf`;
}

export function formatCertificateDimensions(dimensions: string, depth?: string) {
  return [dimensions.trim(), depth?.trim()].filter(Boolean).join(" · ");
}

export function estimatePrintPpi(width?: number, height?: number) {
  if (!width || !height) return undefined;
  return Math.round(Math.max(width / 4.1, height / 3.35));
}

export function buildCertificateHtml(details: CertificateDetails) {
  if (!allowedImageSource.test(details.imageSource)) {
    throw new Error("The certificate image must be an original Sanity image or an attached JPG/PNG.");
  }

  const title = escapeHtml(details.title.trim());
  const medium = escapeHtml(details.medium.trim());
  const dimensions = escapeHtml(
    formatCertificateDimensions(details.dimensions, details.depth),
  );
  const year = escapeHtml(details.year.trim());
  const imageSource = escapeHtml(details.imageSource);
  const filename = certificateFilename(details.title).replace(/\.pdf$/, "");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(filename)}</title>
    <style>
      :root {
        color-scheme: light;
        --paper: #fffdf7;
        --ink: #28231f;
        --muted: #776b60;
        --copper: #9b6742;
      }

      * { box-sizing: border-box; }
      html, body { margin: 0; min-height: 100%; background: #e9e4dc; }
      body { font-family: Georgia, "Times New Roman", serif; color: var(--ink); }

      .certificate {
        position: relative;
        width: min(100vw, 816px);
        aspect-ratio: 8.5 / 11;
        margin: 0 auto;
        overflow: hidden;
        background: var(--paper);
      }

      .certificate::before,
      .certificate::after {
        content: "";
        position: absolute;
        pointer-events: none;
        border: 1px solid var(--copper);
      }

      .certificate::before { inset: 3.1%; }
      .certificate::after { inset: 3.75%; }

      .content {
        position: absolute;
        inset: 8.4% 9% 6.8%;
        display: grid;
        grid-template-rows: auto 31.2% auto auto auto 1fr auto auto;
        align-items: center;
        justify-items: center;
        text-align: center;
      }

      .heading {
        margin: 0 0 2.5%;
        font-size: clamp(13px, 2.05vw, 17px);
        font-weight: 600;
        letter-spacing: 0.22em;
        text-transform: uppercase;
      }

      .image-frame {
        display: flex;
        width: 61%;
        height: 100%;
        align-items: center;
        justify-content: center;
        padding: 1.1%;
        border: 1px solid color-mix(in srgb, var(--copper) 76%, white);
        background: #fff;
      }

      .image-frame img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      .artwork-title {
        max-width: 80%;
        margin: 2.1% 0 1.8%;
        padding: 0 6% 1.3%;
        border-bottom: 1px solid color-mix(in srgb, var(--copper) 50%, white);
        font-size: clamp(21px, 4vw, 33px);
        font-style: italic;
        font-weight: 400;
        line-height: 1.05;
        overflow-wrap: anywhere;
      }

      .facts {
        display: grid;
        width: 84%;
        gap: 0.65rem;
        margin-top: 0.4rem;
      }

      .fact { display: grid; gap: 0.18rem; }
      .label {
        color: var(--muted);
        font-family: Arial, Helvetica, sans-serif;
        font-size: clamp(7px, 1.18vw, 10px);
        font-weight: 500;
        letter-spacing: 0.3em;
        text-transform: uppercase;
      }

      .value {
        font-size: clamp(11px, 1.65vw, 14px);
        font-weight: 600;
        line-height: 1.28;
        overflow-wrap: anywhere;
      }

      .statement {
        align-self: start;
        margin-top: 1.1rem;
        font-size: clamp(9px, 1.38vw, 12px);
        line-height: 1.55;
      }

      .statement em { display: block; margin-bottom: 0.2rem; }
      .signature { width: 72%; align-self: end; }
      .signature-rule { border-top: 1px solid color-mix(in srgb, var(--copper) 55%, white); }
      .signature-line { width: 47%; margin: 1.05rem auto 0.35rem; border-top: 1px solid var(--ink); }
      .signature-label {
        color: var(--muted);
        font-family: Arial, Helvetica, sans-serif;
        font-size: clamp(6px, 1vw, 8px);
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }
      .artist-name { margin-top: 0.12rem; font-size: clamp(15px, 2.5vw, 21px); font-style: italic; }
      .website { align-self: end; font-size: clamp(7px, 1vw, 9px); }

      .screen-note {
        width: min(100vw, 816px);
        margin: 0 auto;
        padding: 0.8rem 1rem;
        background: #28231f;
        color: #fffdf7;
        font: 14px/1.45 Arial, Helvetica, sans-serif;
        text-align: center;
      }

      @media print {
        @page { size: Letter portrait; margin: 0; }
        html, body { width: 8.5in; height: 11in; background: var(--paper); }
        .certificate { width: 8.5in; height: 11in; margin: 0; }
        .screen-note { display: none; }
      }
    </style>
  </head>
  <body>
    <main class="certificate" aria-label="Certificate of Authenticity for ${title}">
      <div class="content">
        <h1 class="heading">Certificate of Authenticity</h1>
        <div class="image-frame"><img src="${imageSource}" alt="${title}" /></div>
        <h2 class="artwork-title">${title}</h2>
        <div class="facts">
          <div class="fact"><span class="label">Medium</span><span class="value">${medium}</span></div>
          <div class="fact"><span class="label">Dimensions</span><span class="value">${dimensions}</span></div>
          <div class="fact"><span class="label">Year</span><span class="value">${year}</span></div>
        </div>
        <div class="statement">
          <em>This is a one of a kind, original work of art.</em>
          <span>This certifies that the above work is an original, hand-crafted piece by Shelly Ryan.</span>
        </div>
        <div></div>
        <div class="signature">
          <div class="signature-rule"></div>
          <div class="signature-line"></div>
          <div class="signature-label">Artist Signature</div>
          <div class="artist-name">Shelly Ryan</div>
        </div>
        <div class="website">shellyryan.art</div>
      </div>
    </main>
    <div class="screen-note">In the print window, choose “Save as PDF” or send this page to your printer. Use Letter size, 100% scale, and no margins.</div>
    <script>
      window.addEventListener("load", () => {
        const image = document.querySelector("img");
        const ready = image && image.complete ? Promise.resolve() : new Promise((resolve) => {
          if (!image) return resolve();
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        });
        ready.then(() => window.setTimeout(() => window.print(), 250));
      });
    </script>
  </body>
</html>`;
}
