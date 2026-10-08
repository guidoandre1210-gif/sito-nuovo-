/**
 * CONTENUTI DEL SITO — modifica qui testi, progetti, contatti e media.
 *
 * Regole:
 * - I valori `null` o gli array vuoti indicano un dato NON ancora verificato:
 *   i componenti mostrano un placeholder riconoscibile oppure nascondono il blocco.
 * - Per sostituire un visual: copia il file in /public/media/ e compila `image`
 *   (src, width, height, alt). Vedi README.md → "Sostituire i visual".
 * - Non aggiungere clienti, testimonianze o pubblicazioni non documentati.
 *
 * Fonti usate per i contenuti attuali (pagine indicizzate del sito originale):
 * - https://www.andreaguidoboni.com/video-reportage/
 * - https://www.andreaguidoboni.com/articloli/
 */

export type MediaImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type MediaVideo = {
  /** File in /public/media/ oppure URL esterno (mp4/webm). */
  src: string;
  /** Poster obbligatorio: viene mostrato prima del caricamento. */
  poster: MediaImage;
  type?: "video/mp4" | "video/webm";
};

/** Rapporto d'aspetto dello slot, usato anche quando l'immagine manca. */
export type Ratio = "3/2" | "4/5" | "16/9" | "1/1" | "21/9";

