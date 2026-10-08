import { contact, legal, nav, site } from "@/content/site";
import { PlaceholderTag } from "./placeholder-tag";

export function Footer() {
  return (
    <footer className="on-dark bg-carbon text-ivory">
      <div className="container-site">
        <div className="grid gap-12 border-t border-line-dark py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-5">
            <p className="font-serif text-3xl tracking-tight">{site.name}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-paper-muted">
              {site.role}. Base a {site.city}: reportage, viaggi, outdoor, progetti editoriali e digitali.
            </p>
          </div>

          <nav aria-label="Navigazione nel footer" className="lg:col-span-3">
            <h2 className="eyebrow text-paper-muted">Sezioni</h2>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="underline-offset-4 hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="eyebrow text-paper-muted">Contatti</h2>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              <li>
                {contact.email ? (
                  <a href={`mailto:${contact.email}`} className="underline-offset-4 hover:underline">
                    {contact.email}
                  </a>
                ) : (
                  <PlaceholderTag>Email da inserire</PlaceholderTag>
                )}
              </li>
              {contact.phone && (
                <li>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact.socials.length > 0 ? (
                contact.socials.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-4 hover:underline"
                    >
                      {s.label}
                    </a>
                  </li>
                ))
              ) : (
                <li>
                  <PlaceholderTag>Profili social da verificare</PlaceholderTag>
                </li>
              )}
              <li>
                <a
                  href={site.originalSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:underline"
                >
                  andreaguidoboni.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line-dark py-8 text-xs text-paper-muted md:flex-row md:items-center md:justify-between">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-2">
            <span>
              © {site.copyrightYear} {legal.holder ?? site.name}
            </span>
            <span aria-hidden>·</span>
            {legal.vat ? (
              <span>P. IVA {legal.vat}</span>
            ) : (
              <PlaceholderTag>P. IVA da inserire</PlaceholderTag>
            )}
          </p>
          <ul className="flex gap-6">
            {legal.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="underline-offset-4 hover:text-ivory hover:underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
