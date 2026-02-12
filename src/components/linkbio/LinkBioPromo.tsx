import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Instagram, Globe, Mail } from "lucide-react";

export const LinkBioPromo = () => {
  return (
    <section className="py-24 px-6 bg-[#050505] overflow-hidden relative border-b border-white/5">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* TEXTO DE VENTA */}
        <div className="flex-1 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/20 border border-purple-500/30 text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-6">
            <Globe size={12} /> Nueva Unidad
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase leading-none mb-6">
            Tu Link en Bio <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              con Esteroides.
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
            Deja de regalar tu tráfico a Linktree. Ten tu propio mini-sitio profesional: 
            Pagos, Donaciones, Blog y Contacto directo. Sin mensualidades. 
            Tuyo para siempre.
          </p>

          <a href="/linkbio" className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-black uppercase text-xs rounded-full hover:bg-purple-400 transition-all">
            Ver Demo y Precios <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* CELULAR FLOTANTE (MOCKUP) */}
        <div className="flex-1 relative w-full flex justify-center lg:justify-end">
          
          <motion.div 
            initial={{ y: 20, rotate: -5 }}
            animate={{ y: -20, rotate: 5 }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            className="relative w-[300px] h-[600px] bg-black border-[8px] border-gray-800 rounded-[3rem] shadow-2xl overflow-hidden z-10"
          >
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-20"></div>

            {/* PANTALLA (Simulación Mayra Dark) */}
            <div className="w-full h-full bg-[#0a0a0a] relative flex flex-col items-center pt-16 px-6 overflow-hidden">
               
               {/* Avatar */}
               <div className="w-24 h-24 rounded-full border-2 border-purple-500 p-1 mb-4">
                  <div className="w-full h-full rounded-full bg-gray-800 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
               </div>
               
               <h3 className="text-white font-bold text-lg">Dra. Ana Vantta</h3>
               <p className="text-gray-500 text-xs mb-8 text-center">Medicina Estética & Longevidad</p>

               {/* Botones */}
               <div className="w-full space-y-3">
                  <div className="w-full py-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white text-xs font-bold gap-2 hover:bg-purple-600 hover:border-purple-500 transition-colors cursor-pointer">
                     <Mail size={14} /> Agendar Consulta
                  </div>
                  <div className="w-full py-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white text-xs font-bold gap-2 hover:bg-pink-600 hover:border-pink-500 transition-colors cursor-pointer group">
                     <Heart size={14} className="group-hover:animate-ping" /> Donar Cafecito
                  </div>
                  <div className="w-full py-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white text-xs font-bold gap-2 hover:bg-blue-600 hover:border-blue-500 transition-colors cursor-pointer">
                     <Globe size={14} /> Leer mi Blog
                  </div>
               </div>

               {/* Grid Fotos Abajo */}
               <div className="mt-8 grid grid-cols-3 gap-2 w-full opacity-50">
                  <div className="aspect-square bg-gray-800 rounded"></div>
                  <div className="aspect-square bg-gray-800 rounded"></div>
                  <div className="aspect-square bg-gray-800 rounded"></div>
               </div>

               {/* Gradient Overlay Bottom */}
               <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
            </div>

          </motion.div>

          {/* Círculo Decorativo detrás */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-white/5 rounded-full animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

        </div>

      </div>
    </section>
  );
};