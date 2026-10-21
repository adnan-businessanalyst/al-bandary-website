"use client";

import { FormEvent, useState } from "react";
import { useI18n } from "@/lib/language";

export function ContactForm() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = [
      `${t.contact.name}: ${data.get("name") ?? ""}`,
      `${t.contact.company}: ${data.get("company") ?? ""}`,
      `${t.contact.emailField}: ${data.get("email") ?? ""}`,
      `${t.contact.phoneField}: ${data.get("phone") ?? ""}`,
      `${t.contact.product}: ${data.get("product") ?? ""}`,
      `${t.contact.message}: ${data.get("message") ?? ""}`,
    ];
    const mailto = `mailto:${t.contact.email}?subject=${encodeURIComponent(
      t.contact.formTitle,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = mailto;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="glass rounded-3xl p-8 sm:p-10">
        <p className="text-xs uppercase tracking-[0.25em] text-gold">{t.contact.formTitle}</p>
        <h3 className="font-display mt-3 text-3xl text-cream">{t.contact.sentTitle}</h3>
        <p className="mt-4 text-sand/85">{t.contact.sentBody}</p>
        <button
          type="button"
          onClick={() => setSent(false)}
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
    <form onSubmit={onSubmit} className="glass rounded-3xl p-6 sm:p-10">
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
          <input name="email" type="email" required className={field} />
        </label>
        <label className="grid gap-2 text-sm">
          {t.contact.phoneField}
          <input name="phone" className={field} />
        </label>
        <label className="grid gap-2 text-sm sm:col-span-2">
          {t.contact.product}
          <input
            name="product"
            placeholder={t.contact.productPlaceholder}
            className={field}
          />
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
      <button
        type="submit"
        className="mt-6 rounded-full bg-gold px-6 py-3 font-medium text-on-gold transition hover:bg-gold-deep"
      >
        {t.contact.submit}
      </button>
    </form>
  );
}
