import React from "react";
import { motion } from "framer-motion";
import { 
  Ghost, 
  Timer, 
  Store, 
  MessageSquareX, 
  Activity,
  FileWarning
} from "lucide-react";

// Configuración limpia. Solo definimos el "tipo" de color, el CSS hace el resto.
const FAILURES = [
  {
    id: "ERR_01",
    icon: Ghost,
    title: "INVISIBLE",
    desc: "Si te buscan en Google y no apareces, no existes. Es como pagar el arriendo de un local y mantener la cortina cerrada todo el día.",
    stat: "0 VISITAS",
    accent: "gray" // Usado para lógica CSS
  },
  {
    id: "ERR_02",
    icon: Timer,
    title: "LENTA",
    desc: "Si tu web demora en cargar, el cliente se va. Nadie tiene paciencia para esperar 5 segundos mirando una pantalla en blanco.",
    stat: "EL CLIENTE HUYE",
    accent: "orange"
  },
  {
    id: "ERR_03",
    icon: Store,
    title: "DE ADORNO",
    desc: "Se ve bonita, pero no sirve para nada. La gente entra, mira las fotos y se va sin comprar ni contactar. No cierra negocios.",
    stat: "0 VENTAS",
    accent: "red"
  },
  {
    id: "ERR_04",
    icon: MessageSquareX,
    title: "MANUAL",
    desc: "No toma pedidos, no agenda horas y no filtra dudas. Al final, sigues atado al teléfono respondiendo lo mismo por WhatsApp.",
    stat: "TRABAJO HUMANO",
    accent: "amber"
  },
];

