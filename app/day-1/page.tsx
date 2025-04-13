"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Home, Mail, Menu, Settings, User, X } from "lucide-react";
import { GooeyMenu } from "@/components/challenge/gooey-menu";
import { useRouter } from "next/navigation";
import BackButton from "@/components/ui/BackButton";

const navigationItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Mail, label: "Contact", href: "#contact" },
  { icon: User, label: "Profile", href: "#profile" },
  { icon: Settings, label: "Settings", href: "#settings" },
];

export default function GooeyDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleToggleMenu = () => setMenuOpen(!menuOpen);

  const handleItemClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      router.push(href);
    }, 300);
  };

  const itemAnimationConfig = {
    initial: { x: 0, opacity: 0 },
    exit: (i: number) => ({
      y: 0,
      opacity: 0,
      transition: {
        delay: (navigationItems.length - i) * 0.05,
        duration: 0.4,
        type: "spring",
        bounce: 0,
      },
    }),
    transition: (i: number) => ({
      delay: i * 0.05,
      duration: 0.4,
      type: "spring",
      bounce: 0,
    }),
  };

  return (
    <div className="relative w-full h-screen min-h-[600px] flex items-center justify-center dark:bg-black bg-white">
      <GooeyMenu id="gooey-filter-menu" strength={5} />
      
      <div className="absolute top-4 right-4">
        <BackButton />
      </div>

      <div
        className="absolute top-4 left-4"
        style={{ filter: "url(#gooey-filter-menu)" }}
      >
        <AnimatePresence>
          {menuOpen &&
            navigationItems.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.button
                  key={item.label}
                  className="absolute w-12 h-12 bg-[#efefef] rounded-full flex items-center justify-center cursor-pointer"
                  initial={itemAnimationConfig.initial}
                  animate={{
                    y: (idx + 1) * 44,
                    opacity: 1,
                  }}
                  exit={itemAnimationConfig.exit(idx)}
                  transition={itemAnimationConfig.transition(idx)}
                  onClick={() => handleItemClick(item.href)}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`icon-${item.label}`}
                      initial={{ opacity: 0, filter: "blur(10px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(10px)" }}
                      transition={{
                        delay: idx * 0.05,
                        duration: 0.2,
                        type: "spring",
                        bounce: 0,
                      }}
                    >
                      <IconComponent className="w-5 h-5 text-gray-500 hover:text-black" />
                      <span className="sr-only">{item.label}</span>
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              );
            })}
        </AnimatePresence>

        <motion.button
          className="relative w-12 h-12 bg-[#efefef] rounded-full flex items-center justify-center"
          onClick={handleToggleMenu}
        >
          <AnimatePresence mode="wait">
            {menuOpen ? (
              <motion.div
                key="close-icon"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-5 h-5 text-black" />
              </motion.div>
            ) : (
              <motion.div
                key="menu-icon"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-5 h-5 text-black" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <div className="text-center max-w-md mx-auto">
        <p className="text-lg font-medium mb-2">Fluid Menu Animation</p>
      </div>
    </div>
  );
}