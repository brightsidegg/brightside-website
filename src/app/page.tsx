"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef, type ReactNode } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const TextReveal = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.p
    className={`mb-0 ${className}`}
    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-20%" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    {children}
  </motion.p>
);

const Marker = ({ children, color = "bg-[#FF4D1B]/15" }: { children: ReactNode; color?: string }) => (
  <span className="relative inline-block whitespace-nowrap">
    <motion.span
      className={`absolute top-0 bottom-0 -left-[4px] -right-[4px] -z-10 block ${color}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: "circOut", delay: 0.2 }}
      style={{
        originX: 0,
        borderRadius: "4px 10px 3px 8px",
        skewX: -3,
        rotate: -0.5
      }}
    />
    <span className="relative z-0">{children}</span>
  </span>
);

const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay">
    <svg width="100%" height="100%">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

const SquiggleFilter = () => (
  <svg style={{ display: 'none' }}>
    <defs>
      <filter id="squiggly-0">
        <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise" seed="0" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
      </filter>
      <filter id="squiggly-1">
        <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise" seed="1" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
      </filter>
      <filter id="squiggly-2">
        <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise" seed="2" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
      </filter>
      <filter id="squiggly-3">
        <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise" seed="3" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
      </filter>
      <filter id="squiggly-4">
        <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise" seed="4" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
      </filter>
    </defs>
  </svg>
);

const KineticText = ({ text = "markets", className = "" }: { text?: string; className?: string }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % 5);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`font-your-doodle text-[#FF4D1B] inline-block ${className}`}
      style={{ filter: `url(#squiggly-${index})` }}
    >
      {text}
    </span>
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [showEmojis, setShowEmojis] = useState(false);
  const [visibleEmojis, setVisibleEmojis] = useState<Set<number>>(new Set());
  const [randomizedIcons, setRandomizedIcons] = useState<string[]>([]);
  const bodyContentRef = useRef<HTMLDivElement>(null);
  const brightsideSectionRef = useRef<HTMLDivElement>(null);

  // Scroll progress for brightside section
  const { scrollYProgress: sunScrollProgress } = useScroll({
    target: brightsideSectionRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress for sunrise animation
  const sunX = useTransform(sunScrollProgress, [0, 1], [-200, 0]); // Moves from left to right as we scroll
  const sunOpacity = useTransform(sunScrollProgress, [0, 0.3, 0.7, 1], [0, 0.5, 1, 1]); // Fades in
  const sunScale = useTransform(sunScrollProgress, [0, 0.5, 1], [0.5, 1, 1.1]); // Scales up

  // All available icons
  const availableIcons = [
    "btc.png",
    "eth.png",
    "gold.png",
    "google.png",
    "hype.png",
    "lighter.png",
    "nasdaq.png",
    "silver.png",
    "sol.png",
    "tsla.png",
  ];

  // Define icon positions
  const floatingIcons = [
    { left: "5%", top: "12%" },
    { left: "15%", top: "25%", hideOnMd: true },

    { left: "6%", top: "37%" },
    { left: "4%", top: "60%" },

    { left: "15%", top: "49%", hideOnMd: true },

    { right: "5%", top: "12%" },
    { right: "15%", top: "25%", hideOnMd: true },

    { right: "6%", top: "37%" },
    { right: "4%", top: "60%" },

    { right: "15%", top: "49%", hideOnMd: true },
  ];

  // Randomize icons when showEmojis becomes true
  useEffect(() => {
    if (showEmojis && randomizedIcons.length === 0) {
      const shuffled = [...availableIcons].sort(() => Math.random() - 0.5);
      const assigned = floatingIcons.map((_, index) => {
        return shuffled[index % shuffled.length];
      });
      setRandomizedIcons(assigned);
    } else if (!showEmojis) {
      // Reset when hidden so they randomize again next time
      setRandomizedIcons([]);
    }
  }, [showEmojis]);

  useEffect(() => {
    const handleScroll = () => {
      if (bodyContentRef.current) {
        const rect = bodyContentRef.current.getBoundingClientRect();
        const elementHeight = rect.height;
        const elementTop = rect.top;

        // Calculate how much of the element has scrolled past viewport top
        // When elementTop becomes negative, it means we've scrolled past the top
        const scrolledPastTop = elementTop < 0 ? Math.abs(elementTop) : 0;
        const scrollPercentage = (scrolledPastTop / elementHeight) * 100;

        // Show emojis when body content is between 5% and 50% through its scroll
        // This means: 5% of the element has scrolled past the top AND less than 50% has scrolled
        const isInRange = scrollPercentage >= 5 && scrollPercentage <= 50;

        setShowEmojis(isInRange);
      }
    };

    // Initial check
    handleScroll();

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white relative">
      <NoiseOverlay />
      {/* Floating Icons - Scattered Around */}
      <SquiggleFilter />
      <AnimatePresence>
        {showEmojis && (
          <div className="hidden md:block fixed inset-0 z-0 pointer-events-none">
            {floatingIcons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
                className={`absolute overflow-hidden ${item.hideOnMd ? 'hidden lg:block' : ''}`}
                style={{
                  left: item.left || 'auto',
                  right: item.right || 'auto',
                  top: item.top,
                }}
              >
                <div className="">
                  {randomizedIcons[index] && (
                    <Image
                      src={`/icon-animated/${randomizedIcons[index]}`}
                      alt="Icon"
                      width={120}
                      height={120}
                      className=""
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <SiteHeader />

      {/* Main Content */}
      <main className="pb-32">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Main Headline - Wabi Style: Centered, Large, Breathing Room */}
          <div className="min-h-[90vh] flex flex-col items-center justify-center pt-20">
            <motion.h1
              className="text-[3.5rem] leading-[1.1] sm:text-7xl md:text-8xl lg:text-9xl font-brightside-sans font-semibold text-[#222222] text-center tracking-tight"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              Some <KineticText text="markets" className="text-[4rem] sm:text-9xl md:text-10xl lg:text-[190px] leading-none" /> <br /> Never sleep.
            </motion.h1>
          </div>

          {/* Manifesto Section - Wabi Style */}
          <div
            ref={bodyContentRef}
            id="about"
            className="flex flex-col gap-8 py-12 max-w-[600px] mx-auto px-6 text-left text-[23px] leading-[1.5] tracking-[-0.02em] text-[#191919] font-brightside-sans font-medium"
          >
            <TextReveal>Somewhere in the world, something is <Marker>always trading</Marker>. A price shifting, a trend forming, a market opening just as another one slows down.</TextReveal>
            <TextReveal>The movement <Marker>never really stops</Marker>.</TextReveal>
            <TextReveal>But trading apps haven't kept up. They feel <Marker color="bg-gray-200/50">rigid, heavy</Marker>, and built for a world where trading still stops at fixed hours. Bound by borders. Locked behind regions.</TextReveal>
            <TextReveal>And somehow, even with all that weight, they still make you pay <Marker color="bg-gray-200/50">fees on every move</Marker>, commissions even when you don't win, costs hidden inside every click.</TextReveal>
            <TextReveal className="italic text-gray-400">Trading shouldn't feel like paying rent.</TextReveal>
            <TextReveal>We wanted trading to feel different. <Marker>Lighter. Calmer.</Marker> More in tune with the way the world actually moves.</TextReveal>
            <TextReveal>Because today, you don't wait for markets to open. They're already open somewhere.</TextReveal>
            <TextReveal>BTC and ETH moving through every timezone. Forex flowing from session to session. Stocks like NVIDIA, Microsoft, and Google shifting with global momentum.</TextReveal>
            <TextReveal>There's always something happening—even on the weekend.</TextReveal>
            <TextReveal>So why does trading still feel like sitting at a desk?</TextReveal>

            <div ref={brightsideSectionRef} className="py-8 text-center">
              <motion.h2
                className="text-5xl md:text-6xl font-your-doodle text-[#FF4D1B] inline-block"
                initial={{ opacity: 0, scale: 0.9, y: 10, rotate: -3 }}
                whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.8, ease: "backOut" }}
                viewport={{ once: true }}
              >
                Brightside
              </motion.h2>
            </div>

            <TextReveal>A mobile trading experience that feels warm, smooth, and effortless. A place where markets come together in one clean flow, and you can trade from <Marker>anywhere</Marker> in the moments that fit your life.</TextReveal>
            <TextReveal>No clutter, no noise, no steep learning curve. And <Marker>no usage fees</Marker> because you shouldn't pay simply for showing up.</TextReveal>
            <TextReveal>Just a unified space that feels intuitive the moment you open it.</TextReveal>
            <TextReveal>Brightside lets you step into the markets without the weight. You see what matters. You move at your pace. You keep control of your wallet, your funds, your time.</TextReveal>
            <TextReveal>It's trading that feels natural. Trading that feels good. Trading that meets you where you are—mornings, late nights, slow afternoons, and everything in between.</TextReveal>
            <TextReveal className="pt-8 font-semibold text-black">Because markets never sleep. <br /><span className="text-gray-400 font-normal">And neither does opportunity.</span></TextReveal>
          </div>

          {/* Welcome Section */}
          <motion.div
            className="text-center mt-16 sm:mt-20 mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="font-brightside-sans text-black text-xl sm:text-2xl mb-4">
              A brighter trading experience is here.
            </p>
            <h2 className="font-your-doodle text-[#FF4D1B] text-3xl sm:text-4xl">
              Welcome to the Brightside.
            </h2>
          </motion.div>

          {/* Join Private Beta Button */}
          <motion.div
            className="flex justify-center mb-16"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button
              onClick={() => window.open('https://apps.apple.com/us/app/brightside-onchain-markets/id6754800508', '_blank')}
              className="bg-neutral-100 hover:bg-neutral-200 rounded-full px-6 py-3 sm:px-8 sm:py-4 flex items-center gap-3 transition-colors group cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:rotate-180 transition-transform duration-500 sm:w-12 sm:h-12">
                <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="#FF6401" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 4H12.01" stroke="#FF6401" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 12H20.01" stroke="#FF6401" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 20H12.01" stroke="#FF6401" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 12H4.01" stroke="#FF6401" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17.657 6.34302H17.667" stroke="#FF6401" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17.657 17.657H17.667" stroke="#FF6401" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.34299 17.657H6.35299" stroke="#FF6401" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.34299 6.34302H6.35299" stroke="#FF6401" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[#FF6401] font-brightside-sans font-medium text-lg sm:text-2xl">Get the app</span>
            </button>
          </motion.div>

          {/* Juicy Labs Branding */}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
