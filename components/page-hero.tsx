"use client";

import Image from "next/image";

export function PageHero({
  kicker,
  title,
  lead,
  image,
}: {
  kicker: string;
  title: string;
  lead: string;
  image: string;
}) {
  return (
    <section className="relative isolate min-h-[68vh]">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover kenburns"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-photo via-photo/75 to-photo/30" />
        <div className="absolute inset-0 pattern-mask" />
      </div>
      <div className="relative mx-auto flex min-h-[68vh] max-w-[1100px] flex-col justify-end px-6 pb-16 pt-36">
        <p className="rise mb-4 text-xs uppercase tracking-[0.28em] text-gold">{kicker}</p>
          <h1 className="font-display rise max-w-4xl text-[2rem] leading-tight text-on-photo [text-shadow:0_12px_40px_rgba(0,0,0,0.7)] sm:text-6xl">
            {title}
          </h1>
        <p className="rise mt-6 max-w-2xl text-lg leading-8 text-on-photo/80">{lead}</p>
      </div>
    </section>
  );
}
