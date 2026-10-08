import Link from "next/link";
import { legal, site } from "@/content/site";
import { Footer } from "./footer";
import { PlaceholderTag } from "./placeholder-tag";

/**
 * Pagina legale placeholder. Il testo definitivo va redatto da un professionista
 * (o con un generatore conforme al GDPR) in base ai servizi effettivamente usati:
 * hosting, servizio del modulo contatti, eventuali analytics o embed video.
 */
export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-line-light">
        <div className="container-site flex h-16 items-center justify-between lg:h-20">
          <Link href="/" className="font-serif text-xl tracking-tight lg:text-2xl">
            {site.name}
          </Link>
          <Link href="/" className="text-sm underline underline-offset-4">
            Torna al sito
          </Link>
        </div>
      </header>
      <main id="contenuto" className="container-site py-20 lg:py-28">
        <div className="max-w-[44rem]">
          <PlaceholderTag>Documento da completare — non pubblicare in questa forma</PlaceholderTag>
          <h1 className="mt-8 font-serif text-h2 font-light">{title}</h1>
          <div className="mt-10 space-y-5 leading-relaxed text-ink-muted">
            {children}
            <p>
              Titolare del trattamento:{" "}
              {legal.holder ?? <PlaceholderTag>nome / ragione sociale</PlaceholderTag>}
              {" — "}P. IVA {legal.vat ?? <PlaceholderTag>da inserire</PlaceholderTag>}
              {" — "}contatto: <PlaceholderTag>email per richieste privacy</PlaceholderTag>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
