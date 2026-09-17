"use client";

import { useEffect, useMemo, useState } from "react";
import { useClient } from "sanity";

import { apiVersion } from "@/sanity/env";
import {
  buildCertificateHtml,
  estimatePrintPpi,
  type CertificateDetails,
} from "@/sanity/tools/certificate";

type ArtworkOption = {
  _id: string;
  title?: string;
  medium?: string;
  dimensions?: string;
  depth?: string;
  year?: string;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
};

type FormState = Omit<CertificateDetails, "imageSource"> & {
  imageSource: string;
  imageWidth?: number;
  imageHeight?: number;
};

const emptyForm: FormState = {
  title: "",
  medium: "",
  dimensions: "",
  depth: "",
  year: new Date().getFullYear().toString(),
  imageSource: "",
};

const artworkQuery = `*[
  _type == "artwork" &&
  !(_id in path("drafts.**"))
] | order(title asc) {
  _id,
  title,
  medium,
  dimensions,
  depth,
  year,
  "imageUrl": mainImage.asset->url,
  "imageWidth": mainImage.asset->metadata.dimensions.width,
  "imageHeight": mainImage.asset->metadata.dimensions.height
}`;

const ink = "#29231e";
const umber = "#865a38";
const paper = "#fffdf8";
const fieldStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid #d8cdbf",
  borderRadius: "0.45rem",
  background: "#fff",
  color: ink,
  padding: "0.72rem 0.8rem",
  font: "inherit",
  boxSizing: "border-box",
};

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result)));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsDataURL(file);
  });
}

function imageSize(source: string) {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () =>
      resolve({ width: image.naturalWidth, height: image.naturalHeight }),
    );
    image.addEventListener("error", () =>
      reject(new Error("The selected image could not be opened.")),
    );
    image.src = source;
  });
}

