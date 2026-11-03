"use client";

import { FormEvent, useRef, useState } from "react";
import { trackGenerateLead } from "@/lib/analytics";
import { useI18n } from "@/lib/language";

export function ContactForm() {
  const { locale, t } = useI18n();
  const [sent, setSent] = useState(false);
  const [phase, setPhase] = useState<"idle" | "submitting" | "error">("idle");
  const idempotencyKey = useRef<string | null>(null);
  const trackedIds = useRef<Set<string>>(new Set());

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (phase === "submitting") return;
    const data = new FormData(event.currentTarget);
    if (!idempotencyKey.current) idempotencyKey.current = crypto.randomUUID();
    setPhase("submitting");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idempotencyKey: idempotencyKey.current,
          name: data.get("name") ?? "",
          company: data.get("company") ?? "",
          email: data.get("email") ?? "",
          phone: data.get("phone") ?? "",
          product: data.get("product") ?? "",
          message: data.get("message") ?? "",
          faxNumber: data.get("faxNumber") ?? "",
          language: locale,
          pagePath: window.location.pathname,
          utmCampaign: new URLSearchParams(window.location.search).get("utm_campaign"),
          referrer: document.referrer,
        }),
      });
      if (!response.ok) throw new Error("save failed");
      const payload: unknown = await response.json();
      const id =
        payload && typeof payload === "object" && "id" in payload && typeof payload.id === "string"
          ? payload.id
          : "";
      if (!id) throw new Error("save failed");
      if (!trackedIds.current.has(id)) {
        trackedIds.current.add(id);
        trackGenerateLead(locale, id);
      }
      setSent(true);
      setPhase("idle");
    } catch {
      setPhase("error");
    }
  }

  if (sent) {
    return (
      <div className="glass rounded-3xl p-8 sm:p-10">
        <p className="text-xs uppercase tracking-[0.25em] text-gold">{t.contact.formTitle}</p>
        <h3 className="font-display mt-3 text-3xl text-cream">{t.contact.sentTitle}</h3>
        <p className="mt-4 text-sand/85">{t.contact.sentBody}</p>
        <button
          type="button"
          onClick={() => {
            idempotencyKey.current = null;
            setSent(false);
            setPhase("idle");
          }}
          className="mt-8 rounded-full border border-gold/40 px-5 py-2.5 text-gold hover:bg-gold/10"
        >
          {t.contact.another}
        </button>
      </div>
    );
  }

  const field =
    "w-full rounded-2xl border border-gold/25 bg-ink-3 px-4 py-3 text-cream outline-none placeholder:text-muted focus:border-gold";

  return (
    <form onSubmit={onSubmit} className="glass relative rounded-3xl p-6 sm:p-10">
      <p className="text-xs uppercase tracking-[0.25em] text-gold">{t.contact.formTitle}</p>
      <p className="mt-3 text-sand/85">{t.contact.formLead}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          {t.contact.name}
          <input name="name" required className={field} />
        </label>
        <label className="grid gap-2 text-sm">
          {t.contact.company}
          <input name="company" required className={field} />
        </label>
        <label className="grid gap-2 text-sm">
          {t.contact.emailField}
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
        <label className="grid gap-2 text-sm">
          {t.contact.phoneField}
          <input name="phone" autoComplete="tel" className={field} />
        </label>
        <label className="grid gap-2 text-sm sm:col-span-2">
          {t.contact.product}
          <input name="product" placeholder={t.contact.productPlaceholder} className={field} />
        </label>
        <label className="grid gap-2 text-sm sm:col-span-2">
          {t.contact.message}
          <textarea
            name="message"
            required
            rows={5}
            placeholder={t.contact.messagePlaceholder}
            className={`${field} resize-y`}
          />
        </label>
      </div>
      <div inert aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label>
          Fax
          <input name="faxNumber" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      {phase === "error" ? (
        <p role="alert" className="mt-4 text-sm text-sand">
          {t.contact.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={phase === "submitting"}
        aria-busy={phase === "submitting"}
        className="mt-6 rounded-full bg-gold px-6 py-3 font-medium text-on-gold transition hover:bg-gold-deep disabled:opacity-60"
      >
        {phase === "submitting" ? t.contact.sending : t.contact.submit}
      </button>
    </form>
  );
}
