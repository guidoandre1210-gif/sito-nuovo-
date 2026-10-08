import { Reveal } from "./reveal";

type SectionHeaderProps = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: "light" | "dark";
};

/** Intestazione di sezione: eyebrow + titolo serif a sinistra, introduzione a destra. */
export function SectionHeader({ id, eyebrow, title, intro, tone = "light" }: SectionHeaderProps) {
  const muted = tone === "dark" ? "text-paper-muted" : "text-ink-muted";
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
      <Reveal className="lg:col-span-7">
        <p className={`eyebrow ${muted}`}>
          <span aria-hidden className={tone === "dark" ? "text-accent-soft" : "text-accent"}>
            —&nbsp;
          </span>
          {eyebrow}
        </p>
        <h2 id={id} className="mt-5 font-serif text-h2 font-light balance">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal className="lg:col-span-5" delay={0.1}>
          <p className={`max-w-prose text-lead ${muted} pretty`}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
