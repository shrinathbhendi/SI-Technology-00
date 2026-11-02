import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 - System Calibration Error | SI TECHNOLOGY</title>
        <meta name="description" content="The requested page could not be located on the SI Technology server." />
      </Helmet>

      <div className="w-full min-h-screen flex items-center justify-center pt-24 pb-16 bg-primary-950 text-white relative overflow-hidden">
        {/* Blueprint background */}
        <div className="absolute inset-0 bg-grid-light opacity-5 pointer-events-none" />
        
        <div className="max-w-md mx-auto px-6 text-center space-y-6 relative z-10">
          <div className="w-16 h-16 bg-accent-500/10 border border-accent-500/20 text-accent-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <AlertTriangle size={32} />
          </div>
          
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-accent-500 uppercase tracking-widest block font-bold">
              [Error Code: 404]
            </span>
            <h1 className="text-3xl font-display font-black text-white tracking-tight leading-none">
              System Calibration Error
            </h1>
            <p className="text-white/60 text-xs sm:text-sm font-light leading-relaxed">
              The layout coordinates you requested do not match any engineering files on our server. The URL might be broken or moved.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-[10px] font-mono text-white/40 uppercase tracking-widest text-left space-y-1">
            <p>REF_AXIS_X: NULL</p>
            <p>REF_AXIS_Y: NULL</p>
            <p>STATUS: OFF_PLANE_OFFSET</p>
          </div>

          <div className="pt-2">
            <Link to="/" className="btn-primary text-xs py-3 px-6 shadow-md justify-center w-full sm:w-auto">
              Recalibrate &amp; Return Home <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
