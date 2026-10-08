import { services } from "@/content/site";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

// Layout 2 + 3 su desktop: le prime due card più ampie, le altre tre su una riga.
const span = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];

export function Services() {
  return (
    <section id="servizi" aria-labelledby="servizi-title" className="bg-ivory-2 py-section">
      <div className="container-site">
        <SectionHeader
          id="servizi-title"
          eyebrow={services.eyebrow}
          title={services.title}
          intro={services.intro}
        />

        <ul className="mt-16 grid gap-4 md:grid-cols-2 lg:mt-20 lg:grid-cols-6">
          {services.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.id}
              delay={(i % 3) * 0.08}
              className={`group relative flex flex-col rounded-frame bg-ivory p-7 transition-colors duration-500 hover:bg-carbon hover:text-ivory sm:p-9 ${span[i] ?? ""}`}
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-editorial group-hover:scale-x-100"
              />
              <p className="font-serif text-sm italic text-accent group-hover:text-accent-soft">
                <span className="sr-only">Servizio </span>
                {item.number}
              </p>
              <h3 className="mt-6 font-serif text-h3 balance">{item.title}</h3>
              <ul className="mt-6 space-y-2.5 text-[0.9375rem]">
                {item.includes.map((inc) => (
                  <li key={inc} className="flex gap-3">
                    <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-current opacity-50" />
                    {inc}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-8 text-sm leading-relaxed text-ink-muted transition-colors duration-500 group-hover:text-paper-muted">
                <span className="font-medium text-ink transition-colors duration-500 group-hover:text-ivory">
                  Utile per —{" "}
                </span>
                {item.useful}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
