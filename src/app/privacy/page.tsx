import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy policy",
  robots: { index: false, follow: true },
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Informativa privacy">
      <p>
        Questa pagina deve contenere l&apos;informativa sul trattamento dei dati personali ai sensi del
        Regolamento UE 2016/679 (GDPR).
      </p>
      <p>
        Indicare almeno: titolare del trattamento e contatti, dati raccolti tramite il modulo contatti (nome,
        email, tipo di progetto, messaggio), finalità e base giuridica, servizio esterno che riceve le
        richieste del modulo, tempi di conservazione, diritti dell&apos;interessato e modalità per
        esercitarli.
      </p>
    </LegalPage>
  );
}
