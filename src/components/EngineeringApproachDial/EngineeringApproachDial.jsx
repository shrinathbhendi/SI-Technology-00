import { motion } from "framer-motion";
import {
  CheckCircle2,
  Sparkles,
  Search,
  SlidersHorizontal,
  PenTool,
  Truck,
  Headphones,
  ArrowRight
} from "lucide-react";

export default function EngineeringApproachDial() {
  const steps = [
    {
      numStr: "01",
      letter: "OPTION A",
      accentColor: "text-rose-500",
      badgeBg: "bg-rose-500",
      ringBorder: "border-rose-500",
      tag: "TECHNICAL AUDIT",
      title: "Understand Application & Requirements",
      icon: Search,
      img: "/images/strength_01.png",
      desc: "We conduct an in-depth technical analysis of the customer's application, load requirements, space constraints, and operating conditions before proposing structural designs.",
      highlights: [
        "Comprehensive structural & load audit",
        "Ergonomic workflow & spatial assessment",
        "Technical constraint analysis"
      ]
    },
    {
      numStr: "02",
      letter: "OPTION B",
      accentColor: "text-amber-500",
      badgeBg: "bg-amber-500",
      ringBorder: "border-amber-500",
      tag: "PRODUCT SELECTION",
      title: "Recommend Optimal Profile & Systems",
      icon: SlidersHorizontal,
      img: "/images/profile_app/pa_004.jpg",
      desc: "We identify the exact aluminium profile series, pipe & joint systems, fasteners, and accessories that best balance structural strength, aesthetics, and project budget.",
      highlights: [
        "Optimal profile series mapping (20, 30, 40, 45)",
        "Cost & weight structural optimization",
        "Modular scalability & expansion planning"
      ]
    },
    {
      numStr: "03",
      letter: "OPTION C",
      accentColor: "text-cyan-500",
      badgeBg: "bg-cyan-500",
      ringBorder: "border-cyan-500",
      tag: "3D CAD DRAFTING",
      title: "Custom CAD Engineering & Blueprints",
      icon: PenTool,
      img: "/images/strength_02.png",
      desc: "Our engineering team drafts precision 3D CAD models and structural assembly blueprints tailored strictly to your manufacturing floor dimensions.",
      highlights: [
        "3D assembly model & drawing creation",
        "Custom enclosure & workstation layout",
        "Detailed Bill of Materials (BOM) breakdown"
      ]
    },
    {
      numStr: "04",
      letter: "OPTION D",
      accentColor: "text-emerald-500",
      badgeBg: "bg-emerald-500",
      ringBorder: "border-emerald-500",
      tag: "QUALITY EXECUTION",
      title: "Precision Supply & Structural Build",
      icon: Truck,
      img: "/images/workstations/workstations_005.jpg",
      desc: "We pre-cut, tap, and flatpack or fully assemble your custom structures with strict quality control checks before safe and timely dispatch.",
      highlights: [
        "Precision CNC profile cutting & tapping",
        "Multi-stage quality & surface inspection",
        "Flatpack or pre-assembled delivery"
      ]
    },
    {
      numStr: "05",
      letter: "OPTION E",
      accentColor: "text-blue-600",
      badgeBg: "bg-blue-600",
      ringBorder: "border-blue-600",
      tag: "TURNKEY SUPPORT",
      title: "Turnkey Installation & Lifetime Support",
      icon: Headphones,
      img: "/images/about_strength_04.jpg",
      desc: "We provide post-delivery installation assistance, rapid spare component supply, and continuous support for future shopfloor re-configurations.",
      highlights: [
        "On-site installation assistance",
        "Immediate spare parts & accessories",
        "Future expansion & modular upgrades"
      ]
    }
  ];

  return (
    <section className="w-full relative py-16 sm:py-24 bg-slate-50 text-slate-900 overflow-hidden border-y border-slate-200/80">
      {/* Ambient Subtle Grid & Decorative Lighting */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-sky-200/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-blue-200/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-3">
          <span className="inline-flex items-center gap-2 bg-sky-100 border border-sky-300/80 rounded-full px-4 py-1.5 text-xs text-sky-800 font-mono font-bold uppercase tracking-wider shadow-sm">
            <Sparkles size={14} className="text-sky-600 animate-pulse" />
            HOW WE WORK
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 tracking-tight leading-[1.15]">
            Our Engineering Approach
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-semibold max-w-2xl mx-auto leading-relaxed">
            A continuous 5-step engineering process designed for precision industrial manufacturing.
          </p>
        </div>

        {/* ─── S-CURVE WINDING PROCESS FLOW ─── */}
        <div className="relative space-y-16 sm:space-y-24">
          
          {steps.map((step, idx) => {
            const isEven = idx % 2 === 0; // even: photo left, text right. odd: text left, photo right

            return (
              <motion.div
                key={step.numStr}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
              >
                {/* Connecting S-Curve Ribbon Track Line (between rows) */}
                {idx < steps.length - 1 && (
                  <div
                    className={`hidden lg:block absolute top-1/2 ${
                      isEven ? "right-1/4" : "left-1/4"
                    } w-1/2 h-24 border-t-4 border-sky-400/80 pointer-events-none ${
                      isEven
                        ? "border-r-4 rounded-tr-[80px]"
                        : "border-l-4 rounded-tl-[80px]"
                    } translate-y-16 opacity-70`}
                  />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
                  
                  {/* ROUND PHOTO SHAPE CONTAINER (LEFT OR RIGHT DEPENDING ON ROW) */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -70 : 70 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    className={`lg:col-span-5 flex justify-center ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="relative group">
                      {/* Outer Curved Ribbon Arc wrapping around the round shape */}
                      <div
                        className={`absolute -inset-4 sm:-inset-5 rounded-full border-[8px] border-sky-400 shadow-xl opacity-90 transition-transform duration-700 group-hover:rotate-45 ${
                          isEven
                            ? "border-r-transparent border-b-transparent border-t-sky-400 border-l-sky-400"
                            : "border-l-transparent border-t-transparent border-r-sky-400 border-b-sky-400"
                        }`}
                      />
                      
                      {/* Inner 3D Elevated White Disc */}
                      <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full bg-white p-3 shadow-2xl border-4 border-white flex items-center justify-center shrink-0">
                        
                        {/* Round Photo Inside */}
                        <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-slate-100 shadow-inner bg-slate-900">
                          <img
                            src={step.img}
                            alt={step.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                        </div>

                        {/* Floating Step Number Badge */}
                        <div
                          className={`absolute -top-3 left-1/2 -translate-x-1/2 ${step.badgeBg} text-white font-mono font-black text-xs px-4 py-1.5 rounded-full shadow-lg border-2 border-white tracking-widest uppercase flex items-center gap-1.5`}
                        >
                          <step.icon size={13} />
                          <span>STEP {step.numStr}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* TEXT INFO CONTAINER */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 70 : -70 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    className={`lg:col-span-7 space-y-4 text-left ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    {/* Header Tag / Option Label */}
                    <div className="flex items-center gap-3">
                      <span className={`text-xl sm:text-2xl font-mono font-black uppercase tracking-wider ${step.accentColor}`}>
                        STEP {step.numStr}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 bg-slate-200/80 px-3 py-1 rounded-full border border-slate-300/60">
                        {step.tag}
                      </span>
                    </div>

                    {/* Main Title */}
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-slate-900 tracking-tight leading-snug">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-semibold max-w-xl">
                      {step.desc}
                    </p>

                    {/* Key Deliverables Bullet Points */}
                    <div className="pt-3 space-y-2 border-t border-slate-200/80">
                      <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        KEY DELIVERABLES:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {step.highlights.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                            <CheckCircle2 size={16} className={step.accentColor} />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                </div>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
