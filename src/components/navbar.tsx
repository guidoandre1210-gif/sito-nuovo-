"use client";

import { AnimatePresence, m } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { nav, site } from "@/content/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Menu mobile: blocco scroll, Esc per chiudere, focus intrappolato nel pannello.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const items = [toggleRef.current, ...focusables()].filter(Boolean) as HTMLElement[];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && close(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  const solid = scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color] duration-300 ${
        solid
          ? "border-b border-line-light bg-ivory/90 text-ink backdrop-blur-md"
          : "on-dark border-b border-transparent text-ivory"
      }`}
    >
      <nav
        aria-label="Navigazione principale"
        className="container-site relative z-10 flex h-16 items-center justify-between gap-6 lg:h-20"
      >
        <a
          href="#top"
          className="font-serif text-xl tracking-tight lg:text-2xl"
          aria-label={`${site.name}, torna all'inizio`}
        >
          {site.name}
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="group relative py-2 text-[0.9375rem]">
                {link.label}
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-editorial group-hover:scale-x-100"
                />
              </a>
            </li>
          ))}
        </ul>

        <a
          href={nav.cta.href}
          className={`hidden rounded-control px-5 py-2.5 text-sm font-medium transition-colors duration-300 lg:inline-flex ${
            solid ? "bg-carbon text-ivory hover:bg-accent" : "bg-ivory text-ink hover:bg-ivory-3"
          }`}
        >
          {nav.cta.label}
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Chiudi il menu" : "Apri il menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden className="relative block h-3 w-6">
            <span
              className={`absolute left-0 top-0 h-px w-6 bg-current transition-transform duration-300 ${
                open ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-6 bg-current transition-transform duration-300 ${
                open ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="menu-mobile"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="on-dark fixed inset-0 -z-0 flex flex-col bg-carbon px-[var(--spacing-gutter)] pb-10 pt-28 text-ivory lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="flex flex-col gap-2">
              {nav.links.map((link, i) => (
                <m.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={() => close(false)}
                    className="block py-2 font-serif text-[2.75rem] leading-tight tracking-tight"
                  >
                    {link.label}
                  </a>
                </m.li>
              ))}
            </ul>
            <a
              href={nav.cta.href}
              onClick={() => close(false)}
              className="mt-auto inline-flex justify-center rounded-control bg-ivory px-6 py-4 text-base font-medium text-ink"
            >
              {nav.cta.label}
            </a>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
