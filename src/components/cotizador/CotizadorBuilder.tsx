import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, X, AlertCircle, Info, 
  Zap, ShoppingCart, Calendar, MessageSquare, 
  BarChart3, Shield, Package, Layout, Trash2
} from "lucide-react";

// --- CONFIGURACIÓN DE PRECIOS (CLP) ---
const BASE_PRICE = 140000; // Base sólida y atractiva

// Helper para formatear dinero chileno ($ 140.000)
const formatCLP = (amount: number) => {
  return new Intl.NumberFormat('es-CL', { 
    style: 'currency', 
    currency: 'CLP',
    minimumFractionDigits: 0 
  }).format(amount);
};

// Base de Datos de Módulos (Precios Psicológicos)
const MODULES = [
  {
    id: "services",
    category: "Presencia & Marca",
    items: [
      { 
        id: "servicios", name: "Servicios", price: 20000, icon: Layout, 
        desc: "Muestra lo que haces.", 
        details: "Estructura optimizada para presentar tu oferta. Incluye iconos, descripciones cortas y llamadas a la acción claras." 
      },
      { 
        id: "portfolio", name: "Portafolio", price: 35000, icon: Package, 
        desc: "Galería de proyectos.", 
        details: "Grilla autoadministrable para subir fotos de tus trabajos. Incluye filtros por categoría y modal de vista previa." 
      },
      { 
        id: "faq", name: "FAQ", price: 10000, icon: Info, 
        desc: "Preguntas frecuentes.", 
        details: "Sección desplegable (acordeón) para responder dudas comunes y reducir el soporte al cliente." 
      },
      { 
        id: "testimonios", name: "Testimonios", price: 15000, icon: MessageSquare, 
        desc: "Prueba social.", 
        details: "Carrusel o grilla con opiniones de clientes, fotos y estrellas para generar confianza inmediata." 
      }
    ]
  },
  {
    id: "conversion",
    category: "Captación de Clientes",
    items: [
      { 
        id: "form_pro", name: "Formulario Pro", price: 25000, icon: Zap, 
        desc: "Validaciones y lógica.", 
        details: "Formulario avanzado con lógica condicional, protección anti-spam y redirección a página de gracias." 
      },
      { 
        id: "reservas", name: "Agenda", price: 75000, icon: Calendar, 
        desc: "Sistema de reservas.", 
        details: "Integración completa con Calendly o Google Calendar. Permite que tus clientes elijan hora y paguen (opcional)." 
      },
      { 
        id: "whatsapp_shop", name: "Catálogo Chat", price: 55000, icon: MessageSquare, 
        desc: "Pedidos a WhatsApp.", 
        details: "Tus productos en una vitrina. El cliente agrega al carrito y el pedido te llega como mensaje de texto ordenado a WhatsApp." 
      }
    ]
  },
  {
    id: "ecommerce",
    category: "Ventas (Pagos Reales)",
    items: [
      { 
        id: "checkout", name: "Pasarela Pagos", price: 100000, icon: ShoppingCart, 
        desc: "Cobra con tarjetas.", 
        details: "Integración de Webpay, MercadoPago o Stripe. Carrito de compras real y confirmación de venta automática." 
      },
      { 
        id: "inventario", name: "Control Stock", price: 45000, icon: Package, 
        desc: "Gestión de inventario.", requires: "checkout",
        details: "Control automático de unidades. Si se vende, se descuenta. Avisos de bajo stock." 
      },
      { 
        id: "cupones", name: "Cupones", price: 15000, icon: Zap, 
        desc: "Códigos de descuento.", requires: "checkout",
        details: "Crea códigos promocionales por porcentaje o monto fijo para campañas de marketing." 
      }
    ]
  },
  {
    id: "data",
    category: "Datos & Gestión",
    items: [
      { 
        id: "analytics", name: "Analítica Pro", price: 35000, icon: BarChart3, 
        desc: "Mide conversiones.", 
        details: "Configuración de Google Analytics 4 + Eventos de conversión (clic en botón, formulario enviado)." 
      },
      { 
        id: "admin_pro", name: "Panel Admin", price: 70000, icon: Shield, 
        desc: "Gestión total.", 
        details: "Panel privado para editar textos, subir fotos, ver pedidos y gestionar tu web sin saber programar." 
      }
    ]
  }
];

