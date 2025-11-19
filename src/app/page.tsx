"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

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
      {/* Floating Icons - Scattered Around */}
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
          {/* Main Headline */}
          <div className="h-[100vh] flex items-center justify-center">
        <motion.h1 
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-sf-pro-rounded font-semibold text-[#222222] text-center leading-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
        >
              Some <span className="font-your-doodle text-[#FF4D1B] text-8xl sm:text-9xl md:text-10xl lg:text-[190px]">markets</span> <br /> Never sleep.
        </motion.h1>
          </div> 

          {/* Body Content */}
          <motion.div
            ref={bodyContentRef}
            id="about"
            className="space-y-8 text-lg sm:text-xl md:text-2xl text-black leading-relaxed font-sf-pro-rounded font-medium text-justify max-w-[500px] mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p>Somewhere in the world, something is <span className="font-your-doodle text-[#FF4D1B]">always trading</span>. A price shifting, A trend forming, A market opening just as another one slows down.</p>
            
            <p>The movement <span className="font-your-doodle text-[#FF4D1B]">never really stops</span>.</p>
            
            
            <p>But trading apps <span className="font-your-doodle text-[#FF4D1B]">haven't kept up</span>. They feel <span className="font-your-doodle text-[#FF4D1B]">rigid, heavy</span>, and built for a world where trading still stops at fixed hours. Bounded by borders, Locked behind regions. Features that depend on <span className="font-your-doodle text-[#FF4D1B]">where you live</span>, not what you need.</p>
            
            <p>And somehow, even with all that weight, they still make you pay  <span className="font-your-doodle text-[#FF4D1B]">fees on every move</span>, commissions even when you don't win, costs hidden inside every click.</p>
            
            <p>Trading shouldn't feel like <span className="font-your-doodle text-[#FF4D1B]">paying rent</span>.</p>
            
            
            <p>We wanted trading to feel <span className="font-your-doodle text-[#FF4D1B]">different</span>. <span className="font-your-doodle text-[#FF4D1B]">Lighter, Calmer,</span> More in tune with the way the world actually moves.</p>
            
            
            <p>Because today, you don't wait for markets to open. They're <span className="font-your-doodle text-[#FF4D1B]">already open somewhere</span>.</p>
            
            <p><span className="font-your-doodle text-[#FF4D1B]">BTC</span> and <span className="font-your-doodle text-[#FF4D1B]">ETH</span> moving through every timezone. Forex flowing from session to session. Stocks like <span className="font-your-doodle text-[#FF4D1B]">NVIDIA</span>, <span className="font-your-doodle text-[#FF4D1B]">Microsoft</span>, and <span className="font-your-doodle text-[#FF4D1B]">Google</span> shifting with global momentum.</p>
            
            <p>There's <span className="font-your-doodle text-[#FF4D1B]">always something happening</span>  even on the weekend.</p>
            
            <p>So why does trading still feel like <span className="font-your-doodle text-[#FF4D1B]">sitting at a desk</span>?</p>
            
            
            {/* Brightside Section with Animated Logo */}
            <div ref={brightsideSectionRef} className="relative flex items-start gap-4 md:gap-6">
              {/* Animated Brightside Logo - Sunrise Effect */}

              
              <div className="flex-1 z-10 bg-white space-y-8">
                <p>That's why we built <span className="font-your-doodle text-[#FF4D1B]">Brightside</span>.</p>
                
                <p>A <span className="font-your-doodle text-[#FF4D1B]">mobile trading experience</span> that feels warm, smooth, and effortless. A place where markets come together in <span className="font-your-doodle text-[#FF4D1B]">one clean flow</span>, and you can trade from <span className="font-your-doodle text-[#FF4D1B]">anywhere</span>  in the moments that fit your life.</p>
              </div>
            </div>
            
            
            <p>No clutter, No noise, No steep learning curve. And <span className="font-your-doodle text-[#FF4D1B]">no usage fees</span>  because you shouldn't pay simply for showing up.</p>
            
            <p>Just a unified space that feels intuitive the moment you open it.</p>
            
            
            <p><span className="font-your-doodle text-[#FF4D1B]">Brightside</span> lets you step into the markets without the weight. You see what matters. You move at your pace. You keep control of your wallet, your funds, your time.</p>
            
            
            <p>It's trading that feels natural. Trading that feels good. Trading that meets you where you are  mornings, late nights, slow afternoons, and everything in between.</p>
            
            
            <p>Because markets never sleep. And neither does opportunity.</p>
            
            <p className="h-8"></p>
          </motion.div>

          {/* Welcome Section */}
          <motion.div
            className="text-center mt-16 sm:mt-20 mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="font-sf-pro-rounded text-black text-xl sm:text-2xl mb-4">
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
              onClick={() => window.open('https://forms.gle/VF5BjRiMdWb3LB7c8', '_blank')}
              className="bg-neutral-100 hover:bg-neutral-200 rounded-full px-6 py-3 sm:px-8 sm:py-4 flex items-center gap-3 transition-colors group cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:rotate-180 transition-transform duration-500 sm:w-12 sm:h-12">
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
              <span className="text-[#FF6401] font-sf-pro-rounded font-medium text-lg sm:text-2xl">Join Early Beta</span>
            </button>
        </motion.div>

          {/* Juicy Labs Branding */}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
