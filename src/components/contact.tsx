import { contact, site } from "@/content/site";
import { ContactForm } from "./contact-form";
import { PlaceholderTag } from "./placeholder-tag";
import { Reveal } from "./reveal";

export function Contact() {
  return (
    <section
      id="contatti"
      aria-labelledby="contatti-title"
      className="on-dark bg-carbon py-section text-ivory"
    >
      <div className="container-site grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow text-paper-muted">
              <span aria-hidden className="text-accent-soft">
                —&nbsp;
              </span>
              {contact.eyebrow}
            </p>
            <h2 id="contatti-title" className="mt-5 font-serif text-h2 font-light balance">
              {contact.title}
            </h2>
            <p className="mt-8 max-w-[34rem] text-lead text-paper-muted pretty">{contact.intro}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-12 space-y-6 border-t border-line-dark pt-8 text-[0.9375rem]">
              <div>
                <dt className="eyebrow text-paper-muted">Email</dt>
                <dd className="mt-2">
                  {contact.email ? (
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-serif text-2xl underline-offset-4 hover:underline"
                    >
                      {contact.email}
                    </a>
                  ) : (
                    <PlaceholderTag>Email da inserire in src/content/site.ts</PlaceholderTag>
                  )}
                </dd>
              </div>
              {contact.phone && (
                <div>
                  <dt className="eyebrow text-paper-muted">Telefono</dt>
                  <dd className="mt-2">
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, "")}`}
                      className="underline-offset-4 hover:underline"
                    >
                      {contact.phone}
                    </a>
                  </dd>
                </div>
              )}
              <div>
                <dt className="eyebrow text-paper-muted">Base</dt>
                <dd className="mt-2">{site.city}, Italia</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.15}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
