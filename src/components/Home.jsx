import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import CountUpModule from "react-countup";
import {
  ArrowRight, ArrowUpRight, CheckCircle2, TrendingUp, Award, Cog,
  ShieldCheck, Users, Wrench, ChevronDown, Plus, Minus, MessageSquare,
  Target, Compass, Factory, Layers, Sparkles, CheckCircle, Briefcase,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { SITE_CONFIG, getWhatsAppUrl } from "../constants/siteConfig";
import productsData from "../data/Products.json";
import categoriesData from "../data/Categories.json";
import faqData from "../data/FAQ.json";

import projectsData from "../data/Projects.json";
import AnimatedList from "./common/AnimatedList";
import ProductCategorySlider from "./ProductCategorySlider/ProductCategorySlider";

const CountUp = typeof CountUpModule === "function" ? CountUpModule : (CountUpModule.default || CountUpModule);

export default function Home() {
  const heroRef = useRef(null);
  const gridLinesRef = useRef(null);
  const statsRef = useRef(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const [visibleStats, setVisibleStats] = useState(false);
  const [activePillar, setActivePillar] = useState(0);
  const [pillarPaused, setPillarPaused] = useState(false);

  // Auto-slide for Operating Pillars (2s interval)
  useEffect(() => {
    if (pillarPaused) return;
    const interval = setInterval(() => {
      setActivePillar((prev) => (prev + 1) % 6);
    }, 2000);
    return () => clearInterval(interval);
  }, [pillarPaused]);
  const [activeSample, setActiveSample] = useState(0);
  const [missionFlipped, setMissionFlipped] = useState(false);
  const [visionFlipped, setVisionFlipped] = useState(false);
  const radialContainerRef = useRef(null);

  // Infographic Hub state for changing product photos inside central circle
  const [activeHubIndex, setActiveHubIndex] = useState(0);
  const [hubPaused, setHubPaused] = useState(false);

  const hubItems = [
    {
      id: "profiles",
      title: "Aluminium Profiles & Modular T-Slots",
      desc: "6063 T6 Alloy • Silver/Black Anodized",
      image: "/images/profile_app/pa_001_b.jpg",
      icon: Layers,
      color: "from-blue-600 via-blue-700 to-slate-900",
      dotColor: "#2563eb"
    },
    {
      id: "pipe-joint",
      title: "Pipe & Joint Systems & FIFO Racks",
      desc: "Flexible Lean Assembly Systems",
      image: "/images/about_who_we_are.png",
      icon: Factory,
      color: "from-slate-800 via-slate-900 to-blue-950",
      dotColor: "#0f172a"
    },
    {
      id: "workstations",
      title: "Industrial Workstations & Trolleys",
      desc: "Ergonomic Benches & ESD Systems",
      image: "/images/about_workbench.jpg",
      icon: Wrench,
      color: "from-blue-700 via-slate-800 to-slate-950",
      dotColor: "#1d4ed8"
    },
    {
      id: "enclosures",
      title: "Custom Engineering & Enclosures",
      desc: "Machine Guards • HMI Arm Structures",
      image: "/images/hero-profile-3d.png",
      icon: Cog,
      color: "from-slate-900 via-blue-950 to-slate-900",
      dotColor: "#090d16"
    },
    {
      id: "excellence",
      title: "6+ Years of Industrial Excellence",
      desc: "Established 2018 • Reliable Quality",
      image: "/images/hero-conveyor.png",
      icon: Award,
      color: "from-blue-600 via-slate-800 to-blue-900",
      dotColor: "#3b82f6"
    }
  ];

  // Auto-slide effect for central circle product photo (changes one by one)
  useEffect(() => {
    if (hubPaused) return;
    const interval = setInterval(() => {
      setActiveHubIndex((prev) => (prev + 1) % hubItems.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [hubPaused, hubItems.length]);


  // Hero slider data with product PNG images and titles
  const heroSlides = [
    {
      image: "/images/hero-profile-3d.png",
      title1: "Industrial Aluminium",
      title2: "Profile Systems.",
      subtitle: "Engineering Solutions for Modern Industry.",
      imageScale: "h-[260px] sm:h-[380px] lg:h-[440px] xl:h-[480px]"
    },
    {
      image: "/images/PCB Testing Workstation.png",
      title1: "PCB Testing",
      title2: "Workstations.",
      subtitle: "Dedicated Electronics & Diagnostic Stations with Visual Stack Lights & Shelving.",
      imageScale: "h-[300px] sm:h-[440px] lg:h-[500px] xl:h-[540px]"
    },
    {
      image: "/images/Inspection Table.png",
      title1: "Quality Inspection",
      title2: "Tables.",
      subtitle: "Precision QC Stations with Articulating Magnifiers & High-CRI Overhead Lighting.",
      imageScale: "h-[300px] sm:h-[440px] lg:h-[500px] xl:h-[540px]"
    },
    {
      image: "/images/hero-bg-11.png",
      title1: "Automated Vertical",
      title2: "Handling Systems.",
      subtitle: "Custom Vertical Elevators & Integrated Production Line Solutions.",
      imageScale: "h-[300px] sm:h-[440px] lg:h-[520px] xl:h-[580px] scale-110 lg:scale-115"
    },
    {
      image: "/images/hero-conveyor.png",
      title1: "Modular Belt",
      title2: "Conveyor Systems.",
      subtitle: "High-Efficiency Material Handling & Assembly Lines.",
      imageScale: "h-[300px] sm:h-[440px] lg:h-[520px] xl:h-[580px] scale-110 lg:scale-115"
    },
    {
      image: "/images/Fifo rack.png",
      title1: "FIFO Rack",
      title2: "Storage Systems.",
      subtitle: "First-In First-Out Modular Racking for Lean & Efficient Warehousing.",
      imageScale: "h-[300px] sm:h-[440px] lg:h-[520px] xl:h-[580px]"
    }
  ];

  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const handlePrevSlide = () => {
    setHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNextSlide = () => {
    setHeroSlide((prev) => (prev + 1) % heroSlides.length);
  };


  useEffect(() => {
    const el = radialContainerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "+=2400",
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const index = Math.min(5, Math.floor(self.progress * 6));
          setActivePillar(index);
        }
      });
    });

    return () => ctx.revert();
  }, []);



  // GSAP animation for hero blueprint lines
  useEffect(() => {
    const lines = gridLinesRef.current;
    if (lines) {
      gsap.fromTo(
        lines,
        { opacity: 0.1, backgroundPosition: "0px 0px" },
        {
          opacity: 0.35,
          backgroundPosition: "40px 40px",
          duration: 20,
          repeat: -1,
          ease: "linear",
        }
      );
    }
  }, []);

  // Intersection observer for scroll trigger stats counting
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleStats(true);
        }
      },
      { threshold: 0.2 }
    );
    const statsSection = document.getElementById("stats-section");
    if (statsSection) observer.observe(statsSection);
    return () => {
      if (statsSection) observer.unobserve(statsSection);
    };
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Why Choose Us strengths list
  const strengths = [
    {
      icon: Award,
      title: "Premium Quality Profiles",
      desc: "All extrusion profiles are manufactured from Aluminium Alloy 6063 T6, with precision silver or black matte anodizing exceeding 15 microns."
    },
    {
      icon: Cog,
      title: "Custom Structural Engineering",
      desc: "We design and pre-fabricate custom machine enclosures, robotic cells, conveyors, and workstations to match your exact CAD files."
    },
    {
      icon: TrendingUp,
      title: "Optimized Shopfloor Productivity",
      desc: "Our modular pipe and joint systems, gravity FIFO flow racks, and height-adjustable desks are engineered to streamline material flows."
    },
    {
      icon: ShieldCheck,
      title: "Industry Trusted Partner",
      desc: "Serving manufacturing hubs across India since 2018 with transparent dealings, reliable assembly guides, and post-sales installation support."
    }
  ];

  // Steps in the engineering workflow
  const processSteps = [
    {
      step: "01",
      title: "Consultation & Audit",
      desc: "We study your shopfloor footprint, assembly processes, and structural load requirements to propose the optimal modular layout."
    },
    {
      step: "02",
      title: "3D CAD Designing",
      desc: "Our engineers generate complete 3D models (STEP/DXF formats) of your custom workstations or safety guard fencing for layout approval."
    },
    {
      step: "03",
      title: "Precision Fabrication",
      desc: "We cut profiles, tap holes, install rollers, and pre-assemble structural blocks inside our facility for strict quality control."
    },
    {
      step: "04",
      title: "Fast Assembly & Delivery",
      desc: "Components are labeled and flat-packed with assembly drawings, or built on-site by our expert technicians. No welding, no mess."
    }
  ];

  return (
    <>
      <Helmet>
        <title>SI Technology | Premium Industrial Aluminium Profile Systems Pune</title>
        <meta name="description" content="SI Technology Pune delivers world-class industrial aluminium profile systems, connecting elements, pipe & joint solutions, and custom workstations." />
      </Helmet>
      <div className="w-full">
        {/* ─── HERO SLIDER SECTION ─── */}
        <section
          ref={heroRef}
          className="relative mt-[88px] sm:mt-[96px] lg:mt-[104px] py-8 pb-10 sm:py-10 lg:py-12 min-h-0 sm:min-h-[52vh] lg:min-h-[60vh] flex items-center justify-center text-slate-800 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100/50"
        >
          {/* Background Image of Hero Section */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 opacity-[0.15] overflow-hidden">
            <img
              src="/images/logo/si-technology-new-logo.png"
              alt="SI Technology Watermark"
              className="w-full h-full object-contain max-w-5xl scale-110"
            />
          </div>

          {/* Blueprint Grid Lines Overlay */}
          <div
            ref={gridLinesRef}
            className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-1"
          />

          {/* Content Wrapper */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-3 xs:px-4 sm:px-12 lg:px-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroSlide}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="grid grid-cols-12 gap-2 xs:gap-3 sm:gap-6 lg:gap-8 items-center min-h-0 sm:min-h-[420px]"
              >
                {/* LEFT COLUMN: Direct Product PNG Image (5 cols mobile, 6 cols desktop) */}
                <div className="col-span-5 sm:col-span-6 flex items-center justify-center lg:justify-start relative p-0 lg:-ml-6 pr-1 xs:pr-2 lg:pr-6 overflow-visible">
                  <img
                    src={heroSlides[heroSlide].image}
                    alt={heroSlides[heroSlide].title1}
                    className={`w-full max-w-full h-[180px] xs:h-[220px] sm:h-[320px] md:h-[390px] lg:h-[460px] xl:h-[500px] object-contain filter drop-shadow-[0_22px_35px_rgba(15,23,42,0.35)] hover:scale-105 transition-all duration-700`}
                  />
                </div>

                {/* RIGHT COLUMN: Slide Text Content (7 cols mobile, 6 cols desktop) */}
                <div className="col-span-7 sm:col-span-6 flex flex-col items-start text-left px-1 xs:px-2 sm:px-0 space-y-2 sm:space-y-3">
                  {/* Category Pill Tag */}
                  <div className="inline-flex items-center gap-2 bg-blue-100/90 border border-blue-200 text-blue-800 font-mono font-bold text-[10px] sm:text-xs uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                    SI TECHNOLOGY PUNE
                  </div>

                  <h1 className="text-[16px] xs:text-[19px] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black uppercase leading-tight tracking-tight sm:tracking-tight mb-1 sm:mb-3">
                    <span className="block font-black text-[#0f172a] tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
                      {heroSlides[heroSlide].title1}
                    </span>
                    <span className="block text-blue-600 font-black tracking-tight mt-1 sm:mt-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
                      {heroSlides[heroSlide].title2}
                    </span>
                  </h1>

                  <p className="text-[11px] xs:text-[12px] sm:text-sm lg:text-base xl:text-lg font-semibold text-slate-800 tracking-normal mb-3 sm:mb-5 leading-snug sm:leading-relaxed max-w-lg bg-white/90 border border-slate-200/90 px-4 py-2 rounded-2xl shadow-sm">
                    {heroSlides[heroSlide].subtitle}
                  </p>

                  {/* Action Buttons Group */}
                  <div className="flex flex-wrap items-center gap-2.5 xs:gap-3 sm:gap-4 pt-1">
                    {/* Services Button */}
                    <Link
                      to="/products"
                      className="bg-white hover:bg-slate-50 text-black font-display font-black text-[10px] xs:text-[11px] sm:text-[13px] uppercase tracking-wider border border-slate-300 px-4 sm:px-5 py-2 rounded-full shadow-md drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)] hover:shadow-lg transition-all duration-300 flex items-center gap-1.5 group"
                    >
                      Services
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-black" />
                    </Link>

                    {/* EXPLORE MORE Button */}
                    <Link
                      to="/contact"
                      className="inline-flex items-center bg-black hover:bg-slate-900 text-white font-display font-black text-[10px] xs:text-[11px] sm:text-[13px] uppercase tracking-wider rounded-full pl-4 xs:pl-5 sm:pl-6 pr-1.5 py-1.5 sm:py-2 transition-all duration-300 shadow-lg drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)] hover:shadow-xl hover:-translate-y-0.5 group/btn"
                    >
                      EXPLORE MORE
                      <span className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 text-white flex items-center justify-center ml-2.5 sm:ml-3.5 group-hover/btn:rotate-45 transition-transform duration-300 shadow-sm backdrop-blur-sm">
                        <ArrowUpRight size={13} className="sm:w-[15px] sm:h-[15px]" />
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Indicators / Dots */}
          <div className="absolute bottom-2 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 sm:gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroSlide(i)}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${i === heroSlide
                  ? "bg-black w-5 sm:w-7"
                  : "bg-zinc-300 hover:bg-zinc-400 w-2 sm:w-2.5"
                  }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows (Visible on BOTH Mobile & Desktop) */}
          <button
            onClick={handlePrevSlide}
            className="flex absolute left-1 xs:left-2 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-30 bg-black/10 hover:bg-black border border-black/10 hover:border-transparent text-black hover:text-white backdrop-blur-md w-7 h-7 xs:w-8 xs:h-8 sm:w-12 sm:h-12 items-center justify-center rounded-full shadow-md transition-all duration-300 active:scale-95 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft size={16} className="sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={handleNextSlide}
            className="flex absolute right-1 xs:right-2 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-30 bg-black/10 hover:bg-black border border-black/10 hover:border-transparent text-black hover:text-white backdrop-blur-md w-7 h-7 xs:w-8 xs:h-8 sm:w-12 sm:h-12 items-center justify-center rounded-full shadow-md transition-all duration-300 active:scale-95 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight size={16} className="sm:w-6 sm:h-6" />
          </button>
        </section>

        {/* ─── ABOUT S I TECHNOLOGY SECTION (INFOGRAPHIC BUBBLE CLOUD WITH BACKSIDE LIGHT BLUE CIRCLES) ─── */}
        <section className="mt-0 py-8 sm:py-12 relative overflow-hidden bg-slate-100 border-y border-slate-300/80">
          {/* Steel-grey & blue soft background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-300/40 via-blue-50/30 to-slate-200/50 pointer-events-none" />
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Container card in Steel-Grey theme with Background Light Blue Floating Circles */}
            <div className="bg-[rgb(158,175,181)] backdrop-blur-md rounded-3xl border border-slate-300/80 shadow-2xl p-6 sm:p-10 lg:p-12 overflow-hidden relative">
              
              {/* ─── FLOATING LIGHT BLUE BACKSIDE CIRCLES (AT EXACT USER RED-CIRCLED LOCATIONS) ─── */}
              {/* 1. Top-Left Corner Circle */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="absolute top-3 left-3 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-sky-400/45 border border-white/50 shadow-sm pointer-events-none z-0"
              />

              {/* 2. Behind Headline Text Circle (Top-Right of Headline) */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="absolute top-8 left-[30%] sm:left-[34%] w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full bg-sky-300/40 border border-white/40 shadow-lg pointer-events-none z-0"
              />

              {/* 3. Behind Paragraph Text Circle (Middle-Right of Text) */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="absolute top-[48%] left-[36%] sm:left-[39%] w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-sky-400/35 border border-white/35 shadow-md pointer-events-none z-0"
              />

              {/* 4. Bottom-Left Circle (Near "Know More About Us" Button) */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute bottom-5 left-5 w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-sky-400/40 border border-white/40 shadow-sm pointer-events-none z-0"
              />

              {/* 5. Bottom-Middle Circle (Between Text & Center Hub) */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="absolute bottom-4 left-[32%] sm:left-[35%] w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full bg-sky-300/45 border border-white/45 shadow-md pointer-events-none z-0"
              />

              {/* 6. Top-Right Corner Circle */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="absolute -top-4 -right-4 w-32 h-32 sm:w-44 sm:h-44 lg:w-52 lg:h-52 rounded-full bg-sky-400/35 border border-white/45 shadow-lg pointer-events-none z-0"
              />

              {/* 7. Middle-Right Edge Circle */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute top-[45%] right-2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-sky-400/40 border border-white/35 shadow-sm pointer-events-none z-0"
              />

              {/* 8. Bottom-Right Edge Circle */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="absolute bottom-6 right-6 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-sky-400/45 border border-white/35 shadow-sm pointer-events-none z-0"
              />

              {/* 9. Small Floating Accent Circles in Middle Gaps */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="absolute top-1/3 left-[46%] w-6 h-6 rounded-full bg-sky-400/50 border border-white/40 pointer-events-none z-0"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute bottom-1/3 left-[43%] w-8 h-8 rounded-full bg-sky-300/45 border border-white/40 pointer-events-none z-0"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="absolute top-1/4 right-[25%] w-5 h-5 rounded-full bg-sky-400/40 border border-white/30 pointer-events-none z-0"
              />


              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">

                {/* Left Column (5 cols): Text content - QUICK LINE BY LINE ANIMATIONS */}
                <div className="lg:col-span-5 space-y-4 relative z-10">
                  {/* Accent Subtitle Badge (Line 1) */}
                  <motion.div
                    initial={{ opacity: 0, y: 15, x: -15 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
                    className="flex items-center gap-2.5 text-xs font-mono font-bold tracking-widest text-blue-950 uppercase"
                  >
                    <span className="w-8 h-1 bg-blue-700 rounded-full" />
                    ABOUT S I TECHNOLOGY
                  </motion.div>

                  {/* Headline (Line 2) */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20, x: -15 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.45, delay: 0.12, ease: "easeOut" }}
                    className="text-xl xs:text-2xl sm:text-3xl lg:text-[2.2rem] font-display font-black text-[#0f172a] tracking-tight leading-[1.2] drop-shadow-sm"
                  >
                    Engineering Industrial Aluminium Profile / MS &amp; SS Fabrication Solutions for Modern Manufacturing
                  </motion.h2>

                  {/* Text Paragraphs (Line 3 & Line 4) */}
                  <div className="space-y-3.5 text-slate-900 text-sm sm:text-base leading-relaxed font-semibold">
                    <motion.p
                      initial={{ opacity: 0, y: 20, x: -15 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.45, delay: 0.19, ease: "easeOut" }}
                    >
                      S I Technology is a Pune-based industrial solutions company specializing in Aluminium Extrusion Profiles, Aluminium Profile Structures, Pipe &amp; Joint Systems, Industrial Workstations, Material Handling Systems, Conveyor Systems structures, Industrial Trolleys, Industrial Enclosures and customized engineering solutions.
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 20, x: -15 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.45, delay: 0.26, ease: "easeOut" }}
                    >
                      Established in 2018, we support manufacturing companies, automation companies, engineering organizations and industrial customers with reliable products and practical solutions designed around their specific applications.
                    </motion.p>
                  </div>

                  {/* Action Button (Line 5) */}
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: 0.33, ease: "easeOut" }}
                    className="pt-3"
                  >
                    <Link
                      to="/about"
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-blue-900 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group/btn"
                    >
                      KNOW MORE ABOUT US
                      <ArrowRight size={15} className="group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                    </Link>
                  </motion.div>
                </div>

                {/* Right Column (7 cols): Photo Composition - QUICK ONE-BY-ONE SPIN & ZOOM ANIMATION */}
                <div
                  className="lg:col-span-7 relative min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] flex items-center justify-center py-6 z-10"
                >
                  <div className="relative w-full max-w-[550px] aspect-square flex items-center justify-center">

                    {/* 1. CENTER MAIN DARK BLUE CIRCLE: Company Logo Hub (Quick Spin & Zoom 1st) */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: 0.05, type: "spring", stiffness: 220, damping: 16 }}
                      whileHover={{ scale: 1.08, zIndex: 40 }}
                      className="absolute z-20 w-44 h-44 xs:w-52 xs:h-52 sm:w-64 sm:h-64 rounded-full bg-[#0a1128] border-4 border-white shadow-2xl overflow-hidden flex flex-col items-center justify-center cursor-pointer transition-all duration-500 group/center"
                    >
                      <img
                        src="/images/logo/si-technology-logo-round.jpg"
                        alt="S I Technology Logo"
                        className="w-full h-full object-cover group-hover/center:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/logo/si-technology-new-logo.png";
                        }}
                      />
                    </motion.div>

                    {/* 2. DARK BLUE ACCENT CIRCLE (Top-Center): Established 2018 Badge (Quick Spin & Zoom 2nd) */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0, rotate: 180, y: -30 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: 0.12, type: "spring", stiffness: 220, damping: 16 }}
                      whileHover={{ scale: 1.15, zIndex: 40 }}
                      className="absolute -top-4 left-1/3 -translate-x-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#0a1128] border-4 border-white shadow-lg flex flex-col items-center justify-center p-2 text-center text-white cursor-pointer z-10"
                    >
                      <Award size={18} className="text-blue-400 mb-0.5" />
                      <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-blue-300">
                        ESTD 2018
                      </span>
                      <span className="text-[10px] sm:text-xs font-bold text-white leading-none">
                        Reliable Quality
                      </span>
                    </motion.div>

                    {/* 3. LIGHT BLUE CIRCLE #1 (Top-Right): Product Photo 1 (Aluminium Profiles - Quick Spin & Zoom 3rd) */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0, rotate: -180, x: 40, y: -20 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: 0.19, type: "spring", stiffness: 220, damping: 16 }}
                      whileHover={{ scale: 1.12, zIndex: 40 }}
                      className="absolute top-2 right-4 xs:right-8 sm:top-0 sm:right-6 w-32 h-32 xs:w-36 xs:h-36 sm:w-44 sm:h-44 rounded-full bg-sky-500 border-4 border-white shadow-xl overflow-hidden cursor-pointer transition-all duration-500 group/p1 z-10"
                    >
                      <img
                        src="/images/profile_app/pa_001_b.jpg"
                        alt="Aluminium Profile Systems"
                        className="w-full h-full object-cover group-hover/p1:scale-110 transition-transform duration-700"
                      />
                    </motion.div>

                    {/* 4. LIGHT BLUE CIRCLE #2 (Mid-Left): Product Photo 2 (Industrial Workstations - Quick Spin & Zoom 4th) */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0, rotate: 180, x: -40 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: 0.26, type: "spring", stiffness: 220, damping: 16 }}
                      whileHover={{ scale: 1.12, zIndex: 40 }}
                      className="absolute top-16 left-0 xs:left-2 sm:top-20 sm:left-4 w-28 h-28 xs:w-32 xs:h-32 sm:w-40 sm:h-40 rounded-full bg-blue-600 border-4 border-white shadow-xl overflow-hidden cursor-pointer transition-all duration-500 group/p2 z-10"
                    >
                      <img
                        src="/images/about_workbench.jpg"
                        alt="Industrial Workstations"
                        className="w-full h-full object-cover group-hover/p2:scale-110 transition-transform duration-700"
                      />
                    </motion.div>

                    {/* 5. DARK BLUE ACCENT CIRCLE (Far-Right): Pune Base (Quick Spin & Zoom 5th) */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0, rotate: -180, x: 40 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: 0.33, type: "spring", stiffness: 220, damping: 16 }}
                      whileHover={{ scale: 1.15, zIndex: 40 }}
                      className="absolute top-1/2 -right-4 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#0f172a] border-4 border-white shadow-lg flex flex-col items-center justify-center p-2 text-center text-white cursor-pointer z-10"
                    >
                      <Cog size={18} className="text-sky-400 mb-0.5" />
                      <span className="text-[9px] sm:text-[10px] font-bold text-white leading-tight">
                        Pune Mfg Hub
                      </span>
                    </motion.div>

                    {/* 6. LIGHT BLUE CIRCLE #3 (Bottom-Right): Product Photo 3 (Pipe & Joint Systems - Quick Spin & Zoom 6th) */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0, rotate: 180, x: 30, y: 30 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: 0.40, type: "spring", stiffness: 220, damping: 16 }}
                      whileHover={{ scale: 1.12, zIndex: 40 }}
                      className="absolute bottom-4 right-2 xs:right-6 sm:bottom-4 sm:right-8 w-32 h-32 xs:w-36 xs:h-36 sm:w-44 sm:h-44 rounded-full bg-sky-400 border-4 border-white shadow-xl overflow-hidden cursor-pointer transition-all duration-500 group/p3 z-10"
                    >
                      <img
                        src="/images/about_who_we_are.png"
                        alt="Pipe &amp; Joint Systems"
                        className="w-full h-full object-cover group-hover/p3:scale-110 transition-transform duration-700"
                      />
                    </motion.div>

                    {/* 7. LIGHT BLUE CIRCLE #4 (Bottom-Left): Product Photo 4 (3D Custom Extrusion - Quick Spin & Zoom 7th) */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0, rotate: -180, x: -30, y: 30 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: 0.47, type: "spring", stiffness: 220, damping: 16 }}
                      whileHover={{ scale: 1.12, zIndex: 40 }}
                      className="absolute bottom-0 left-6 xs:left-10 sm:bottom-2 sm:left-12 w-28 h-28 xs:w-32 xs:h-32 sm:w-38 sm:h-38 rounded-full bg-blue-500 border-4 border-white shadow-xl overflow-hidden cursor-pointer transition-all duration-500 group/p4 z-10"
                    >
                      <img
                        src="/images/hero-profile-3d.png"
                        alt="Custom Engineering"
                        className="w-full h-full object-contain p-2 bg-slate-900 group-hover/p4:scale-110 transition-transform duration-700"
                      />
                    </motion.div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: STATISTICS COUNTER (WHITE ELEVATED CARDS WITH BLUE TOP ACCENT BORDER) ─── */}
        <section
          ref={statsRef}
          className="mt-0 py-12 sm:py-16 bg-[#dce3e8] text-slate-900 border-y border-slate-300 relative overflow-hidden"
        >
          {/* Subtle background grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">

              {/* Stat Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="bg-white rounded-2xl sm:rounded-3xl border-t-4 border-t-blue-700 border-x border-b border-slate-200/80 shadow-[0_15px_30px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.2)] p-7 sm:p-9 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group"
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-blue-700 group-hover:text-blue-600 transition-colors duration-300 mb-2 tracking-tight">
                  {visibleStats ? <CountUp start={0} end={8} duration={3} /> : "8"}+
                </div>
                <p className="text-xs sm:text-sm font-display font-bold tracking-wider text-slate-800 uppercase leading-snug">
                  Years of Experience
                </p>
                <span className="mt-1.5 text-[11px] font-mono font-medium text-slate-500">
                  Established 2018
                </span>
              </motion.div>

              {/* Stat Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="bg-white rounded-2xl sm:rounded-3xl border-t-4 border-t-blue-700 border-x border-b border-slate-200/80 shadow-[0_15px_30px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.2)] p-7 sm:p-9 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group"
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-blue-700 group-hover:text-blue-600 transition-colors duration-300 mb-2 tracking-tight">
                  {visibleStats ? <CountUp start={0} end={500} duration={3} /> : "500"}+
                </div>
                <p className="text-xs sm:text-sm font-display font-bold tracking-wider text-slate-800 uppercase leading-snug">
                  Happy Clients
                </p>
                <span className="mt-1.5 text-[11px] font-mono font-medium text-slate-500">
                  Across Industrial Hubs
                </span>
              </motion.div>

              {/* Stat Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="bg-white rounded-2xl sm:rounded-3xl border-t-4 border-t-blue-700 border-x border-b border-slate-200/80 shadow-[0_15px_30px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.2)] p-7 sm:p-9 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group"
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-blue-700 group-hover:text-blue-600 transition-colors duration-300 mb-2 tracking-tight">
                  {visibleStats ? <CountUp start={0} end={500} duration={3} /> : "500"}+
                </div>
                <p className="text-xs sm:text-sm font-display font-bold tracking-wider text-slate-800 uppercase leading-snug">
                  Precision Products
                </p>
                <span className="mt-1.5 text-[11px] font-mono font-medium text-slate-500">
                  Profiles &amp; Accessories
                </span>
              </motion.div>

              {/* Stat Card 4 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="bg-white rounded-2xl sm:rounded-3xl border-t-4 border-t-blue-700 border-x border-b border-slate-200/80 shadow-[0_15px_30px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.2)] p-7 sm:p-9 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group"
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-blue-700 group-hover:text-blue-600 transition-colors duration-300 mb-2 tracking-tight">
                  4.8/5
                </div>
                <p className="text-xs sm:text-sm font-display font-bold tracking-wider text-slate-800 uppercase leading-snug">
                  Client Rating
                </p>
                <span className="mt-1.5 text-[11px] font-mono font-medium text-slate-500">
                  Reliable Excellence
                </span>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ─── PRODUCT CATEGORIES SECTION ─── */}
        <ProductCategorySlider categories={[
          {
            num: "01", title: "Aluminium Industrial Profiles", series: "5 Series", tags: ["20 Series", "40 Series"],
            img: "/images/Aluminium industrial.png",
            desc: "Modular 6063-T6 aluminium extrusions in 20mm, 40mm, and 80mm series. Compatible with all standard DIN connectors and accessories.",
            link: "/products?category=aluminium-profiles",
          },
          {
            num: "02", title: "Workstations & Solutions", series: "5 Series", tags: ["Lean Workstations"],
            img: "/images/workstations/workstations_005.jpg",
            desc: "Ergonomic anti-static workstations with adjustable height, integrated shelving, and custom panel configurations for assembly lines.",
            link: "/products?category=workstations",
          },
          {
            num: "03", title: "Organized Assembly Workstation", series: "Modular Assembly", tags: ["Lean Workstation", "Tool Pegboard", "Parts Bins"],
            img: "/images/organized assemble work station.png",
            desc: "Ergonomic manual assembly workbench featuring steel pegboard tool organizer, parts storage bins, overhead luminaire, instruction board, and power strip.",
            link: "/products?category=workstations",
          },
          {
            num: "04", title: "PCB Testing Workstation", series: "Testing & Diagnostic", tags: ["PCB Testing", "ICT/FCT Station", "Signal Tower"],
            img: "/images/PCB Testing Workstation.png",
            desc: "Dedicated electronics and PCB testing station with pass/fail visual stack light, instrument shelving, monitor arm, and dual sorting bins.",
            link: "/products?category=workstations",
          },
          {
            num: "05", title: "ESD Workstation", series: "Anti-Static", tags: ["ESD Safe", "Soldering", "Continuous Monitor"],
            img: "/images/ESD workstation.png",
            desc: "Static-dissipative electronics assembly workstation with ESD wrist strap monitoring, overhead LED lighting, soldering unit, and grounding harness.",
            link: "/products?category=workstations",
          },
          {
            num: "06", title: "Quality Inspection Table", series: "Quality Control", tags: ["QC Station", "Magnifier Lamp", "Checklist Board"],
            img: "/images/Inspection Table1.png",
            desc: "Precision quality inspection table with articulating magnifying lamp, overhead inspection illumination, checklist clip board, and lower storage.",
            link: "/products?category=workstations",
          },
          {
            num: "07", title: "Pipe & Joint Systems", series: "3 Series", tags: ["Pipe Joints"],
            img: "/images/pipe_joint/pipe_joint_007.jpg",
            desc: "Heavy-duty pipe & joint systems for material handling trolleys, racks, and flexible assembly structures with locking casters.",
            link: "/products?category=pipe-joint-systems",
          },
          {
            num: "08", title: "Belt Conveyors", series: "3 Series", tags: ["Belt Conveyors"],
            img: "/images/conveyor/Picture 374.jpg",
            desc: "Motorized belt conveyors and roller track systems built on aluminium profile frames for smooth production line integration.",
            link: "/products?category=belt-conveyors",
          },
          {
            num: "09", title: "Heavy Duty Applications", series: "2 Series", tags: ["Industrial"],
            img: "/images/Have duty app/IMG_2695.JPG",
            desc: "Robust industrial frames and heavy-duty application structures engineered for high-load manufacturing and automation environments.",
            link: "/products?category=heavy-duty-app",
          },
          {
            num: "10", title: "Heavy Duty Profiles", series: "2 Series", tags: ["Heavy Profiles"],
            img: "/images/Heavy duty profiles/Portalsystem.jpg",
            desc: "High-strength aluminium portal frames and structural profiles for overhead gantries, machine frames, and heavy industrial racking.",
            link: "/products?category=heavy-duty-profiles",
          },
          {
            num: "11", title: "Profile Assembly Systems", series: "4 Series", tags: ["Assembly"],
            img: "/images/Profile Assembly System/Fertigungslinie_OKIN.jpg",
            desc: "Complete profile-based assembly automation systems — from modular cell framing to full production line enclosures and fixtures.",
            link: "/products?category=profile-assembly-system",
          },
          {
            num: "12", title: "Finishing Systems", series: "2 Series", tags: ["Finishing"],
            img: "/images/feneshing/Picture 476.jpg",
            desc: "Premium surface finishing accessories — slot covers, end caps, corner profiles, and cable management inserts for a clean final look.",
            link: "/products?category=finishing-systems",
          },
        ]} />





        {/* ─── MISSION, VISION & CORE PILLARS SECTION ─── */}
        <section className="mt-6 sm:mt-8 py-12 sm:py-14 bg-[#f0f7ff] relative overflow-hidden border-y border-blue-100">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">

            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center space-y-3"
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 rounded-full px-4 py-1.5 text-xs text-blue-700 font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                Core Outlook
              </div>
              <h2 className="text-xl xs:text-2xl sm:text-5xl font-display font-black text-[#0f172a] tracking-tight leading-none">
                Engineering Excellence
              </h2>
              <p className="text-blue-600 text-sm font-mono font-bold uppercase tracking-widest mt-1">
                Global Quality Standard
              </p>
            </motion.div>

            {/* Infographic Container */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 py-4">

              {/* Left Card: OUR MISSION (Spin into view on scroll) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -45, x: -50 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.85, type: "spring", stiffness: 120, damping: 14, delay: 0.2 }}
                className="relative w-[290px] h-[290px] xs:w-80 xs:h-80 sm:w-96 sm:h-96 [perspective:1000px] group shrink-0"
              >
                <div
                  onClick={() => setMissionFlipped(!missionFlipped)}
                  className={`relative w-full h-full duration-700 transition-all [transform-style:preserve-3d] ${missionFlipped ? "[transform:rotateY(180deg)]" : ""
                    } lg:group-hover:[transform:rotateY(180deg)] cursor-pointer`}
                >
                  {/* FRONT SIDE */}
                  <div
                    className="absolute inset-0 w-full h-full [backface-visibility:hidden] -webkit-backface-visibility-hidden"
                  >
                    <div className="absolute inset-4 bg-white border-2 border-dashed border-blue-200 shadow-xl rounded-[2.5rem] [transform:rotate(45deg)] transition-all duration-300 lg:group-hover:border-solid lg:group-hover:border-blue-600 lg:group-hover:shadow-blue-200" />

                    <div className="absolute top-[8px] left-[8px] w-24 h-24 border-t-8 border-l-8 border-blue-600 rounded-tl-[2rem] pointer-events-none" />

                    <div className="absolute inset-8 flex flex-col items-center justify-center text-center p-6 space-y-3 sm:space-y-4">
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                        <Target size={22} className="stroke-[2.5]" />
                      </div>

                      <h3 className="text-lg sm:text-xl font-display font-black text-blue-600 uppercase tracking-wider">
                        Our Mission
                      </h3>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[210px] font-semibold">
                        To deliver world-class industrial automation and aluminium profile solutions that help customers improve productivity, efficiency, safety, and profitability.
                      </p>

                      <span className="text-[9px] font-mono font-bold text-blue-600 uppercase tracking-widest animate-pulse lg:block hidden">
                        Hover to flip
                      </span>
                      <span className="text-[9px] font-mono font-bold text-blue-600 uppercase tracking-widest animate-pulse lg:hidden block">
                        Tap to flip
                      </span>
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div
                    className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] -webkit-backface-visibility-hidden text-white"
                  >
                    <div className="absolute inset-4 bg-[#0f172a] border-2 border-blue-600 shadow-2xl rounded-[2.5rem] [transform:rotate(45deg)]" />

                    <div className="absolute inset-8 flex flex-col items-center justify-center p-6">
                      <h3 className="text-xs sm:text-sm font-black text-blue-400 font-display uppercase tracking-widest mb-3 text-center border-b border-blue-500/20 pb-1.5 w-full">
                        Our Commitments
                      </h3>
                      <ul className="text-[9px] sm:text-[10px] text-white/90 space-y-1 list-disc pl-3 font-semibold leading-normal text-left w-full max-w-[220px]">
                        <li>Delivering superior quality products.</li>
                        <li>Providing innovative customized solutions.</li>
                        <li>Maintaining transparent business practices.</li>
                        <li>Ensuring customer satisfaction.</li>
                        <li>Continuously improving through tech.</li>
                        <li>Building long-term partnerships.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Desktop Connecting Bridge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
                className="hidden lg:flex items-center justify-center w-36 shrink-0 relative z-20 mx-[-3rem]"
              >
                <div className="w-10 h-6 bg-blue-600 rounded-full flex items-center justify-center -mr-2 relative z-10 shadow-sm border border-white">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                <div className="h-0.5 w-20 bg-blue-300" />
                <div className="w-10 h-6 bg-blue-900 rounded-full flex items-center justify-center -ml-2 relative z-10 shadow-sm border border-white">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              </motion.div>

              {/* Right Card: OUR VISION (Spin into view on scroll) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: 45, x: 50 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.85, type: "spring", stiffness: 120, damping: 14, delay: 0.35 }}
                className="relative w-[290px] h-[290px] xs:w-80 xs:h-80 sm:w-96 sm:h-96 [perspective:1000px] group shrink-0"
              >
                <div
                  onClick={() => setVisionFlipped(!visionFlipped)}
                  className={`relative w-full h-full duration-700 transition-all [transform-style:preserve-3d] ${visionFlipped ? "[transform:rotateY(180deg)]" : ""
                    } lg:group-hover:[transform:rotateY(180deg)] cursor-pointer`}
                >
                  {/* FRONT SIDE */}
                  <div
                    className="absolute inset-0 w-full h-full [backface-visibility:hidden] -webkit-backface-visibility-hidden"
                  >
                    <div className="absolute inset-4 bg-white border-2 border-dashed border-blue-200 shadow-xl rounded-[2.5rem] [transform:rotate(45deg)] transition-all duration-300 lg:group-hover:border-solid lg:group-hover:border-blue-900 lg:group-hover:shadow-blue-200" />

                    <div className="absolute bottom-[8px] right-[8px] w-24 h-24 border-b-8 border-r-8 border-blue-900 rounded-br-[2rem] pointer-events-none" />

                    <div className="absolute inset-8 flex flex-col items-center justify-center text-center p-6 space-y-3 sm:space-y-4">
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-900 shadow-sm border border-blue-100">
                        <Compass size={22} className="stroke-[2.5]" />
                      </div>

                      <h3 className="text-lg sm:text-xl font-display font-black text-blue-900 uppercase tracking-wider">
                        Our Vision
                      </h3>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[210px] font-semibold">
                        To become India's preferred engineering company for aluminium profile systems and industrial automation by providing innovative products and dependable service.
                      </p>

                      <span className="text-[9px] font-mono font-bold text-blue-900 uppercase tracking-widest animate-pulse lg:block hidden">
                        Hover to flip
                      </span>
                      <span className="text-[9px] font-mono font-bold text-blue-900 uppercase tracking-widest animate-pulse lg:hidden block">
                        Tap to flip
                      </span>
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div
                    className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] -webkit-backface-visibility-hidden text-white"
                  >
                    <div className="absolute inset-4 bg-[#0a1128] border-2 border-blue-400 shadow-2xl rounded-[2.5rem] [transform:rotate(45deg)]" />

                    <div className="absolute inset-8 flex flex-col items-center justify-center p-6 text-center">
                      <h3 className="text-xs sm:text-sm font-black text-blue-400 font-display uppercase tracking-widest mb-3 text-center border-b border-blue-500/20 pb-1.5 w-full">
                        Our Aspiration
                      </h3>
                      <p className="text-[10px] sm:text-xs text-white/90 leading-relaxed font-semibold">
                        We aspire to be recognized globally for engineering excellence, product quality, customer satisfaction, and technological innovation.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>

          </div>
        </section>

        {/* ─── OUR SIX OPERATING PILLARS SECTION (2-COLUMN SIDE-BY-SIDE: PHOTO & INFO) ─── */}
        <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-blue-50/20 to-slate-50 border-b border-blue-100 relative overflow-hidden">
          {/* Background grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16"
            >
              <span className="inline-flex items-center gap-2 bg-[#0a1128] text-white rounded-full px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                SIT BLUEPRINT
              </span>
              <h2 className="text-2xl xs:text-3xl sm:text-5xl font-display font-black text-[#0f172a] tracking-tight">
                Our Six Operating Pillars
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-semibold max-w-2xl mx-auto leading-relaxed">
                Foundational structural tenets guiding every lean shopfloor assembly line and workstation engineered at SI Technology.
              </p>
            </motion.div>



            {/* 2-Column Side-by-Side Showcase */}
            <div
              onMouseEnter={() => setPillarPaused(true)}
              onMouseLeave={() => setPillarPaused(false)}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch max-w-6xl mx-auto"
            >
              {/* LEFT COLUMN: ACTIVE PHOTO CARD & THUMBNAILS */}
              <motion.div
                initial={{ opacity: 0, x: -50, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                className="lg:col-span-6 flex flex-col justify-between bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-[0_15px_35px_rgba(15,23,42,0.08)] relative overflow-hidden"
              >
                {/* Top Accent Gradient Bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-sky-400 to-blue-800" />

                {/* Main Photo Display */}
                <div className="relative w-full h-[300px] sm:h-[360px] rounded-2xl overflow-hidden bg-slate-950 group mt-1">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activePillar}
                      src={[
                        "/images/3D IMAGE WITH NAME SI-20260716T110720Z-1-001/3D IMAGE WITH NAME SI/40 X 40 H.png",
                        "/images/workstations/workstations_001.jpg",
                        "/images/strength_01.png",
                        "/images/workstations/workstations_010.jpg",
                        "/images/pipe_joint/pipe_joint_001.jpg",
                        "/images/gallery/conveyor.png"
                      ][activePillar]}
                      alt="Operating Pillar"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.04 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Top Badge Overlay */}
                  <div className="absolute top-4 left-4 bg-[#0a1128]/90 backdrop-blur-md text-white border border-blue-400/30 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider shadow-sm">
                    PILLAR 0{activePillar + 1} / 06
                  </div>

                  {/* Top Tag Overlay */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-blue-900 border border-white px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider shadow-sm">
                    {[
                      "Alloy 6063 T6",
                      "CAD Fitment",
                      "Zero Hidden Fees",
                      "ISO Ergonomics",
                      "100% Reusable",
                      "Partner Cell"
                    ][activePillar]}
                  </div>

                  {/* Bottom Photo Title Overlay */}
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight drop-shadow-md">
                      {[
                        "Engineering Excellence",
                        "Custom Lean Design",
                        "Transparent Valuation",
                        "Ergonomic Optimization",
                        "Continuous Innovation",
                        "Dedicated Support"
                      ][activePillar]}
                    </h3>
                  </div>
                </div>

                {/* 6 Clickable Mini Thumbnails */}
                <div className="flex items-center gap-2 pt-4 overflow-x-auto scrollbar-none">
                  {[
                    "/images/3D IMAGE WITH NAME SI-20260716T110720Z-1-001/3D IMAGE WITH NAME SI/40 X 40 H.png",
                    "/images/workstations/workstations_001.jpg",
                    "/images/strength_01.png",
                    "/images/workstations/workstations_010.jpg",
                    "/images/pipe_joint/pipe_joint_001.jpg",
                    "/images/gallery/conveyor.png"
                  ].map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePillar(idx)}
                      className={`relative h-13 rounded-xl overflow-hidden border-2 transition-all duration-300 flex-1 min-w-[48px] cursor-pointer ${
                        activePillar === idx
                          ? "border-blue-600 scale-105 shadow-md ring-2 ring-blue-600/30"
                          : "border-slate-200 opacity-60 hover:opacity-100 hover:border-blue-300"
                      }`}
                    >
                      <img src={imgUrl} alt={`Pillar ${idx + 1}`} className="w-full h-full object-cover" />
                      <span className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-mono text-xs font-black">
                        0{idx + 1}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* RIGHT COLUMN: PILLAR INFO CARD */}
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="lg:col-span-6 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-9 shadow-[0_15px_35px_rgba(15,23,42,0.08)] flex flex-col justify-between relative min-h-[420px]"
              >
                {/* Top Accent Gradient Bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-sky-400 to-blue-800 rounded-t-3xl" />

                {/* Card Header & Controls */}
                <div className="flex items-center justify-between mb-4 pt-1">
                  <span className="text-xs font-mono font-bold text-blue-900 uppercase tracking-widest bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
                    ACTIVE PILLAR INDEX
                  </span>
                </div>

                {/* Animated Pillar Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePillar}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-5 my-auto"
                  >
                    {/* Index & Tag */}
                    <div className="flex items-center gap-3">
                      <span className="text-3xl sm:text-4xl font-mono font-black text-blue-600 font-display">
                        0{activePillar + 1}
                      </span>
                      <div className="h-0.5 w-10 bg-blue-200" />
                      <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                        {[
                          "Alloy 6063 T6",
                          "CAD Fitment",
                          "Zero Hidden Fees",
                          "ISO Ergonomics",
                          "100% Reusable",
                          "Partner Cell"
                        ][activePillar]}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-display font-black text-[#0f172a] tracking-tight leading-tight">
                      {[
                        "Engineering Excellence",
                        "Custom Lean Design",
                        "Transparent Valuation",
                        "Ergonomic Optimization",
                        "Continuous Innovation",
                        "Dedicated Support"
                      ][activePillar]}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                      {[
                        "High-tensile aluminium profiles with >15μ matte anodizing for maximum strength, durability, and structural integrity under heavy industrial loads.",
                        "Pre-fabricated machine cells & guards tailored precisely to your CAD models, guaranteeing zero-tolerance assembly and fast shopfloor deployment.",
                        "Itemized BOMs and predictable upfront proposal costs ensure complete financial clarity, helping you budget with absolute confidence.",
                        "Worker-centric reach zones and height-adjustable modular layouts engineered for maximum productivity, safety, and operator comfort.",
                        "Modular T-slot frames engineered to expand, adapt, or completely rebuild as your shopfloor demands and production lines evolve.",
                        "From 3D concept reviews to step-by-step assembly guides, our dedicated engineering team supports you at every stage of the project."
                      ][activePillar]}
                    </p>

                    {/* Checklist */}
                    <div className="space-y-2.5 pt-3 border-t border-slate-100">
                      {[
                        ["Aluminium Alloy Grade 6063-T6", "Surface anodizing > 15 Microns", "DIN European Standards compliant"],
                        ["100% CAD model match guarantee", "Pre-drilled & pre-tapped flatpacks", "Zero-gap structural alignment"],
                        ["Itemized Bill of Materials (BOM)", "Upfront fixed cost proposals", "No hidden hardware charges"],
                        ["Height-adjustable workstations", "Integrated LED & tool mounts", "Anti-fatigue shopfloor layout"],
                        ["Reusable T-slot profiles & joints", "Scalable modular framework", "Future-proof shopfloor expansion"],
                        ["Dedicated technical CAD support", "Step-by-step assembly manuals", "Pan-India delivery & site guidance"]
                      ][activePillar].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.08 }}
                          className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800"
                        >
                          <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                          <span>{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Footer Controls: Number Buttons & Arrows */}
                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                  {/* Number Pills */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {[0, 1, 2, 3, 4, 5].map((idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePillar(idx)}
                        className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full font-mono text-xs font-black transition-all cursor-pointer ${
                          activePillar === idx
                            ? "bg-blue-600 text-white scale-110 shadow-md shadow-blue-600/30"
                            : "bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>

                  {/* Arrow Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActivePillar((prev) => (prev - 1 + 6) % 6)}
                      className="w-9 h-9 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white border border-slate-200 text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
                      aria-label="Previous pillar"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => setActivePillar((prev) => (prev + 1) % 6)}
                      className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all cursor-pointer shadow-md shadow-blue-600/30 active:scale-95"
                      aria-label="Next pillar"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </section>

      </div>
    </>
  );
}
