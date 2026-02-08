import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Package, FileText, BarChart3, Scale, Terminal, Activity, Zap, Radio } from "lucide-react";

const systems = [
  {
    id: "hal",
    name: "HAL",
    role: "People Ops System",
    icon: Users,
    colorKey: "red",
    personality: "Imparcial y criterioso. No 'opina': mide. Protector del equipo.",
    capabilities: [
      "Asistencia y turnos: llegadas tarde, ausencias.",
      "Salud operativa: señales de sobrecarga.",
      "Onboarding: checklists y evaluaciones.",
      "Desempeño: métricas por rol normalizadas."
    ],
    logs: [
      "> ANALIZANDO TURNO NOCHE...",
      "> ALERTA: Ausentismo +18% (3 semanas).",
      "> ACCIÓN: Propuesta de rotación generada."
    ]
  },
  {
    id: "elbert",
    name: "ELBERT",
    role: "Inventory Ops System",
    icon: Package,
    colorKey: "yellow",
    personality: "Obsesivo del orden. Alergia al desperdicio. Pragmático.",
    capabilities: [
      "Stock inteligente: proyección de quiebres.",
      "Reposición sugerida por histórico.",
      "Merma y auditoría: anomalías de movimiento.",
      "Optimización: normaliza nombres y atributos."
    ],
    logs: [
      "> SCANNING SKU-884...",
      "> CRÍTICO: Cobertura bajo 5 días.",
      "> ACCIÓN: Orden de compra borrador creada."
    ]
  },
  {
    id: "cassie",
    name: "CASSIE",
    role: "Executive Admin",
    icon: FileText,
    colorKey: "pink",
    personality: "Resolutiva y diplomática. Contextual. Anti-fricción.",
    capabilities: [
      "Gestión de tareas: prioriza y da seguimiento.",
      "Agenda: prepara contexto antes de reuniones.",
      "Comunicaciones: borradores con tono consistente.",
      "Backoffice: cobros, confirmaciones y reclamos."
    ],
    logs: [
      "> INBOX: 14 correos sin leer.",
      "> CONTEXTO: Reunión cliente 15:00.",
      "> ACCIÓN: Resumen ejecutivo enviado a Slack."
    ]
  },
  {
    id: "arquimedes",
    name: "ARQUÍMEDES",
    role: "Finance Ops System",
    icon: BarChart3,
    colorKey: "green",
    personality: "Preciso y conservador. Didáctico. Tolerancia cero.",
    capabilities: [
      "Cierre asistido: conciliación ventas/pagos.",
      "CxC / CxP: vencimientos y riesgo.",
      "Control de márgenes y costos.",
      "Proyecciones: cashflow y alertas de caja."
    ],
    logs: [
      "> AUDITANDO CONCILIACIONES...",
      "> ERROR: 4 pagos sin factura asociada.",
      "> ACCIÓN: Reporte de inconsistencia generado."
    ]
  },
  {
    id: "ciceron",
    name: "CICERÓN",
    role: "Legal Ops System",
    icon: Scale,
    colorKey: "blue",
    personality: "Cauto, elegante y firme. Amante del registro.",
    capabilities: [
      "Plantillas: servicios, proveedores y NDAs.",
      "Revisión: inconsistencias y cláusulas faltantes.",
      "Gestión de incidentes y evidencias.",
      "Gobernanza documental y versiones."
    ],
    logs: [
      "> LEYENDO CONTRATO_PROVEEDOR_V2.PDF...",
      "> RIESGO: Cláusula de salida ambigua.",
      "> ACCIÓN: Sugerencia de redacción legal."
    ]
  },
  {
    id: "artur",
    name: "ARTUR",
    role: "IT Ops System (Prototipo)",
    icon: Terminal,
    colorKey: "orange",
    personality: "Preciso y paranoico. Seguridad primero. Silencioso.",
    capabilities: [
      "Monitoreo salud: CPU, RAM, errores.",
      "Mantenimiento automático y parches.",
      "Inventario TI y licencias.",
      "Escalamiento para soporte físico."
    ],
    logs: [
      "> MONITOREO SERVER_01...",
      "> ALERTA: Disco al 95%.",
      "> ACCIÓN: Limpieza temporales. Espacio libre: 12%."
    ]
  }
];

// DICCIONARIO DE TEMAS
// Ahora el 'bg' se usa con opacidad para el fondo del ojo
const themes: Record<string, any> = {
  red:    { text: "text-red-500", bg: "bg-red-500", border: "border-red-500", glow: "shadow-[0_0_15px_rgba(239,68,68,0.5)]" },
  yellow: { text: "text-yellow-500", bg: "bg-yellow-500", border: "border-yellow-500", glow: "shadow-[0_0_15px_rgba(234,179,8,0.5)]" },
  pink:   { text: "text-pink-500", bg: "bg-pink-500", border: "border-pink-500", glow: "shadow-[0_0_15px_rgba(236,72,153,0.5)]" },
  green:  { text: "text-emerald-500", bg: "bg-emerald-500", border: "border-emerald-500", glow: "shadow-[0_0_15px_rgba(16,185,129,0.5)]" },
  blue:   { text: "text-blue-500", bg: "bg-blue-600", border: "border-blue-500", glow: "shadow-[0_0_15px_rgba(37,99,235,0.5)]" },
  orange: { text: "text-orange-500", bg: "bg-orange-500", border: "border-orange-500", glow: "shadow-[0_0_15px_rgba(249,115,22,0.5)]" },
};

