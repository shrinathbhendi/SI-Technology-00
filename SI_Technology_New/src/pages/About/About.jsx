import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Compass, Heart, Shield, Clock, MessageSquare, ArrowRight, CheckCircle, CheckCircle2, Briefcase, Target, Sparkles, Layers, Cog, TrendingUp, ShieldCheck, UserCheck, Calendar, Handshake, User, Building2, ChevronLeft, ChevronRight } from "lucide-react";
import { SITE_CONFIG, getWhatsAppUrl } from "../../constants/siteConfig";

export default function About() {
  const [activeStrength, setActiveStrength] = useState(0);
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [isProcessAutoPlaying, setIsProcessAutoPlaying] = useState(true);
  const [activePhilosophy, setActivePhilosophy] = useState(0);
  const [isPhilosophyAutoPlaying, setIsPhilosophyAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isPhilosophyAutoPlaying) return;
    const interval = setInterval(() => {
      setActivePhilosophy((prev) => (prev + 1) % 6);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPhilosophyAutoPlaying]);

  const processSteps = [
    {
      num: "01",
      title: "Understand",
      subtitle: "Technical Audit & Spatial Assessment",
      desc: "We conduct an in-depth technical analysis of the customer's application, load requirements, space constraints, and operating conditions before proposing structural designs.",
      img: "/images/strength_01.png",
      tag: "TECHNICAL AUDIT",
      badgeBg: "bg-blue-600",
      highlights: ["Comprehensive load & structural audit", "Spatial & ergonomic workflow assessment", "Technical constraint analysis"]
    },
    {
      num: "02",
      title: "Recommend",
      subtitle: "Product Selection & Optimization",
      desc: "We identify suitable products, materials, and engineering solutions tailored specifically to your load capacity and budget requirements.",
      img: "/images/profile_app/pa_004.jpg",
      tag: "PRODUCT SELECTION",
      badgeBg: "bg-sky-600",
      highlights: ["Optimal profile series selection (20, 30, 40, 45)", "Cost & weight structural optimization", "Modular expansion planning"]
    },
    {
      num: "03",
      title: "Design",
      subtitle: "3D CAD Drafting & Structural Blueprints",
      desc: "Our engineering team drafts precision 3D CAD models and structural assembly blueprints tailored strictly to your manufacturing floor dimensions.",
      img: "/images/strength_02.png",
      tag: "CAD DRAFTING",
      badgeBg: "bg-teal-600",
      highlights: ["3D assembly model creation", "Custom enclosure & workstation layout", "Detailed Bill of Materials (BOM)"]
    },
    {
      num: "04",
      title: "Supply & Execute",
      subtitle: "Precision Build & Quality Delivery",
      desc: "We coordinate required products, pre-cut, tap, and assemble customized solutions with a strict focus on quality and timely delivery.",
      img: "/images/workstations/workstations_005.jpg",
      tag: "QUALITY EXECUTION",
      badgeBg: "bg-emerald-600",
      highlights: ["Precision CNC profile cutting & tapping", "Multi-stage surface inspection", "Flatpack or pre-assembled dispatch"]
    },
    {
      num: "05",
      title: "Support",
      subtitle: "Turnkey Installation & Long-term Support",
      desc: "We maintain clear communication throughout the project, providing on-site installation support and future shopfloor expansion assistance.",
      img: "/images/step05_turnkey_support.png",
      tag: "TURNKEY SUPPORT",
      badgeBg: "bg-indigo-600",
      highlights: ["On-site installation support", "Immediate spare parts & accessories", "Future expansion & modular upgrades"]
    }
  ];

  // Auto-move process slider every 3.5 seconds
  useEffect(() => {
    if (!isProcessAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveProcessStep((prev) => (prev + 1) % processSteps.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isProcessAutoPlaying, processSteps.length]);

  const coreStrengths = [
    {
      icon: Award,
      num: "01",
      title: "Premium Quality Profiles",
      tag: "Material Excellence",
      desc: "Aluminium Alloy 6063 T6 with silver or black matte anodizing exceeding 15 microns for maximum durability and surface quality.",
      specs: ["Alloy Grade: 6063 T6", "Anodizing: >15 microns", "Corrosion Resistant", "European ISO Standards Compliance"],
      img: "/images/strength_01.png",
      bg: "bg-[#0a1128]",
    },
    {
      icon: Cog,
      num: "02",
      title: "Custom Structural Engineering",
      tag: "CAD Precision",
      desc: "We design and pre-fabricate custom machine enclosures, robotic cells, conveyors, and workstations to match your exact CAD files.",
      specs: ["3D CAD Precision Drafting", "Custom Enclosure Layouts", "Conveyor & Robotic Frame Engineering", "Pre-Tapped flatpacks"],
      img: "/images/strength_02.png",
      bg: "bg-blue-900",
    },
    {
      icon: TrendingUp,
      num: "03",
      title: "Optimized Shopfloor Productivity",
      tag: "Lean Manufacturing",
      desc: "Modular pipe & joint systems, FIFO flow racks, and height-adjustable desks engineered to streamline every assembly line.",
      specs: ["Modular Pipe & Joint Systems", "FIFO Flow Racks", "Height-Adjustable Desks", "Lean Kaizen Optimization"],
      img: "/images/about_strength_03.png",
      bg: "bg-[#0f172a]",
    },
    {
      icon: ShieldCheck,
      num: "04",
      title: "Industry Trusted Partner",
      tag: "Since 2018",
      desc: "Serving manufacturing hubs across India since 2018 with reliable assembly guides and post-sales installation support.",
      specs: ["Established 2018 in Pune", "Serving 500+ Hubs Across India", "Comprehensive Assembly Guides", "Turnkey On-Site Support"],
      img: "/images/workflow_factory_bg.png",
      bg: "bg-[#030712]",
    },
  ];

  const coreValues = [
    {
      icon: Compass,
      title: "Technical Understanding",
      desc: "We focus on understanding the application and technical requirements before recommending a solution."
    },
    {
      icon: Layers,
      title: "Wide Product Range",
      desc: "Our extensive range of aluminium profiles, accessories, industrial products and material-handling solutions enables customers to source multiple requirements from one partner."
    },
    {
      icon: Cog,
      title: "Customized Solutions",
      desc: "Industrial requirements are rarely identical. We support customized solutions based on dimensions, application, workspace and operational requirements."
    },
    {
      icon: ShieldCheck,
      title: "Quality Focus",
      desc: "We focus on providing dependable industrial products suitable for demanding manufacturing environments."
    },
    {
      icon: MessageSquare,
      title: "Responsive Support",
      desc: "From enquiry and quotation to order coordination and delivery, we aim to provide clear and timely communication."
    },
    {
      icon: Heart,
      title: "Long-Term Partnership",
      desc: "We believe that business success comes from long-term relationships built on quality, transparency, reliability and consistent service."
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | SI Technology - Industrial Aluminium Profiles</title>
        <meta name="description" content="Discover the story, mission, core values, and timeline of SI Technology (Est. 2018). Learn how we became Pune's trusted industrial aluminium profile supplier." />
      </Helmet>

      <div className="w-full">
        {/* ─── 1. TOP HERO BANNER SECTION (COMPANY PROFILE) ─── */}
        <section className="relative overflow-hidden bg-black text-white pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 border-b border-neutral-800">
          {/* Custom Background Image - High Visibility & Brightness */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/company_profile_hero_bg.png"
              alt="SI Technology Modern Manufacturing Facility"
              className="w-full h-full object-cover object-center opacity-85 filter brightness-105 contrast-105 scale-105"
            />
            {/* Lighter Gradient Overlays so Photo Details and Lights Pop Clearly */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-black/80 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-transparent to-black/80 pointer-events-none" />
          </div>

          {/* Grid Lines Pattern & Glowing Ambient White Lighting */}
          <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none z-1" />
          <div className="absolute -top-24 left-1/4 w-96 h-96 bg-white/15 rounded-full blur-3xl pointer-events-none z-1" />
          <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-slate-300/10 rounded-full blur-3xl pointer-events-none z-1" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            {/* Top Breadcrumbs Row (Left-aligned) */}
            <div className="flex items-center justify-start mb-3">
              <nav className="flex items-center gap-2 text-xs sm:text-sm font-mono text-slate-200 tracking-wide drop-shadow-md">
                <Link to="/" className="hover:text-white transition-colors font-medium">Home</Link>
                <span className="text-slate-400">•</span>
                <span className="text-white font-bold tracking-wider">Company Profile</span>
              </nav>
            </div>

            {/* Main Centered Banner Content (Bright White & High Contrast) */}
            <div className="flex flex-col items-center justify-center text-center space-y-3 py-4">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,1)]">
                Company Profile
              </h1>

              <p className="text-white font-semibold text-xs sm:text-base max-w-2xl tracking-normal leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,1)]">
                Engineering Solutions &amp; Industrial Aluminium Profiles for Modern Manufacturing
              </p>

              {/* Glowing Bright White Accent Line */}
              <div className="w-28 sm:w-40 h-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-full mt-2 shadow-[0_0_15px_rgba(255,255,255,0.9)]" />
            </div>
          </div>
        </section>

        {/* ─── 2. OUR STORY SECTION (CLEAN WHITE BACKGROUND WITH LIGHT BLUE ACCENTS & 2-COLUMN DESIGN) ─── */}
        <section className="relative overflow-hidden bg-white text-slate-900 border-b border-slate-200/80 py-14 sm:py-20">
          {/* Subtle Light Blue Ambient Glow & Grid Pattern */}
          <div className="absolute inset-0 bg-grid-light opacity-5 pointer-events-none" />
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

              {/* LEFT COLUMN: Text Content & Stat Cards (7 cols) - Animates in from Left */}
              <motion.div
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="lg:col-span-7 space-y-6 flex flex-col items-start text-left"
              >
                {/* Subtitle Badge */}
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono font-bold tracking-widest text-blue-600 uppercase bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  OUR STORY &amp; VISION
                </div>

                {/* Main Headline */}
                <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 tracking-tight leading-[1.15] text-left">
                  Engineering Solutions <span className="text-blue-600">for Modern Manufacturing.</span>
                </h2>

                {/* Paragraph Text */}
                <p className="text-slate-600 text-xs sm:text-base leading-relaxed font-medium text-left">
                  Established in 2018, S I Technology is a Pune-based industrial solutions leader specializing in Aluminium Profile Systems, Ergonomic Workstations, Pipe &amp; Joint Systems, Material Handling Conveyors, and custom structural engineering for high-productivity manufacturing lines.
                </p>

                {/* 4-Stat Highlight Cards (2x2 Grid) */}
                <div className="grid grid-cols-2 gap-3.5 w-full pt-2">
                  {/* Card 1 */}
                  <div className="flex items-center gap-3 bg-white border border-slate-200/90 p-3.5 rounded-xl shadow-md hover:border-blue-300 hover:shadow-lg transition-all">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 shadow-sm">
                      <Calendar size={20} />
                    </div>
                    <div className="text-left">
                      <span className="block text-[10px] sm:text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Established</span>
                      <span className="block text-xs sm:text-sm font-bold text-slate-900 font-display">2018</span>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="flex items-center gap-3 bg-white border border-slate-200/90 p-3.5 rounded-xl shadow-md hover:border-blue-300 hover:shadow-lg transition-all">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 shadow-sm">
                      <Cog size={20} />
                    </div>
                    <div className="text-left">
                      <span className="block text-[10px] sm:text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Solutions</span>
                      <span className="block text-xs sm:text-sm font-bold text-slate-900 font-display">Application Driven</span>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="flex items-center gap-3 bg-white border border-slate-200/90 p-3.5 rounded-xl shadow-md hover:border-blue-300 hover:shadow-lg transition-all">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 shadow-sm">
                      <Handshake size={20} />
                    </div>
                    <div className="text-left">
                      <span className="block text-[10px] sm:text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Customers</span>
                      <span className="block text-xs sm:text-sm font-bold text-slate-900 font-display">Across India</span>
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div className="flex items-center gap-3 bg-white border border-slate-200/90 p-3.5 rounded-xl shadow-md hover:border-blue-300 hover:shadow-lg transition-all">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 shadow-sm">
                      <ShieldCheck size={20} />
                    </div>
                    <div className="text-left">
                      <span className="block text-[10px] sm:text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Our Promise</span>
                      <span className="block text-xs sm:text-sm font-bold text-slate-900 font-display">Quality &amp; Support</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT COLUMN: Dedicated Photo Container in Unique Shape with Dark Blue & Black Shadow (5 cols) - Animates in from Right */}
              <motion.div
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="lg:col-span-5 relative flex items-center justify-center pt-4 lg:pt-0"
              >
                {/* Decorative Soft Dark-Blue Ambient Glow Behind Image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/15 via-sky-800/10 to-transparent rounded-[3rem] blur-2xl transform scale-105 pointer-events-none" />

                {/* Unique Shape Photo Frame Container with Dark Blue & Black Shadow */}
                <div className="relative z-10 w-full max-w-md lg:max-w-none overflow-hidden rounded-[2.5rem] rounded-tr-[5rem] rounded-bl-[5rem] border-2 border-blue-200 bg-white shadow-[0_25px_50px_-10px_rgba(3,7,18,0.35),0_10px_30px_rgba(10,30,74,0.25)] group transition-all duration-500 hover:border-blue-400 hover:shadow-[0_30px_60px_-10px_rgba(3,7,18,0.45),0_15px_35px_rgba(10,30,74,0.35)]">
                  {/* High-Tech Workstation Photo */}
                  <img
                    src="/images/aboutphoto.png"
                    alt="SI Technology Industrial Workstation Assembly"
                    className="w-full h-[360px] sm:h-[440px] lg:h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-100 contrast-105"
                  />
                </div>
              </motion.div>

            </div>
          </div>
        </section>










        {/* ─── OUR ENGINEERING APPROACH SECTION (WITH DARK BLUE & LIGHT BLUE MIXED BACKGROUND) ─── */}
        <section className="py-14 sm:py-20 bg-gradient-to-br from-[#06132b] via-[#0d285c] via-[#081a3d] to-[#040e24] text-white border-b border-blue-900/50 relative overflow-hidden">
          {/* Ambient Light Blue & Cyan Glow Spheres */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
          <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-sky-400/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Centered Section Header */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3"
            >
              <span className="inline-flex items-center gap-2 bg-blue-950/80 border border-blue-700/60 rounded-full px-4 py-1.5 text-xs text-sky-300 font-mono font-bold uppercase tracking-wider shadow-md backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                HOW WE WORK
              </span>
              <h2 className="text-2xl xs:text-3xl sm:text-5xl font-display font-black text-white tracking-tight leading-[1.15] drop-shadow-md">
                Our Engineering <span className="text-sky-400">Approach</span>
              </h2>
              <p className="text-sky-100/90 text-sm sm:text-base font-semibold max-w-2xl mx-auto leading-relaxed">
                At S I Technology, we believe that supplying a product is only one part of an industrial solution.
              </p>
            </motion.div>

            {/* ─── HORIZONTAL TREE TIMELINE HEADER (Nodes 01 -> 02 -> 03 -> 04 -> 05) ─── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="max-w-4xl mx-auto mb-8 sm:mb-12 px-2"
            >
              <div className="relative flex items-center justify-between">
                {/* Horizontal Tree Stem Line */}
                <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1.5 bg-blue-950/90 border border-blue-800/60 rounded-full -z-0 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 transition-all duration-500 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.8)]"
                    style={{ width: `${(activeProcessStep / (processSteps.length - 1)) * 100}%` }}
                  />
                </div>

                {/* Step Tree Nodes */}
                {processSteps.map((step, idx) => {
                  const isActive = idx === activeProcessStep;
                  const isPassed = idx <= activeProcessStep;

                  return (
                    <motion.button
                      key={step.num}
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => {
                        setActiveProcessStep(idx);
                        setIsProcessAutoPlaying(false);
                      }}
                      className="relative z-10 flex flex-col items-center group focus:outline-none"
                    >
                      {/* Circle Node */}
                      <div
                        className={`w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-mono font-black text-xs sm:text-sm transition-all duration-300 shadow-xl ${
                          isActive
                            ? "bg-white text-blue-600 ring-4 ring-sky-400/80 scale-110 shadow-[0_0_30px_rgba(255,255,255,0.9)]"
                            : isPassed
                            ? "bg-gradient-to-tr from-blue-600 to-sky-400 text-white border-2 border-white"
                            : "bg-slate-950/90 text-slate-400 border-2 border-slate-800 hover:border-white hover:text-white"
                        }`}
                      >
                        {step.num}
                      </div>

                      {/* Node Label */}
                      <span
                        className={`hidden sm:block mt-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                          isActive ? "text-white font-black drop-shadow-sm" : "text-slate-400 group-hover:text-white"
                        }`}
                      >
                        {step.title}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* ─── AUTO-MOVING HORIZONTAL SLIDER CARD (DARK BLUE GLASSMORPHISM THEME) ─── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
              className="max-w-4xl mx-auto"
              onMouseEnter={() => setIsProcessAutoPlaying(false)}
              onMouseLeave={() => setIsProcessAutoPlaying(true)}
            >
              <div className="relative h-[480px] sm:h-[440px] md:h-[420px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProcessStep}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-slate-950/90 border border-slate-800 shadow-[0_25px_60px_rgba(3,7,18,0.7)] backdrop-blur-xl rounded-3xl overflow-hidden grid md:grid-cols-12 items-stretch h-[480px] sm:h-[440px] md:h-[420px]"
                  >
                    {/* Left Column: Feature Photo (Animates in from Left) */}
                    <motion.div
                      initial={{ opacity: 0, x: -60 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="md:col-span-5 relative h-48 md:h-full bg-slate-950 overflow-hidden shrink-0"
                    >
                      <img
                        src={processSteps[activeProcessStep].img}
                        alt={`SI Technology - Step ${processSteps[activeProcessStep].num} ${processSteps[activeProcessStep].title}`}
                        className="w-full h-full object-cover filter brightness-95 contrast-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

                      {/* Floating Step Pill */}
                      <div className="absolute top-4 left-4 bg-white text-slate-900 font-mono font-black text-xs px-3 py-1.5 rounded-full shadow-lg tracking-wider border border-slate-200">
                        STEP {processSteps[activeProcessStep].num}
                      </div>

                      {/* Category Tag */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-sky-300 bg-blue-950/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-blue-700/60">
                          {processSteps[activeProcessStep].tag}
                        </span>
                      </div>
                    </motion.div>

                    {/* Right Column: Step Description & Deliverables (Animates in from Right) */}
                    <motion.div
                      initial={{ opacity: 0, x: 60 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="md:col-span-7 p-5 sm:p-7 lg:p-8 flex flex-col justify-between h-full space-y-4 text-left overflow-hidden"
                    >
                      <div className="space-y-3 overflow-y-auto pr-1">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-blue-900/60 text-sky-300 font-mono font-bold flex items-center justify-center shrink-0 border border-blue-700/60">
                            {processSteps[activeProcessStep].num}
                          </div>
                          <div>
                            <span className="block text-[10px] sm:text-xs font-mono font-bold text-sky-400 uppercase tracking-widest">
                              {processSteps[activeProcessStep].subtitle}
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
                              {processSteps[activeProcessStep].title}
                            </h3>
                          </div>
                        </div>

                        <p className="text-sky-100/90 text-xs sm:text-sm leading-relaxed font-medium">
                          {processSteps[activeProcessStep].desc}
                        </p>

                        {/* Deliverables Checklist */}
                        <div className="pt-1 space-y-1.5">
                          <span className="block text-[10px] sm:text-[11px] font-mono font-bold text-sky-400 uppercase tracking-wider">
                            Key Deliverables:
                          </span>
                          <ul className="space-y-1">
                            {processSteps[activeProcessStep].highlights.map((item, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.35, delay: 0.15 + i * 0.08 }}
                                className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200"
                              >
                                <CheckCircle size={15} className="text-sky-400 shrink-0" />
                                <span>{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Bottom Controls Bar inside Card */}
                      <div className="pt-3 border-t border-blue-900/60 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-2">
                          {processSteps.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                setActiveProcessStep(i);
                                setIsProcessAutoPlaying(false);
                              }}
                              className={`h-2.5 rounded-full transition-all duration-300 ${
                                i === activeProcessStep ? "w-8 bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]" : "w-2.5 bg-blue-900/80 hover:bg-blue-800"
                              }`}
                            />
                          ))}
                        </div>

                        {/* Prev / Next Arrow Controls */}
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              setActiveProcessStep((prev) => (prev - 1 + processSteps.length) % processSteps.length);
                              setIsProcessAutoPlaying(false);
                            }}
                            className="w-9 h-9 rounded-full bg-blue-950 hover:bg-sky-400 hover:text-slate-950 text-sky-300 border border-blue-800/80 flex items-center justify-center transition-colors shadow-sm"
                            aria-label="Previous step"
                          >
                            <ChevronLeft size={18} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              setActiveProcessStep((prev) => (prev + 1) % processSteps.length);
                              setIsProcessAutoPlaying(false);
                            }}
                            className="w-9 h-9 rounded-full bg-blue-950 hover:bg-sky-400 hover:text-slate-950 text-sky-300 border border-blue-800/80 flex items-center justify-center transition-colors shadow-sm"
                            aria-label="Next step"
                          >
                            <ChevronRight size={18} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ─── OUR COMMITMENT SECTION (WHITE SECTION WITH SLEEK DARK CARDS) ─── */}
        <section className="py-12 sm:py-16 bg-white text-slate-900 relative overflow-hidden border-y border-slate-200/80 z-10">
          {/* Subtle Ambient Grid & Decorative Light Glows */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
          <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] bg-emerald-100/40 rounded-full blur-[130px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header Block */}
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/80 rounded-full px-4 py-1.5 text-xs text-blue-800 font-mono font-bold uppercase tracking-widest shadow-sm"
              >
                <Sparkles size={14} className="text-blue-600 animate-pulse" />
                <span>OUR COMMITMENT</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 tracking-tight leading-[1.15]"
              >
                More Than Products.{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 bg-clip-text text-transparent">
                  We Deliver Complete Solutions.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed max-w-2xl mx-auto"
              >
                At S I Technology, an industrial supplier should do more than supply off-the-shelf components. We deeply analyze your engineering challenges to engineer turnkey, reliable, long-term operational success.
              </motion.p>
            </div>

            {/* Main Interactive Card Grid (4 Dark Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  title: "Productivity",
                  tagline: "Ergonomic Workflow",
                  badge: "+40% Output",
                  icon: TrendingUp,
                  desc: "Designing tailored structural layouts that minimize operator fatigue and accelerate assembly cycles.",
                  gradient: "from-blue-500 to-cyan-500",
                  bgGlow: "hover:border-blue-500/60 hover:shadow-blue-500/20",
                  badgeBg: "bg-blue-950/80 text-blue-400 border-blue-800/80"
                },
                {
                  title: "Organization",
                  tagline: "Lean 5S Standards",
                  badge: "Modular Layout",
                  icon: Layers,
                  desc: "Structured profile systems and accessories that optimize shopfloor space and component access.",
                  gradient: "from-indigo-500 to-blue-600",
                  bgGlow: "hover:border-indigo-500/60 hover:shadow-indigo-500/20",
                  badgeBg: "bg-indigo-950/80 text-indigo-400 border-indigo-800/80"
                },
                {
                  title: "Safety",
                  tagline: "Structural Integrity",
                  badge: "Certified Protection",
                  icon: ShieldCheck,
                  desc: "Precision engineering and robust aluminum extrusions tested to withstand demanding industrial loads.",
                  gradient: "from-emerald-500 to-teal-600",
                  bgGlow: "hover:border-emerald-500/60 hover:shadow-emerald-500/20",
                  badgeBg: "bg-emerald-950/80 text-emerald-400 border-emerald-800/80"
                },
                {
                  title: "Operational Efficiency",
                  tagline: "Rapid Adaptability",
                  badge: "Zero Downtime",
                  icon: Cog,
                  desc: "Modular interconnectivity allowing fast system expansion and seamless re-configurations as production grows.",
                  gradient: "from-teal-500 to-cyan-600",
                  bgGlow: "hover:border-teal-500/60 hover:shadow-teal-500/20",
                  badgeBg: "bg-teal-950/80 text-teal-400 border-teal-800/80"
                }
              ].map((card, idx) => {
                const IconComp = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group relative bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-7 border border-slate-800/90 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden ${card.bgGlow}`}
                  >
                    {/* Corner Subtle Gradient Accent Light */}
                    <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${card.gradient} opacity-[0.12] rounded-bl-full pointer-events-none group-hover:opacity-[0.3] group-hover:scale-110 transition-all duration-500`} />

                    <div>
                      {/* Top Bar: Icon + Pill Badge */}
                      <div className="flex items-center justify-between mb-5">
                        <motion.div
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <IconComp size={22} />
                        </motion.div>
                        <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border ${card.badgeBg} shadow-sm`}>
                          {card.badge}
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <span className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">
                        {card.tagline}
                      </span>
                      <h3 className="text-xl font-display font-bold text-white tracking-tight mb-3">
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                        {card.desc}
                      </p>
                    </div>

                    {/* Bottom Indicator */}
                    <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-semibold text-slate-400 group-hover:text-blue-400 transition-colors">
                      <CheckCircle2 size={15} className="text-emerald-400" />
                      <span>Guaranteed Outcome</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── OPERATING PHILOSOPHY (WHITE & DARK MIX ROTATING CIRCULAR DIAL) ─── */}
        <section className="py-8 sm:py-12 bg-gradient-to-b from-slate-950 via-[#0b132b] to-black text-white relative overflow-hidden border-y border-slate-800/80">
          {/* Ambient Lighting & Grid Overlay */}
          <div className="absolute inset-0 bg-grid-light opacity-[0.03] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: -20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center max-w-3xl mx-auto mb-4 sm:mb-6 space-y-2"
            >
              <span className="inline-flex items-center gap-2 bg-blue-950/80 border border-blue-800/80 rounded-full px-3.5 py-1 text-xs text-blue-400 font-mono font-bold uppercase tracking-wider shadow-sm">
                <Sparkles size={13} className="text-blue-400 animate-pulse" />
                OPERATING PHILOSOPHY
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight leading-[1.12]">
                Why Choose S I Technology?
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm font-normal max-w-xl mx-auto leading-relaxed">
                Six foundational pillars driving our commitment to engineering precision, product reliability, and client success.
              </p>
            </motion.div>

            {/* Circular Dial Container - Zoom Entrance Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.65, rotate: -15 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[320px] xs:max-w-[360px] sm:max-w-[480px] lg:max-w-[510px] aspect-square mx-auto flex items-center justify-center"
              onMouseEnter={() => setIsPhilosophyAutoPlaying(false)}
              onMouseLeave={() => setIsPhilosophyAutoPlaying(true)}
            >
              {/* Thin Track Ring Line - Zoom Entrance */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-5 sm:inset-9 lg:inset-10 rounded-full border-2 border-slate-700/80 shadow-2xl shadow-blue-500/20"
              />

              {/* 6 Circular Node Buttons Positioned Along Perimeter */}
              {coreValues.map((val, idx) => {
                const IconComp = val.icon;
                const isActive = activePhilosophy === idx;
                const totalNodes = coreValues.length;
                const angleDeg = (idx * 360) / totalNodes - 90;
                const angleRad = (angleDeg * Math.PI) / 180;

                const radiusPct = 41;
                const leftPct = 50 + radiusPct * Math.cos(angleRad);
                const topPct = 50 + radiusPct * Math.sin(angleRad);

                return (
                  <motion.button
                    key={val.title}
                    type="button"
                    initial={{ opacity: 0, scale: 0.2 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + idx * 0.08, type: "spring", stiffness: 180 }}
                    onClick={() => {
                      setActivePhilosophy(idx);
                      setIsPhilosophyAutoPlaying(false);
                    }}
                    style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                    whileHover={{ scale: isActive ? 1.3 : 1.2, rotate: 12 }}
                    whileTap={{ scale: 0.9 }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out z-20 flex items-center justify-center rounded-full ${
                      isActive
                        ? "w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-tr from-blue-600 via-blue-500 to-sky-400 text-white shadow-2xl shadow-blue-500/60 border-4 border-white scale-125 ring-4 ring-blue-400/40"
                        : "w-11 h-11 sm:w-16 sm:h-16 bg-white border border-slate-200 shadow-xl text-blue-600 hover:border-blue-400 hover:scale-110"
                    }`}
                  >
                    <IconComp className={`${isActive ? "w-6 h-6 sm:w-8 sm:h-8" : "w-5 h-5 sm:w-7 sm:h-7"} transition-transform duration-300`} />
                  </motion.button>
                );
              })}

              {/* Center Info Content Box (Elevated Larger Crisp White Disc) - Spring Pop Zoom */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, type: "spring", bounce: 0.35 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-3 sm:p-6 z-10 pointer-events-none"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePhilosophy}
                    initial={{ opacity: 0, scale: 0.75, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.75, rotate: 5 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="w-[220px] h-[220px] xs:w-[250px] xs:h-[250px] sm:w-[330px] sm:h-[330px] lg:w-[350px] lg:h-[350px] rounded-full bg-white text-slate-900 border-4 border-slate-100 shadow-[0_25px_65px_rgba(0,0,0,0.7)] p-4 sm:p-9 flex flex-col items-center justify-center space-y-2 sm:space-y-3 pointer-events-auto shrink-0"
                  >
                    <span className="inline-block text-[10px] sm:text-xs font-mono font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                      Pillar 0{activePhilosophy + 1}
                    </span>

                    <h3 className="text-base sm:text-2xl lg:text-3xl font-display font-black text-slate-900 tracking-tight leading-tight">
                      {coreValues[activePhilosophy].title}
                    </h3>

                    <p className="text-slate-600 text-xs sm:text-sm leading-normal sm:leading-relaxed font-medium">
                      {coreValues[activePhilosophy].desc}
                    </p>

                    {/* Progress Indicator Dots */}
                    <div className="flex items-center justify-center gap-1.5 pt-1 sm:pt-2">
                      {coreValues.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setActivePhilosophy(i);
                            setIsPhilosophyAutoPlaying(false);
                          }}
                          className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                            activePhilosophy === i ? "w-5 sm:w-6 bg-blue-600" : "w-1.5 sm:w-2 bg-slate-300 hover:bg-slate-400"
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── WHY CHOOSE US (STRENGTHS) ─── */}
        <section className="py-12 sm:py-16 bg-white swiss-border-b overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            {/* Centered Header */}
            <div className="flex flex-col items-center justify-center text-center gap-4 mb-16">
              <span className="inline-flex items-center gap-2 bg-accent-50 border border-accent-200 rounded-full px-4 py-1.5 text-xs text-accent-700 font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                Our Core Strengths
              </span>
              <h1 className="text-2xl xs:text-3xl sm:text-5xl font-display font-black text-black tracking-tight leading-[1.1]">
                Why Industry Leaders<br />
                Partner with S I Technology
              </h1>
            </div>

            {/* Unique: Full-width horizontal expanding panels */}
            <div className="flex flex-col lg:flex-row w-full gap-4 h-auto lg:h-[550px]">
              {coreStrengths.map((item, idx) => {
                const IconComp = item.icon;
                const isActive = activeStrength === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => setActiveStrength(idx)}
                    onClick={() => setActiveStrength(idx)}
                    className={`group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${item.bg} border border-dark-200/20 ${isActive
                      ? 'lg:flex-[3.8] h-[520px] lg:h-full shadow-2xl border-accent-500/30'
                      : 'lg:flex-[1] h-[80px] lg:h-full shadow-md border-transparent'
                      }`}
                  >
                    {/* Accent top bar */}
                    <div className={`absolute top-0 left-0 h-1 bg-accent-500 transition-all duration-700 z-20 ${isActive ? 'w-full' : 'w-0'}`} />

                    {/* Active layout: Split Top Image / Bottom Text */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="absolute inset-0 flex flex-col w-full h-full"
                        >
                          {/* Top half: Clear Image */}
                          <div className="w-full flex-1 relative overflow-hidden bg-dark-100">
                            <img
                              src={item.img}
                              alt={item.title}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 scale-100 group-hover:scale-105"
                            />

                            {/* Number badge on image */}
                            <div className="absolute top-4 right-4 bg-accent-500 text-white px-3 py-1 rounded-full font-mono font-black text-xl shadow-lg">
                              {item.num}
                            </div>
                          </div>

                          {/* Bottom half: Compact Text Content */}
                          <div className="relative z-10 p-6 flex flex-col bg-white shrink-0 space-y-3">
                            <div>
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-xl bg-accent-500 text-white flex items-center justify-center shadow-md shrink-0">
                                    <IconComp size={20} />
                                  </div>
                                  <h3 className="font-display font-black text-lg sm:text-xl text-primary-950 tracking-tight leading-tight">
                                    {item.title}
                                  </h3>
                                </div>
                                <span className="inline-block self-start sm:self-center text-[10px] font-mono font-bold text-accent-600 uppercase tracking-widest bg-accent-500/10 px-2.5 py-1 rounded-full border border-accent-500/20 shrink-0">
                                  {item.tag}
                                </span>
                              </div>

                              <p className="text-xs sm:text-sm text-dark-500 font-light leading-relaxed mb-3">
                                {item.desc}
                              </p>
                            </div>

                            {/* Enhanced: Display Specs as Grid of Badges */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-dark-100">
                              {item.specs.map((spec, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs font-semibold text-dark-700">
                                  <CheckCircle size={13} className="text-accent-500 shrink-0" />
                                  <span>{spec}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Inactive state content */}
                    {!isActive && (
                      <div className="absolute inset-0 overflow-hidden">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
                        />
                        <div className="absolute inset-0 bg-black/70" />

                        {/* Desktop collapsed: vertical text */}
                        <div className="absolute inset-0 hidden lg:flex flex-col items-center justify-center gap-4">
                          <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <IconComp size={20} />
                          </div>
                          <span className="font-display font-black text-sm text-white uppercase tracking-widest [writing-mode:vertical-lr] rotate-180 whitespace-nowrap">
                            {item.title}
                          </span>
                          <span className="font-mono font-black text-white/30 text-4xl leading-none mt-auto mb-6">
                            {item.num}
                          </span>
                        </div>

                        {/* Mobile collapsed: horizontal row */}
                        <div className="lg:hidden relative z-10 flex items-center gap-4 p-5 h-full">
                          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center shrink-0">
                            <IconComp size={16} />
                          </div>
                          <span className="font-display font-black text-sm text-white truncate">{item.title}</span>
                          <span className="ml-auto font-mono font-black text-white/30 text-3xl">{item.num}</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ─── OUR VISION & LEADERSHIP SECTION (RESTORED SPEECH BUBBLE DESIGN WITH BLUE ACCENTS) ─── */}
        <section className="py-10 sm:py-14 bg-slate-50 border-b border-slate-200/80 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-10">
            
            {/* Centered Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="inline-flex items-center gap-2 bg-slate-900 text-white rounded-full px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
                <UserCheck size={14} className="text-blue-400" />
                OUR VISION &amp; LEADERSHIP
              </span>
              <h2 className="text-2xl xs:text-3xl sm:text-5xl font-display font-black text-slate-900 tracking-tight leading-[1.12]">
                Growing With <span className="text-blue-600">Our Customers.</span>
              </h2>
              <p className="text-slate-600 text-xs sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
                Since 2018, S I Technology has continuously expanded its engineering capabilities to deliver turnkey, high-performance manufacturing solutions across India.
              </p>
            </div>

            {/* 2-Column Speech Bubble Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch pt-4">
              
              {/* Card 1: Founder / Leadership Statement */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 relative pt-6 pr-2 sm:pr-4"
              >
                {/* Slanted angled backdrop shape */}
                <div className="absolute top-0 left-0 w-3/4 h-1/2 bg-slate-900 rounded-[2.5rem] -rotate-2 -z-0 opacity-95 shadow-lg" />

                {/* Main Speech Card Outer Wrapper with thick border */}
                <div className="relative z-10 bg-white border-[5px] sm:border-[6px] border-slate-900 rounded-[2.2rem] sm:rounded-[2.5rem] p-6 sm:p-8 shadow-2xl flex flex-col justify-between min-h-[310px]">
                  
                  {/* Top Right Speech Avatar Bubble Icon */}
                  <div className="absolute -top-7 right-6 sm:right-8 flex flex-col items-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-900 text-white border-4 border-white flex items-center justify-center shadow-xl">
                      <User size={28} className="text-white" />
                    </div>
                    <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-slate-900 -mt-0.5" />
                  </div>

                  <div>
                    {/* Header: Founder Info */}
                    <div className="mb-4 pr-16">
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
                        Mr. Sachin Indulkar
                      </h3>
                      <p className="text-xs font-mono text-blue-600 font-bold uppercase tracking-wider mt-0.5">
                        Founder &amp; Managing Director
                      </p>
                    </div>

                    {/* Rating Stars & Quote Line Divider */}
                    <div className="flex items-center gap-3 my-4">
                      <div className="bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200 flex items-center gap-1 shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-amber-500 text-xs font-bold">★</span>
                        ))}
                      </div>
                      <div className="flex-1 h-[2px] bg-slate-200" />
                      <span className="text-3xl text-slate-300 font-serif font-black leading-none shrink-0">“</span>
                    </div>

                    {/* Quote Content */}
                    <blockquote className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                      "Under the visionary leadership of <strong className="text-slate-900 font-bold underline decoration-slate-300 underline-offset-4">Mr. Sachin Indulkar</strong>, S I Technology continues to build an engineering organization driven by technical precision, unyielding quality, and long-term customer partnerships."
                    </blockquote>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-slate-500">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full uppercase tracking-wider text-[11px]">
                      Leadership Statement
                    </span>
                    <span>EST. 2018</span>
                  </div>
                </div>

                {/* Bottom Speech Bubble Pointer Tail */}
                <div className="relative z-10 -mt-2 ml-10 sm:ml-14">
                  <div className="w-0 h-0 border-t-[22px] border-t-slate-900 border-r-[24px] border-r-transparent" />
                </div>
              </motion.div>

              {/* Card 2: Core Philosophy Card */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 relative pt-6 pr-2 sm:pr-4"
              >
                <div className="absolute top-0 left-0 w-3/4 h-1/2 bg-slate-900 rounded-[2.5rem] -rotate-2 -z-0 opacity-95 shadow-lg" />

                <div className="relative z-10 bg-white border-[5px] sm:border-[6px] border-slate-900 rounded-[2.2rem] sm:rounded-[2.5rem] p-6 sm:p-8 shadow-2xl flex flex-col justify-between min-h-[310px]">
                  
                  <div className="absolute -top-7 right-6 sm:right-8 flex flex-col items-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-900 text-white border-4 border-white flex items-center justify-center shadow-xl">
                      <Target size={26} className="text-white" />
                    </div>
                    <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-slate-900 -mt-0.5" />
                  </div>

                  <div>
                    <div className="mb-4 pr-16">
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
                        Our Core Philosophy
                      </h3>
                      <p className="text-xs font-mono text-blue-600 font-bold uppercase tracking-wider mt-0.5">
                        Customer &amp; Quality First
                      </p>
                    </div>

                    <div className="flex items-center gap-3 my-4">
                      <div className="bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200 flex items-center gap-1 shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-amber-500 text-xs font-bold">★</span>
                        ))}
                      </div>
                      <div className="flex-1 h-[2px] bg-slate-200" />
                      <span className="text-3xl text-slate-300 font-serif font-black leading-none shrink-0">“</span>
                    </div>

                    <blockquote className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed italic">
                      "Our goal is never simply to complete a single sale — it is to become a trusted, indispensable engineering partner for every manufacturing facility we empower across India."
                    </blockquote>
                  </div>

                  <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-slate-500">
                    <span>Pune • Pan-India</span>
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full uppercase tracking-wider text-[11px]">
                      100% Application Focused
                    </span>
                  </div>
                </div>

                <div className="relative z-10 -mt-2 ml-10 sm:ml-14">
                  <div className="w-0 h-0 border-t-[22px] border-t-slate-900 border-r-[24px] border-r-transparent" />
                </div>
              </motion.div>

            </div>

          </div>
        </section>

      </div>
    </>
  );
}
