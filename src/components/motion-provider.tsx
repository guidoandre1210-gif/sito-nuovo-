"use client";

import { MotionConfig } from "motion/react";

/** Rispetta automaticamente prefers-reduced-motion per tutte le animazioni Motion. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
