import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, FileText, Coffee, MessageSquare, ExternalLink } from "lucide-react";

export const BioFeatures = () => {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* FEATURE 1: DONACIONES (Con Corazones) */}
        <DonationCard />

        {/* FEATURE 2: MINI BLOG */}
        <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 flex flex-col justify-between group hover:border-white/20 transition-colors">
           <div>
              <div className="w-12 h-12 rounded-full bg-blue-900/20 text-blue-400 flex items-center justify-center mb-6">
                 <FileText size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Mini Blog Integrado</h3>
              <p className="text-gray-400 text-sm">
                 Tus seguidores leen tus artículos sin salir de tu bio. Perfecto para newsletters o tips rápidos.
              </p>
           </div>
           <div className="mt-8 space-y-2 opacity-50 group-hover:opacity-100 transition-opacity">
              <div className="h-2 w-full bg-gray-800 rounded-full"></div>
              <div className="h-2 w-2/3 bg-gray-800 rounded-full"></div>
              <div className="h-2 w-4/5 bg-gray-800 rounded-full"></div>
           </div>
        </div>

        {/* FEATURE 3: CONTACTO DIRECTO */}
        <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 flex flex-col justify-between group hover:border-white/20 transition-colors">
           <div>
              <div className="w-12 h-12 rounded-full bg-green-900/20 text-green-400 flex items-center justify-center mb-6">
                 <MessageSquare size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Captura de Leads</h3>
              <p className="text-gray-400 text-sm">
                 Olvídate del "mándame un DM". Un formulario real que llega directo a tu correo o WhatsApp.
              </p>
           </div>
           <button className="mt-6 w-full py-2 bg-white/5 rounded text-xs text-gray-400 border border-white/5 group-hover:bg-green-600 group-hover:text-white group-hover:border-green-500 transition-all">
              Contactar Ahora
           </button>
        </div>

      </div>
    </section>
  );
};

// Subcomponente de Donación con Corazones
const DonationCard = () => {
   const [hearts, setHearts] = useState<{id: number, x: number}[]>([]);

   const addHeart = () => {
      const id = Date.now();
      const x = Math.random() * 40 - 20; // Variación random en X
      setHearts(prev => [...prev, { id, x }]);
      setTimeout(() => setHearts(prev => prev.filter(h => h.id !== id)), 1000);
   };

   return (
      <div className="relative p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 overflow-hidden flex flex-col justify-between group hover:border-pink-500/30 transition-colors">
         <div>
            <div className="w-12 h-12 rounded-full bg-pink-900/20 text-pink-400 flex items-center justify-center mb-6">
               <Coffee size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Pagos & Donaciones</h3>
            <p className="text-gray-400 text-sm">
               Recibe pagos por tus guías, asesorías o "cafecitos" directamente. Botones animados que incitan al clic.
            </p>
         </div>

         <div className="mt-8 relative">
            <button 
               onClick={addHeart}
               className="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 z-10 relative shadow-lg shadow-pink-900/20"
            >
               <Heart size={18} className="fill-white" /> Invítame un Café
            </button>
            
            {/* CORAZONES FLOTANTES */}
            <AnimatePresence>
               {hearts.map(h => (
                  <motion.div
                     key={h.id}
                     initial={{ opacity: 1, y: 0, x: 0 }}
                     animate={{ opacity: 0, y: -100, x: h.x }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.8 }}
                     className="absolute left-1/2 -translate-x-1/2 top-0 text-pink-500 pointer-events-none"
                  >
                     <Heart size={24} className="fill-pink-500" />
                  </motion.div>
               ))}
            </AnimatePresence>
         </div>
      </div>
   );
};