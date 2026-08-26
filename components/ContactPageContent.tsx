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
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!contactEmail) return;
    const subject = form.subject || "Website inquiry";
    const body = `${form.message}\n\nFrom: ${form.name} (${form.email})`;
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
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
          ) : submitted ? (
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
              <button type="submit" className="button-primary w-full">
                Open email
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
