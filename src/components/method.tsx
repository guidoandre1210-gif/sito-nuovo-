import { method } from "@/content/site";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

export function Method() {
  return (
    <section id="metodo" aria-labelledby="metodo-title" className="bg-ivory py-section">
      <div className="container-site">
        <SectionHeader id="metodo-title" eyebrow={method.eyebrow} title={method.title} intro={method.intro} />

        <ol className="mt-16 grid gap-x-8 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {method.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.1} className="border-t border-carbon pb-10 pt-8">
              <p aria-hidden className="font-serif text-[4.5rem] font-light leading-none text-ivory-3">
                {i + 1}
              </p>
              <h3 className="mt-6 font-serif text-h3 balance">
                <span className="sr-only">Passaggio {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-4 leading-relaxed text-ink-muted pretty">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
