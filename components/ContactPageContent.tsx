"use client";

import Image from "next/image";
import { useState } from "react";

import type { ContactPageContent as ContactContent } from "@/content/types";

export default function ContactPageContent({
  content,
  contactEmail,
}: {
  content: ContactContent;
  contactEmail: string;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "",
  });
  const [startedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!contactEmail || status === "sending") return;
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, startedAt }),
      });
      if (!response.ok) throw new Error("Contact request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full border bg-transparent px-4 py-3 font-display outline-none transition-colors focus:border-[var(--amber)]";

  return (
    <>
      <section
        className="px-8 pb-16 pt-40 text-center"
        style={{ background: "var(--parchment)" }}
      >
        {content.heroImage && (
          <div className="relative mx-auto mb-12 aspect-[16/7] max-w-4xl overflow-hidden">
            <Image
              src={content.heroImage.src}
              alt={content.heroImage.alt}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
        <p className="section-eyebrow mb-4">{content.eyebrow}</p>
        <h1 className="page-title">{content.title}</h1>
        <div className="divider mt-6" />
        <p
          className="font-display mx-auto mt-6 max-w-lg"
          style={{
            fontSize: "1.1rem",
            fontStyle: "italic",
            color: "var(--sepia)",
            lineHeight: 1.8,
          }}
        >
          {content.intro}
        </p>
      </section>

      <section
        className="px-8 pb-32 pt-16"
        style={{ background: "var(--parchment)" }}
      >
        <div className="mx-auto max-w-xl">
          {!contactEmail ? (
            <div
              className="border p-8 text-center"
              style={{ borderColor: "var(--parchment-deeper)" }}
            >
              <h2 className="font-display mb-3 text-2xl">
                Contact details are being updated
              </h2>
              <p className="font-display" style={{ color: "var(--sepia)" }}>
                Add the contact email in Site Settings to enable this form.
              </p>
            </div>
          ) : status === "sent" ? (
            <div className="py-16 text-center">
              <h2 className="font-display mb-4 text-4xl italic">
                {content.confirmationHeading}
              </h2>
              <p className="font-display" style={{ color: "var(--sepia)" }}>
                {content.confirmationBody}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <label className="sr-only" aria-hidden="true">
                Company
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company}
                  onChange={(e) =>
                    setForm({ ...form, company: e.target.value })
                  }
                />
              </label>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <label className="form-label">
                  Name
                  <input
                    required
                    className={inputClass}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </label>
                <label className="form-label">
                  Email
                  <input
                    required
                    type="email"
                    className={inputClass}
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </label>
              </div>
              <label className="form-label">
                Subject
                <input
                  className={inputClass}
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                />
              </label>
              <label className="form-label">
                Message
                <textarea
                  required
                  rows={7}
                  className={inputClass}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />
              </label>
              {status === "error" && (
                <p
                  role="alert"
                  className="font-display text-center text-red-800"
                >
                  We could not send your message. Please try again or email{" "}
                  <a className="underline" href={`mailto:${contactEmail}`}>
                    {contactEmail}
                  </a>
                  .
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="button-primary w-full disabled:cursor-wait disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
