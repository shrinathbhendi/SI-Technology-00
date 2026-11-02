import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, ArrowRight, Factory } from "lucide-react";
import { FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import { SITE_CONFIG, getMailtoHref } from "../../constants/siteConfig";
import categoriesData from "../../data/Categories.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a1128] text-white border-t border-blue-900/40 relative overflow-hidden">
      {/* Blueprint background lines watermark */}
      <div className="absolute inset-0 bg-grid-light opacity-5 pointer-events-none" />

      {/* Subtle background image watermark */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none z-0"
        style={{ backgroundImage: "url('/images/footer_bg.png')" }}
      />

      {/* ─── MAIN FOOTER CONTENT ─── */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
        {/* Col 1: Company Profile */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-3.5 group no-underline hover:no-underline">
            <div className="relative w-11 h-11 bg-white rounded-lg p-1 transition-all border border-blue-400/20 shadow-md flex items-center justify-center">
              <img
                src="/images/logo/si-technology-new-logo.png"
                alt="SI Technology Logo"
                className="object-contain max-h-full max-w-full"
              />
            </div>
            <div>
              <div className="font-display font-black text-white text-base tracking-wide leading-none no-underline hover:no-underline">
                SI&nbsp;&nbsp;TECHNOLOGY
              </div>
              <div className="text-[10px] text-blue-300/60 font-mono tracking-wider mt-1 uppercase">
                ESTABLISHED 2018
              </div>
            </div>
          </Link>

          <p className="text-blue-100/70 text-sm leading-relaxed font-light">
            SI Technology is a leading Indian provider of premium industrial aluminium profile structures, conveyor paths, cleanroom partitioning, and lean manufacturing automation solutions.
          </p>

          <div className="flex items-center gap-2 text-blue-300/70 text-xs font-mono uppercase tracking-widest">
            <Factory size={14} className="text-blue-400" />
            <span>Made in India</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={SITE_CONFIG.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-blue-900/40 hover:bg-blue-600 hover:text-white text-blue-200 flex items-center justify-center transition-all border border-blue-500/30"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={16} />
            </a>
            <a
              href={SITE_CONFIG.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-blue-900/40 hover:bg-blue-600 hover:text-white text-blue-200 flex items-center justify-center transition-all border border-blue-500/30"
              aria-label="YouTube"
            >
              <FaYoutube size={16} />
            </a>

            <a
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-blue-900/40 hover:bg-blue-600 hover:text-white text-blue-200 flex items-center justify-center transition-all border border-blue-500/30"
              aria-label="Instagram"
            >
              <FaInstagram size={16} />
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-4 lg:pl-10 xl:pl-14">
          <h4 className="font-display font-black text-sm uppercase tracking-wider text-white border-b border-blue-800/50 pb-2 inline-block">
            Quick Links
          </h4>
          <ul className="space-y-2.5">
            {[
              { name: "Home", path: "/" },
              { name: "About Us", path: "/about" },
              { name: "Products", path: "/products" },
              { name: "Gallery", path: "/gallery" },
              { name: "Contact Us", path: "/contact" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="text-blue-100/70 hover:text-blue-400 text-sm transition-colors flex items-center gap-1.5 group"
                >
                  <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-400" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Products & Downloads */}
        <div className="space-y-4">
          <h4 className="font-display font-black text-sm uppercase tracking-wider text-white border-b border-blue-800/50 pb-2 inline-block">
            Products & Downloads
          </h4>
          <ul className="space-y-2.5">
            {categoriesData.map((cat) => (
              <li key={cat.id}>
                <Link
                  to={`/products?category=${cat.slug}`}
                  className="text-blue-100/70 hover:text-blue-400 text-sm transition-colors flex items-center gap-1.5 group"
                >
                  <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-400" />
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contact & Working Hours */}
        <div className="space-y-6">
          <h4 className="font-display font-black text-sm uppercase tracking-wider text-white border-b border-blue-800/50 pb-2 inline-block">
            Contact Office
          </h4>
          <ul className="space-y-3.5">
            <li className="flex items-start gap-3 text-sm text-blue-100/70">
              <MapPin size={16} className="text-blue-400 shrink-0 mt-1" />
              <span className="font-light">
                <strong className="text-white">SI TECHNOLOGY</strong>
                <br />
                {SITE_CONFIG.contact.address.line1}
                <br />
                {SITE_CONFIG.contact.address.line2}
                <br />
                {SITE_CONFIG.contact.address.city} - {SITE_CONFIG.contact.address.zip}, {SITE_CONFIG.contact.address.state}, India
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-blue-400 shrink-0" />
              <div className="text-sm font-semibold text-blue-100/80">
                <a href={`tel:${SITE_CONFIG.contact.phoneTel}`} className="hover:text-blue-400 transition-colors">
                  {SITE_CONFIG.contact.phone}
                </a>
                {" / "}
                <a href={`tel:+919764674113`} className="hover:text-blue-400 transition-colors">
                  {SITE_CONFIG.contact.phoneSecondary}
                </a>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-blue-400 shrink-0" />
              <div className="text-sm">
                <a href={getMailtoHref()} className="hover:text-blue-400 transition-colors font-semibold block text-blue-100/90">
                  {SITE_CONFIG.contact.email}
                </a>
                <a href={`mailto:${SITE_CONFIG.contact.emailSecondary}`} className="hover:text-blue-400 transition-colors text-xs text-blue-300/50 block">
                  {SITE_CONFIG.contact.emailSecondary}
                </a>
              </div>
            </li>
            <li className="flex items-center gap-3 text-sm text-blue-100/70 border-t border-blue-900/40 pt-3">
              <Clock size={16} className="text-blue-400 shrink-0" />
              <span className="font-light text-xs">{SITE_CONFIG.contact.workingHours}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ─── BOTTOM COPYRIGHT BAR ─── */}
      <div className="border-t border-blue-900/50 bg-[#030712] py-6 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-2 text-xs text-blue-200/70 text-center">
          <p>© {currentYear} {SITE_CONFIG.company.name}. All rights reserved.</p>
          <p className="font-light text-blue-200/50">
            Developed By{" "}
            <a
              href="https://mindaxisinnovation.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 transition-colors font-semibold"
            >
              MindAxis Innovation Pvt Ltd.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
