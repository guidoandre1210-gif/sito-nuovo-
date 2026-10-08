import Image from "next/image";
import { hero } from "@/content/site";
import { Showreel } from "./showreel";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="on-dark relative bg-carbon pt-28 text-ivory lg:pt-36"
    >
      <div className="container-site">
        <p className="eyebrow hero-in text-paper-muted">{hero.eyebrow}</p>

        <h1 id="hero-title" className="mt-6 font-serif text-display font-light balance lg:mt-8">
          <span className="block">{hero.headline[0]}</span>
          <span className="block italic text-ivory/90">{hero.headline[1]}</span>
        </h1>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:items-end">
          <p className="hero-in text-lead text-ivory/80 pretty lg:col-span-6 [animation-delay:120ms]">
            {hero.subheadline}
          </p>

          <div className="hero-in flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end [animation-delay:200ms]">
            <a
              href={hero.primaryCta.href}
              className="inline-flex items-center justify-center gap-3 rounded-control bg-ivory px-7 py-4 text-[0.9375rem] font-medium text-ink transition-colors duration-300 hover:bg-accent-soft"
            >
              {hero.primaryCta.label}
              <Arrow />
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-control border border-ivory/30 px-7 py-4 text-[0.9375rem] font-medium transition-colors duration-300 hover:border-ivory hover:bg-ivory/5"
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>

      <div className="container-site mt-14 lg:mt-20">
        <div className="relative aspect-[4/5] overflow-hidden rounded-frame bg-carbon-3 sm:aspect-[3/2] lg:aspect-[21/9]">
          {hero.showreel ? (
            <Showreel video={hero.showreel} title="Guarda lo showreel" />
          ) : hero.image ? (
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              priority
              sizes="(min-width: 1376px) 1312px, 100vw"
              className="object-cover"
            />
          ) : (
            <HeroPlaceholder />
          )}
        </div>
      </div>

      <div className="container-site">
        <ul className="grid gap-4 border-t border-line-dark py-8 text-sm text-paper-muted sm:grid-cols-3 lg:mt-0">
          {hero.facts.map((fact) => (
            <li key={fact} className="flex items-center gap-3">
              <span aria-hidden className="h-1 w-1 rounded-full bg-accent-soft" />
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function HeroPlaceholder() {
  return (
    <div
      role="img"
      aria-label={`Spazio riservato alla foto hero: ${hero.imageSlotHint}`}
      data-placeholder="media"
      className="absolute inset-0 text-paper-muted"
    >
      {/* Griglia dei terzi e crocini di taglio: placeholder "mirino" */}
      <div aria-hidden className="absolute inset-0 grid grid-cols-3 grid-rows-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="border-[0.5px] border-ivory/[0.07]" />
        ))}
      </div>
      <span
        aria-hidden
        className="absolute left-5 top-5 h-8 w-8 border-l border-t border-ivory/40 lg:left-8 lg:top-8"
      />
      <span
        aria-hidden
        className="absolute right-5 top-5 h-8 w-8 border-r border-t border-ivory/40 lg:right-8 lg:top-8"
      />
      <span
        aria-hidden
        className="absolute bottom-5 left-5 h-8 w-8 border-b border-l border-ivory/40 lg:bottom-8 lg:left-8"
      />
      <span
        aria-hidden
        className="absolute bottom-5 right-5 h-8 w-8 border-b border-r border-ivory/40 lg:bottom-8 lg:right-8"
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <span aria-hidden className="mx-auto block h-10 w-10 rounded-full border border-ivory/40" />
      </div>
      <div className="absolute inset-x-8 bottom-8 flex flex-wrap items-end justify-between gap-3 lg:inset-x-12 lg:bottom-12">
        <p className="eyebrow text-[0.65rem]">
          <span aria-hidden className="text-accent-soft">
            ● REC
          </span>
          &nbsp;&nbsp;Placeholder — {hero.imageSlotHint}
        </p>
        <p className="eyebrow hidden text-[0.65rem] md:block">
          Sostituisci in src/content/site.ts → hero.image
        </p>
      </div>
    </div>
  );
}

export function Arrow() {
  return (
    <svg
      aria-hidden
      width="16"
      height="10"
      viewBox="0 0 16 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <path d="M0 5h15M11 1l4 4-4 4" />
    </svg>
  );
}
