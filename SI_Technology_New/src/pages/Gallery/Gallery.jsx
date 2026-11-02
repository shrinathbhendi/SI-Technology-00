import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ZoomIn } from "lucide-react";
import { motion } from "framer-motion";
import { galleryItems, getCategoryForItem } from "../../data/galleryItems";

export default function Gallery() {
  const [filter, setFilter] = useState("all");
  const [openLightbox, setOpenLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Filter items
  const filteredItems = filter === "all"
    ? galleryItems
    : galleryItems.filter(item => getCategoryForItem(item) === filter);

  // Slides format for yet-another-react-lightbox
  const slides = filteredItems.map(item => ({
    src: item.src,
    title: item.title,
    description: item.desc
  }));

  const handleImageClick = (index) => {
    setLightboxIndex(index);
    setOpenLightbox(true);
  };

  return (
    <>
      <Helmet>
        <title>Engineering Gallery &amp; Installations | SI Technology</title>
        <meta name="description" content="View SI Technology's portfolio of custom installations, heavy-duty aluminium profile systems, lean manufacturing conveyors, and factory floor shots." />
      </Helmet>

      <div className="w-full">
        {/* ─── 1. TOP HERO BANNER SECTION (ENGINEERING GALLERY) ─── */}
        <section className="relative overflow-hidden bg-black text-white pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 border-b border-neutral-800">
          {/* Custom Background Image - High Visibility & Brightness */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/gallery_hero_bg.png"
              alt="SI Technology Engineering Gallery"
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
                <span className="text-white font-bold tracking-wider">Engineering Gallery</span>
              </nav>
            </div>

            {/* Main Centered Banner Content (Bright White & High Contrast) */}
            <div className="flex flex-col items-center justify-center text-center space-y-3 py-4">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,1)]">
                Engineering Gallery
              </h1>

              <p className="text-white font-semibold text-xs sm:text-base max-w-2xl tracking-normal leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,1)]">
                Portfolio of Custom Workstations, Machine Guards, FIFO Racks &amp; Shopfloor Systems
              </p>

              {/* Glowing Bright White Accent Line */}
              <div className="w-28 sm:w-40 h-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-full mt-2 shadow-[0_0_15px_rgba(255,255,255,0.9)]" />
            </div>
          </div>
        </section>

        {/* Gallery Grid & Filters Section */}
        <div className="py-16 bg-slate-50 border-t border-blue-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Filters List */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {[
                { id: "all", label: "All Photos" },
                { id: "aluminum_profile", label: "Aluminum Profile Workstation" },
                { id: "customized_workstation", label: "Customized Workstation" },
                { id: "pipe_joints", label: "Pipe & Joints Projects" },
                { id: "fifo_rack", label: "FIFO Rack Projects" },
                { id: "machine_guarding", label: "Machine Guarding Projects" },
                { id: "ms_fabrication", label: "MS Fabrication Projects" }
              ].map(btn => (
                <button
                  key={btn.id}
                  onClick={() => setFilter(btn.id)}
                  className={`text-xs font-bold px-5 py-2.5 rounded-full transition-all border cursor-pointer ${filter === btn.id
                      ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "bg-white border-blue-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Grid layout with 4 columns per row on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => handleImageClick(index)}
                  className="bg-white border border-blue-100 rounded-2xl overflow-hidden shadow-sm hover:border-blue-500 hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative overflow-hidden aspect-[4/3] w-full">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#0a1128]/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <ZoomIn size={18} />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-blue-50 flex-grow flex items-center">
                    <h1 className="text-xs sm:text-sm font-bold text-[#0f172a] group-hover:text-blue-600 transition-colors leading-snug">
                      {item.title}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Overlay */}
      {openLightbox && (
        <Lightbox
          open={openLightbox}
          close={() => setOpenLightbox(false)}
          index={lightboxIndex}
          slides={slides}
        />
      )}
    </>
  );
}