export const site = {
  name: "Andrea Guidoboni",
  role: "Fotografo, videomaker e storyteller",
  city: "Milano",
  url: "https://www.andreaguidoboni.com",
  originalSite: "https://www.andreaguidoboni.com",
  /** Anno mostrato nel footer: statico per mantenere la pagina prerenderizzata. */
  copyrightYear: 2026,
  seo: {
    title: "Andrea Guidoboni — Fotografo, videomaker e storyteller a Milano",
    description:
      "Fotografia, video e contenuti per aziende, professionisti e progetti editoriali. Reportage, persone, territori e natura raccontati con uno sguardo documentaristico. Base a Milano.",
    keywords: [
      "fotografo Milano",
      "videomaker Milano",
      "video aziendali",
      "reportage",
      "storytelling",
      "contenuti social",
      "fotografia editoriale",
    ],
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Navigazione                                                                */
/* -------------------------------------------------------------------------- */

export const nav = {
  links: [
    { label: "Progetti", href: "#progetti" },
    { label: "Servizi", href: "#servizi" },
    { label: "Metodo", href: "#metodo" },
    { label: "Contatti", href: "#contatti" },
  ],
  cta: { label: "Parliamo del tuo progetto", href: "#contatti" },
};

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "Fotografia · Video · Storytelling — Milano",
  headline: ["Non scatto soltanto.", "Racconto storie."],
  subheadline:
    "Fotografie, video e contenuti per aziende, professionisti e progetti editoriali. Dal sopralluogo alla post-produzione seguo ogni fase in prima persona, con uno sguardo documentaristico su persone, territori e natura.",
  primaryCta: { label: "Parliamo del tuo progetto", href: "#contatti" },
  secondaryCta: { label: "Guarda i miei lavori", href: "#progetti" },
  /** Visual principale. `null` = slot placeholder. Consigliato 3:2, ≥ 2400px di base. */
  image: null as MediaImage | null,
  imageSlotHint: "Foto o fotogramma hero · 3:2 · min. 2400 × 1600 px",
  /** Showreel opzionale: compare un pulsante "Guarda lo showreel" (nessun autoplay, nessun audio automatico). */
  showreel: null as MediaVideo | null,
  facts: [
    "Base a Milano",
    "Reportage, viaggi, outdoor, editoriale e digitale",
    "Dall'idea alla post-produzione",
  ],
};

/* -------------------------------------------------------------------------- */
/* Problema / valore                                                          */
/* -------------------------------------------------------------------------- */

export const value = {
  eyebrow: "Perché conta",
  title: "Le immagini parlano prima delle parole.",
  intro:
    "Chi ti scopre per la prima volta lo fa spesso attraverso una foto, un video, un reel. Se quelle immagini sono casuali o slegate tra loro, raccontano poco di chi sei e di come lavori.",
  points: [
    {
      title: "Identità riconoscibile",
      text: "Uno stile visivo coerente rende riconoscibile la tua attività su sito, social e materiali stampati.",
    },
    {
      title: "Persone, non solo prodotti",
      text: "Mostrare chi lavora, i luoghi e i gesti quotidiani rende concreta una realtà e la avvicina a chi guarda.",
    },
    {
      title: "Una storia, non una raccolta",
      text: "Una narrazione pensata dall'inizio dà a ogni contenuto un ruolo preciso, invece di accumulare materiale senza filo.",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Servizi                                                                    */
/* Verifica e allinea con la pagina "Servizi" del sito originale.             */
/* -------------------------------------------------------------------------- */

export const services = {
  eyebrow: "Servizi",
  title: "Cosa posso realizzare per te.",
  intro:
    "Ogni servizio può essere combinato con gli altri: spesso una stessa giornata di riprese produce foto, video e contenuti social.",
  items: [
    {
      id: "video",
      number: "01",
      title: "Video per aziende e professionisti",
      includes: [
        "Video di presentazione e racconto di attività",
        "Riprese, anche aeree con drone, e montaggio",
        "Versioni per sito, presentazioni e social",
      ],
      useful: "Per presentare chi sei, cosa fai e come lavori con un linguaggio visivo curato.",
    },
    {
      id: "social",
      number: "02",
      title: "Contenuti social e reel",
      includes: [
        "Reel e clip in formato verticale",
        "Foto pensate per feed e storie",
        "Materiale coordinato da più uscite",
      ],
      useful: "Per alimentare i canali con contenuti coerenti senza perdere qualità.",
    },
    {
      id: "foto",
      number: "03",
      title: "Fotografia",
      includes: [
        "Ritratti e persone al lavoro",
        "Ambienti, spazi e dettagli",
        "Selezione e post-produzione delle immagini",
      ],
      useful: "Per sito, stampa, comunicati e materiali che richiedono immagini originali.",
    },
    {
      id: "eventi",
      number: "04",
      title: "Eventi e interviste",
      includes: [
        "Copertura foto e video di eventi e incontri",
        "Interviste e testimonianze in video",
        "Clip di sintesi per la comunicazione",
      ],
      useful: "Per documentare un momento e dargli una vita anche dopo la giornata.",
    },
    {
      id: "reportage",
      number: "05",
      title: "Reportage e storytelling",
      includes: [
        "Reportage foto e video su persone e territori",
        "Racconti outdoor e di viaggio",
        "Testi di accompagnamento, quando servono",
      ],
      useful: "Per progetti editoriali, testate e realtà che vogliono raccontare una storia vera.",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Portfolio                                                                  */
/* Solo lavori verificabili sul sito originale. Ogni voce ha la sua fonte.    */
/* -------------------------------------------------------------------------- */

export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  ratio: Ratio;
  image: MediaImage | null;
  video?: MediaVideo | null;
  /** Testata / piattaforma su cui il lavoro è stato pubblicato (non è un cliente). */
  publishedOn?: string;
  source: string;
};

export const portfolio = {
  eyebrow: "Progetti",
  title: "Lavori selezionati.",
  intro:
    "Reportage video sul territorio, cronaca, outdoor e ricerca fotografica. Una selezione dai lavori pubblicati sul sito.",
  featured: [
    {
      id: "gabiano-drone",
      title: "Castello di Gabiano dopo il maltempo",
      category: "Video reportage · Riprese aeree",
      year: "2026",
      description: "Riprese con drone sui danni causati dal maltempo al Castello di Gabiano, in Piemonte.",
      ratio: "16/9",
      image: null,
      publishedOn: "Local Team",
      source: "https://www.andreaguidoboni.com/video-reportage/",
    },
    {
      id: "25-aprile-milano",
      title: "25 aprile a Milano",
      category: "Reportage · Evento",
      year: "—",
      description: "Il corteo per la Festa della Liberazione nelle strade di Milano.",
      ratio: "4/5",
      image: null,
      source: "https://www.andreaguidoboni.com/video-reportage/",
    },
    {
      id: "bushcraft",
      title: "Bushcraft solo — tarp e fire pit",
      category: "Outdoor · Video",
      year: "2026",
      description:
        "Un racconto in solitaria nella natura: riparo con telo e fuoco da campo. “See through my eyes”.",
      ratio: "4/5",
      image: null,
      source: "https://www.andreaguidoboni.com/video-reportage/",
    },
    {
      id: "pattern",
      title: "Pattern",
      category: "Fotografia · Serie",
      year: "—",
      // Descrizione da completare con le parole di Andrea.
      description: "Serie fotografica pubblicata nella sezione Articoli del sito.",
      ratio: "3/2",
      image: null,
      source: "https://www.andreaguidoboni.com/articloli/",
    },
  ] satisfies Project[],
  /** Indice dei reportage brevi pubblicati (lista testuale sotto la griglia). */
  index: [
    {
      title: "Tetti danneggiati dal maltempo nel Lodigiano",
      category: "Video reportage",
      date: "2026",
      publishedOn: "Local Team",
    },
    {
      title: "Il temporale in arrivo sul Lodigiano, ripreso in camera car",
      category: "Video reportage",
      date: "2026",
      publishedOn: "Local Team",
    },
    {
      title: "Grandinata nel Lodigiano",
      category: "Video reportage",
      date: "2026",
      publishedOn: "Local Team",
    },
    {
      title: "Seveso, sacchi di sabbia contro l'esondazione",
      category: "Video reportage",
      date: "2026",
      publishedOn: "Local Team",
    },
  ],
  indexSource: "https://www.andreaguidoboni.com/video-reportage/",
  allWorksCta: { label: "Tutti i video reportage", href: "https://www.andreaguidoboni.com/video-reportage/" },
};

/* -------------------------------------------------------------------------- */
/* Credibilità — distinguere SEMPRE pubblicazioni e clienti diretti            */
/* -------------------------------------------------------------------------- */

export const credibility = {
  eyebrow: "Dove trovi i miei lavori",
  /** Testate e piattaforme su cui i lavori sono stati pubblicati o distribuiti. */
  publications: [
    {
      name: "Local Team",
      detail: "Video reportage di cronaca e maltempo, segnalati sul sito come Local Team.",
      source: "https://www.andreaguidoboni.com/video-reportage/",
    },
  ],
  /** Clienti diretti DOCUMENTATI. Vuoto = il blocco non viene mostrato. */
  clients: [] as { name: string; source?: string }[],
  /** Testimonianze REALI con autorizzazione. Vuoto = il blocco non viene mostrato. */
  testimonials: [] as { quote: string; author: string; role: string }[],
  writing: {
    title: "Scrivo anche.",
    text: "Articoli e reportage scritti su comunicazione, ambiente, politica e immagine.",
    cta: { label: "Leggi gli articoli", href: "https://www.andreaguidoboni.com/articloli/" },
  },
};

/* -------------------------------------------------------------------------- */
/* Metodo                                                                     */
/* -------------------------------------------------------------------------- */

export const method = {
  eyebrow: "Metodo",
  title: "Quattro passaggi, una sola regia.",
  intro:
    "Seguo personalmente l'intero processo creativo e produttivo: chi ti ascolta all'inizio è la stessa persona che consegna il lavoro finito.",
  steps: [
    {
      title: "Conosciamo il progetto",
      text: "Parliamo di obiettivi, pubblico, luoghi e tempi. Capisco cosa vuoi raccontare e dove verranno usati i contenuti.",
    },
    {
      title: "Definiamo idea e linguaggio",
      text: "Scegliamo insieme tono, inquadrature, formati e scaletta delle riprese, così ogni giornata sul campo ha un piano chiaro.",
    },
    {
      title: "Realizziamo foto e video",
      text: "Riprese e scatti sul posto, con attenzione alle persone e a ciò che accade davvero, senza forzare la scena.",
    },
    {
      title: "Montiamo e consegniamo i contenuti",
      text: "Selezione, montaggio, color e post-produzione. Consegno i file nei formati concordati per ogni canale.",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Offerta — nessun prezzo inventato                                          */
/* -------------------------------------------------------------------------- */

export const offer = {
  eyebrow: "Collaborazioni",
  title: "Tre modi di lavorare insieme.",
  priceLabel: "Preventivo su misura",
  items: [
    {
      title: "Progetto singolo",
      text: "Un video, un servizio fotografico o la copertura di un evento, con obiettivo e consegna definiti.",
      fit: "Lanci, presentazioni, eventi, ritratti.",
      cta: "Richiedi un preventivo",
    },
    {
      title: "Produzione continuativa",
      text: "Uscite programmate per creare nel tempo un archivio di foto, video e reel coerenti tra loro.",
      fit: "Aziende e professionisti presenti sui social.",
      cta: "Pianifichiamo le uscite",
    },
    {
      title: "Reportage o progetto editoriale",
      text: "Un racconto più ampio su persone, luoghi o temi, pensato per testate, pubblicazioni o progetti culturali.",
      fit: "Redazioni, associazioni, progetti personali e di territorio.",
      cta: "Proponi la tua storia",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* FAQ — nessun tempo o condizione commerciale non confermati                  */
/* -------------------------------------------------------------------------- */

export const faq = {
  eyebrow: "Domande frequenti",
  title: "Prima di iniziare.",
  items: [
    {
      q: "Come si richiede un preventivo?",
      a: "Compila il modulo qui sotto descrivendo il progetto: cosa vuoi raccontare, dove, quando e dove useresti i contenuti. Ogni preventivo è costruito sulle esigenze specifiche, perché durata delle riprese, luoghi e consegne cambiano da progetto a progetto.",
    },
    {
      q: "Lavori anche fuori Milano?",
      a: "La base è Milano e molti reportage nascono in Lombardia e Piemonte. Per progetti in altre zone scrivimi: valutiamo insieme la trasferta e la includiamo nel preventivo.",
    },
    {
      q: "Come si organizzano le riprese?",
      a: "Prima delle riprese definiamo insieme luoghi, persone coinvolte, scaletta e necessità tecniche. Ti chiedo solo ciò che serve davvero, per lasciare il più possibile spazio a ciò che accade sul posto.",
    },
    {
      q: "Realizzi contenuti in formato verticale per i social?",
      a: "Sì. Se i contenuti sono pensati per i social li progetto fin dall'inizio anche in verticale, così inquadrature e montaggio funzionano davvero su ogni piattaforma, non solo ritagliati a posteriori.",
    },
    {
      q: "Come e quando ricevo i contenuti?",
      a: "Formati, numero di file e tempi di consegna vengono concordati nel preventivo, in base al tipo di progetto e alla quantità di materiale da montare e post-produrre.",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Contatti                                                                   */
/* -------------------------------------------------------------------------- */

export const contact = {
  eyebrow: "Contatti",
  title: "Raccontami il tuo progetto.",
  intro:
    "Scrivimi cosa hai in mente, anche se è ancora un'idea. Ti rispondo per capire insieme come raccontarla.",
  /** Email, telefono e social NON verificati: compila con i dati reali. `null` = placeholder. */
  email: null as string | null,
  phone: null as string | null,
  socials: [] as { label: string; href: string }[],
  projectTypes: [
    "Video per azienda o professionista",
    "Contenuti social e reel",
    "Fotografia",
    "Evento o intervista",
    "Reportage o progetto editoriale",
    "Altro",
  ],
  form: {
    nameLabel: "Nome e cognome",
    emailLabel: "Email",
    typeLabel: "Tipo di progetto",
    typePlaceholder: "Seleziona un'opzione",
    messageLabel: "Messaggio",
    messageHint: "Cosa vuoi raccontare, dove e, se le conosci già, le date indicative.",
    privacyLabel:
      "Ho letto l'informativa privacy e acconsento al trattamento dei dati per ricevere una risposta.",
    submit: "Invia la richiesta",
    submitting: "Invio in corso…",
    success: "Grazie, il messaggio è stato inviato. Ti risponderò il prima possibile.",
    errorGeneric: "Non è stato possibile inviare il messaggio. Riprova tra poco.",
    errorNotConfigured:
      "Il modulo non è ancora collegato a un servizio di invio, quindi il messaggio non è stato spedito.",
  },
};

/* -------------------------------------------------------------------------- */
/* Footer e riferimenti legali                                                */
/* -------------------------------------------------------------------------- */

export const legal = {
  /** Ragione sociale / nome legale e Partita IVA: da compilare con dati reali. */
  holder: null as string | null,
  vat: null as string | null,
  links: [
    { label: "Privacy policy", href: "/privacy" },
    { label: "Cookie policy", href: "/cookie" },
  ],
};
