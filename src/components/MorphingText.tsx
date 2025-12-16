"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type MorphingTextProps = {
  texts: string[];
  className?: string;
  duration?: number;
};

export default function MorphingText({
  texts,
  className,
  duration = 2000,
}: MorphingTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, duration);

    return () => clearInterval(interval);
  }, [texts.length, duration]);

  return (
    <div className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentTextIndex}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          className={`font-brightside-sans font-semibold ${className}`}
        >
          {texts[currentTextIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
