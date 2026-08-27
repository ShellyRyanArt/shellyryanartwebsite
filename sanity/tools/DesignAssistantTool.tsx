"use client";

import { useMemo, useState } from "react";

import { buildClaudeBrief } from "@/sanity/tools/designBrief";

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

const ink = "#29231e";
const umber = "#865a38";
const paper = "#fffdf8";

const smallFieldStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid #d4c8b8",
  borderRadius: "0.45rem",
  background: paper,
  color: ink,
  padding: "0.8rem",
  font: "inherit",
  boxSizing: "border-box",
};

export function DesignAssistantTool() {
  const [goal, setGoal] = useState("");
  const [page, setPage] = useState("");
  const [referenceImages, setReferenceImages] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(
    () => buildClaudeBrief({ goal, page, referenceImages }),
    [goal, page, referenceImages],
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
        background:
          "radial-gradient(circle at 82% 8%, rgba(151, 116, 79, 0.12), transparent 28rem), #f3eee5",
        color: ink,
        padding: "clamp(1.25rem, 5vw, 4rem)",
      }}
    >
      <div style={{ margin: "0 auto", maxWidth: "58rem" }}>
        <p
          style={{
            margin: "0 0 0.75rem",
            color: umber,
            fontSize: "0.72rem",
            fontWeight: 750,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          A place to begin
        </p>
        <h1
          style={{
            maxWidth: "48rem",
            margin: 0,
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(2.2rem, 6vw, 4.4rem)",
            fontWeight: 400,
            letterSpacing: "-0.035em",
            lineHeight: 1.02,
          }}
        >
          Shelly, what do we want to change today?
        </h1>
        <p
          style={{
            maxWidth: "40rem",
            margin: "1rem 0 0",
            color: "#655b52",
            fontSize: "1.05rem",
            lineHeight: 1.7,
          }}
        >
          Describe it the way you would to a creative partner. A rough thought
          is enough—Claude can help shape the idea with you.
        </p>

        <section
          style={{
            marginTop: "clamp(2rem, 6vw, 4rem)",
            overflow: "hidden",
            background: paper,
            border: "1px solid #ded4c6",
            borderRadius: "0.7rem",
            boxShadow: "0 1.5rem 4rem rgba(62, 47, 31, 0.09)",
          }}
        >
          <label style={{ display: "block" }}>
            <span
              style={{
                display: "block",
                padding: "1.25rem clamp(1.25rem, 4vw, 2.25rem) 0",
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "1.2rem",
              }}
            >
              Tell me what you&apos;re imagining
            </span>
            <textarea
              autoFocus
              rows={9}
              value={goal}
              placeholder="Maybe the home page should feel quieter and more like walking into a gallery…"
              onChange={(event) => setGoal(event.currentTarget.value)}
              style={{
                width: "100%",
                resize: "vertical",
                border: 0,
                background: "transparent",
                color: ink,
                padding: "1rem clamp(1.25rem, 4vw, 2.25rem) 1.5rem",
                font: "400 1.12rem/1.75 Georgia, 'Times New Roman', serif",
                boxSizing: "border-box",
              }}
            />
          </label>

          <details
            style={{
              borderTop: "1px solid #e7ded2",
              padding: "1rem clamp(1.25rem, 4vw, 2.25rem)",
            }}
          >
            <summary
              style={{
                color: "#675d54",
                cursor: "pointer",
                fontWeight: 650,
              }}
            >
              Add a page or reference image, if helpful
            </summary>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
                gap: "1rem",
                padding: "1.25rem 0 0.5rem",
              }}
            >
              <label style={{ display: "grid", gap: "0.45rem" }}>
                <span style={{ fontSize: "0.9rem", fontWeight: 650 }}>
                  Page or area
                </span>
                <select
                  style={smallFieldStyle}
                  value={page}
                  onChange={(event) => setPage(event.currentTarget.value)}
                >
                  <option value="">Let Claude work it out</option>
                  {pageOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label style={{ display: "grid", gap: "0.45rem" }}>
                <span style={{ fontSize: "0.9rem", fontWeight: 650 }}>
                  Reference images
                </span>
                <input
                  style={smallFieldStyle}
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
                <span style={{ color: "#71675e", fontSize: "0.82rem" }}>
                  {referenceImages.length
                    ? `${referenceImages.length} selected. Attach them again when Claude opens.`
                    : "Screenshots, sketches, or visual inspiration."}
                </span>
              </label>
            </div>
          </details>
        </section>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.25rem",
            marginTop: "1.25rem",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#675d54",
              fontSize: "0.9rem",
              lineHeight: 1.55,
            }}
          >
            Claude will check the work, prepare it for your review, and ask you
            before publishing it to the live site.
          </p>
          <a
            href="https://claude.ai/code"
            target="_blank"
            rel="noreferrer"
            onClick={() => void copyPrompt()}
            style={{
              display: "inline-flex",
              justifyContent: "center",
              borderRadius: "999px",
              background: ink,
              color: "#fffdf8",
              padding: "0.95rem 1.35rem",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 0.55rem 1.2rem rgba(41, 35, 30, 0.16)",
            }}
          >
            {copied ? "Copied—continue in Claude" : "Continue in Claude →"}
          </a>
        </div>

        <aside
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(12rem, 1fr))",
            gap: "0.8rem",
            marginTop: "clamp(2.5rem, 7vw, 5rem)",
            paddingTop: "1.25rem",
            borderTop: "1px solid #d6ccbf",
            color: "#675d54",
            fontSize: "0.82rem",
            lineHeight: 1.5,
          }}
        >
          <span>01 · Claude works safely in the background.</span>
          <span>02 · You get a review link before anything changes.</span>
          <span>03 · Nothing is published until you approve.</span>
        </aside>
      </div>
    </main>
  );
}
