'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { ComponentType, MouseEvent, SVGProps } from "react";
import { FileText, Headset, Home as House } from "lucide-react";
import { motion } from "framer-motion";

type NavKey = "home" | "docs" | "connect";

let headerMotionPlayed = false;

interface NavItem {
  key: NavKey;
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  external?: boolean;
}

const navIconClass = "h-5 w-5 sm:h-6 sm:w-6 md:hidden";

export default function SiteHeader() {
  const pathname = usePathname();
  const [activeNav, setActiveNav] = useState<NavKey>(pathname === "/connect" ? "connect" : "home");
  const shouldAnimateHeader = !headerMotionPlayed;

  useEffect(() => {
    if (!headerMotionPlayed) {
      headerMotionPlayed = true;
    }
  }, []);

  const scrollToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") {
      return;
    }

    event.preventDefault();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.replaceState(null, "", "/");
      setActiveNav("home");
    }
  };

  useEffect(() => {
    if (pathname === "/connect") {
      setActiveNav("connect");
      return;
    }

    setActiveNav("home");
  }, [pathname]);

  const navItems: NavItem[] = [
    {
      key: "home",
      label: "Home",
      href: "/",
      icon: House,
      onClick: scrollToTop,
    },
    {
      key: "docs",
      label: "Docs",
      href: "https://brightsidegg.gitbook.io/docs/",
      icon: FileText,
      external: true,
    },
    {
      key: "connect",
      label: "Connect",
      href: "/connect",
      icon: Headset,
    },
  ];

  const linkClasses = (key: NavKey) =>
    [
      "flex flex-col items-center gap-1 text-[10px] font-sf-pro-rounded font-semibold tracking-[0.15em] uppercase transition-colors",
      "md:flex-row md:gap-2 md:text-sm md:tracking-normal md:normal-case",
      activeNav === key ? "text-[#FF6401]" : "text-[#94A3B8]",
    ].join(" ");

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white"
      initial={shouldAnimateHeader ? { y: -40, opacity: 0 } : false}
      animate={{ y: 0, opacity: 1 }}
      transition={shouldAnimateHeader ? { duration: 0.6, ease: "easeOut" } : undefined}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex items-center justify-between h-16 sm:h-20 gap-3"
          initial={shouldAnimateHeader ? { opacity: 0, y: -12 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldAnimateHeader ? { duration: 0.5, ease: "easeOut", delay: 0.1 } : undefined}
        >
          <Link
            href="/"
            onClick={scrollToTop}
            className="flex flex-shrink-0 items-center cursor-pointer"
          >
            <Image
              src="/brightside.gif"
              alt="BrightSide Animation"
              width={160}
              height={60}
              className="h-10 w-auto sm:h-12"
              priority
            />
          </Link>

          <motion.nav
            className="flex flex-1 items-center justify-center gap-5 sm:gap-7 md:absolute md:left-1/2 md:-translate-x-1/2"
            initial={shouldAnimateHeader ? { opacity: 0, y: -8 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldAnimateHeader ? { duration: 0.5, ease: "easeOut", delay: 0.2 } : undefined}
          >
            {navItems.map(({ key, label, href, icon: Icon, onClick, external }) =>
              external ? (
                <a
                  key={key}
                  href={href}
                  aria-label={label}
                  className={linkClasses(key)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className={navIconClass} strokeWidth={1.8} />
                  <span className="hidden md:inline">{label}</span>
                </a>
              ) : (
                <Link
                  key={key}
                  href={href}
                  aria-label={label}
                  className={linkClasses(key)}
                  onClick={(event) => {
                    if (onClick) {
                      onClick(event);
                    }
                    setActiveNav(key);
                  }}
                >
                  <Icon className={navIconClass} strokeWidth={1.8} />
                  <span className="hidden md:inline">{label}</span>
                </Link>
              ),
            )}
          </motion.nav>

          <motion.button
            onClick={() => window.open("https://forms.gle/VF5BjRiMdWb3LB7c8", "_blank")}
            className="bg-neutral-100 hover:bg-neutral-200 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 flex items-center gap-1.5 transition-colors group whitespace-nowrap flex-shrink-0"
            initial={shouldAnimateHeader ? { opacity: 0, y: -10 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldAnimateHeader ? { duration: 0.5, ease: "easeOut", delay: 0.3 } : undefined}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="group-hover:rotate-180 transition-transform duration-500"
            >
              <path
                d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                stroke="#FF6401"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M12 4H12.01" stroke="#FF6401" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20 12H20.01" stroke="#FF6401" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 20H12.01" stroke="#FF6401" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 12H4.01" stroke="#FF6401" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17.657 6.34302H17.667" stroke="#FF6401" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17.657 17.657H17.667" stroke="#FF6401" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6.34299 17.657H6.35299" stroke="#FF6401" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6.34299 6.34302H6.35299" stroke="#FF6401" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[#FF6401] font-sf-pro-rounded font-medium text-sm whitespace-nowrap">
              Join Early Beta
            </span>
          </motion.button>
        </motion.div>
      </div>
    </motion.header>
  );
}
