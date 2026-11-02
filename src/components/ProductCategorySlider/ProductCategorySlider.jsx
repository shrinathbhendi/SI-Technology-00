import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

/* ─── Single Flip Card ─── */
function FlipCard({ cat, isActive }) {
  const [flipped, setFlipped] = useState(false);

  // Reset flip when card scrolls away
  useEffect(() => {
    if (!isActive) setFlipped(false);
  }, [isActive]);

  return (
    <div
      className="relative w-[300px] sm:w-[320px] flex-shrink-0 cursor-pointer"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      {/* Flip Container */}
      <div
        className="relative w-full transition-transform duration-700 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          height: "380px",
        }}
      >
        {/* ── FRONT: Image & Solid Text Box ── */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl border-2 border-dark-200/60 bg-primary-950 flex flex-col"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {/* Image Box */}
          <div className="relative h-[320px] w-full overflow-hidden bg-slate-900">
            <img
              src={cat.img}
              alt={cat.title}
              className="w-full h-full object-cover"
            />
            {/* Top badge */}
            <div className="absolute top-4 left-4">
              <span className="text-xs font-mono font-bold text-white/70 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                {cat.num}
              </span>
            </div>
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-accent-500/90 flex items-center justify-center shadow-lg">
              <ArrowUpRight size={15} className="text-white" />
            </div>
          </div>

          {/* Solid Content Box */}
          <div className="h-[60px] w-full bg-primary-950 border-t border-white/5 px-4 flex items-center justify-center text-center">
            <h3 className="font-display font-black text-xs sm:text-sm text-white uppercase tracking-wider leading-tight">
              {cat.title}
            </h3>
          </div>
        </div>

        {/* ── BACK: Info ── */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl border-2 border-zinc-800 bg-[#09090b] flex flex-col justify-between p-6"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Top accent bar */}
          <div className="w-12 h-1 bg-accent-500 rounded-full mb-2" />

          <div className="space-y-4 flex-1">
            <span className="text-xs font-mono font-bold text-accent-400 uppercase tracking-widest">
              {cat.num} / Category
            </span>
            <h3 className="font-display font-black text-2xl text-white leading-tight">
              {cat.title}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed font-normal">
              {cat.desc}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {cat.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] font-mono font-bold uppercase tracking-wider bg-accent-500/15 text-accent-400 px-2.5 py-1 rounded-full border border-accent-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white/40 uppercase tracking-widest">
                {cat.series}
              </span>
              <div className="w-8 h-8 rounded-full bg-accent-500/20 border border-accent-500/40 flex items-center justify-center">
                <ArrowUpRight size={14} className="text-accent-400" />
              </div>
            </div>
            <Link
              to={cat.link || "/products"}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-white text-xs font-bold uppercase tracking-wider transition-colors duration-200 shadow-lg shadow-accent-500/30"
            >
              Explore Category
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Slider Component ─── */
export default function ProductCategorySlider({ categories }) {
  const trackRef    = useRef(null);
  const isPaused    = useRef(false);
  const animRef     = useRef(null);
  const posRef      = useRef(0);
  const resumeTimer = useRef(null);

  // Duplicate items for seamless infinite scroll
  const items = [...categories, ...categories];

  const CARD_WIDTH  = 330; // card width + gap
  const TOTAL_WIDTH = categories.length * CARD_WIDTH;
  const SPEED       = 0.6; // px per frame (~36px/s at 60fps)

  const animate = useCallback(() => {
    if (!trackRef.current) return;

    if (!isPaused.current) {
      posRef.current += SPEED;
      // Reset position seamlessly when we've scrolled one full set
      if (posRef.current >= TOTAL_WIDTH) posRef.current = 0;
      trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
    }
    animRef.current = requestAnimationFrame(animate);
  }, [TOTAL_WIDTH]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [animate]);

  /* ── Arrow helpers ── */
  const pauseTemporarily = () => {
    isPaused.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => { isPaused.current = false; }, 3000);
  };

  const slideLeft = () => {
    pauseTemporarily();
    posRef.current = Math.max(0, posRef.current - CARD_WIDTH);
    if (trackRef.current)
      trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
  };

  const slideRight = () => {
    pauseTemporarily();
    posRef.current = (posRef.current + CARD_WIDTH) % TOTAL_WIDTH;
    if (trackRef.current)
      trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
  };

  return (
    <section className="py-12 sm:py-16 bg-[#0a1128] relative overflow-hidden">
      {/* Background decor */}
      <div className="absolute inset-0 bg-grid-light opacity-[0.05] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex items-center justify-center gap-2 text-blue-400 text-xs font-mono font-bold uppercase tracking-widest">
            <span className="w-6 h-0.5 bg-blue-500 rounded-full" />
            PRODUCT CATEGORIES
            <span className="w-6 h-0.5 bg-blue-500 rounded-full" />
          </div>
          <h1 className="text-xl xs:text-2xl sm:text-5xl font-display font-black text-white leading-[1.1]">
            Standardized Modular Systems
          </h1>
        </motion.div>
      </div>

      {/* Slider Track */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => { isPaused.current = true; }}
        onMouseLeave={() => { isPaused.current = false; }}
      >
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0a1128] to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0a1128] to-transparent z-10 pointer-events-none" />

        {/* Left arrow — overlaid on slider edge */}
        <button
          onClick={slideLeft}
          aria-label="Previous category"
          className="absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-blue-950/80 hover:bg-blue-600 border border-blue-400/30 hover:border-blue-400 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm shadow-xl"
        >
          <ChevronLeft className="w-5 h-5 lg:w-7 lg:h-7" />
        </button>

        {/* Right arrow — overlaid on slider edge */}
        <button
          onClick={slideRight}
          aria-label="Next category"
          className="absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-blue-950/80 hover:bg-blue-600 border border-blue-400/30 hover:border-blue-400 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm shadow-xl"
        >
          <ChevronRight className="w-5 h-5 lg:w-7 lg:h-7" />
        </button>

        <div
          ref={trackRef}
          className="flex gap-5 py-4 px-6"
          style={{ width: "max-content", willChange: "transform", transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)" }}
        >
          {items.map((cat, idx) => (
            <FlipCard key={idx} cat={cat} isActive={true} />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-10 text-center">
        <Link
          to="/products"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-blue-500/40 bg-blue-600 text-white hover:bg-blue-700 text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all duration-300 group/btn"
        >
          Explore All Categories
          <ArrowRight size={15} className="group-hover/btn:translate-x-1.5 transition-transform duration-300" />
        </Link>
      </div>
    </section>
  );
}
