"use client";

import { Reveal } from "./reveal";
import { useI18n } from "@/lib/language";

export function Certifications({ className = "" }: { className?: string }) {
  const { t } = useI18n();

  return (
    <div className={className}>
      <div className="grid gap-4 md:grid-cols-3">
        {t.certs.items.map((cert, i) => (
          <Reveal key={cert.code} delay={i * 0.06} className="glass rounded-3xl p-6">
            <div className="mb-5 grid size-16 place-items-center rounded-full border border-gold/40 text-gold">
              <span className="whitespace-pre-line text-center text-[0.62rem] font-semibold leading-tight tracking-wide">
                {cert.seal}
              </span>
            </div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold">{cert.code}</p>
            <h3 className="mt-2 text-xl text-cream">{cert.name}</h3>
            <p className="mt-3 leading-7 text-sand/80">{cert.text}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
