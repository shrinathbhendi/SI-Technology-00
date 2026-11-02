import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowRight, Phone, Mail } from "lucide-react";
import { FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import categoriesData from "../../data/Categories.json";
import { SITE_CONFIG } from "../../constants/siteConfig";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  const dropdownRef = useRef(null);
  const location = useLocation();

  // Handle scroll to make top-bar slide up
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset mobile products dropdown when mobile menu closes
  useEffect(() => {
    if (!mobileMenuOpen) {
      setMobileProductsOpen(false);
    }
  }, [mobileMenuOpen]);

  return (
    <>
      {/* ─── FULL-WIDTH HEADER WRAPPER ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-transform duration-300 ${
          isScrolled ? "-translate-y-8 shadow-md" : "translate-y-0"
        }`}
      >
        {/* 1. TOP BAR (Height: 32px / h-8) */}
        <div className="h-8 bg-[#0a1128] text-white flex items-center justify-between px-4 sm:px-6 lg:px-8 select-none border-b border-blue-900/40">
          {/* Left: Contact Info */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href={`tel:${SITE_CONFIG.contact.phoneTel}`}
              className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-blue-200 hover:text-white transition-colors"
            >
              <Phone size={12} className="text-blue-400" />
              <span>{SITE_CONFIG.contact.phone}</span>
            </a>
            <a
              href={`mailto:${SITE_CONFIG.contact.email}`}
              className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-blue-200 hover:text-white transition-colors"
            >
              <Mail size={12} className="text-blue-400" />
              <span className="hidden sm:inline">{SITE_CONFIG.contact.email}</span>
              <span className="inline sm:hidden">Email</span>
            </a>
          </div>

          {/* Right: Social icons */}
          <div className="flex items-center gap-2">
            <a
              href={SITE_CONFIG.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-5 h-5 rounded-full bg-blue-500/20 hover:bg-blue-600 flex items-center justify-center text-white transition-colors border border-blue-400/20"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={11} />
            </a>
            <a
              href={SITE_CONFIG.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-5 h-5 rounded-full bg-blue-500/20 hover:bg-blue-600 flex items-center justify-center text-white transition-colors border border-blue-400/20"
              aria-label="YouTube"
            >
              <FaYoutube size={11} />
            </a>

            <a
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-5 h-5 rounded-full bg-blue-500/20 hover:bg-blue-600 flex items-center justify-center text-white transition-colors border border-blue-400/20"
              aria-label="Instagram"
            >
              <FaInstagram size={11} />
            </a>
          </div>
        </div>

        {/* 2. MAIN NAVIGATION BAR (Small compact header height) */}
        <div className="h-14 sm:h-16 lg:h-18 bg-white border-b border-blue-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-10 shadow-sm">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 shrink-0 py-0"
          >
            <div className="flex items-center">
              <img
                src="/images/logo/si-technology-new-logo.png"
                alt="SI Technology Logo"
                className="h-[46px] sm:h-[58px] lg:h-[68px] w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-3">
            <NavLink
              to="/"
              onClick={() => setDropdownOpen(false)}
              className={({ isActive }) =>
                `px-3.5 lg:px-4 py-2.5 text-xs lg:text-[13.5px] xl:text-sm font-bold uppercase tracking-wider transition-colors ${
                  isActive ? "text-blue-600 underline decoration-2 underline-offset-4 font-black" : "text-slate-700 hover:text-blue-600"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setDropdownOpen(false)}
              className={({ isActive }) =>
                `px-3.5 lg:px-4 py-2.5 text-xs lg:text-[13.5px] xl:text-sm font-bold uppercase tracking-wider transition-colors ${
                  isActive ? "text-blue-600 underline decoration-2 underline-offset-4 font-black" : "text-slate-700 hover:text-blue-600"
                }`
              }
            >
              About Us
            </NavLink>

            {/* Products Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div className="flex items-center gap-0.5 cursor-pointer">
                <Link
                  to="/products"
                  className={`px-3.5 lg:px-4 py-2.5 text-xs lg:text-[13.5px] xl:text-sm font-bold uppercase tracking-wider transition-colors ${
                    location.pathname.includes("/products")
                      ? "text-blue-600 underline decoration-2 underline-offset-4 font-black"
                      : "text-slate-700 hover:text-blue-600"
                  }`}
                >
                  Products
                </Link>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 text-slate-500 ${
                    dropdownOpen ? "rotate-180 text-blue-600" : ""
                  }`}
                />
              </div>

              {/* Floating Submenu */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-blue-100 py-3 px-2 z-50"
                  >
                    <div className="px-3 pb-2 mb-2 border-b border-blue-100 text-[10px] font-mono font-bold text-blue-600/70 uppercase tracking-widest">
                      Extrusion &amp; Assembly Systems
                    </div>

                    {categoriesData.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/products?category=${cat.slug}`}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-800 hover:bg-blue-50 hover:text-blue-600 transition-colors group"
                      >
                        <span>{cat.name}</span>
                        <ArrowRight
                          size={12}
                          className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600"
                        />
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink
              to="/gallery"
              onClick={() => setDropdownOpen(false)}
              className={({ isActive }) =>
                `px-3.5 lg:px-4 py-2.5 text-xs lg:text-[13.5px] xl:text-sm font-bold uppercase tracking-wider transition-colors ${
                  isActive ? "text-blue-600 underline decoration-2 underline-offset-4 font-black" : "text-slate-700 hover:text-blue-600"
                }`
              }
            >
              Gallery
            </NavLink>

            <NavLink
              to="/contact"
              onClick={() => setDropdownOpen(false)}
              className={({ isActive }) =>
                `px-3.5 lg:px-4 py-2.5 text-xs lg:text-[13.5px] xl:text-sm font-bold uppercase tracking-wider transition-colors ${
                  isActive ? "text-blue-600 underline decoration-2 underline-offset-4 font-black" : "text-slate-700 hover:text-blue-600"
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Contact Button */}
          <div className="flex items-center gap-3">
            <Link
              to="/request-quote"
              className="hidden sm:inline-block bg-blue-600 hover:bg-blue-700 text-white font-display font-black tracking-wider text-xs sm:text-sm px-6 py-2.5 rounded-full uppercase transition-all duration-300 shadow-md shadow-blue-600/30 hover:shadow-lg hover:shadow-blue-600/40 no-underline hover:-translate-y-0.5"
            >
              Request a Quote
            </Link>

            {/* Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-800 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Responsive Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-[#0a1128]/98 backdrop-blur-xl text-white z-40 pt-24 pb-8 px-6 overflow-y-auto flex flex-col justify-between lg:hidden"
          >
            <div className="space-y-6">
              {/* Navigation Links */}
              <div className="flex flex-col gap-4 text-lg font-bold uppercase tracking-wider">
                <Link
                  to="/"
                  className="hover:text-blue-400 border-b border-blue-900/50 pb-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="hover:text-blue-400 border-b border-blue-900/50 pb-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>

                {/* Mobile Products Menu Item with Collapsible Submenu */}
                <div className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    className="flex items-center justify-between w-full text-left hover:text-blue-400 border-b border-blue-900/50 pb-3 font-bold text-lg uppercase tracking-wider bg-transparent border-0 text-white outline-none cursor-pointer"
                  >
                    <span>Products</span>
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-300 text-blue-300/70 ${
                        mobileProductsOpen ? "rotate-180 text-blue-400" : ""
                      }`}
                    />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {mobileProductsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden flex flex-col pl-4 gap-3 pt-3"
                      >
                        <Link
                          to="/products"
                          className="text-sm font-bold uppercase tracking-wider text-blue-200 hover:text-white transition-colors pb-1 border-b border-blue-900/30"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileProductsOpen(false);
                          }}
                        >
                          All Products
                        </Link>
                        {categoriesData.map((cat) => (
                          <Link
                            key={cat.id}
                            to={`/products?category=${cat.slug}`}
                            className="text-sm font-bold uppercase tracking-wider text-blue-200 hover:text-white transition-colors pb-1 border-b border-blue-900/30 last:border-0"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileProductsOpen(false);
                            }}
                          >
                            {cat.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Link
                  to="/gallery"
                  className="hover:text-blue-400 border-b border-blue-900/50 pb-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Gallery
                </Link>
                <Link
                  to="/contact"
                  className="hover:text-blue-400 pb-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="space-y-3 pt-6 border-t border-blue-900/60">
              <Link
                to="/request-quote"
                className="flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 font-bold py-3.5 px-6 rounded-full w-full text-center text-sm uppercase tracking-wider transition-colors shadow-lg shadow-blue-600/30"
                onClick={() => setMobileMenuOpen(false)}
              >
                Request a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
