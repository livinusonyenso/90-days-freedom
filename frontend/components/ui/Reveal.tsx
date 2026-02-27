"use client";

import { motion, useInView, useReducedMotion, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";

// ─── Variants ────────────────────────────────────────────────────────────────

const directions = {
  up:    { hidden: { y: 32, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  down:  { hidden: { y: -32, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  left:  { hidden: { x: 40, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  right: { hidden: { x: -40, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  fade:  { hidden: { opacity: 0 }, visible: { opacity: 1 } },
} satisfies Record<string, Variants>;

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

// ─── Reveal ──────────────────────────────────────────────────────────────────

interface RevealProps {
  children: ReactNode;
  /** Direction the element slides in from. Default: "up" */
  direction?: keyof typeof directions;
  /** Extra delay in seconds before the animation starts. Default: 0 */
  delay?: number;
  /** Fraction of the element visible before triggering. Default: 0.15 */
  threshold?: number;
  className?: string;
}

/**
 * Wraps any element with a fade + slide-in animation triggered once when it
 * enters the viewport. Automatically disables motion for users who prefer
 * reduced motion.
 *
 * @example
 * <Reveal direction="up" delay={0.1}>
 *   <h1>Hello</h1>
 * </Reveal>
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  threshold = 0.15,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: threshold });

  const variant = directions[direction];

  const transition = {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1], // custom ease-out-expo
    delay,
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={shouldReduceMotion ? "visible" : "hidden"}
      animate={isInView ? "visible" : "hidden"}
      variants={variant}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

// ─── RevealGroup (staggered children) ────────────────────────────────────────

interface RevealGroupProps {
  children: ReactNode;
  /** Direction applied to each child. Default: "up" */
  direction?: keyof typeof directions;
  /** Base delay before the first child animates. Default: 0 */
  delay?: number;
  threshold?: number;
  className?: string;
}

/**
 * Container that staggers its direct children animations one after another.
 * Each child must be wrapped in a <RevealItem />.
 *
 * @example
 * <RevealGroup>
 *   <RevealItem><p>First</p></RevealItem>
 *   <RevealItem><p>Second</p></RevealItem>
 * </RevealGroup>
 */
export function RevealGroup({
  children,
  delay = 0,
  threshold = 0.15,
  className,
}: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: threshold });

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={shouldReduceMotion ? "visible" : "hidden"}
      animate={isInView ? "visible" : "hidden"}
      variants={container}
    >
      {children}
    </motion.div>
  );
}

// ─── RevealItem ───────────────────────────────────────────────────────────────

interface RevealItemProps {
  children: ReactNode;
  direction?: keyof typeof directions;
  className?: string;
}

/**
 * A single animated child inside <RevealGroup />.
 */
export function RevealItem({
  children,
  direction = "up",
  className,
}: RevealItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const variant = shouldReduceMotion
    ? { hidden: {}, visible: {} }
    : directions[direction];

  return (
    <motion.div
      className={className}
      variants={variant}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
