import { Contact } from "@/components/contact";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Method } from "@/components/method";
import { Navbar } from "@/components/navbar";
import { Offer } from "@/components/offer";
import { Portfolio } from "@/components/portfolio";
import { Services } from "@/components/services";
import { Value } from "@/components/value";
import { contact, services, site } from "@/content/site";

// Dati strutturati: solo informazioni verificate (nessun indirizzo, telefono o recensione inventati).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "IT" },
  knowsAbout: services.items.map((s) => s.title),
  ...(contact.email ? { email: `mailto:${contact.email}` } : {}),
  ...(contact.socials.length ? { sameAs: contact.socials.map((s) => s.href) } : {}),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main id="contenuto">
        <Hero />
        <Value />
        <Services />
        <Portfolio />
        <Method />
        <Offer />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
