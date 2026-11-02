import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FileText, Send, Check, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "../../constants/siteConfig";

export default function Quote() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm();

  const [formSuccess, setFormSuccess] = useState(false);

  const onSubmit = (data) => {
    // Generate mailto link dynamically
    const subject = `RFQ Quote Request: Custom Shopfloor Setup`;
    const body = `Name: ${data.name}\nCompany: ${data.company}\nPhone: ${data.phone}\nProfile Series: ${data.series}\nQuantity: ${data.quantity}\nLengths/Details: ${data.notes}`;
    const mailto = `mailto:${SITE_CONFIG.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      reset();
    }, 3000);
  };

  return (
    <>
      <Helmet>
        <title>Request a Quote | SI TECHNOLOGY</title>
        <meta name="description" content="Submit a Request For Quote (RFQ) to SI Technology. Provide T-slot profile series, joint quantities, custom sizes and get prices within 24 hours." />
      </Helmet>

      <div className="w-full bg-[#0a1128]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-36 pb-14">
          {/* Breadcrumb (Centered) */}
          <nav className="flex items-center justify-center gap-2 text-xs sm:text-sm font-mono text-blue-200/70 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-blue-400/40">/</span>
            <span className="text-white font-bold">Request Quote</span>
          </nav>
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-1.5 text-xs text-blue-400 font-bold uppercase tracking-wider">
              RFQ Engine
            </div>
            <h1 className="text-xl xs:text-2xl sm:text-4xl font-display font-black text-white tracking-tight">
              Request a Custom Quote
            </h1>
            <p className="text-blue-100/70 text-sm font-light">
              Submit your project specifications, required profile models, and quantities. We will respond with an official quotation.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full py-16 bg-slate-50 border-t border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Guidelines (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <h2 className="text-lg font-black text-[#0f172a] font-display">Quote Guidelines</h2>
              
              <div className="bg-[#0f172a] text-white rounded-3xl p-6 sm:p-8 flex-1 space-y-6 relative overflow-hidden border border-blue-900 shadow-xl">
                <div className="absolute inset-0 bg-grid-light opacity-5 pointer-events-none" />
                
                <div className="space-y-4 relative z-10">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-md shadow-blue-600/30">
                    <FileText size={20} />
                  </div>
                  <h3 className="text-base font-bold font-display text-white">How we calculate costs</h3>
                  <p className="text-blue-100/70 text-xs leading-relaxed font-light">
                    Quotations are calculated based on raw weight metrics, precision cut frequencies, and matching accessory fastener pack sizes.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-blue-900 relative z-10">
                  <h4 className="text-xs font-bold font-display text-blue-400 uppercase tracking-wider">Required Specs</h4>
                  <ul className="space-y-2.5 text-[11px] text-blue-200/70 leading-relaxed font-light">
                    <li className="flex items-start gap-2">
                      <ShieldCheck size={14} className="text-blue-400 shrink-0 mt-0.5" />
                      Specify profile model (e.g. 2020TS, 4040HV, etc.)
                    </li>
                    <li className="flex items-start gap-2">
                      <ShieldCheck size={14} className="text-blue-400 shrink-0 mt-0.5" />
                      Identify matching bracket &amp; T-nut count
                    </li>
                    <li className="flex items-start gap-2">
                      <ShieldCheck size={14} className="text-blue-400 shrink-0 mt-0.5" />
                      Mention exact pre-cut length parameters
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-blue-900 relative z-10 text-[9px] font-mono text-blue-300/40 tracking-wider">
                  <span>SIT-RFQ-V2.0</span>
                </div>
              </div>
            </div>

            {/* Right: RFQ Form (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <h2 className="text-lg font-black text-[#0f172a] font-display">Quote Request Form</h2>

              <div className="bg-white border border-blue-100 rounded-3xl p-6 sm:p-8 shadow-sm flex-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

                {formSuccess ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <Check size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-[#0f172a] font-display">RFQ Submitted Successfully</h3>
                    <p className="text-slate-500 text-xs font-light max-w-sm leading-relaxed">
                      Thank you for your RFQ submission. We will redirect you to your email client to send the details, and we will email your official quote within 24 business hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 font-mono">Your Name *</label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          {...register("name", { required: true })}
                          className={`w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 ${
                            errors.name ? "border-red-500" : "border-blue-200"
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 font-mono">Company / Plant Name *</label>
                        <input
                          type="text"
                          placeholder="Your Company"
                          {...register("company", { required: true })}
                          className={`w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 ${
                            errors.company ? "border-red-500" : "border-blue-200"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 font-mono">Corporate Email *</label>
                        <input
                          type="email"
                          placeholder="you@company.com"
                          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                          className={`w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 ${
                            errors.email ? "border-red-500" : "border-blue-200"
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 font-mono">Phone Number *</label>
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          {...register("phone", { required: true })}
                          className={`w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 ${
                            errors.phone ? "border-red-500" : "border-blue-200"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 font-mono">Profile Series / Type *</label>
                        <select
                          {...register("series", { required: true })}
                          className="w-full bg-slate-50 border border-blue-200 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-blue-600"
                        >
                          <option value="20-series">Aluminium Profile 20 Series</option>
                          <option value="30-series">Aluminium Profile 30 Series</option>
                          <option value="40-series">Aluminium Profile 40 Series</option>
                          <option value="60-80-series">Aluminium Profile 60/80 Series</option>
                          <option value="pipe-joint-systems">Pipe &amp; Joint Lean Systems</option>
                          <option value="workstation-structures">Custom Workstations / Frames</option>
                          <option value="other-skus">Accessories &amp; Multiple SKU Bundle</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 font-mono">Approximate Quantity *</label>
                        <input
                          type="text"
                          placeholder="e.g. 150 meters or 12 benches"
                          {...register("quantity", { required: true })}
                          className={`w-full bg-slate-50 border rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 ${
                            errors.quantity ? "border-red-500" : "border-blue-200"
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 font-mono">Specification Notes &amp; Cutting Lengths</label>
                      <textarea
                        rows={4}
                        placeholder="Detail T-slot face size, tapping requirements, corner bracket count, or layout parameters..."
                        {...register("notes")}
                        className="w-full bg-slate-50 border border-blue-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-primary justify-center text-xs py-3.5 shadow-lg shadow-blue-600/30"
                    >
                      <Send size={14} /> Submit Quote Request
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
