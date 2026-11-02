import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, FileText, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { getWhatsAppUrl, SITE_CONFIG } from "../../constants/siteConfig";

export default function FloatingButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* Phone Call Float */}
      <a
        href={`tel:${SITE_CONFIG.contact.phoneTel}`}
        className="w-12 h-12 rounded-full bg-[#0a1128] hover:bg-blue-900 text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer border border-blue-500/20 shadow-blue-950/40"
        aria-label="Call Us"
        title="Call Us"
      >
        <Phone size={20} />
      </a>

      {/* WhatsApp Float */}
      <a
        href={getWhatsAppUrl("Hi, I am browsing your website and want to discuss custom engineering profiles.")}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer border border-emerald-400/20"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp size={24} />
      </a>

      {/* Floating Quote Trigger (Mobile Only, since it's in Navbar on desktop) */}
      <Link
        to="/request-quote"
        className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer sm:hidden border border-blue-400/20 shadow-blue-600/40"
        aria-label="Request Quote"
        title="Request Quote"
      >
        <FileText size={20} />
      </Link>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full bg-[#0a1128] hover:bg-blue-600 text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer border border-blue-500/30 animate-fade-in"
          aria-label="Scroll to top"
          title="Scroll to Top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
