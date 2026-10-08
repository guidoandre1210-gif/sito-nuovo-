import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Cookie policy",
  robots: { index: false, follow: true },
  alternates: { canonical: "/cookie" },
};

export default function CookiePage() {
  return (
    <LegalPage title="Cookie policy">
      <p>
        Allo stato attuale il sito non installa cookie di profilazione né strumenti di analisi. I font sono
        serviti dallo stesso dominio del sito.
      </p>
      <p>
        Se in futuro verranno aggiunti analytics, video incorporati (YouTube, Vimeo) o altri servizi di terze
        parti, questa pagina andrà aggiornata e potrebbe essere necessario un banner di consenso.
      </p>
    </LegalPage>
  );
}
