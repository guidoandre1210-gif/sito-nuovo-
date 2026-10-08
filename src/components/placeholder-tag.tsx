/** Etichetta tratteggiata per dati non ancora verificati: facile da trovare e sostituire. */
export function PlaceholderTag({ children }: { children: React.ReactNode }) {
  return (
    <span
      data-placeholder="text"
      className="inline-flex items-center gap-2 rounded-frame border border-dashed border-current/50 px-2 py-0.5 text-[0.8125rem] opacity-80"
    >
      <span aria-hidden className="text-accent-soft">
        ●
      </span>
      [{children}]
    </span>
  );
}
