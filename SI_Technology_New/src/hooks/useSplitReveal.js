import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable hook to animate important headings with SplitType character/word reveal.
 * Respects prefers-reduced-motion.
 *
 * @param {Object} options - { type: 'chars' | 'words' | 'lines', delay: number }
 */
export function useSplitReveal(options = { type: "words,chars", delay: 0 }) {
  const headingRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !headingRef.current) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const split = new SplitType(headingRef.current, {
      types: options.type || "words,chars",
    });

    const targetElements =
      options.type === "lines"
        ? split.lines
        : options.type === "words"
        ? split.words
        : split.chars;

    if (!targetElements || targetElements.length === 0) return;

    gsap.fromTo(
      targetElements,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.02,
        delay: options.delay || 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 88%",
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === headingRef.current) st.kill();
      });
      split.revert();
    };
  }, [options.type, options.delay]);

  return headingRef;
}
