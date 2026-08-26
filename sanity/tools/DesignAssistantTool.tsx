"use client";

import { useMemo, useState } from "react";

const repositoryUrl = "https://github.com/ShellyRyanArt/shellyryanartwebsite";

const pageOptions = [
  "Home",
  "Gallery",
  "Artwork detail",
  "Collection / series",
  "About",
  "Process",
  "Contact",
  "Navigation or footer",
  "Site-wide",
];

const fieldStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid #c9c0b4",
  borderRadius: "0.35rem",
  background: "#fff",
  padding: "0.8rem",
  font: "inherit",
};

export function DesignAssistantTool() {
  const [request, setRequest] = useState({
    title: "",
    page: "",
    pages: "",
    goal: "",
    keep: "",
  });
  const [referenceImages, setReferenceImages] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(
    () => `Work in ${repositoryUrl}.

Design request: ${request.title || "[give this change a short name]"}
Primary page or area: ${request.page || "[select a page or area]"}
Other affected areas: ${request.pages || "None specified"}

What I want:
${request.goal || "[describe the visual or feature change in plain language]"}

What must stay the same:
${request.keep || "Keep the existing art, copy, navigation, and overall brand unless I specifically ask otherwise."}

Reference images:
${referenceImages.length ? `I will attach these reference images in Claude: ${referenceImages.join(", ")}. Use them for direction only; do not copy protected artwork or branding.` : "No reference images supplied."}

Before changing code, read CLAUDE.md, docs/DESIGN_SYSTEM.md, and docs/CMS_SCHEMA.md. Sanity owns editable content; the repository owns design and features. Use the existing design tokens and components, work on a new branch, run npm run check, and provide a preview for approval. Do not deploy production, change DNS, publish CMS content, or add secrets.`,
    [referenceImages, request],
  );

  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  }

  return (
    <main
      style={{
        minHeight: "100%",
        overflow: "auto",
        background: "#f4efe4",
        color: "#211c18",
        padding: "clamp(1.25rem, 4vw, 3rem)",
      }}
    >
      <div style={{ margin: "0 auto", maxWidth: "48rem" }}>
        <p
          style={{
            margin: "0 0 0.5rem",
            color: "#8a5b2f",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Larger changes
        </p>
        <h1
          style={{
            margin: 0,
            fontFamily: "Georgia, serif",
            fontSize: "2.4rem",
          }}
        >
          Design with Claude
        </h1>
        <p style={{ maxWidth: "42rem", lineHeight: 1.7 }}>
          Use this for layout, styling, or new features. For artwork, prices,
          availability, images, collections, or page wording, use the Content
          section instead.
        </p>

        <section
          style={{
            display: "grid",
            gap: "1rem",
            marginTop: "2rem",
            padding: "clamp(1.25rem, 4vw, 2rem)",
            background: "#fffdf9",
            border: "1px solid #ddd2c3",
            boxShadow: "0 1rem 3rem rgba(50, 35, 20, 0.08)",
          }}
        >
          <label style={{ display: "grid", gap: "0.45rem", fontWeight: 600 }}>
            Give the change a short name
            <input
              style={fieldStyle}
              value={request.title}
              placeholder="Example: Make the collection pages feel more editorial"
              onChange={(event) =>
                setRequest({ ...request, title: event.currentTarget.value })
              }
            />
          </label>
          <label style={{ display: "grid", gap: "0.45rem", fontWeight: 600 }}>
            Which page or area?
            <select
              style={fieldStyle}
              value={request.page}
              onChange={(event) =>
                setRequest({ ...request, page: event.currentTarget.value })
              }
            >
              <option value="">Select one</option>
              {pageOptions.map((page) => (
                <option key={page} value={page}>
                  {page}
                </option>
              ))}
            </select>
          </label>
          <label style={{ display: "grid", gap: "0.45rem", fontWeight: 600 }}>
            Any other affected areas?
            <input
              style={fieldStyle}
              value={request.pages}
              placeholder="Optional: mobile menu, footer, or several collection pages"
              onChange={(event) =>
                setRequest({ ...request, pages: event.currentTarget.value })
              }
            />
          </label>
          <label style={{ display: "grid", gap: "0.45rem", fontWeight: 600 }}>
            Describe what you want
            <textarea
              style={fieldStyle}
              rows={6}
              value={request.goal}
              placeholder="Write naturally. Include the feeling, behavior, or examples you have in mind."
              onChange={(event) =>
                setRequest({ ...request, goal: event.currentTarget.value })
              }
            />
          </label>
          <label style={{ display: "grid", gap: "0.45rem", fontWeight: 600 }}>
            What should Claude preserve?
            <textarea
              style={fieldStyle}
              rows={3}
              value={request.keep}
              placeholder="Optional: colors, typography, a section you already like, or content that must not change"
              onChange={(event) =>
                setRequest({ ...request, keep: event.currentTarget.value })
              }
            />
          </label>
          <label style={{ display: "grid", gap: "0.45rem", fontWeight: 600 }}>
            Reference images (optional)
            <input
              style={fieldStyle}
              type="file"
              accept="image/*"
              multiple
              onChange={(event) =>
                setReferenceImages(
                  Array.from(event.currentTarget.files || []).map(
                    (file) => file.name,
                  ),
                )
              }
            />
            <span
              style={{ color: "#665c54", fontSize: "0.9rem", fontWeight: 400 }}
            >
              {referenceImages.length
                ? `${referenceImages.length} selected. Attach the same files after Claude opens.`
                : "Screenshots, sketches, or visual references can be attached again in Claude."}
            </span>
          </label>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            <a
              href="https://claude.ai/code"
              target="_blank"
              rel="noreferrer"
              onClick={() => void copyPrompt()}
              style={{
                border: 0,
                borderRadius: "0.25rem",
                background: "#8a5b2f",
                color: "white",
                cursor: "pointer",
                padding: "0.85rem 1.1rem",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              {copied
                ? "Brief copied — continue in Claude"
                : "Continue in Claude"}
            </a>
            <button
              type="button"
              onClick={copyPrompt}
              style={{
                border: "1px solid #8a5b2f",
                borderRadius: "0.25rem",
                background: "transparent",
                color: "#6d4323",
                padding: "0.8rem 1.1rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Copy brief only
            </button>
          </div>
          <p style={{ margin: 0, color: "#665c54", lineHeight: 1.6 }}>
            In Claude, select the Shelly Ryan Art repository, paste the request,
            and ask for a preview. Approve the preview before anything is merged
            into the live site.
          </p>
        </section>
      </div>
    </main>
  );
}
