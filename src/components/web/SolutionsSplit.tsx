import React, { useState } from "react";
import { motion } from "framer-motion";
import { Wrench, Boxes, ArrowRight, Zap } from "lucide-react";

const solutions = [
  {
    id: "workover",
    title: "WEB WORKOVER",
    subtitle: "REINGENIERÍA TOTAL",
    desc: "Si ya tienes web pero no funciona. Mantenemos tu idea, demolemos el código basura y reconstruimos los cimientos con tecnología de verdad.",
    icon: Wrench,
    bgImage: "/workover-bg.webp",
    gradient: "from-black via-purple-950/90 to-purple-900/10",
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
    gradient: "from-black via-cyan-950/90 to-cyan-900/10",
    accent: "text-cyan-400",
    borderHover: "group-hover:border-cyan-500/50",
    btnColor: "bg-cyan-600 hover:bg-cyan-500",
    link: "/cotizador"
  }
];

export const SolutionsSplit = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    // CAMBIO CLAVE: Altura fija calculada para llenar la pantalla sin scroll
    <section className="relative w-full h-[calc(100vh-80px)] min-h-[600px] flex flex-col md:flex-row bg-black overflow-hidden border-t border-white/10">
      
      {/* HEADER FLOTANTE (Centrado arriba) */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-40 text-center w-full px-4 pointer-events-none mix-blend-difference">
        <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full border border-white/20 text-white text-[10px] font-bold tracking-widest uppercase mb-3">
          <Zap size={10} className="text-yellow-400" /> HUB DE SOLUCIONES
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase drop-shadow-2xl">
          Define tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Objetivo</span>
        </h2>
      </div>

      {solutions.map((item) => {
        const isHovered = hovered === item.id;
        // Si hay hover en ALGUNO, y NO es este, entonces este se apaga (Dimmed)
        const isDimmed = hovered !== null && hovered !== item.id;

        return (
          <div
            key={item.id}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            // CAMBIO CLAVE: w-full md:w-1/2 (Siempre mitad y mitad)
            className={`
              relative w-full md:w-1/2 h-1/2 md:h-full 
              flex items-center justify-center 
              overflow-hidden cursor-pointer 
              border-b md:border-b-0 md:border-r border-white/5 
              group transition-all duration-500 ease-in-out
              ${isDimmed ? 'grayscale opacity-40 brightness-50' : 'grayscale-0 opacity-100 brightness-100'}
            `}
          >
            
            {/* 1. FONDO DE IMAGEN (Zoom suave al hover) */}
            <div className="absolute inset-0 z-0">
              <div className={`absolute inset-0 bg-gradient-to-b ${item.gradient} opacity-90 z-10`} />
              <img 
                src={item.bgImage} 
                alt={item.title} 
                className={`w-full h-full object-cover opacity-50 mix-blend-overlay transition-transform duration-1000 ease-out ${isHovered ? 'scale-110' : 'scale-100'}`}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>

            {/* 2. CAPAS DE SOMBRA (Vignette) */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80 z-10" />

            {/* 3. CONTENIDO */}
            <div className="relative z-20 max-w-md px-6 flex flex-col items-center text-center">
              
              {/* Icono */}
              <motion.div 
                className={`p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 mb-6 ${item.accent} shadow-2xl`}
                animate={{ y: isHovered ? -10 : 0, scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.4 }}
              >
                <item.icon size={56} strokeWidth={1.5} />
              </motion.div>

              <h3 className="text-4xl md:text-6xl font-black text-white uppercase mb-3 leading-none tracking-tight drop-shadow-lg">
                {item.title}
              </h3>
              
              <div className={`text-sm font-bold tracking-[0.3em] uppercase mb-6 ${item.accent}`}>
                {item.subtitle}
              </div>

              {/* Descripción */}
              <p className="text-gray-300 text-sm md:text-lg leading-relaxed mb-10 font-medium max-w-sm mx-auto drop-shadow-md">
                {item.desc}
              </p>

              {/* Botón */}
              <motion.a
                href={item.link}
                className={`inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold uppercase tracking-wider text-sm shadow-xl transition-all ${item.btnColor}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Solución <ArrowRight size={18} />
              </motion.a>

            </div>

            {/* Grid Pattern Decorativo */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20 pointer-events-none mix-blend-overlay z-20"></div>

          </div>
        );
      })}

    </section>
  );
};