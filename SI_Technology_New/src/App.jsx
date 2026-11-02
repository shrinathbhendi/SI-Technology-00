import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Products from "./components/Products";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Supporting components & other routes
import FloatingButtons from "./components/layout/FloatingButtons";
import ScrollToTop from "./components/common/ScrollToTop";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Projects from "./pages/Projects/Projects";
import Quote from "./pages/Quote/Quote";
import NotFound from "./pages/NotFound/NotFound";

import "./App.css";

export default function App() {
  // Global Lenis Smooth Scroll & GSAP ScrollTrigger Synchronization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-dark-50 text-dark-800 antialiased">
          {/* Header Navigation */}
          <Navbar />
          
          {/* Main content viewport */}
          <main className="flex-1 w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:slug" element={<ProductDetails />} />

              <Route path="/projects" element={<Projects />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/request-quote" element={<Quote />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Footer Contact Details & Map */}
          <Footer />

          {/* Floating Actions */}
          <FloatingButtons />
        </div>
      </Router>
    </HelmetProvider>
  );
}