export const SystemsCatalog = () => {
  return (
    <section className="py-24 px-4 md:px-6 bg-[#030303] relative overflow-hidden">
      
      {/* Background Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER LIMPIO */}
        <div className="mb-20 pl-6 border-l-4 border-red-600">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-2 tracking-tighter">
            NUESTROS SISTEMAS
          </h2>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {systems.map((sys) => (
            <SystemCard key={sys.id} sys={sys} />
          ))}
        </div>

      </div>
    </section>
  );
};

const SystemCard = ({ sys }: { sys: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  const theme = themes[sys.colorKey];

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative bg-[#080808] rounded-3xl overflow-hidden border transition-all duration-500 ${isHovered ? `border-white/20` : 'border-white/5'}`}
    >
      
      {/* SCANNER EFFECT LINE */}
      <motion.div 
        initial={{ top: "-10%" }}
        animate={isHovered ? { top: "120%" } : { top: "-10%" }}
        transition={{ duration: 2, repeat: isHovered ? Infinity : 0, ease: "linear" }}
        className={`absolute left-0 w-full h-[2px] z-20 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 pointer-events-none`}
      />

      <div className="relative z-10 p-8 md:p-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
          
          <div className="flex items-center gap-4">
            
            {/* EL OJO LED (Nuevo tamaño reducido y color lleno) */}
            <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
              
              {/* Anillo de pulso externo (Solo Hover - Color del sistema) */}
              {isHovered && (
                 <motion.div 
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className={`absolute inset-0 rounded-full border ${theme.border}`}
                 />
              )}
              
              {/* El OJO en sí: Fondo tintado, Borde sólido del color, Brillo interno */}
              <div className={`relative w-full h-full rounded-full border-2 ${theme.border} ${theme.bg} bg-opacity-10 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px] ${theme.glow}`}>
                 
                 {/* Núcleo Central Sólido */}
                 <div className={`w-3 h-3 rounded-full ${theme.bg} shadow-[0_0_10px] ${theme.text}`}></div>
              
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-none mb-1">
                {sys.name}
              </h3>
              <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${theme.text}`}>
                <Activity size={12} /> {sys.role}
              </div>
            </div>
          </div>

          {/* Icon Badge */}
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center border bg-white/5 border-white/5 ${theme.text} transition-colors duration-300 group-hover:bg-white/10 group-hover:border-white/10`}>
            <sys.icon size={20} />
          </div>

        </div>

        {/* --- PERSONALITY --- */}
        <div className="mb-8 pl-4 border-l-2 border-white/10 group-hover:border-white/30 transition-colors">
          <p className="text-gray-400 text-sm italic leading-relaxed">
            "{sys.personality}"
          </p>
        </div>

        {/* --- TECHNICAL GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
          
          {/* CAPABILITIES */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-gray-500">
               <Zap size={12} />
               <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Capacidades</span>
            </div>
            <ul className="space-y-3">
              {sys.capabilities.map((cap: string, i: number) => (
                <li key={i} className="text-xs text-gray-300 flex items-start gap-3 leading-snug">
                  <span className={`mt-1 w-1.5 h-1.5 rounded-sm shrink-0 ${theme.bg} opacity-70`}></span>
                  {cap}
                </li>
              ))}
            </ul>
          </div>

          {/* LIVE LOGS (Console Style) */}
          <div className="relative">
             <div className="flex items-center gap-2 mb-4 text-gray-500">
               <Radio size={12} className={isHovered ? theme.text : ""} />
               <span className="text-[10px] uppercase font-bold tracking-[0.2em]">System Logs</span>
            </div>
            
            <div className="p-4 rounded-lg bg-black border border-white/10 font-mono text-[10px] text-gray-400 leading-relaxed shadow-inner min-h-[100px] flex flex-col justify-end">
               {sys.logs.map((log: string, i: number) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0.3, x: -5 }}
                   animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0.3, x: 0 }}
                   transition={{ delay: i * 0.2 }}
                   className="mb-1 last:mb-0"
                 >
                   <span className={theme.text}>{log.split(' ')[0]}</span> {log.split(' ').slice(1).join(' ')}
                 </motion.div>
               ))}
               
               {/* Blinking Cursor */}
               {isHovered && (
                 <motion.div 
                   animate={{ opacity: [0, 1, 0] }} 
                   transition={{ duration: 0.8, repeat: Infinity }}
                   className={`h-2 w-1.5 ${theme.bg} mt-1`} 
                 />
               )}
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
};