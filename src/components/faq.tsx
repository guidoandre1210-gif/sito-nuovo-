import { faq } from "@/content/site";
import { Reveal } from "./reveal";

/** FAQ con <details>/<summary> nativi: accessibili da tastiera e screen reader senza JS. */
export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="bg-ivory py-section">
      <div className="container-site grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow text-ink-muted">
            <span aria-hidden className="text-accent">
              —&nbsp;
            </span>
            {faq.eyebrow}
          </p>
          <h2 id="faq-title" className="mt-5 font-serif text-h2 font-light balance">
            {faq.title}
          </h2>
        </Reveal>

        <div className="border-t border-carbon lg:col-span-8">
          {faq.items.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.05}>
              <details className="group border-b border-line-light">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-7 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-serif text-xl leading-snug sm:text-2xl">{item.q}</h3>
                  <span
                    aria-hidden
                    className="relative mt-2 h-4 w-4 shrink-0 text-accent before:absolute before:left-0 before:top-1/2 before:h-px before:w-4 before:bg-current after:absolute after:left-1/2 after:top-0 after:h-4 after:w-px after:bg-current after:transition-transform after:duration-300 group-open:after:scale-y-0"
                  />
                </summary>
                <p className="max-w-[60ch] pb-8 leading-relaxed text-ink-muted pretty">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
