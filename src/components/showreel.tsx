"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { MediaVideo } from "@/content/site";

/**
 * Showreel su richiesta: finché l'utente non preme "play" si scarica solo il poster.
 * Nessun autoplay, nessun audio automatico, controlli nativi sempre visibili.
 */
export function Showreel({ video, title }: { video: MediaVideo; title: string }) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  if (active) {
    return (
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full bg-carbon object-cover"
        controls
        playsInline
        preload="metadata"
        poster={video.poster.src}
        onLoadedMetadata={() => ref.current?.play().catch(() => {})}
        aria-label={title}
      >
        <source src={video.src} type={video.type ?? "video/mp4"} />
        Il tuo browser non supporta la riproduzione video.
      </video>
    );
  }

  return (
    <>
      <Image
        src={video.poster.src}
        alt={video.poster.alt}
        fill
        sizes="(min-width: 1376px) 1312px, 100vw"
        className="object-cover"
      />
      <button
        type="button"
        onClick={() => setActive(true)}
        className="group absolute inset-0 flex items-center justify-center bg-carbon/20 transition-colors hover:bg-carbon/35"
        aria-label={`Riproduci: ${title}`}
      >
        <span className="flex items-center gap-3 rounded-control bg-ivory px-6 py-3.5 text-sm font-medium text-ink transition-transform duration-300 group-hover:scale-105">
          <svg aria-hidden width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
            <path d="M0 0l12 7-12 7z" />
          </svg>
          {title}
        </span>
      </button>
    </>
  );
}
