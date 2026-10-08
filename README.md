# Andrea Guidoboni — sito portfolio

Nuovo sito per portfolio e attività di Andrea Guidoboni, fotografo, videomaker e storyteller a Milano.
Landing page in italiano: hero, valore, servizi, progetti, metodo, collaborazioni, FAQ, contatti.

**Stack:** Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS 4 · Motion (`motion/react`) · `next/font` · `next/image`.

## Avvio

```bash
npm install
npm run dev        # sviluppo → http://localhost:3000
npm run build      # build di produzione
npm start          # serve la build
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run format     # Prettier
```

Requisiti: Node.js 20.9 o superiore.

## Struttura

```
src/
  app/
    layout.tsx            font, metadata SEO/Open Graph, skip link
    page.tsx              composizione della landing + dati strutturati (JSON-LD)
    globals.css           DESIGN TOKEN (colori, font, spaziature, bordi, animazioni)
    api/contact/route.ts  endpoint del modulo contatti
    privacy/ cookie/      pagine legali (placeholder da completare)
    opengraph-image.tsx   immagine di anteprima social (tipografica)
    robots.ts sitemap.ts icon.svg
  components/             un componente per sezione + MediaSlot, Reveal, Navbar…
  content/site.ts         TUTTI i testi, i progetti, i contatti e i media
```

## Modificare i contenuti

Tutti i testi stanno in **`src/content/site.ts`**: non serve toccare i componenti.

- **Contatti:** compila `contact.email`, `contact.phone` e `contact.socials` (ad esempio `{ label: "Instagram", href: "https://…" }`).
  Finché valgono `null` o `[]`, il sito mostra un'etichetta tratteggiata del tipo `[Email da inserire]`.
- **Dati legali:** compila `legal.holder` (nome o ragione sociale) e `legal.vat` (Partita IVA).
- **Progetti:** modifica `portfolio.featured`, che è la griglia con i visual, e `portfolio.index`, che è l'elenco testuale.
  Ogni progetto ha un campo `source` con la pagina da cui è stato verificato.
- **Clienti e testimonianze:** `credibility.clients` e `credibility.testimonials` sono vuoti di proposito.
  Il blocco compare automaticamente solo quando aggiungi voci **reali e documentate**.
  Le testate e le piattaforme di pubblicazione vanno in `credibility.publications`, che è separato dai clienti diretti.

Per trovare tutti i placeholder rimasti nella pagina, apri la console del browser:
`document.querySelectorAll('[data-placeholder]')`.

## Sostituire i visual

Nessuna foto o video originale era disponibile durante lo sviluppo. Ogni immagine è uno **slot a proporzioni fisse** con aspetto da mirino ("Placeholder — …"),
quindi la sostituzione non causa salti di layout.

1. Copia il file in `public/media/`, ad esempio `public/media/gabiano.jpg`. Usa JPG o WebP alla risoluzione piena: `next/image` genera da solo le versioni ridotte.
2. In `src/content/site.ts` compila il campo `image` del progetto:

   ```ts
   image: { src: "/media/gabiano.jpg", width: 2400, height: 1350, alt: "Il Castello di Gabiano ripreso dal drone dopo il maltempo" },
   ```

   Rispetta il `ratio` dello slot, oppure cambialo con uno tra `"3/2" | "4/5" | "16/9" | "1/1" | "21/9"`.

| Slot | Proporzione | Dimensione consigliata |
| --- | --- | --- |
| Hero (`hero.image`) | 4:5 su mobile, 3:2 su tablet, 21:9 su desktop (ritaglio centrale) | ≥ 2400 × 1600 px, soggetto al centro |
| Progetto principale | 16:9 | ≥ 2400 × 1350 px |
| Progetti verticali | 4:5 | ≥ 1600 × 2000 px |
| Pattern | 3:2 | ≥ 2400 × 1600 px |

**Showreel nell'hero (facoltativo).** Compila `hero.showreel` con `{ src: "/media/showreel.mp4", poster: { src, width, height, alt } }`.
Il video non parte da solo e non ha audio automatico. Prima del clic si scarica solo il poster, e i controlli sono nativi.
Per file pesanti conviene un CDN video (Mux, Cloudflare Stream, Vimeo) e un URL esterno in `src`.