// Presets (Paquetes con Descuento)
const PRESETS = [
  {
    id: "landing",
    name: "Landing",
    icon: Zap,
    modules: ["servicios", "faq", "form_pro", "analytics"],
    discount: 15000, // Descuento en pesos
    details: "El kit esencial para empezar a captar clientes. Ideal para servicios profesionales o lanzamientos."
  },
  {
    id: "agenda",
    name: "Agenda",
    icon: Calendar,
    modules: ["servicios", "faq", "reservas", "analytics"],
    discount: 25000,
    details: "Automatiza tus citas. Perfecto para consultorios, barberías, asesorías o clases."
  },
  {
    id: "catalogo",
    name: "Catálogo",
    icon: MessageSquare,
    modules: ["servicios", "portfolio", "whatsapp_shop", "analytics"],
    discount: 35000,
    details: "Vende productos sin complicaciones técnicas. Todo se cierra por chat. Ideal para Instagram shops."
  },
  {
    id: "ecommerce",
    name: "Tienda",
    icon: ShoppingCart,
    modules: ["checkout", "inventario", "admin_pro", "analytics"],
    discount: 50000,
    details: "E-commerce profesional. Control total de stock, ventas y pagos automáticos."
  }
];

export const CotizadorBuilder = () => {
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [infoModal, setInfoModal] = useState<{ title: string, desc: string } | null>(null);

  // Cálculos
  const modulesTotal = MODULES.flatMap(c => c.items)
    .filter(m => selectedModules.includes(m.id))
    .reduce((sum, m) => sum + m.price, 0);

  const discount = activePreset ? PRESETS.find(p => p.id === activePreset)?.discount || 0 : 0;
  const finalPrice = Math.max(0, BASE_PRICE + modulesTotal - discount);

  // Lógica de Selección
  const toggleModule = (id: string, requires?: string) => {
    // Validar requerimiento al agregar
    if (!selectedModules.includes(id) && requires && !selectedModules.includes(requires)) {
      alert(`Para agregar "${MODULES.flatMap(c=>c.items).find(i=>i.id===id)?.name}", primero necesitas activar: "${MODULES.flatMap(c=>c.items).find(i=>i.id===requires)?.name}"`);
      return;
    }
    
    // Al eliminar, quitar dependientes
    if (selectedModules.includes(id)) {
      const dependents = MODULES.flatMap(c => c.items).filter(i => i.requires === id).map(i => i.id);
      setSelectedModules(prev => prev.filter(m => m !== id && !dependents.includes(m)));
      setActivePreset(null);
    } else {
      setSelectedModules(prev => [...prev, id]);
      setActivePreset(null);
    }
  };

  const applyPreset = (presetId: string) => {
    const preset = PRESETS.find(p => p.id === presetId);
    if (preset) {
      setSelectedModules(preset.modules);
      setActivePreset(presetId);
    }
  };

  const openInfo = (e: React.MouseEvent, title: string, desc: string) => {
    e.stopPropagation();
    setInfoModal({ title, desc });
  };

  const handleWhatsApp = () => {
    const moduleNames = MODULES.flatMap(c => c.items)
      .filter(m => selectedModules.includes(m.id))
      .map(m => `- ${m.name}`);
    
    const msg = `Hola Vantta! Armé mi build:\n\n*Base Web:* ${formatCLP(BASE_PRICE)}\n*Módulos:*\n${moduleNames.join("\n")}\n\n*Total Aprox:* ${formatCLP(finalPrice)}${activePreset ? ` (Pack ${PRESETS.find(p=>p.id===activePreset)?.name} aplicado)` : ''}`;
    window.open(`https://wa.me/56937766334?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-12 flex flex-col lg:flex-row gap-8 relative">
      
      {/* --- COLUMNA IZQUIERDA: CONTROLES --- */}
      <div className="flex-1 space-y-8">
        
        {/* Presets */}
        <div>
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Packs Rápidos (Ahorras $)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {PRESETS.map(preset => (
              <div key={preset.id} className="relative group">
                <button
                  onClick={() => applyPreset(preset.id)}
                  className={`w-full p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                    activePreset === preset.id 
                      ? "bg-white text-black border-white" 
                      : "bg-white/5 text-gray-400 border-white/10 hover:border-white/30"
                  }`}
                >
                  <preset.icon size={20} />
                  <span className="text-sm font-bold">{preset.name}</span>
                  <span className="text-[10px] px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">
                    Ahorra {formatCLP(preset.discount)}
                  </span>
                </button>
                <button 
                  onClick={(e) => openInfo(e, `Pack ${preset.name}`, preset.details)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-purple-400 p-1"
                >
                  <Info size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Lista de Módulos */}
        <div className="space-y-6">
          {MODULES.map(cat => (
            <div key={cat.id} className="bg-[#0a0a0a] rounded-2xl border border-white/5 p-5">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                {cat.category}
              </h4>
              <div className="space-y-3">
                {cat.items.map(item => {
                  const isSelected = selectedModules.includes(item.id);
                  const isLocked = item.requires && !selectedModules.includes(item.requires);

                  return (
                    <div 
                      key={item.id} 
                      onClick={() => !isLocked && toggleModule(item.id, item.requires)}
                      className={`
                        relative flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer group
                        ${isLocked ? "opacity-40 cursor-not-allowed border-transparent bg-transparent" : 
                          isSelected ? "bg-purple-900/20 border-purple-500/50" : "bg-white/5 border-white/5 hover:border-white/20"}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isSelected ? "bg-purple-500 text-white" : "bg-white/10 text-gray-400"}`}>
                          <item.icon size={16} />
                        </div>
                        <div>
                          <div className={`text-sm font-bold flex items-center gap-2 ${isSelected ? "text-white" : "text-gray-300"}`}>
                            {item.name}
                            <button 
                              onClick={(e) => openInfo(e, item.name, item.details)}
                              className="text-gray-500 hover:text-purple-400 transition-colors"
                            >
                              <Info size={14} />
                            </button>
                          </div>
                          <div className="text-xs text-gray-500">{item.desc}</div>
                          {isLocked && (
                            <div className="text-[10px] text-red-400 flex items-center gap-1 mt-1">
                              <AlertCircle size={10} /> Requiere {MODULES.flatMap(c=>c.items).find(i=>i.id===item.requires)?.name}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-sm font-mono text-gray-400 whitespace-nowrap">
                        {isSelected ? <Check size={18} className="text-purple-400" /> : `+ ${formatCLP(item.price)}`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- COLUMNA DERECHA: VISUALIZADOR --- */}
      <div className="lg:w-[420px] relative">
        <div className="sticky top-24 bg-[#050505] border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden">
          
          <h3 className="text-xl font-black text-white uppercase mb-6 text-center">Tu Build</h3>
          
          {/* SVG INTERACTIVO */}
          <div className="relative w-full aspect-[4/5] bg-[#0a0a0a] rounded-2xl border border-white/5 mb-6 p-4 flex flex-col gap-2 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none"></div>

            {/* BASE */}
            <div className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 flex flex-col items-center justify-center gap-1 z-10 shadow-lg cursor-not-allowed opacity-80">
              <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Web Basic (Core)</span>
              <div className="flex gap-2 mt-1">
                 <div className="w-8 h-1 bg-green-500/50 rounded-full"></div>
                 <div className="w-12 h-1 bg-gray-600 rounded-full"></div>
              </div>
            </div>

            {/* MÓDULOS ACTIVOS (CLICKEABLES) */}
            <div className="flex-1 grid grid-cols-2 gap-2 content-start z-10 relative">
              <AnimatePresence>
                {selectedModules.map(modId => {
                  const mod = MODULES.flatMap(c => c.items).find(i => i.id === modId);
                  if (!mod) return null;
                  return (
                    <motion.div
                      key={modId}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => toggleModule(modId)}
                      className="group relative aspect-video rounded-lg bg-purple-900/20 border border-purple-500/30 flex flex-col items-center justify-center text-purple-300 gap-1 p-2 cursor-pointer hover:bg-red-900/20 hover:border-red-500/50 transition-colors"
                    >
                      <mod.icon size={16} className="group-hover:hidden" />
                      <span className="text-[9px] font-bold uppercase text-center leading-tight group-hover:hidden">{mod.name}</span>
                      
                      {/* Estado Hover: Borrar */}
                      <Trash2 size={20} className="hidden group-hover:block text-red-400" />
                      <span className="hidden group-hover:block text-[9px] font-bold text-red-400 uppercase">Quitar</span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              
              {/* Espacios Vacíos */}
              {Array.from({ length: Math.max(0, 6 - selectedModules.length) }).map((_, i) => (
                <div key={i} className="aspect-video rounded-lg border border-white/5 bg-white/[0.02]"></div>
              ))}
            </div>
            
            {/* Footer SVG */}
            <div className="mt-auto pt-2 border-t border-white/5 flex justify-between px-1">
               <div className="flex gap-1 items-center">
                 <div className={`w-2 h-2 rounded-full ${selectedModules.includes('analytics') ? 'bg-green-500 animate-pulse' : 'bg-gray-700'}`}></div>
                 <span className="text-[9px] text-gray-500 uppercase">Tracking</span>
               </div>
               <div className="flex gap-1 items-center">
                 <div className={`w-2 h-2 rounded-full ${selectedModules.includes('admin_pro') ? 'bg-blue-500' : 'bg-gray-700'}`}></div>
                 <span className="text-[9px] text-gray-500 uppercase">Panel</span>
               </div>
            </div>
          </div>

          {/* RESUMEN PRECIO */}
          <div className="space-y-3 border-t border-white/10 pt-4">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Base Web</span>
              <span>{formatCLP(BASE_PRICE)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Módulos ({selectedModules.length})</span>
              <span>+ {formatCLP(modulesTotal)}</span>
            </div>
            {activePreset && (
              <div className="flex justify-between text-sm text-green-400">
                <span>Descuento Pack</span>
                <span>- {formatCLP(discount)}</span>
              </div>
            )}
            
            <div className="flex justify-between items-end pt-2 border-t border-white/10">
              <span className="text-lg font-bold text-white">Total</span>
              <div className="text-right">
                <span className="block text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                    {formatCLP(finalPrice)}
                </span>
                <span className="text-[10px] text-gray-500 block">+ IVA</span>
              </div>
            </div>
          </div>

          <button 
            onClick={handleWhatsApp}
            className="w-full mt-6 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold uppercase tracking-wide transition-all shadow-lg hover:shadow-purple-900/50 flex items-center justify-center gap-2"
          >
            Confirmar Build <Check size={18} />
          </button>
        </div>
      </div>

      {/* --- MODAL INFO --- */}
      <AnimatePresence>
        {infoModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setInfoModal(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setInfoModal(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                <X size={20} />
              </button>
              <h3 className="text-xl font-bold text-white mb-2">{infoModal.title}</h3>
              <div className="h-1 w-10 bg-purple-500 mb-4 rounded-full"></div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">{infoModal.desc}</p>
              <button onClick={() => setInfoModal(null)} className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-bold">
                Entendido
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};