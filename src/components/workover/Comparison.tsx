import React, { useState } from "react";
import { motion } from "framer-motion";
import { XCircle, CheckCircle2, Zap, AlertTriangle } from "lucide-react";

export const Comparison = () => {
  const [active, setActive] = useState<"old" | "new">("new");

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase mb-4">
            LA <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-green-500">CRUDA VERDAD</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Lo que no ves es lo que te está costando dinero todos los días.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 border border-white/10 rounded-3xl overflow-hidden bg-[#050505]">
          
          {/* LADO IZQUIERDO: WEB VIEJA (AGRESIVO) */}
          <div 
            className={`relative p-8 md:p-12 transition-all duration-300 border-b md:border-b-0 md:border-r border-white/10 ${active === 'old' ? 'bg-red-950/20' : 'bg-transparent'} cursor-pointer group`}
            onMouseEnter={() => setActive("old")}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
            <div className="flex items-center gap-3 mb-8">
               <AlertTriangle className="text-red-500" size={32} />
               <h3 className="text-2xl font-black text-white uppercase tracking-wide">TU WEB HOY</h3>
            </div>
            
            <ul className="space-y-6">
              <ListItem status="bad" title="Carga Lenta (+3s)" desc="El 53% de los usuarios abandona. Pierdes la mitad de tus visitas." />
              <ListItem status="bad" title="Vulnerable" desc="Plugins sin actualizar. Puerta abierta a virus y hackeos." />
              <ListItem status="bad" title="Imposible de Editar" desc="Si tocas un botón, se rompe todo el diseño." />
              <ListItem status="bad" title="Alquiler Eterno" desc="Pagando licencias de Elementor, Divi y hosting malo." />
            </ul>

            {/* Efecto Glitch Rojo */}
            {active === 'old' && (
               <motion.div 
                 className="absolute inset-0 bg-red-600/5 pointer-events-none z-0"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
               />
            )}
          </div>

          {/* LADO DERECHO: VANTTA WORKOVER (SOLUCIÓN) */}
          <div 
            className={`relative p-8 md:p-12 transition-all duration-300 ${active === 'new' ? 'bg-green-950/20' : 'bg-transparent'} cursor-pointer group`}
            onMouseEnter={() => setActive("new")}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>

            <div className="flex items-center gap-3 mb-8 relative z-10">
               <Zap className="text-green-400" size={32} />
               <h3 className="text-2xl font-black text-white uppercase tracking-wide">CON WORKOVER</h3>
            </div>
            
            <ul className="space-y-6 relative z-10">
              <ListItem status="good" title="Instantánea (<1s)" desc="Carga inmediata. El usuario se queda y compra." />
              <ListItem status="good" title="100% Blindada" desc="Arquitectura estática. Sin base de datos expuesta a ataques." />
              <ListItem status="good" title="Panel Limpio" desc="Edita tus textos y fotos sin miedo a romper el sitio." />
              
              {/* CORREGIDO AQUÍ: */}
              <ListItem status="good" title="Propiedad Total" desc="El código es tuyo. Hosting rápido y de bajo costo." />
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

const ListItem = ({ status, title, desc }: { status: "good" | "bad", title: string, desc: string }) => (
  <li className="flex gap-4 items-start group-hover:translate-x-1 transition-transform duration-300">
    <div className={`mt-1 min-w-[24px] ${status === 'good' ? 'text-green-400' : 'text-red-500'}`}>
      {status === 'good' ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
    </div>
    <div>
      <strong className={`block text-lg font-bold mb-1 ${status === 'good' ? 'text-white' : 'text-gray-200'}`}>{title}</strong>
      <p className="text-sm text-gray-500 leading-snug">{desc}</p>
    </div>
  </li>
);