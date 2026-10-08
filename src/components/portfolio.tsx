import { credibility, portfolio, type Project } from "@/content/site";
import { Arrow } from "./hero";
import { MediaSlot } from "./media-slot";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";

// Composizione editoriale asimmetrica per i progetti in evidenza (desktop).
const layout = [
  { wrap: "lg:col-span-12", sizes: "(min-width: 1376px) 1312px, 100vw" },
  { wrap: "lg:col-span-5 lg:mt-24", sizes: "(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw" },
  { wrap: "lg:col-span-6 lg:col-start-7", sizes: "(min-width: 1024px) 48vw, (min-width: 768px) 50vw, 100vw" },
  { wrap: "lg:col-span-8 lg:col-start-3", sizes: "(min-width: 1024px) 64vw, 100vw" },
];

export function Portfolio() {
  return (
    <section
      id="progetti"
      aria-labelledby="progetti-title"
      className="on-dark bg-carbon py-section text-ivory"
    >
      <div className="container-site">
        <SectionHeader
          id="progetti-title"
          eyebrow={portfolio.eyebrow}
          title={portfolio.title}
          intro={portfolio.intro}
          tone="dark"
        />

        <ul className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:mt-24 lg:grid-cols-12 lg:gap-y-24">
          {portfolio.featured.map((project, i) => (
            <Reveal
              as="li"
              key={project.id}
              className={`${i === 0 ? "md:col-span-2" : ""} ${layout[i]?.wrap ?? "lg:col-span-6"}`}
            >
              <ProjectCard project={project} sizes={layout[i]?.sizes ?? "100vw"} />
            </Reveal>
          ))}
        </ul>

        {/* Indice dei reportage brevi */}
        <div className="mt-24 lg:mt-36">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h3 className="font-serif text-h3">Altri video reportage</h3>
            <a
              href={portfolio.allWorksCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-sm text-paper-muted transition-colors hover:text-ivory"
            >
              {portfolio.allWorksCta.label}
              <span className="sr-only"> (si apre in una nuova scheda)</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <Arrow />
              </span>
            </a>
          </Reveal>
          <ul className="mt-8 border-t border-line-dark">
            {portfolio.index.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 0.05}
                className="grid gap-2 border-b border-line-dark py-6 sm:grid-cols-12 sm:items-baseline sm:gap-6"
              >
                <span className="eyebrow text-paper-muted sm:col-span-2">{item.date}</span>
                <span className="font-serif text-xl leading-snug sm:col-span-7 lg:text-2xl">
                  {item.title}
                </span>
                <span className="text-sm text-paper-muted sm:col-span-3 sm:text-right">
                  {item.category}
                  {item.publishedOn && <> · {item.publishedOn}</>}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>

        <Credibility />
      </div>
    </section>
  );
}

function ProjectCard({ project, sizes }: { project: Project; sizes: string }) {
  return (
    <article className="group">
      <div className="overflow-hidden rounded-frame">
        <MediaSlot
          image={project.image}
          ratio={project.ratio}
          sizes={sizes}
          hint={`${project.title} · ${project.ratio.replace("/", ":")}`}
          imageClassName="transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="eyebrow text-paper-muted">{project.category}</p>
        {project.year && <p className="eyebrow text-paper-muted">{project.year}</p>}
      </div>
      <h3 className="mt-3 font-serif text-h3">{project.title}</h3>
      <p className="mt-3 max-w-[42ch] leading-relaxed text-paper-muted pretty">{project.description}</p>
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
        {project.publishedOn && (
          <span className="rounded-control border border-line-dark px-3 py-1 text-paper-muted">
            Pubblicato su {project.publishedOn}
          </span>
        )}
        <a
          href={project.source}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-ivory/30 underline-offset-4 transition-colors hover:decoration-accent-soft"
        >
          Vedi sul sito<span className="sr-only">: {project.title} (si apre in una nuova scheda)</span>
        </a>
      </div>
    </article>
  );
}

/** Pubblicazioni, clienti e testimonianze: ogni blocco compare solo se documentato. */
function Credibility() {
  const { publications, clients, testimonials, writing } = credibility;
  return (
    <div className="mt-24 grid gap-12 border-t border-line-dark pt-16 lg:mt-36 lg:grid-cols-12">
      <Reveal className="lg:col-span-4">
        <p className="eyebrow text-paper-muted">
          <span aria-hidden className="text-accent-soft">
            —&nbsp;
          </span>
          {credibility.eyebrow}
        </p>
      </Reveal>

      <div className="grid gap-12 sm:grid-cols-2 lg:col-span-8">
        {publications.length > 0 && (
          <Reveal>
            <h3 className="font-serif text-xl">Pubblicazioni e distribuzione</h3>
            <p className="mt-2 text-sm text-paper-muted">
              Testate e piattaforme che hanno pubblicato i lavori. Non sono clienti diretti.
            </p>
            <ul className="mt-6 space-y-5">
              {publications.map((p) => (
                <li key={p.name}>
                  <p className="font-serif text-2xl">{p.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-paper-muted">{p.detail}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {clients.length > 0 && (
          <Reveal>
            <h3 className="font-serif text-xl">Clienti</h3>
            <ul className="mt-6 space-y-2">
              {clients.map((c) => (
                <li key={c.name} className="font-serif text-2xl">
                  {c.name}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        <Reveal delay={0.08}>
          <h3 className="font-serif text-xl">{writing.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-paper-muted">{writing.text}</p>
          <a
            href={writing.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-3 text-sm underline decoration-ivory/30 underline-offset-4 hover:decoration-accent-soft"
          >
            {writing.cta.label}
            <span className="sr-only"> (si apre in una nuova scheda)</span>
            <Arrow />
          </a>
        </Reveal>

        {testimonials.length > 0 && (
          <div className="sm:col-span-2">
            {testimonials.map((t) => (
              <Reveal key={t.author}>
                <figure className="border-l border-accent-soft pl-6">
                  <blockquote className="font-serif text-2xl italic leading-snug">“{t.quote}”</blockquote>
                  <figcaption className="mt-4 text-sm text-paper-muted">
                    {t.author} — {t.role}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
