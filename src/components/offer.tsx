import { offer } from "@/content/site";
import { Arrow } from "./hero";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

export function Offer() {
  return (
    <section aria-labelledby="offerta-title" className="bg-ivory-2 py-section">
      <div className="container-site">
        <SectionHeader id="offerta-title" eyebrow={offer.eyebrow} title={offer.title} />

        <ul className="mt-16 grid gap-4 lg:mt-20 lg:grid-cols-3">
          {offer.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={i * 0.08}
              className={`flex flex-col rounded-frame p-8 sm:p-10 ${
                i === 1 ? "on-dark bg-carbon text-ivory" : "bg-ivory"
              }`}
            >
              <h3 className="font-serif text-h3">{item.title}</h3>
              <p className={`mt-4 leading-relaxed pretty ${i === 1 ? "text-paper-muted" : "text-ink-muted"}`}>
                {item.text}
              </p>
              <p className="mb-10 mt-6 text-sm">
                <span className="font-medium">Ideale per — </span>
                <span className={i === 1 ? "text-paper-muted" : "text-ink-muted"}>{item.fit}</span>
              </p>
              <div className={`mt-auto border-t pt-6 ${i === 1 ? "border-line-dark" : "border-line-light"}`}>
                <p className="font-serif text-2xl italic">{offer.priceLabel}</p>
                <a
                  href="#contatti"
                  className={`mt-6 inline-flex w-full items-center justify-between gap-3 rounded-control px-6 py-3.5 text-[0.9375rem] font-medium transition-colors duration-300 ${
                    i === 1
                      ? "bg-ivory text-ink hover:bg-accent-soft"
                      : "bg-carbon text-ivory hover:bg-accent"
                  }`}
                >
                  {item.cta}
                  <Arrow />
                </a>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