export function CertificateGeneratorTool() {
  const client = useClient({ apiVersion });
  const [artworks, setArtworks] = useState<ArtworkOption[]>([]);
  const [selectedArtworkId, setSelectedArtworkId] = useState("");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let current = true;
    client
      .fetch<ArtworkOption[]>(artworkQuery)
      .then((items) => {
        if (current) setArtworks(items);
      })
      .catch(() => {
        if (current) {
          setMessage(
            "Saved artworks could not be loaded right now. You can still type the details and attach the original photo below.",
          );
        }
      })
      .finally(() => {
        if (current) setLoading(false);
      });

    return () => {
      current = false;
    };
  }, [client]);

  const printPpi = useMemo(
    () => estimatePrintPpi(form.imageWidth, form.imageHeight),
    [form.imageHeight, form.imageWidth],
  );
  const ready = Boolean(
    form.title.trim() &&
      form.medium.trim() &&
      form.dimensions.trim() &&
      form.year.trim() &&
      form.imageSource,
  );

  function chooseArtwork(id: string) {
    setSelectedArtworkId(id);
    setMessage("");
    if (!id) {
      setForm(emptyForm);
      return;
    }

    const artwork = artworks.find((item) => item._id === id);
    if (!artwork) return;
    setForm({
      title: artwork.title || "",
      medium: artwork.medium || "",
      dimensions: artwork.dimensions || "",
      depth: artwork.depth || "",
      year: artwork.year || new Date().getFullYear().toString(),
      imageSource: artwork.imageUrl || "",
      imageWidth: artwork.imageWidth,
      imageHeight: artwork.imageHeight,
    });
  }

  async function chooseImage(file?: File) {
    if (!file) return;
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setMessage("Please choose the original JPG or PNG. No PDF conversion is needed.");
      return;
    }

    try {
      const source = await fileToDataUrl(file);
      const dimensions = await imageSize(source);
      setForm((current) => ({
        ...current,
        imageSource: source,
        imageWidth: dimensions.width,
        imageHeight: dimensions.height,
      }));
      setMessage("Original photo attached. It stays on this device and is used at full quality.");
    } catch {
      setMessage("That photo could not be opened. Please try the original JPG or PNG again.");
    }
  }

  function update(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function printCertificate() {
    if (!ready) {
      setMessage("Add the artwork photo, title, medium, dimensions, and year first.");
      return;
    }

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      setMessage("Please allow pop-ups for Studio, then choose Create certificate again.");
      return;
    }

    printWindow.opener = null;
    printWindow.document.open();
    printWindow.document.write(buildCertificateHtml(form));
    printWindow.document.close();
    setMessage("Certificate opened. Choose Save as PDF or your printer in the print window.");
  }

  const previewHtml = ready ? buildCertificateHtml(form) : "";

  return (
    <main
      style={{
        minHeight: "100%",
        overflow: "auto",
        background:
          "radial-gradient(circle at 80% 6%, rgba(151, 116, 79, 0.12), transparent 26rem), #f3eee5",
        color: ink,
        padding: "clamp(1rem, 4vw, 3.5rem)",
      }}
    >
      <div style={{ margin: "0 auto", maxWidth: "78rem" }}>
        <p
          style={{
            margin: "0 0 0.55rem",
            color: umber,
            fontSize: "0.72rem",
            fontWeight: 750,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          Ready for the printer
        </p>
        <h1
          style={{
            margin: 0,
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(2rem, 5vw, 3.8rem)",
            fontWeight: 400,
            letterSpacing: "-0.035em",
            lineHeight: 1.05,
          }}
        >
          Create a Certificate of Authenticity
        </h1>
        <p style={{ maxWidth: "43rem", color: "#655b52", lineHeight: 1.7 }}>
          Choose an artwork you already saved, or type the details and attach the
          original photo. The certificate design stays consistent every time.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 28rem), 1fr))",
            alignItems: "start",
            gap: "clamp(1.25rem, 3vw, 2.5rem)",
            marginTop: "2rem",
          }}
        >
          <section
            style={{
              display: "grid",
              gap: "1rem",
              padding: "clamp(1.2rem, 3vw, 2rem)",
              border: "1px solid #ded4c6",
              borderRadius: "0.7rem",
              background: paper,
              boxShadow: "0 1.3rem 3rem rgba(62, 47, 31, 0.08)",
            }}
          >
            <label style={{ display: "grid", gap: "0.45rem" }}>
              <span style={{ fontWeight: 700 }}>Use a saved artwork</span>
              <select
                style={fieldStyle}
                value={selectedArtworkId}
                disabled={loading}
                onChange={(event) => chooseArtwork(event.currentTarget.value)}
              >
                <option value="">
                  {loading ? "Loading artworks…" : "Type details for a new artwork"}
                </option>
                {artworks.map((artwork) => (
                  <option key={artwork._id} value={artwork._id}>
                    {artwork.title || "Untitled artwork"}
                  </option>
                ))}
              </select>
            </label>

            <label style={{ display: "grid", gap: "0.45rem" }}>
              <span style={{ fontWeight: 700 }}>Original artwork photo</span>
              <input
                style={fieldStyle}
                type="file"
                accept="image/jpeg,image/png,.jpg,.jpeg,.png"
                onChange={(event) => void chooseImage(event.currentTarget.files?.[0])}
              />
              <span style={{ color: "#71675e", fontSize: "0.82rem", lineHeight: 1.5 }}>
                JPG or PNG. Attach it here exactly as you normally would—no PDF,
                Dropbox, link, or quality-reducing conversion.
              </span>
            </label>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "1rem",
              }}
            >
              <label style={{ display: "grid", gridColumn: "1 / -1", gap: "0.45rem" }}>
                <span style={{ fontWeight: 700 }}>Artwork title</span>
                <input style={fieldStyle} value={form.title} onChange={(event) => update("title", event.currentTarget.value)} />
              </label>
              <label style={{ display: "grid", gridColumn: "1 / -1", gap: "0.45rem" }}>
                <span style={{ fontWeight: 700 }}>Medium</span>
                <textarea rows={3} style={{ ...fieldStyle, resize: "vertical" }} value={form.medium} onChange={(event) => update("medium", event.currentTarget.value)} />
              </label>
              <label style={{ display: "grid", gap: "0.45rem" }}>
                <span style={{ fontWeight: 700 }}>Dimensions</span>
                <input style={fieldStyle} placeholder="10 × 10 in" value={form.dimensions} onChange={(event) => update("dimensions", event.currentTarget.value)} />
              </label>
              <label style={{ display: "grid", gap: "0.45rem" }}>
                <span style={{ fontWeight: 700 }}>Depth (optional)</span>
                <input style={fieldStyle} placeholder="1.5 in deep" value={form.depth || ""} onChange={(event) => update("depth", event.currentTarget.value)} />
              </label>
              <label style={{ display: "grid", gap: "0.45rem" }}>
                <span style={{ fontWeight: 700 }}>Year</span>
                <input style={fieldStyle} inputMode="numeric" value={form.year} onChange={(event) => update("year", event.currentTarget.value)} />
              </label>
            </div>

            {form.imageSource && (
              <div
                style={{
                  display: "flex",
                  gap: "0.8rem",
                  alignItems: "center",
                  padding: "0.85rem",
                  borderRadius: "0.45rem",
                  background: printPpi && printPpi < 240 ? "#fff3df" : "#edf5e8",
                  color: printPpi && printPpi < 240 ? "#6f471a" : "#38512d",
                  fontSize: "0.86rem",
                  lineHeight: 1.45,
                }}
              >
                <span aria-hidden="true">{printPpi && printPpi < 240 ? "△" : "✓"}</span>
                <span>
                  {printPpi
                    ? printPpi < 240
                      ? `This photo may print softly (about ${printPpi} PPI). Use a larger original if one is available.`
                      : `Photo quality is suitable for this layout (about ${printPpi} PPI).`
                    : "Photo attached. The original file will be used without cropping."}
                </span>
              </div>
            )}

            {message && (
              <p role="status" style={{ margin: 0, color: "#655b52", fontSize: "0.9rem", lineHeight: 1.55 }}>
                {message}
              </p>
            )}

            <button
              type="button"
              disabled={!ready}
              onClick={printCertificate}
              style={{
                border: 0,
                borderRadius: "999px",
                background: ready ? ink : "#b6afa7",
                color: "#fffdf8",
                cursor: ready ? "pointer" : "not-allowed",
                padding: "0.95rem 1.25rem",
                font: "700 0.96rem/1 inherit",
              }}
            >
              Create certificate →
            </button>
            <p style={{ margin: 0, color: "#71675e", fontSize: "0.8rem", lineHeight: 1.5 }}>
              In the print window, choose <strong>Save as PDF</strong> for Alpha
              Graphics. Use Letter size, 100% scale, and no margins.
            </p>
          </section>

          <section aria-label="Certificate preview">
            <p
              style={{
                margin: "0 0 0.55rem",
                color: "#71675e",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Certificate preview
            </p>
            {ready ? (
              <iframe
                title="Certificate preview"
                srcDoc={previewHtml.replace(/<script>[\s\S]*?<\/script>/, "")}
                style={{
                  display: "block",
                  width: "100%",
                  aspectRatio: "8.5 / 11",
                  border: "1px solid #d2c7b9",
                  background: paper,
                  boxShadow: "0 1.3rem 3rem rgba(62, 47, 31, 0.11)",
                }}
              />
            ) : (
              <div
                style={{
                  display: "grid",
                  aspectRatio: "8.5 / 11",
                  placeItems: "center",
                  padding: "2rem",
                  border: "1px solid #d2c7b9",
                  background: paper,
                  color: "#71675e",
                  textAlign: "center",
                  lineHeight: 1.6,
                }}
              >
                Add the photo and artwork details to see the finished certificate.
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
