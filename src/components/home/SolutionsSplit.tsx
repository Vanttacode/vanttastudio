import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wrench, Boxes, ArrowRight } from "lucide-react";

const solutions = [
  {
    id: "workover",
    title: "WEB WORKOVER",
    subtitle: "REINGENIERÍA TOTAL",
    desc: "Si ya tienes web pero no funciona. Mantenemos tu idea, demolemos el código basura y reconstruimos los cimientos con tecnología de verdad.",
    icon: Wrench,
    bgImage: "/workover-bg.webp",
    gradient: "from-black via-purple-950/40 to-transparent",
    accent: "text-purple-400",
    borderHover: "group-hover:border-purple-500/50",
    btnColor: "bg-purple-600 hover:bg-purple-500",
    link: "/workover"
  },
  {
    id: "modular",
    title: "WEB MODULAR",
    subtitle: "ARMADO A MEDIDA",
    desc: "Si empiezas de cero. Un sistema base sólido al que le sumas módulos (blog, tienda, agenda) como si fueran piezas de LEGO. Pagas solo lo que usas.",
    icon: Boxes,
    bgImage: "/modular-bg.webp",
    gradient: "from-black via-cyan-950/40 to-transparent",
    accent: "text-cyan-400",
    borderHover: "group-hover:border-cyan-500/50",
    btnColor: "bg-cyan-600 hover:bg-cyan-500",
    link: "/cotizador"
  }
];

export const SolutionsSplit = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative w-full min-h-screen md:h-[800px] flex flex-col md:flex-row bg-black overflow-hidden">
      
      {/* HEADER FLOTANTE */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-30 text-center w-full px-4 pointer-events-none">
        <span className="inline-block py-1 px-3 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-white text-[10px] font-bold tracking-widest uppercase mb-4 shadow-2xl">
          SOLUCIONES VANTTA
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter drop-shadow-2xl">
          ELEGÍ TU <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">CAMINO</span>
        </h2>
      </div>

      {solutions.map((item) => {
        const isHovered = hovered === item.id;
        const isOtherHovered = hovered !== null && hovered !== item.id;

        return (
          <div
            key={item.id}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            className="relative flex-1 flex items-center justify-center overflow-hidden transition-all duration-500 ease-in-out border-b md:border-b-0 md:border-r border-white/10 last:border-0"
          >
            
            {/* IMAGEN DE FONDO CON TRANSICIÓN DE ESTADO */}
            <motion.div 
              className="absolute inset-0 z-0"
              initial={false}
              animate={{
                scale: isHovered ? 1.05 : 1,
                filter: isOtherHovered 
                  ? "grayscale(100%) brightness(0.1)" 
                  : isHovered 
                    ? "grayscale(0%) brightness(0.7)" 
                    : "grayscale(100%) brightness(0.3)",
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <img 
                src={item.bgImage} 
                alt={item.title} 
                className="w-full h-full object-cover" 
              />
            </motion.div>

            {/* OVERLAYS DE COLOR */}
            <motion.div 
              className={`absolute inset-0 bg-gradient-to-t ${item.gradient} z-10`}
              animate={{ opacity: isHovered ? 0.8 : 0.4 }}
            />
            <div className="absolute inset-0 bg-black/40 z-10" />

            {/* CONTENIDO (LAYOUT ESTÁTICO) */}
            <div className="relative z-20 w-full max-w-lg px-8 flex flex-col items-center text-center py-20 md:py-0">
              
              <motion.div 
                className={`p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 mb-6 ${item.accent} shadow-2xl`}
                animate={{ 
                  y: isHovered ? -10 : 0,
                  borderColor: isHovered ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)",
                  backgroundColor: isHovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)"
                }}
              >
                <item.icon size={48} strokeWidth={1.5} />
              </motion.div>

              <h3 className="text-5xl md:text-6xl font-black text-white uppercase mb-2 leading-none tracking-tighter">
                {item.title}
              </h3>
              
              <div className={`text-sm font-bold tracking-[0.4em] uppercase mb-8 ${item.accent}`}>
                {item.subtitle}
              </div>

              {/* La descripción ahora reacciona suavemente */}
              <motion.p 
                className="text-gray-300 text-lg leading-relaxed mb-10 max-w-sm font-medium"
                animate={{ 
                  opacity: isOtherHovered ? 0.2 : isHovered ? 1 : 0.5,
                  y: isHovered ? 0 : 5
                }}
              >
                {item.desc}
              </motion.p>

              <motion.a
                href={item.link}
                className={`inline-flex items-center gap-3 px-10 py-4 rounded-full text-white font-extrabold uppercase tracking-widest text-xs shadow-2xl transition-colors ${item.btnColor}`}
                animate={{ 
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 20,
                  pointerEvents: isHovered ? "auto" : "none"
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explorar Solución <ArrowRight size={18} />
              </motion.a>

            </div>

            {/* Grid Pattern sutil */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none mix-blend-overlay z-20"></div>

          </div>
        );
      })}

    </section>
  );
};