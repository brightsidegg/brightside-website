'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function ConnectPage() {
  return (
    <div className="min-h-screen bg-white text-[#1D2532] flex flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-4 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl w-full text-center"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            className="flex justify-center mb-8"
          >
            <Image src="/brightside.gif" alt="BrightSide icon" width={200} height={200} className="h-32 w-auto" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            className="space-y-4"
          >
            <h1 className="text-5xl sm:text-6xl font-your-doodle font-semibold text-[#FF4D1B] ">Connect with Us</h1>
            <p className="text-base max-w-md text-center mx-auto sm:text-lg text-[#5E6B7F] font-sf-pro-rounded">
              Whether you need help navigating Brightside or just want to share feedback, our team is ready to respond.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            className="mt-12 bg-white border border-[#E7EBF5] rounded-[32px] p-8 sm:p-10 shadow-[0_20px_50px_rgba(15,23,42,0.08)] flex flex-col items-center gap-3"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-[#97A3B6] font-semibold font-sf-pro-rounded">
              E-mail
            </span>
            <motion.a
              href="mailto:admin@brightside.gg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-2xl sm:text-3xl font-sf-pro-rounded font-semibold text-[#0F172A] hover:text-[#FF6401] transition-colors"
            >
              admin@brightside.gg
            </motion.a>
          </motion.div>
        </motion.div>
      </main>
      <SiteFooter />
    </div>
  );
}
