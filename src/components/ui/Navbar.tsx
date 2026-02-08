import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Menu, X, ArrowUpRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NAV_LINKS = [
  { href: "/servicios", label: "Servicios" },
  { href: "/workover", label: "Workover Web", isSpecial: true },
  { href: "/labs", label: "Labs" },
  { href: "https://academy.vanttacode.cl/", label: "Academy", isExternal: true },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return <div className="h-20" />;

  // Lógica visual simplificada: Siempre Dark
  const navBackground = isScrolled
    ? "bg-black/80 border-white/10 shadow-lg backdrop-blur-md" 
    : "bg-transparent border-transparent";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b h-20 flex items-center",
        navBackground
      )}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        
        {/* LOGO (Siempre Blanco) */}
        <a href="/" className="relative z-50 block w-40 h-8 group">
          <img
            src="/logoblanco.png"
            alt="VanttaCode"
            className="h-8 w-auto object-contain"
          />
        </a>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <DesktopLink key={link.label} {...link} />
          ))}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="hidden md:flex items-center gap-4">
          <motion.a
            href="/web/cotizador"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 transition-all bg-purple-600 text-white hover:bg-purple-700 shadow-purple-900/20"
          >
            Cotizar Web
          </motion.a>
        </div>

        {/* MOBILE TOGGLE */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 text-white hover:text-gray-300 transition-colors"
          >
            {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-0 left-0 w-full bg-black/95 backdrop-blur-xl z-40 pt-24 px-6 flex flex-col gap-6 h-screen"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.isExternal ? "_blank" : "_self"}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "text-2xl font-medium flex items-center gap-3",
                  link.isSpecial ? "text-cyan-400 font-bold" : "text-gray-300 hover:text-white"
                )}
              >
                {link.isSpecial && <Settings className="animate-spin-slow" size={24} />}
                {link.label}
                {link.isExternal && <ArrowUpRight size={20} className="opacity-50" />}
              </a>
            ))}
            
            <div className="h-px w-full bg-white/10 my-2" />
            
            <a
              href="/web/cotizador"
              className="w-full py-4 bg-purple-600 rounded-xl text-white text-center text-lg font-bold shadow-lg shadow-purple-900/30"
            >
              Cotizar Proyecto
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// --- SUBCOMPONENTE: Link Desktop ---
const DesktopLink = ({ href, label, isSpecial, isExternal }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noopener noreferrer" : ""}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "relative text-sm font-medium flex items-center gap-2 py-2 transition-colors",
        isSpecial ? "text-cyan-400 hover:text-cyan-300 font-bold tracking-wide" : "text-gray-300 hover:text-white"
      )}
    >
      {/* Icono Giratorio para Workover */}
      {isSpecial && (
        <motion.span
          animate={{ rotate: isHovered ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <Settings size={16} />
        </motion.span>
      )}
      
      {label}

      {/* Flecha para externos */}
      {isExternal && <ArrowUpRight size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />}

      {/* Subrayado animado */}
      {!isSpecial && (
        <motion.span
          className="absolute bottom-0 left-0 w-full h-[2px] bg-white rounded-full origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.a>
  );
};