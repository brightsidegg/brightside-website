'use client';

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

export default function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1, margin: "0px 0px -100px 0px" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Fallback: ensure footer is visible after a delay if viewport check didn't trigger
    const timer = setTimeout(() => {
      // Force visibility if still not visible
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight + 200; // Add buffer
        if (!isVisible && footerRef.current.style.opacity === '0') {
          footerRef.current.style.opacity = '1';
          footerRef.current.style.transform = 'translateY(0)';
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.footer
      ref={footerRef}
      className="py-6"
      initial={{ opacity: 0, y: 30 }}
      animate={mounted && isInView ? { opacity: 1, y: 0 } : mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-center gap-6 sm:hidden"
          initial={{ opacity: 0, y: 24 }}
          animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[#666666] font-sf-pro-rounded font-medium">
            <a
              href="https://x.com/brightside_gg"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF6401] transition-colors cursor-pointer"
            >
              X (formerly Twitter)
            </a>
            <Link href="/privacy-policy" className="hover:text-[#FF6401] transition-colors cursor-pointer">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="hover:text-[#FF6401] transition-colors cursor-pointer">
              Terms and Conditions
            </Link>
          </div>
          <a
            href="https://x.com/juicy_ag"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img src="/juicy.png" alt="Juicy Labs logo" className="h-8 w-auto" />
            <div className="flex flex-col items-center text-center font-sf-pro-rounded">
              <span className="text-xs text-[#778395] font-medium uppercase tracking-[0.08em]">
                A product of
              </span>
              <span className="text-base text-[#1D2532] font-semibold">Juicy Labs</span>
              <span className="text-xs text-[#8E99A8] font-medium">Copyright 2025</span>
            </div>
          </a>
        </motion.div>

        <motion.div
          className="hidden sm:flex flex-row justify-center items-center relative"
          initial={{ opacity: 0, y: 24 }}
          animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-[#666666] font-sf-pro-rounded font-medium">
            <a
              href="https://x.com/brightside_gg"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF6401] transition-colors cursor-pointer"
            >
              X (formerly Twitter)
            </a>
            <Link href="/privacy-policy" className="hover:text-[#FF6401] transition-colors cursor-pointer">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="hover:text-[#FF6401] transition-colors cursor-pointer">
              Terms and Conditions
            </Link>
          </div>
          <a
            href="https://x.com/juicy_ag"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-4 lg:right-8 flex items-center gap-3 text-right hover:opacity-80 transition-opacity"
          >
            <img src="/juicy.png" alt="Juicy Labs logo" className="h-9 w-auto" />
            <div className="flex flex-col font-sf-pro-rounded">
              <span className="text-xs text-[#778395] font-medium uppercase tracking-[0.08em]">
                A product of
              </span>
              <span className="text-base text-[#1D2532] font-semibold">Juicy Labs</span>
              <span className="text-xs text-[#8E99A8] font-medium">Copyright 2025</span>
            </div>
          </a>
        </motion.div>
      </div>
    </motion.footer>
  );
}
