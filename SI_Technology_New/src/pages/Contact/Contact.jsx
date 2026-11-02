import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { SITE_CONFIG, getWhatsAppUrl, getMailtoHref, getTelHref } from "../../constants/siteConfig";

export default function Contact() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm();

  const [formSuccess, setFormSuccess] = useState(false);

  const onSubmit = (data) => {
    // Validate phone number is exactly 10 digits
    if (!/^[0-9]{10}$/.test(data.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    // Generate WhatsApp link and redirect
    const message = `*New Website Inquiry*\n\n` +
                    `*Name:* ${data.name}\n` +
                    `*Company:* ${data.company || "N/A"}\n` +
                    `*Email:* ${data.email}\n` +
                    `*Phone:* ${data.phone}\n` +
                    `*Subject:* ${data.subject}\n\n` +
                    `*Message:* ${data.message}`;

    const whatsappUrl = getWhatsAppUrl(message);
    
    // Redirect / open WhatsApp
    window.open(whatsappUrl, "_blank");

    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      reset();
    }, 3000);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | SI Technology Pune</title>
        <meta name="description" content="Reach out to SI Technology in Dhayari, Pune. Get driving directions, phone numbers, corporate emails, and submit inquiries for aluminium profiles." />
      </Helmet>

      <div className="w-full bg-dark-50">
        
        {/* ─── 1. TOP HERO BANNER SECTION (CONTACT US) ─── */}
        <section className="relative overflow-hidden bg-black text-white pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 border-b border-neutral-800">
          {/* Custom Background Image - High Visibility & Brightness */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/workstations/workstations_001.jpg"
              alt="SI Technology Contact Us Industrial Facility"
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
                <span className="text-white font-bold tracking-wider">Contact Us</span>
              </nav>
            </div>

            {/* Main Centered Banner Content (Bright White & High Contrast) */}
            <div className="flex flex-col items-center justify-center text-center space-y-3 py-4">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,1)]">
                Contact Us
              </h1>

              <p className="text-white font-semibold text-xs sm:text-base max-w-2xl tracking-normal leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,1)]">
                Connect with Our Engineering Team for Aluminium Extrusions, Workstations &amp; Turnkey Automation
              </p>

              {/* Glowing Bright White Accent Line */}
              <div className="w-28 sm:w-40 h-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-full mt-2 shadow-[0_0_15px_rgba(255,255,255,0.9)]" />
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 border-t border-blue-100">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch mb-8 sm:mb-10">
            {/* Left: Contact Info cards (5 cols) - Order 2 on Mobile, Order 1 on Desktop */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col gap-6">
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-black text-[#0f172a] font-display text-center lg:text-left">Talk to Our Team</h2>
              
              <div className="bg-white border border-blue-100 rounded-3xl p-5 sm:p-8 shadow-md flex-1 space-y-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
                
                {/* Physical Address */}
                <div className="flex gap-4 relative z-10">
                  <div className="w-10 h-10 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-blue-600 uppercase tracking-widest block font-bold leading-none">Office &amp; Shed Location</span>
                    <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-light">
                      <strong>SI TECHNOLOGY</strong>
                      <br />
                      {SITE_CONFIG.contact.address.line1}
                      <br />
                      {SITE_CONFIG.contact.address.line2}
                      <br />
                      {SITE_CONFIG.contact.address.city} - {SITE_CONFIG.contact.address.zip}, {SITE_CONFIG.contact.address.state}, India
                    </p>
                  </div>
                </div>

                {/* Telephone Numbers */}
                <div className="flex gap-4 relative z-10">
                  <div className="w-10 h-10 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-blue-600 uppercase tracking-widest block font-bold leading-none">Phone Lines</span>
                    <a href={getTelHref()} className="text-slate-800 text-sm font-semibold hover:text-blue-600 transition-colors block">
                      {SITE_CONFIG.contact.phone}
                    </a>
                    <a href="tel:+919764674113" className="text-slate-800 text-sm font-semibold hover:text-blue-600 transition-colors block">
                      {SITE_CONFIG.contact.phoneSecondary}
                    </a>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex gap-4 relative z-10">
                  <div className="w-10 h-10 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-blue-600 uppercase tracking-widest block font-bold leading-none">Email Address</span>
                    <a href={getMailtoHref()} className="text-slate-800 text-sm font-semibold hover:text-blue-600 transition-colors block">
                      {SITE_CONFIG.contact.email}
                    </a>
                    <a href={`mailto:${SITE_CONFIG.contact.emailSecondary}`} className="text-slate-500 text-xs hover:text-blue-600 transition-colors block">
                      {SITE_CONFIG.contact.emailSecondary}
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex gap-4 relative z-10">
                  <div className="w-10 h-10 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <Clock size={18} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-blue-600 uppercase tracking-widest block font-bold leading-none">Business Hours</span>
                    <p className="text-slate-700 text-xs sm:text-sm font-light">
                      {SITE_CONFIG.contact.workingHours}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Contact Form (7 cols) - Order 1 on Mobile so it is visible first! */}
            <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-6">
              <div className="space-y-1.5 text-center lg:text-left">
                <h2 className="text-xl xs:text-2xl sm:text-3xl font-black text-[#0f172a] font-display">
                  Share Your Requirement With Us
                </h2>
                <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
                  Send us your drawing, dimensions, application details or product requirement, and our team will help you identify the appropriate solution.
                </p>
              </div>
              
              <div className="bg-[#0f172a] text-white border border-blue-900 rounded-3xl p-5 sm:p-8 shadow-xl flex-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-light opacity-5 pointer-events-none" />

                {formSuccess ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-400 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <Check size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white font-display">Redirecting to WhatsApp...</h3>
                    <p className="text-white/70 text-xs font-light max-w-sm leading-relaxed">
                      Thank you for contacting us. We are opening WhatsApp to submit your message. Our engineering team will respond within 24 business hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1.5 font-mono">Full Name</label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          {...register("name", { required: true })}
                          className={`w-full bg-[#0a1128] border rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-blue-500 transition-colors ${
                            errors.name ? "border-red-500" : "border-blue-800"
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1.5 font-mono">Company / Plant</label>
                        <input
                          type="text"
                          placeholder="Your Company Name"
                          {...register("company")}
                          className="w-full bg-[#0a1128] border border-blue-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1.5 font-mono">Email</label>
                        <input
                          type="email"
                          placeholder="name@company.com"
                          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                          className={`w-full bg-[#0a1128] border rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-blue-500 transition-colors ${
                            errors.email ? "border-red-500" : "border-blue-800"
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1.5 font-mono">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="9876543210"
                          {...register("phone", { 
                            required: "Phone number is required",
                            pattern: {
                              value: /^[0-9]{10}$/,
                              message: "Phone number must be exactly 10 digits"
                            },
                            onChange: (e) => {
                              e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
                            }
                          })}
                          className={`w-full bg-[#0a1128] border rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-blue-500 transition-colors ${
                            errors.phone ? "border-red-500" : "border-blue-800"
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-red-400 text-[10px] mt-1 font-semibold">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1.5 font-mono">Subject Topic</label>
                      <select
                        {...register("subject", { required: true })}
                        className="w-full bg-[#0a1128] border border-blue-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                      >
                        <option value="Product Price & Quote" className="bg-[#0a1128] text-white">Product Price &amp; Quote Request</option>
                        <option value="Custom Workstation Design" className="bg-[#0a1128] text-white">Custom Workstation Design Support</option>
                        <option value="Pipe Joint Racking Layout" className="bg-[#0a1128] text-white">Pipe &amp; Joint Lean Systems Inquiry</option>
                        <option value="Safety Guard Fencing Layout" className="bg-[#0a1128] text-white">Safety Guard Boundary Inquiry</option>
                        <option value="Other Shopfloor Requirement" className="bg-[#0a1128] text-white">Other Shopfloor Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1.5 font-mono">Inquiry Message</label>
                      <textarea
                        rows={4}
                        placeholder="Detail your parameters: e.g. Aluminium Profile 40x40 Heavy, 120 meters, pre-cut to 3.2m lengths, with M8 hammer nuts."
                        {...register("message", { required: true })}
                        className={`w-full bg-[#0a1128] border rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-blue-500 transition-colors resize-none ${
                          errors.message ? "border-red-500" : "border-blue-800"
                        }`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl justify-center text-xs py-3.5 shadow-lg shadow-blue-600/30 transition-all duration-300 flex items-center gap-2"
                    >
                      <Send size={14} /> Submit Your Requirement
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Google Map Map */}
          <div className="bg-white border border-blue-100 rounded-3xl p-5 sm:p-8 shadow-sm">
            <h3 className="font-display font-black text-sm uppercase tracking-wider text-[#0f172a] mb-4">
              Map Directions
            </h3>
            <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden border border-blue-100">
              <iframe
                src={SITE_CONFIG.contact.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SI Technology Location directions map"
              />
              <div className="absolute top-4 left-4 z-10">
                <a
                  href={SITE_CONFIG.contact.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase tracking-wider px-4 py-2 rounded-lg border border-white/10 shadow-lg block"
                >
                  Open in Google Maps App ↗
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
