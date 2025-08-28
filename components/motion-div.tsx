"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface MotionDivProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}

export function MotionDiv({
  children,
  delay = 0,
  duration = 0.5,
  x = 0,
  y = 50,
  className,
}: MotionDivProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 }); // Animate once when 50% in view

  const variants = {
    hidden: { opacity: 0, x, y },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
