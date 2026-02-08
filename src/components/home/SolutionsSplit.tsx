import React, { useState } from "react";
import { motion } from "framer-motion";
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
    border: "border-purple-500/30",
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
    border: "border-cyan-500/30",
    btnColor: "bg-cyan-600 hover:bg-cyan-500",
    link: "/cotizador"
  }
];

export const SolutionsSplit = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative w-full flex flex-col md:flex-row bg-black overflow-hidden">
      
      {/* HEADER FLOTANTE (Solo visible en Desktop para no tapar en móvil) */}
      <div className="hidden md:block absolute top-10 left-1/2 -translate-x-1/2 z-30 text-center w-full px-4 pointer-events-none">
        <span className="inline-block py-1 px-3 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-white text-[10px] font-bold tracking-widest uppercase mb-4 shadow-2xl">
          SOLUCIONES VANTTA
        </span>
        <h2 className="text-5xl font-black text-white tracking-tighter drop-shadow-2xl">
          ELEGÍ TU <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">CAMINO</span>
        </h2>
      </div>

      {/* HEADER MÓVIL (Estático arriba) */}
      <div className="md:hidden w-full py-12 px-6 text-center border-b border-white/10 bg-[#050505] z-30">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">
            SOLUCIONES VANTTA
        </span>
        <h2 className="text-4xl font-black text-white uppercase leading-none">
            ELEGÍ TU <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">CAMINO</span>
        </h2>
      </div>

      {solutions.map((item) => {
        const isHovered = hovered === item.id;
        // En móvil no hay "other hovered", siempre se ven bien
        const isOtherHovered = hovered !== null && hovered !== item.id;

        return (
          <div
            key={item.id}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            className="group relative flex-1 min-h-[500px] md:h-[800px] flex items-center justify-center overflow-hidden transition-all duration-500 ease-in-out border-b md:border-b-0 md:border-r border-white/10 last:border-0"
          >
            
            {/* IMAGEN DE FONDO */}
            <div className="absolute inset-0 z-0">
               {/* Versión Desktop (Reactiva al Hover) */}
               <motion.img 
                  src={item.bgImage} 
                  alt={item.title} 
                  className="hidden md:block w-full h-full object-cover"
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                    filter: isOtherHovered ? "grayscale(100%) brightness(0.2)" : "grayscale(0%) brightness(0.5)"
                  }}
                  transition={{ duration: 0.7 }}
               />
               
               {/* Versión Móvil (Estática y visible) */}
               <img 
                  src={item.bgImage} 
                  alt={item.title} 
                  className="md:hidden w-full h-full object-cover opacity-40 grayscale-[30%]"
               />
            </div>

            {/* OVERLAYS */}
            <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} z-10 opacity-60 md:opacity-40`} />
            
            {/* CONTENIDO */}
            <div className="relative z-20 w-full max-w-lg px-6 flex flex-col items-center text-center">
              
              {/* ICONO */}
              <div className={`p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 mb-6 ${item.accent} shadow-2xl md:group-hover:-translate-y-2 transition-transform duration-500`}>
                <item.icon size={40} strokeWidth={1.5} />
              </div>

              <h3 className="text-4xl md:text-6xl font-black text-white uppercase mb-2 leading-none tracking-tighter">
                {item.title}
              </h3>
              
              <div className={`text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-6 ${item.accent}`}>
                {item.subtitle}
              </div>

              {/* DESCRIPCIÓN */}
              {/* En móvil: Visible siempre. En Desktop: Se mueve/atenúa según hover */}
              <p className={`text-gray-300 text-sm md:text-lg leading-relaxed mb-8 max-w-sm font-medium transition-all duration-500
                 md:opacity-50 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0`}>
                {item.desc}
              </p>

              {/* BOTÓN */}
              {/* En móvil: Visible siempre. En Desktop: Aparece con el hover */}
              <a
                href={item.link}
                className={`inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-bold uppercase tracking-widest text-[10px] md:text-xs shadow-xl transition-all ${item.btnColor}
                  md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0`}
              >
                Ver Detalle <ArrowRight size={16} />
              </a>

            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none mix-blend-overlay z-20"></div>

          </div>
        );
      })}

    </section>
  );
};