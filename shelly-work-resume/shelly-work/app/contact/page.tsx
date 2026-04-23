"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || `Request failed (${res.status})`);
      }
      setSubmitted(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.875rem 1rem",
    background: "transparent",
    border: "1px solid rgba(107, 90, 62, 0.3)",
    color: "var(--ink)",
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.3s ease",
  };

  const labelStyle = {
    display: "block",
    fontFamily: "'Jost', sans-serif",
    fontWeight: 300,
    fontSize: "0.65rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "var(--sepia)",
    marginBottom: "0.5rem",
  };

  return (
    <>
      {/* Header */}
      <section
        className="pt-40 pb-16 px-8 text-center"
        style={{ background: "var(--parchment)" }}
      >
        <p
          className="font-sans-light mb-4"
          style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          Reach Out
        </p>
        <h1
          className="font-display"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, color: "var(--ink)", lineHeight: 1.1 }}
        >
          Contact
        </h1>
        <div className="mt-6 divider" />
        <p
          className="mt-6 font-display mx-auto"
          style={{ fontSize: "1.1rem", fontStyle: "italic", color: "var(--sepia)", maxWidth: "480px", lineHeight: 1.8 }}
        >
          For work inquiries, purchasing information or general questions — Shelly would love to hear from you.
        </p>
      </section>

      {/* Form */}
      <section
        className="py-16 px-8 pb-32"
        style={{ background: "var(--parchment)" }}
      >
        <div className="max-w-xl mx-auto">
          {submitted ? (
            <div className="text-center py-16">
              <div className="divider mb-10" />
              <h2
                className="font-display mb-4"
                style={{ fontSize: "2.5rem", fontWeight: 300, fontStyle: "italic", color: "var(--ink)" }}
              >
                Thank you
              </h2>
              <p
                className="font-display"
                style={{ fontSize: "1.1rem", color: "var(--sepia)", lineHeight: 1.8 }}
              >
                Your message has been received. Shelly will be in touch soon.
              </p>
              <div className="divider mt-10" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label style={labelStyle}>Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    style={inputStyle}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={(e) => (e.target.style.borderColor = "var(--amber)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(107, 90, 62, 0.3)")}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    style={inputStyle}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={(e) => (e.target.style.borderColor = "var(--amber)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(107, 90, 62, 0.3)")}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Subject</label>
                <select
                  style={{ ...inputStyle, cursor: "pointer" }}
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  onFocus={(e) => (e.target.style.borderColor = "var(--amber)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(107, 90, 62, 0.3)")}
                >
                  <option value="">Select a subject</option>
                  <option value="original">Purchase Original Work</option>
                  <option value="press">Press / Exhibition</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Message</label>
                <textarea
                  required
                  rows={6}
                  placeholder="Tell Shelly about your inquiry..."
                  style={{ ...inputStyle, resize: "vertical" }}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={(e) => (e.target.style.borderColor = "var(--amber)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(107, 90, 62, 0.3)")}
                />
              </div>

              <button
                type="submit"
                className="font-sans-light w-full"
                style={{
                  padding: "1rem",
                  background: "var(--ink)",
                  color: "var(--parchment)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.3s ease",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.background = "var(--amber)")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.background = "var(--ink)")}
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
