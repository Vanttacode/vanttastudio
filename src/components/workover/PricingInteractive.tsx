import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, Globe, AlertCircle, Repeat } from "lucide-react";

const pricing = [
  {
    id: "lite",
    title: "LITE",
    subtitle: "Plan Réplica",
    price: "Desde 7 UF",
    revisions: "1 Instancia de Revisión", // ✅ NUEVO CONCEPTO
    desc: "Clonamos tu web en código moderno. Te la mostramos lista, nos das tu feedback en una sola lista, ajustamos y publicamos.",
    features: [
      "Clonación visual exacta (Pixel Perfect)",
      "Carga instantánea (<1 segundo)",
      "SEO Técnico Base (Indexación)",
      "Formularios a WhatsApp",
      "Hosting Vercel incluido"
    ],
    cta: "Cotizar Réplica",
    popular: false
  },
  {
    id: "full",
    title: "FULL",
    subtitle: "Plan Migración",
    price: "Desde 14 UF",
    revisions: "3 Instancias de Revisión", // ✅ NUEVO CONCEPTO
    desc: "Migramos contenido y estructura. Tienes 3 rondas para pulir detalles de diseño, textos y fotos hasta que quede perfecta.",
    features: [
      "Todo lo de Lite +",
      "Migración de Contenido & CMS",
      "Blog / Noticias (Estructura + SEO)",
      "Redirecciones 301 (Protegemos tu SEO)",
      "Analytics & Pixel (Embudo básico)"
    ],
    cta: "Cotizar Migración",
    popular: true
  },
  {
    id: "commerce",
    title: "COMMERCE",
    subtitle: "Plan Rescate",
    price: "Desde 24 UF",
    revisions: "5 Instancias de Revisión", // ✅ NUEVO CONCEPTO
    desc: "Reconstruimos tu tienda. Incluye 5 rondas profundas para probar flujos de pago, correos y estados de pedido.",
    features: [
      "Todo lo de Full +",
      "Reparación Flujo Compra (Checkout)",
      "Pasarelas de Pago (End-to-End)",
      "Gestión de Pedidos & Estados",
      "Tracking E-commerce Avanzado"
    ],
    cta: "Cotizar Rescate",
    popular: false
  }
];

export const PricingInteractive = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [formData, setFormData] = useState({ name: "", website: "" });

  const handleOpen = (planTitle: string) => {
    setSelectedPlan(planTitle);
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hola Vantta! Quiero *transformar mi web actual* con el plan *WORKOVER ${selectedPlan}*. \n\n👤 Nombre: ${formData.name}\n🌐 Web a rescatar: ${formData.website}\n\nNecesito diagnóstico.`;
    const url = `https://wa.me/56937766334?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="pricing" className="py-24 px-6 relative border-t border-white/5 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black uppercase mb-4 text-white">Planes de Intervención</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Tomamos tu sitio actual y le cambiamos el motor. Pago único. Alcance cerrado por versiones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {pricing.map((plan) => (
            <motion.div 
              key={plan.id}
              whileHover={{ y: -5 }}
              className={`relative p-6 rounded-3xl border flex flex-col transition-colors ${
                plan.popular 
                  ? 'border-purple-500 bg-purple-900/10' 
                  : 'border-white/10 bg-[#0A0A0A] hover:border-white/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-purple-900/50">
                  Recomendado
                </div>
              )}

              <div className="mb-6 border-b border-white/5 pb-6">
                <div className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">{plan.subtitle}</div>
                <h3 className="text-2xl font-black text-white uppercase mb-2">{plan.title}</h3>
                <div className="text-3xl font-bold text-white mb-2">{plan.price}</div>
                
                {/* BADGE DE VERSIONES / REVISIONES */}
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400 bg-white/5 border border-white/10 py-1.5 px-3 rounded w-fit mb-4">
                   <Repeat size={12} className="text-purple-400"/> 
                   <span className="font-bold text-white">{plan.revisions}</span>
                </div>

                <p className="text-sm text-gray-400 mt-2 leading-relaxed min-h-[80px]">
                  {plan.desc}
                </p>
              </div>

              <div className="flex-1 mb-8">
                <ul className="space-y-3">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-xs text-gray-300">
                      <Check size={14} className="text-purple-400 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleOpen(plan.title)}
                className={`w-full py-3 rounded-xl font-bold text-sm text-center transition-all uppercase tracking-wide ${
                  plan.popular 
                    ? 'bg-white text-black hover:bg-gray-200' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50" />
            
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#09090b] border border-white/10 rounded-3xl p-8 z-50 shadow-2xl shadow-purple-900/20">
              
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white uppercase">Datos de tu Web</h3>
                  <p className="text-xs text-gray-500">Cotizando Plan {selectedPlan}</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white"><X size={24} /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Tu Nombre</label>
                  <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors" onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Link Web Actual (Obligatorio)</label>
                  <div className="relative">
                    <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input type="url" required placeholder="https://" className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors" onChange={(e) => setFormData({...formData, website: e.target.value})} />
                  </div>
                </div>

                <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl mt-4 flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-900/40 uppercase text-sm tracking-wide">
                  Diagnosticar en WhatsApp <ArrowRight size={16} />
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <div className="flex items-center justify-center gap-2 text-yellow-500 mb-2">
                   <AlertCircle size={14} />
                   <span className="text-[10px] font-bold uppercase tracking-widest">¿No tienes web?</span>
                </div>
                <a href="/cotizador" className="text-gray-400 hover:text-white text-xs underline decoration-white/30 hover:decoration-white transition-all">
                  Ir al Cotizador de Nuevos Proyectos
                </a>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};