export const ProblemGrid = () => {
  return (
    <section className="py-24 relative overflow-hidden v-prob-sect transition-colors duration-300">
      
      {/* ESTILOS INYECTADOS A PRUEBA DE BALAS 
          Escuchan directamente a :root[data-theme="light"] ignorando la config de Tailwind.
      */}
      <style dangerouslySetInnerHTML={{__html: `
        /* --- ANIMACIÓN SCANLINE --- */
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }
        .v-scan { animation: scan 3s linear infinite; }

        /* --- VARIABLES DEFAULT (DARK MODE) --- */
        .v-prob-sect { background-color: #000000; color: #ffffff; }
        .v-prob-grid-bg { background-image: linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px); }
        
        .v-prob-card { 
          background-color: #080808; 
          border: 1px solid rgba(255,255,255,0.05); 
          box-shadow: 0 0 0 transparent;
        }
        .v-prob-card:hover { background-color: #0A0A0A; }
        
        .v-prob-badge { background-color: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: inherit; }
        .v-prob-id { background-color: transparent; border: 1px solid rgba(255,255,255,0.05); color: #6b7280; }
        .v-prob-desc { color: #9ca3af; }
        .v-prob-title { color: #ffffff; }
        .v-prob-head span { color: #dc2626; } /* Rojo header */
        .v-prob-text-soft { color: #9ca3af; }
        .v-prob-strong { color: #ffffff; }

        /* Colores de Iconos en Dark */
        .v-accent-gray { color: #9ca3af; } .v-prob-card[data-accent="gray"]:hover { border-color: rgba(156, 163, 175, 0.5); }
        .v-accent-orange { color: #f97316; } .v-prob-card[data-accent="orange"]:hover { border-color: rgba(249, 115, 22, 0.5); }
        .v-accent-red { color: #dc2626; } .v-prob-card[data-accent="red"]:hover { border-color: rgba(220, 38, 38, 0.5); }
        .v-accent-amber { color: #f59e0b; } .v-prob-card[data-accent="amber"]:hover { border-color: rgba(245, 158, 11, 0.5); }

        /* --- LIGHT MODE OVERRIDES (Cuando data-theme="light") --- */
        :root[data-theme="light"] .v-prob-sect { background-color: #F9FAFB; color: #111827; }
        :root[data-theme="light"] .v-prob-grid-bg { background-image: linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px); }

        :root[data-theme="light"] .v-prob-desc { color: #4b5563; }
        :root[data-theme="light"] .v-prob-title { color: #111827; }
        :root[data-theme="light"] .v-prob-text-soft { color: #4b5563; }
        :root[data-theme="light"] .v-prob-strong { color: #000000; }
        
        :root[data-theme="light"] .v-prob-id { background-color: rgba(255,255,255,0.5); border-color: #d1d5db; color: #6b7280; }
        :root[data-theme="light"] .v-prob-badge { background-color: #ffffff; border-color: #e5e7eb; }

        /* Tintes de Tarjetas en Light Mode */
        :root[data-theme="light"] .v-prob-card { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        
        :root[data-theme="light"] .v-prob-card[data-accent="gray"] { background-color: #F3F4F6; border-color: #E5E7EB; }
        :root[data-theme="light"] .v-prob-card[data-accent="gray"]:hover { background-color: #ffffff; border-color: #9CA3AF; }
        :root[data-theme="light"] .v-accent-gray { color: #4b5563; }

        :root[data-theme="light"] .v-prob-card[data-accent="orange"] { background-color: #FFF7ED; border-color: #FED7AA; }
        :root[data-theme="light"] .v-prob-card[data-accent="orange"]:hover { background-color: #ffffff; border-color: #F97316; }
        :root[data-theme="light"] .v-accent-orange { color: #ea580c; }

        :root[data-theme="light"] .v-prob-card[data-accent="red"] { background-color: #FEF2F2; border-color: #FECACA; }
        :root[data-theme="light"] .v-prob-card[data-accent="red"]:hover { background-color: #ffffff; border-color: #DC2626; }
        :root[data-theme="light"] .v-accent-red { color: #dc2626; }

        :root[data-theme="light"] .v-prob-card[data-accent="amber"] { background-color: #FFFBEB; border-color: #FDE68A; }
        :root[data-theme="light"] .v-prob-card[data-accent="amber"]:hover { background-color: #ffffff; border-color: #D97706; }
        :root[data-theme="light"] .v-accent-amber { color: #d97706; }
        
        /* Card Grande Final (Obsolescencia) */
        .v-final-card { background-color: #080808; border: 1px solid rgba(127, 29, 29, 0.4); }
        .v-final-card:hover { border-color: #dc2626; }
        :root[data-theme="light"] .v-final-card { background-color: #FEF2F2; border: 1px solid #FECACA; box-shadow: 0 10px 15px -3px rgba(220, 38, 38, 0.1); }
        :root[data-theme="light"] .v-final-card:hover { border-color: #ef4444; }

      `}} />

      {/* Grid de Fondo */}
      <div className="absolute inset-0 bg-[size:3rem_3rem] v-prob-grid-bg pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="mb-16 border-b pb-10 transition-colors border-white/10 v-prob-head" style={{ borderBottomColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
            <span className="font-bold tracking-widest text-sm uppercase text-red-600">
              DIAGNÓSTICO CRÍTICO
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black leading-none tracking-tighter uppercase mb-6 v-prob-title transition-colors">
            La <span className="text-red-600 drop-shadow-[0_0_25px_rgba(220,38,38,0.4)]">Pandemia</span> <br/> de los Sitios Basura.
          </h2>
          
          <p className="text-lg md:text-xl max-w-3xl leading-relaxed transition-colors v-prob-text-soft">
            El 90% de las webs corporativas terminan <strong className="v-prob-strong">abandonadas</strong>. En lugar de ser una inversión, se vuelven un gasto de tiempo y dinero que nadie en la empresa quiere mantener.
          </p>
        </div>

        {/* GRID LAYOUT: 2-2-1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* LAS 4 TARJETAS DE DOLOR */}
          {FAILURES.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              data-accent={item.accent}
              className={`group relative p-8 rounded-sm transition-all duration-300 v-prob-card hover:-translate-y-1`}
            >
              {/* Header Card */}
              <div className="flex justify-between items-start mb-6">
                {/* Icono dinámico */}
                <item.icon size={36} strokeWidth={1.5} className={`opacity-90 transition-colors v-accent-${item.accent}`} />
                <span className="font-mono text-xs px-2 py-1 tracking-widest transition-colors rounded-sm v-prob-id">
                  {item.id}
                </span>
              </div>
              
              <h3 className="text-2xl font-black mb-3 uppercase tracking-tight transition-colors v-prob-title">
                {item.title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed mb-8 min-h-[4rem] transition-colors v-prob-desc">
                {item.desc}
              </p>

              {/* Stat Box */}
              <div className={`inline-flex px-3 py-1 text-[10px] font-bold font-mono uppercase tracking-wider rounded-sm transition-colors v-prob-badge v-accent-${item.accent}`}>
                {item.stat}
              </div>
            </motion.div>
          ))}

          {/* TARJETA FINAL: OBSOLESCENCIA */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className={`md:col-span-2 relative group mt-4 flex flex-col justify-between overflow-hidden rounded-sm transition-all duration-300 p-8 md:p-12 v-final-card`}
          >
            {/* Scanline Animation (Oculta en Light Mode por CSS si se desea, o sutil) */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(220,38,38,0.05)_50%)] bg-[size:100%_4px] pointer-events-none opacity-50"></div>
            {/* Solo mostramos el barrido rojo en dark mode para no ensuciar el blanco */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-600/10 to-transparent h-[30%] w-full v-scan pointer-events-none hidden dark:block"></div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-4 text-red-600 font-mono text-xs font-bold tracking-widest uppercase">
                  <Activity size={16} /> ERROR DE SISTEMA
                </div>

                <h3 className="text-4xl md:text-5xl font-black uppercase mb-4 leading-none tracking-tight transition-colors v-prob-title">
                  OBSOLETA <span className="text-red-600">&</span> <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">ABANDONADA</span>
                </h3>
                
                <p className="text-lg leading-relaxed transition-colors v-prob-text-soft">
                  Como es difícil de actualizar y da miedo tocarla porque "se rompe", queda ahí, <strong className="v-prob-strong">botada</strong>. Pasa el tiempo, la información envejece y tu marca termina dando mala imagen frente a la competencia que sí avanza.
                </p>
              </div>

              {/* Badge Crítico */}
              <div className="shrink-0">
                 <div className="flex items-center gap-3 px-5 py-3 border font-bold uppercase tracking-wider text-xs shadow-sm transition-all rounded-sm
                   bg-white border-red-600 text-red-600 hover:bg-red-600 hover:text-white
                 ">
                  <FileWarning size={18} />
                  SIN MANTENIMIENTO
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};