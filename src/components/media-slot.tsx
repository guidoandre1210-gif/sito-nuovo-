import Image from "next/image";
import type { MediaImage, Ratio } from "@/content/site";

const ratioClass: Record<Ratio, string> = {
  "3/2": "aspect-[3/2]",
  "4/5": "aspect-[4/5]",
  "16/9": "aspect-video",
  "1/1": "aspect-square",
  "21/9": "aspect-[21/9]",
};

type MediaSlotProps = {
  image: MediaImage | null;
  ratio: Ratio;
  /** Attributo sizes di next/image: indica la larghezza reale dello slot. */
  sizes: string;
  /** Testo mostrato nel placeholder (es. "Slot progetto · 16:9"). */
  hint: string;
  priority?: boolean;
  tone?: "dark" | "light";
  className?: string;
  imageClassName?: string;
};

/**
 * Slot media a proporzioni fisse (nessun salto di layout).
 * - Con `image`: usa next/image (lazy di default, `priority` solo per l'hero).
 * - Senza `image`: mostra un placeholder "mirino" chiaramente riconoscibile.
 */
export function MediaSlot({
  image,
  ratio,
  sizes,
  hint,
  priority = false,
  tone = "dark",
  className = "",
  imageClassName = "",
}: MediaSlotProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-frame ${ratioClass[ratio]} ${
        tone === "dark" ? "bg-carbon-3" : "bg-ivory-2"
      } ${className}`}
    >
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imageClassName}`}
        />
      ) : (
        <Placeholder hint={hint} ratio={ratio} tone={tone} />
      )}
    </div>
  );
}

function Placeholder({ hint, ratio, tone }: { hint: string; ratio: Ratio; tone: "dark" | "light" }) {
  const line = tone === "dark" ? "border-ivory/35" : "border-carbon/30";
  const text = tone === "dark" ? "text-paper-muted" : "text-ink-muted";
  return (
    <div
      role="img"
      aria-label={`Spazio riservato a un'immagine: ${hint}`}
      className={`absolute inset-0 ${text}`}
      data-placeholder="media"
    >
      {/* Crocini di taglio agli angoli, come nel mirino */}
      <span aria-hidden className={`absolute left-4 top-4 h-5 w-5 border-l border-t ${line}`} />
      <span aria-hidden className={`absolute right-4 top-4 h-5 w-5 border-r border-t ${line}`} />
      <span aria-hidden className={`absolute bottom-4 left-4 h-5 w-5 border-b border-l ${line}`} />
      <span aria-hidden className={`absolute bottom-4 right-4 h-5 w-5 border-b border-r ${line}`} />
      <span
        aria-hidden
        className={`absolute left-1/2 top-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2 border-l ${line}`}
      />
      <span
        aria-hidden
        className={`absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 border-t ${line}`}
      />
      <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 sm:inset-x-8 sm:bottom-8">
        <p className="eyebrow max-w-[44ch] text-[0.65rem] leading-relaxed">
          <span className="text-accent-soft">●</span> Placeholder — {hint}
        </p>
        <p aria-hidden className="eyebrow hidden text-[0.65rem] sm:block">
          {ratio.replace("/", ":")}
        </p>
      </div>
    </div>
  );
}
