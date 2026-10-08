import { value } from "@/content/site";
import { Reveal } from "./reveal";

export function Value() {
  return (
    <section aria-labelledby="valore-title" className="bg-ivory py-section">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <p className="eyebrow text-ink-muted">
              <span aria-hidden className="text-accent">
                —&nbsp;
              </span>
              {value.eyebrow}
            </p>
          </Reveal>
          <div className="lg:col-span-9">
            <Reveal>
              <h2 id="valore-title" className="font-serif text-h2 font-light balance">
                {value.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-[38rem] text-lead text-ink-muted pretty">{value.intro}</p>
            </Reveal>
          </div>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden border-y border-line-light md:grid-cols-3 lg:mt-24">
          {value.points.map((point, i) => (
            <Reveal
              as="li"
              key={point.title}
              delay={i * 0.08}
              className="border-line-light py-10 md:px-8 md:first:pl-0 md:[&:not(:first-child)]:border-l"
            >
              <p aria-hidden className="font-serif text-sm italic text-accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-serif text-h3">{point.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-muted pretty">{point.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
