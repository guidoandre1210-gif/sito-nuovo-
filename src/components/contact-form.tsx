"use client";

import { useId, useRef, useState } from "react";
import { contact } from "@/content/site";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string; notConfigured?: boolean };

type FieldErrors = Partial<Record<"name" | "email" | "projectType" | "message" | "privacy", string>>;

const f = contact.form;

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      projectType: String(fd.get("projectType") ?? ""),
      message: String(fd.get("message") ?? ""),
      privacy: fd.get("privacy") === "on",
      website: String(fd.get("website") ?? ""),
    };

    // Validazione lato client (la stessa viene ripetuta sul server).
    const clientErrors: FieldErrors = {};
    if (!payload.name.trim()) clientErrors.name = "Inserisci il tuo nome.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim()))
      clientErrors.email = "Inserisci un'email valida.";
    if (!payload.projectType) clientErrors.projectType = "Seleziona il tipo di progetto.";
    if (payload.message.trim().length < 10) clientErrors.message = "Scrivi almeno qualche riga sul progetto.";
    if (!payload.privacy) clientErrors.privacy = "È necessario il consenso per ricevere una risposta.";
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) {
      const first = Object.keys(clientErrors)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: FieldErrors;
      };

      // Successo SOLO se il server conferma l'inoltro effettivo.
      if (res.ok && data.ok === true) {
        setStatus({ kind: "success" });
        form.reset();
      } else if (data.error === "validation" && data.fieldErrors) {
        setErrors(data.fieldErrors);
        setStatus({ kind: "idle" });
      } else if (data.error === "not_configured") {
        setStatus({ kind: "error", message: f.errorNotConfigured, notConfigured: true });
      } else {
        setStatus({ kind: "error", message: f.errorGeneric });
      }
    } catch {
      setStatus({ kind: "error", message: f.errorGeneric });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  if (status.kind === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-frame border border-line-dark p-8 sm:p-10"
      >
        <p className="font-serif text-h3">Messaggio inviato.</p>
        <p className="mt-4 leading-relaxed text-paper-muted">{f.success}</p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-8 text-sm underline underline-offset-4"
        >
          Scrivi un altro messaggio
        </button>
      </div>
    );
  }

  const submitting = status.kind === "submitting";
  const input =
    "mt-2 block w-full rounded-frame border border-ivory/25 bg-carbon-2 px-4 py-3.5 text-base text-ivory placeholder:text-paper-muted/70 transition-colors hover:border-ivory/45 focus:border-accent-soft focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft aria-[invalid=true]:border-accent-soft";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-describedby={id("required")}
      className="space-y-6"
    >
      <p id={id("required")} className="text-sm text-paper-muted">
        Tutti i campi sono obbligatori.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={id("name")} label={f.nameLabel} error={errors.name}>
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? id("name-err") : undefined}
            className={input}
          />
        </Field>
        <Field id={id("email")} label={f.emailLabel} error={errors.email}>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={200}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? id("email-err") : undefined}
            className={input}
          />
        </Field>
      </div>

      <Field id={id("projectType")} label={f.typeLabel} error={errors.projectType}>
        <div className="relative">
          <select
            id={id("projectType")}
            name="projectType"
            required
            defaultValue=""
            aria-invalid={errors.projectType ? true : undefined}
            aria-describedby={errors.projectType ? id("projectType-err") : undefined}
            className={`${input} appearance-none pr-12`}
          >
            <option value="" disabled>
              {f.typePlaceholder}
            </option>
            {contact.projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <svg
            aria-hidden
            className="pointer-events-none absolute right-4 top-1/2 mt-1 -translate-y-1/2"
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
          >
            <path d="M1 1.5l5 5 5-5" />
          </svg>
        </div>
      </Field>

      <Field
        id={id("message")}
        label={f.messageLabel}
        error={errors.message}
        hint={f.messageHint}
        hintId={id("message-hint")}
      >
        <textarea
          id={id("message")}
          name="message"
          rows={6}
          required
          maxLength={5000}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={`${id("message-hint")}${errors.message ? ` ${id("message-err")}` : ""}`}
          className={`${input} resize-y`}
        />
      </Field>

      {/* Honeypot anti-spam: invisibile agli utenti, ignorato dagli screen reader */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Lascia vuoto questo campo</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id={id("privacy")}
            name="privacy"
            type="checkbox"
            required
            aria-invalid={errors.privacy ? true : undefined}
            aria-describedby={errors.privacy ? id("privacy-err") : undefined}
            className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-accent-soft)]"
          />
          <label htmlFor={id("privacy")} className="text-sm leading-relaxed text-paper-muted">
            {f.privacyLabel}{" "}
            <a href="/privacy" className="text-ivory underline underline-offset-4">
              Leggi l&apos;informativa
            </a>
            .
          </label>
        </div>
        {errors.privacy && (
          <p id={id("privacy-err")} className="mt-2 text-sm text-accent-soft">
            {errors.privacy}
          </p>
        )}
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {status.kind === "error" && (
          <div
            role="alert"
            className="rounded-frame border border-accent-soft/60 p-5 text-sm leading-relaxed"
          >
            <p>{status.message}</p>
            {status.notConfigured && (
              <p className="mt-2 text-paper-muted">
                {contact.email ? (
                  <>
                    Nel frattempo puoi scrivere direttamente a{" "}
                    <a href={`mailto:${contact.email}`} className="text-ivory underline underline-offset-4">
                      {contact.email}
                    </a>
                    .
                  </>
                ) : (
                  <>Integrazione da completare: configura CONTACT_WEBHOOK_URL (vedi README).</>
                )}
              </p>
            )}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        aria-disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-3 rounded-control bg-ivory px-8 py-4 text-[0.9375rem] font-medium text-ink transition-colors duration-300 hover:bg-accent-soft disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {submitting ? f.submitting : f.submit}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  hintId,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  hintId?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {hint && (
        <p id={hintId} className="mt-1 text-sm text-paper-muted">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-2 text-sm text-accent-soft">
          {error}
        </p>
      )}
    </div>
  );
}
