"use client";

import { domAnimation, LazyMotion, MotionConfig } from "motion/react";

/**
 * - LazyMotion + domAnimation: carica solo le funzionalità di animazione usate (bundle più leggero).
 * - reducedMotion="user": rispetta automaticamente prefers-reduced-motion.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
