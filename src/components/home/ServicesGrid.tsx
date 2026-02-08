import React from "react";
import { motion } from "framer-motion";
import { 
  Globe, 
  Database, 
  Lock, 
  BrainCircuit
} from "lucide-react";

// ESTA ES LA LÍNEA CLAVE: "export const", NO "export default"
export const ServicesGrid = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-black text-white" id="servicios">
      
      {/* HEADER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 mb-16 text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest uppercase mb-4 text-gray-400">
          ECOSISTEMA VANTTA
        </span>
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 text-white">
          TODO LO QUE <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-purple-400 to-red-400">NECESITAS</span>
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-400">
          Infraestructura digital completa. Desde tu presencia web hasta la inteligencia que automatiza tu negocio.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-[600px]">
          
          {/* COLUMNA 1 (IZQUIERDA): STACK WEB + SOFTWARE */}
          <div className="flex flex-col gap-6 h-full">
            
            {/* 1. WEB (ACTIVO - VERDE) */}
            <motion.a 
              href="/web/service"
              whileHover={{ scale: 1.01 }}
              className="group relative flex-1 bg-[#0B0C10] border border-white/10 rounded-3xl p-8 flex flex-col justify-between overflow-hidden hover:border-green-500/50 transition-colors cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 group-hover:bg-green-500/20 transition-all"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 border border-green-500/20">
                    <Globe size={24} />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold uppercase border border-green-500/20">
                    Disponible
                  </span>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-2">Desarrollo Web</h3>
                <p className="text-gray-400 text-sm max-w-sm">
                  Sitios corporativos y E-commerce. Rápidos, modulares y diseñados para convertir visitas en clientes.
                </p>
              </div>

              {/* GRÁFICA WEB: Mini Browser + Layout */}
              <div className="mt-6 relative w-full h-32 bg-[#15161A] border border-white/5 rounded-xl overflow-hidden p-3 shadow-2xl group-hover:translate-y-1 transition-transform duration-500">
                 <div className="flex gap-1.5 mb-3 border-b border-white/5 pb-2">
                   <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                   <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                   <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                 </div>
                 <div className="flex gap-3">
                   <div className="w-1/4 h-20 bg-white/5 rounded-md animate-pulse"></div>
                   <div className="flex-1 space-y-2">
                     <div className="h-2 w-3/4 bg-white/10 rounded"></div>
                     <div className="h-10 w-full bg-green-500/10 rounded border border-green-500/10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-green-500/10 w-1/2 skew-x-12"></div>
                     </div>
                   </div>
                 </div>
              </div>
            </motion.a>

            {/* 2. SOFTWARE (INACTIVO - ROJO) */}
            <div className="relative flex-1 bg-[#0B0C10] border border-white/10 rounded-3xl p-8 flex flex-col justify-center overflow-hidden opacity-60 hover:opacity-100 transition-opacity duration-300">
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/80 border border-white/10 rounded-full text-xs font-bold text-gray-300 uppercase tracking-wide">
                <Lock size={12} /> Próximamente
              </div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/10 blur-[80px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2"></div>
              <div className="relative z-10 flex gap-6 items-center">
                 <div className="shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20 mb-4">
                      <Database size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">Software</h3>
                    <p className="text-gray-500 text-xs">Sistemas a medida & CRM.</p>
                 </div>
              </div>
            </div>

          </div>

          {/* COLUMNA 2 (DERECHA): IA (INACTIVO - MORADO) */}
          <div className="relative bg-[#0B0C10] border border-white/10 rounded-3xl p-8 flex flex-col overflow-hidden opacity-60 hover:opacity-100 transition-opacity duration-300">
            <div className="absolute top-6 right-6 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/80 border border-white/10 rounded-full text-xs font-bold text-gray-300 uppercase tracking-wide">
              <Lock size={12} /> Próximamente
            </div>
            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>

            <div className="relative z-10 mb-8">
              <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 mb-6">
                <BrainCircuit size={32} />
              </div>
              <h3 className="text-4xl font-bold text-white mb-3">Inteligencia <br/> Artificial</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Agentes autónomos y automatización de procesos. Dejamos que las máquinas hagan el trabajo repetitivo.
              </p>
            </div>
            {/* Visual Abstracto IA */}
            <div className="flex-1 relative bg-[#15161A] border border-white/5 rounded-xl overflow-hidden flex flex-col">
              <div className="p-4 space-y-4 flex-1">
                <div className="flex justify-end">
                  <div className="bg-purple-500/20 border border-purple-500/30 text-purple-200 text-[10px] px-3 py-2 rounded-l-lg rounded-tr-lg max-w-[80%]">
                    Optimizar procesos...
                  </div>
                </div>
                <div className="flex justify-start">
                   <div className="bg-white/5 border border-white/10 text-gray-400 text-[10px] px-3 py-2 rounded-r-lg rounded-tl-lg max-w-[80%] space-y-2">
                     <p>Analizando...</p>
                   </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};