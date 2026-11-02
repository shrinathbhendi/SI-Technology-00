import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Mail, MessageCircle, Info, ChevronRight, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import productsData from "../../data/Products.json";
import { SITE_CONFIG, getWhatsAppUrl, getMailtoHref } from "../../constants/siteConfig";

export default function ProductDetails() {
  const { slug } = useParams();
  
  // Find product by id (e.g. sit-2020ts) or code (e.g. SIT-2020TS)
  const product = productsData.find(
    p => p.id === slug || p.code.toLowerCase() === slug
  );

  // RFQ modal state
  const [showRfqModal, setShowRfqModal] = useState(false);
  const [rfqSuccess, setRfqSuccess] = useState(false);
  const [rfqData, setRfqData] = useState({
    name: "",
    email: "",
    quantity: "",
    notes: ""
  });

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-4">
        <h2 className="text-2xl font-bold text-primary-900">Product Not Found</h2>
        <p className="text-dark-500 text-sm">
          The requested engineering SKU does not exist in our catalog database.
        </p>
        <Link to="/products" className="btn-primary inline-flex">
          Back to Catalogue
        </Link>
      </div>
    );
  }

  // Get related products (same category, exclude current)
  const relatedProducts = productsData
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleRfqSubmit = (e) => {
    e.preventDefault();
    setRfqSuccess(true);
    setTimeout(() => {
      setRfqSuccess(false);
      setShowRfqModal(false);
      setRfqData({ name: "", email: "", quantity: "", notes: "" });
    }, 2500);
  };

  const whatsappInquiryUrl = getWhatsAppUrl(
    `Hi SI Technology, I am interested in your product: ${product.name} (Code: ${product.code}). Please share price and delivery time.`
  );

  return (
    <>
      <Helmet>
        <title>{`${product.name} (${product.code}) | SI Technology`}</title>
        <meta name="description" content={`Get specifications, weight, material, slot details, and applications for ${product.name} (Code: ${product.code}) from SI Technology.`} />
      </Helmet>

      <div className="w-full pt-28 sm:pt-32 lg:pt-36 pb-14 bg-dark-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          
          {/* Breadcrumb & Back button */}
          <div className="flex items-center flex-wrap gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 mb-8">
            <Link to="/" className="hover:text-blue-600 font-medium">Home</Link>
            <ChevronRight size={10} />
            <Link to="/products" className="hover:text-blue-600 flex items-center gap-1">
              Catalogue
            </Link>
            <ChevronRight size={10} />
            <Link to={`/products?category=${product.category}`} className="hover:text-blue-600">
              {product.category.replace("-", " ")}
            </Link>
            <ChevronRight size={10} />
            <span className="text-blue-950 font-bold">{product.code}</span>
          </div>

          {/* Main Layout Card */}
          <div className="bg-white border border-blue-100 rounded-3xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-10 shadow-sm relative overflow-hidden mb-12">
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
            
            {/* Left: Image Zoom Panel (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="aspect-square bg-slate-50 border border-blue-100 rounded-2xl p-8 flex items-center justify-center relative overflow-hidden group">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-3 right-3 bg-white/90 border border-blue-100 text-[10px] font-mono uppercase px-2 py-1 rounded shadow-sm text-blue-900">
                  Zoom Hover
                </div>
              </div>
            </div>

            {/* Right: Spec Info (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-blue-600 text-white text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded shadow-sm">
                    Code: {product.code}
                  </span>
                  <span className="bg-blue-50 border border-blue-200 text-blue-800 text-xs font-mono px-3 py-1 rounded font-semibold">
                    {product.material}
                  </span>
                </div>

                <h1 className="text-xl sm:text-3xl font-display font-black text-[#0f172a] tracking-tight leading-tight">
                  {product.name}
                </h1>
                
                <p className="text-slate-600 text-sm leading-relaxed font-light">
                  {product.description}
                </p>

                {/* Applications list */}
                {product.application && product.application.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <h4 className="font-display font-black text-xs uppercase tracking-wider text-slate-400">Applications</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.application.map((app, index) => (
                        <span 
                          key={index} 
                          className="bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold px-3.5 py-1.5 rounded-lg"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100">
                <button
                  onClick={() => setShowRfqModal(true)}
                  className="flex-1 btn-primary justify-center text-sm shadow-md shadow-blue-600/30"
                >
                  <Mail size={16} /> Request Quote (RFQ)
                </button>
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-full text-sm transition-all shadow-md"
                >
                  <FaWhatsapp size={16} /> WhatsApp Inquiry
                </a>
              </div>
            </div>
          </div>

          {/* Technical Specifications Tab Panel */}
          <div className="bg-white border border-blue-100 rounded-3xl p-6 sm:p-8 shadow-sm mb-12">
            <h3 className="font-display font-black text-lg text-[#0f172a] mb-6 flex items-center gap-2">
              <Info size={20} className="text-blue-600" /> Technical Parameters
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Specs Table */}
              <div className="border border-blue-100 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#0a1128] text-white font-mono uppercase tracking-widest text-[10px]">
                      <th className="px-4 py-3">Parameter</th>
                      <th className="px-4 py-3">Specification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-50 bg-white">
                    <tr className="hover:bg-blue-50/50">
                      <td className="px-4 py-3 font-semibold text-slate-800">Grade Alloy</td>
                      <td className="px-4 py-3 text-slate-600">Aluminium 6063 T6 (DIN Compliant)</td>
                    </tr>
                    <tr className="hover:bg-blue-50/50">
                      <td className="px-4 py-3 font-semibold text-slate-800">Finish Coating</td>
                      <td className="px-4 py-3 text-slate-600">{product.finish || "Silver Anodized"}</td>
                    </tr>
                    {Object.entries(product.specs).map(([key, val]) => (
                      <tr key={key} className="hover:bg-blue-50/50">
                        <td className="px-4 py-3 font-semibold text-slate-800 capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </td>
                        <td className="px-4 py-3 text-slate-600">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Extra Guidelines */}
              <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 flex flex-col justify-between">
                <div className="space-y-4">
                  <h4 className="font-display font-black text-sm text-[#0f172a]">Assembly &amp; Customization Rules</h4>
                  <ul className="space-y-2 text-xs text-slate-600 leading-relaxed font-light">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      Profiles can be pre-cut to exact custom lengths in our facility to prevent on-site scrap.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      Tapping, slotting, and counter-boring services are executed as per structural layout drawings.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      Compatible brackets, hammer nuts, and hidden connectors are bundled in standard pack counts.
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white border border-blue-100 rounded-xl p-4 mt-6">
                  <p className="text-[10px] text-blue-600 font-mono uppercase tracking-widest leading-none mb-1">Central Helpdesk</p>
                  <p className="text-xs text-slate-700">
                    Submit structural loading inquiries directly to <strong>{SITE_CONFIG.contact.email}</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="space-y-6">
              <h3 className="font-display font-black text-lg text-[#0f172a]">Related Components</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/products/${rel.code.toLowerCase()}`}
                    className="bg-white border border-blue-100 hover:border-blue-500 rounded-2xl p-4 transition-all duration-300 hover:shadow-md flex flex-col justify-between h-full group"
                  >
                    <div>
                      <div className="aspect-square bg-slate-50 border border-blue-50 rounded-xl mb-3 p-4 flex items-center justify-center">
                        <img 
                          src={rel.image} 
                          alt={rel.name} 
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-all"
                        />
                      </div>
                      <h4 className="text-xs font-bold text-[#0f172a] group-hover:text-blue-600 transition-colors line-clamp-2">
                        {rel.name}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-blue-600 mt-3 block">
                      Code: {rel.code}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* RFQ MODAL PANEL */}
      {showRfqModal && (
        <div className="fixed inset-0 z-50 bg-[#0a1128]/70 backdrop-blur-sm flex items-center justify-center px-4 py-8">
          <div className="bg-white rounded-3xl border border-blue-100 shadow-2xl p-6 sm:p-8 max-w-md w-full relative">
            
            <button 
              onClick={() => setShowRfqModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-2 cursor-pointer font-bold text-xs"
            >
              Cancel
            </button>

            {rfqSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <Check size={28} />
                </div>
                <h3 className="text-lg font-bold text-[#0f172a] font-display">Inquiry Sent Successfully</h3>
                <p className="text-slate-500 text-xs font-light leading-relaxed max-w-xs mx-auto">
                  Thank you! Our engineering cell has received your RFQ for <strong>{product.code}</strong> and will email your quote within 24 hours.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-blue-600 uppercase tracking-widest block font-bold">Request For Quote</span>
                  <h3 className="text-lg font-bold text-[#0f172a] font-display">Inquire: {product.code}</h3>
                  <p className="text-[11px] text-slate-500 leading-normal font-light">
                    Fill out the fields to receive an official PDF quote with current shipping weights and lead times.
                  </p>
                </div>

                <form onSubmit={handleRfqSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 font-mono">Your Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={rfqData.name}
                      onChange={(e) => setRfqData({...rfqData, name: e.target.value})}
                      placeholder="John Doe" 
                      className="w-full bg-slate-50 border border-blue-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 font-mono">Corporate Email *</label>
                    <input 
                      type="email" 
                      required 
                      value={rfqData.email}
                      onChange={(e) => setRfqData({...rfqData, email: e.target.value})}
                      placeholder="you@company.com" 
                      className="w-full bg-slate-50 border border-blue-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 font-mono">Project Quantity (Mtrs / Pcs) *</label>
                    <input 
                      type="text" 
                      required 
                      value={rfqData.quantity}
                      onChange={(e) => setRfqData({...rfqData, quantity: e.target.value})}
                      placeholder="e.g. 50 meters or 10 pcs" 
                      className="w-full bg-slate-50 border border-blue-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 font-mono">Design Notes / Custom Lengths</label>
                    <textarea 
                      rows={3} 
                      value={rfqData.notes}
                      onChange={(e) => setRfqData({...rfqData, notes: e.target.value})}
                      placeholder="Specify cutting, drilling, tapping requirements or assembly guide requests..." 
                      className="w-full bg-slate-50 border border-blue-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 resize-none"
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full btn-primary justify-center text-xs font-bold py-3 shadow-md shadow-blue-600/30"
                  >
                    Submit RFQ
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
