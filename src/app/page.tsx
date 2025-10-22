"use client";
import MorphingText from "@/components/MorphingText";
import SocialSelector from "@/components/SocialSelector";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const texts = ["200% Awesome Features", "100% Your Control", "0% Fees"];

  return (
    <motion.div 
      className="min-h-screen bg-white flex flex-col justify-center items-center p-4 sm:p-6 relative -mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Top section */}
      <motion.div 
        className="flex flex-col items-center text-center max-w-full"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <video
            src="/brightSide.mp4"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
            disablePictureInPicture
            preload="auto"
            style={{ pointerEvents: 'none' }}
            className="w-full max-w-[280px] sm:max-w-[350px] rounded-lg"
          />
        </motion.div>
        <motion.h1 
          className="mt-2 text-[60px] sm:text-[80px] md:text-[90px] font-your-doodle text-[#FF6401] leading-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        >
          brightSide
        </motion.h1>

          <motion.div
            className="mt-2 block text-[18px] sm:text-[24px] md:text-[28px] tracking-wide text-[#FF6401] px-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          >
            <MorphingText
              texts={texts}
              duration={2000}
            />
          </motion.div>
          
          {/* Join Early Beta Button */}
          <motion.button
            className="mt-8 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 flex items-center gap-[6px] mx-auto group cursor-pointer"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://forms.gle/VF5BjRiMdWb3LB7c8', '_blank')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:animate-spin transition-transform duration-500" style={{ animationDuration: '2s' }}>
              <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="#FF6401" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 4H12.01" stroke="#FF6401" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 12H20.01" stroke="#FF6401" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 20H12.01" stroke="#FF6401" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 12H4.01" stroke="#FF6401" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17.657 6.34302H17.667" stroke="#FF6401" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17.657 17.657H17.667" stroke="#FF6401" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.34299 17.657H6.35299" stroke="#FF6401" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.34299 6.34302H6.35299" stroke="#FF6401" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[#FF6401] font-sf-pro-rounded font-semibold text-lg">Join Early Beta</span>
          </motion.button>
        </motion.div>

      {/* Footer - Social Selector */}
      <motion.div 
        className="mb-8 fixed bottom-0 left-0 right-0 flex justify-center px-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center gap-4">
          <SocialSelector />
          
          {/* Mobile Juicy Labs branding */}
          <motion.div 
            className="flex sm:hidden items-center gap-2 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.8, ease: "easeOut" }}
          >
            <a
              href="https://x.com/juicy_ag"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
              aria-label="Juicy Labs Ltd on X"
            >
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <span>A product of</span>
                <img src="/juicy.png" alt="Juicy logo" className="h-4 w-auto" />
                <span className="font-semibold text-gray-700">Juicy Labs Ltd</span>
                <span>Copyright 2025</span>
              </div>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Desktop Corner branding bottom-right */}
      <motion.div 
        className="hidden sm:block fixed bottom-2 right-2 sm:bottom-4 sm:right-4 text-right z-50"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6, ease: "easeOut" }}
      >
        <a
          href="https://x.com/juicy_ag"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 sm:gap-2 hover:opacity-80 transition-opacity"
          aria-label="Juicy Labs Ltd on X"
        >
          <img src="/juicy.png" alt="Juicy logo" className="h-4 w-auto sm:h-6" />
          <div className="flex flex-col items-end">
            <span className="text-[10px] sm:text-xs text-gray-500">A product of</span>
            <span className="text-xs sm:text-sm font-semibold text-gray-700">Juicy Labs</span>
            <span className="text-[10px] sm:text-xs text-gray-500">Copyright 2025</span>
          </div>
        </a>
      </motion.div>
    </motion.div>
  );
}
