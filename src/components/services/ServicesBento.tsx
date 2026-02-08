import React from "react";
import { motion } from "framer-motion";
import { 
  Globe, 
  Cpu, 
  Bot, 
  FolderOpen, 
  ArrowUpRight, 
  Lock,
  Sparkles
} from "lucide-react";

const items = [
  {
    id: "web",
    title: "Desarrollo Web",
    subtitle: "Workover & Ingeniería",
    desc: "Rescate de sitios, optimización extrema y experiencias digitales de alto impacto.",
    icon: Globe,
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
    href: "/web", // Enlace a web.astro
    status: "active",
    gradient: "from-emerald-500/20 via-teal-500/5 to-transparent",
    borderGlow: "group-hover:border-emerald-500/50",
    textGlow: "group-hover:text-emerald-400",
    bgBase: "bg-[#050a05]"
  },
  {
    id: "ia",
    title: "Inteligencia Artificial",
    subtitle: "Automatización & Agentes",
    desc: "El cerebro digital de tu empresa. Chatbots RAG, automatización de procesos y futuros agentes autónomos.",
    icon: Bot,
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-2",
    href: "#",
    status: "soon", // Próximamente
    gradient: "from-violet-600/20 via-purple-500/5 to-transparent",
    borderGlow: "group-hover:border-violet-500/50",
    textGlow: "group-hover:text-violet-400",
    bgBase: "bg-[#0a0510]"
  },
  {
    id: "software",
    title: "Software a Medida",
    subtitle: "SaaS & Arquitectura",
    desc: "Sistemas complejos para problemas complejos. Ingeniería de software pura.",
    icon: Cpu,
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
    href: "#",
    status: "soon", // Próximamente
    gradient: "from-rose-600/20 via-red-500/5 to-transparent",
    borderGlow: "group-hover:border-rose-500/50",
    textGlow: "group-hover:text-rose-400",
    bgBase: "bg-[#0f0505]"
  },
  {
    id: "portafolio",
    title: "Portafolio",
    subtitle: "Casos de Éxito",
    desc: "Resultados reales. Explora cómo hemos transformado otras empresas con nuestra tecnología.",
    icon: FolderOpen,
    colSpan: "md:col-span-3",
    rowSpan: "md:row-span-1",
    href: "/portafolio", // Enlace a portafolio.astro
    status: "active",
    gradient: "from-white/10 via-gray-500/5 to-transparent",
    borderGlow: "group-hover:border-white/50",
    textGlow: "group-hover:text-white",
    bgBase: "bg-[#0a0a0a]"
  }
];

export const ServicesBento = () => {
  return (
    <div className="w-full h-full min-h-[85vh] grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-6 auto-rows-[minmax(250px,1fr)]">
      {items.map((item, i) => (
        <BentoCard key={item.id} item={item} index={i} />
      ))}
    </div>
  );
};

const BentoCard = ({ item, index }: { item: any; index: number }) => {
  const isLocked = item.status === "soon";

  const Content = () => (
    <>
      {/* Background Gradient Animation */}
      <div 
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${item.gradient}`} 
      />
      
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-10">
        
        {/* Header: Icon & Status */}
        <div className="flex justify-between items-start">
          <div className={`p-3 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm transition-colors duration-300 ${isLocked ? 'grayscale opacity-50' : 'group-hover:bg-white/10'}`}>
            <item.icon size={32} className={isLocked ? "text-gray-500" : "text-white"} />
          </div>
          
          {isLocked ? (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-gray-500">
              <Lock size={12} /> Próximamente
            </div>
          ) : (
            <div className={`p-2 rounded-full border border-white/5 text-gray-500 transition-all duration-300 group-hover:text-white group-hover:rotate-45 group-hover:bg-white/10`}>
              <ArrowUpRight size={24} />
            </div>
          )}
        </div>

        {/* Text Content */}
        <div>
          <h3 className={`text-sm font-mono font-bold uppercase tracking-widest mb-2 text-gray-500 transition-colors ${item.textGlow}`}>
            {item.subtitle}
          </h3>
          <h2 className={`text-3xl md:text-5xl font-black uppercase mb-4 text-white leading-[0.9] tracking-tight transition-transform duration-500 ${isLocked ? '' : 'group-hover:-translate-y-1'}`}>
            {item.title}
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl">
            {item.desc}
          </p>
        </div>
      </div>
    </>
  );

  // Wrapper Logic (Link vs Div)
  const containerClasses = `
    group relative overflow-hidden rounded-[2rem] border border-white/5 
    transition-all duration-500 ${item.colSpan} ${item.rowSpan} ${item.bgBase}
    ${isLocked ? 'cursor-not-allowed opacity-80' : 'hover:border-white/20 hover:shadow-2xl cursor-pointer'}
    ${item.borderGlow}
  `;

  if (isLocked) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={containerClasses}
      >
        <Content />
      </motion.div>
    );
  }

  return (
    <motion.a
      href={item.href}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={containerClasses}
    >
      <Content />
    </motion.a>
  );
};