**Immagine social.** Per usare una foto al posto dell'anteprima tipografica, aggiungi `src/app/opengraph-image.jpg` (1200 × 630) e rimuovi `opengraph-image.tsx`.

## Modulo contatti: integrazione da completare

Il form valida i campi lato client e lato server, poi invia a `/api/contact`.
L'endpoint **inoltra** la richiesta in JSON al servizio indicato nelle variabili d'ambiente:

```bash
cp .env.example .env.local
# CONTACT_WEBHOOK_URL=https://…   (Formspree, Getform, Make, Zapier o una tua funzione)
# CONTACT_WEBHOOK_TOKEN=…         (facoltativo, inviato come Bearer token)
```

- **Senza `CONTACT_WEBHOOK_URL`** l'endpoint risponde 503 e il form mostra che il messaggio **non** è stato inviato.
- Il messaggio di successo compare **solo** se il servizio esterno risponde con un codice 2xx.
- È incluso un campo honeypot contro lo spam. Le credenziali vanno solo nelle variabili d'ambiente, mai nel codice.

Su Vercel o altri hosting, configura le stesse variabili nel pannello del progetto.

## Note legali

`/privacy` e `/cookie` sono **bozze strutturate, da completare** prima della pubblicazione: titolare, P. IVA, servizio del form e tempi di conservazione.
Sono escluse dall'indicizzazione. Al momento il sito non usa cookie di profilazione né analytics, e i font sono serviti in locale da `next/font`.
Se aggiungi embed YouTube o Vimeo o strumenti di analisi, aggiorna l'informativa e valuta un banner di consenso.

## Design system

I token sono definiti in `src/app/globals.css` (`@theme`):

- **Colori:** carbone `#141412`, avorio `#F3EEE5` e un solo accento ruggine (`#A3441B` su fondo chiaro, `#E2875C` su fondo scuro).
- **Font:** Newsreader per titoli e citazioni, Instrument Sans per interfaccia e testi.
- **Scala tipografica fluida:** `text-display`, `text-h2`, `text-h3`, `text-lead`, `eyebrow`.
- **Spaziature e larghezze:** `py-section`, `container-site` (86rem con gutter fluido).
- **Bordi:** `rounded-frame` (2px) e `rounded-control` (pillola).
- **Animazioni:** easing `ease-editorial`. Lo scroll reveal è leggero e viene disattivato con `prefers-reduced-motion`.

## Verifiche eseguite (8 ottobre 2026)

- `npm run build`, `npm run lint` e `npm run typecheck` passano senza errori.
- axe-core (WCAG 2.1 AA + best practice) a 390 px e 1440 px non trova **nessuna violazione**.
- Nessun overflow orizzontale a 390, 768, 1024 e 1440 px.
- Tastiera: skip link, focus visibile, menu mobile con Esc, trap del focus e ritorno del focus.
- Form testato contro un webhook di prova: successo solo dopo l'inoltro effettivo, errore esplicito senza configurazione.
- Lighthouse 12 sulla build di produzione (`next start` in locale, Chromium headless, throttling predefinito):
  - **Mobile:** Performance 92–94 su due esecuzioni, Accessibility 100, Best Practices 100, SEO 100.
  - **Desktop:** Performance 100, Accessibility 100, Best Practices 100, SEO 100.

  I punteggi sono misurati con gli slot placeholder. Con le foto reali conviene ripetere la misura.

## Fonti dei contenuti

Durante lo sviluppo il sito originale non era raggiungibile direttamente dall'ambiente di lavoro, quindi i contenuti sono stati ricavati dalle pagine indicizzate:

- https://www.andreaguidoboni.com/video-reportage/: profilo, video reportage e video bushcraft
- https://www.andreaguidoboni.com/articloli/: articoli e serie "Pattern"

Le descrizioni dei servizi sono coerenti con il profilo dichiarato: reportage, viaggi, outdoor, editoriale, digitale, con l'intero processo seguito in autonomia.
Vanno comunque confrontate con la pagina "Servizi" del sito originale.
