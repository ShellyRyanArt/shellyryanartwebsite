import { getCloudflareContext } from "@opennextjs/cloudflare";

const recipient = "shelly@shellyryan.art";
const sender = "website@shellyryan.art";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  company?: unknown;
  startedAt?: unknown;
};

type EmailBinding = {
  send(message: {
    to: string;
    from: { email: string; name: string };
    replyTo: { email: string; name: string };
    subject: string;
    text: string;
  }): Promise<unknown>;
};

function clean(value: unknown, maximum: number) {
  return typeof value === "string" ? value.trim().slice(0, maximum) : "";
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get("origin");

  if (origin !== requestUrl.origin) {
    return Response.json({ error: "Invalid request origin." }, { status: 403 });
  }

  if (Number(request.headers.get("content-length") || 0) > 16_384) {
    return Response.json({ error: "Message is too large." }, { status: 413 });
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ error: "Invalid message." }, { status: 400 });
  }

  const name = clean(payload.name, 100);
  const email = clean(payload.email, 254);
  const subject = clean(payload.subject, 140) || "Website inquiry";
  const message = clean(payload.message, 5_000);
  const company = clean(payload.company, 200);
  const startedAt = Number(payload.startedAt);

  if (company) {
    return Response.json({ ok: true });
  }

  if (
    !name ||
    !validEmail(email) ||
    !message ||
    !Number.isFinite(startedAt) ||
    Date.now() - startedAt < 2_000 ||
    Date.now() - startedAt > 86_400_000
  ) {
    return Response.json(
      { error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  try {
    const { env } = await getCloudflareContext({ async: true });
    const emailBinding = (env as unknown as { CONTACT_EMAIL?: EmailBinding })
      .CONTACT_EMAIL;
    if (!emailBinding) throw new Error("CONTACT_EMAIL binding is unavailable");

    await emailBinding.send({
      to: recipient,
      from: { email: sender, name: "Shelly Ryan Art Website" },
      replyTo: { email, name },
      subject: `[Website] ${subject}`,
      text: `${message}\n\nFrom: ${name}\nEmail: ${email}`,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact form email failed", error);
    return Response.json(
      { error: "The message could not be sent. Please try again shortly." },
      { status: 503 },
    );
  }
}
