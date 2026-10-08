/**
 * Endpoint del modulo contatti.
 *
 * Non invia email da solo: inoltra la richiesta (JSON) al servizio indicato in
 * CONTACT_WEBHOOK_URL — ad esempio un endpoint Formspree, Getform, Make, Zapier
 * o una funzione propria. Senza questa variabile risponde 503 e il modulo NON
 * mostra il messaggio di successo.
 *
 * Variabili d'ambiente (mai nel codice, vedi .env.example):
 * - CONTACT_WEBHOOK_URL    URL che riceve la richiesta (obbligatoria)
 * - CONTACT_WEBHOOK_TOKEN  token opzionale, inviato come "Authorization: Bearer …"
 */

const LIMITS = { name: 120, email: 200, projectType: 120, message: 5000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = {
  name: string;
  email: string;
  projectType: string;
  message: string;
  privacy: boolean;
  website?: string; // honeypot anti-spam: deve restare vuoto
};

function json(body: Record<string, unknown>, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  let data: Partial<Payload>;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_body" }, 400);
  }

  // Honeypot compilato: probabilmente un bot. Nessun inoltro.
  if (typeof data.website === "string" && data.website.trim() !== "") {
    return json({ ok: false, error: "rejected" }, 400);
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const projectType = String(data.projectType ?? "").trim();
  const message = String(data.message ?? "").trim();

  const fieldErrors: Record<string, string> = {};
  if (!name || name.length > LIMITS.name) fieldErrors.name = "Inserisci il tuo nome.";
  if (!EMAIL_RE.test(email) || email.length > LIMITS.email) fieldErrors.email = "Inserisci un'email valida.";
  if (!projectType || projectType.length > LIMITS.projectType)
    fieldErrors.projectType = "Seleziona il tipo di progetto.";
  if (message.length < 10 || message.length > LIMITS.message)
    fieldErrors.message = "Scrivi almeno qualche riga sul progetto.";
  if (data.privacy !== true) fieldErrors.privacy = "È necessario il consenso per ricevere una risposta.";

  if (Object.keys(fieldErrors).length > 0) {
    return json({ ok: false, error: "validation", fieldErrors }, 422);
  }

  const endpoint = process.env.CONTACT_WEBHOOK_URL;
  if (!endpoint) {
    return json({ ok: false, error: "not_configured" }, 503);
  }

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (process.env.CONTACT_WEBHOOK_TOKEN) {
      headers.Authorization = `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}`;
    }
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ name, email, projectType, message, source: "andreaguidoboni.com" }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!upstream.ok) {
      return json({ ok: false, error: "upstream_failed" }, 502);
    }
  } catch {
    return json({ ok: false, error: "upstream_unreachable" }, 502);
  }

  return json({ ok: true }, 200);
}
