// Premium Awwwards-grade reusable Framer Motion & GSAP animation presets
export const easePremium = [0.16, 1, 0.3, 1]; // Smooth exponential ease-out

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 35 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: customDelay,
      ease: easePremium,
    },
  }),
};

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const scaleRevealVariant = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.85,
      delay: customDelay,
      ease: easePremium,
    },
  }),
};

export const slideLeftVariant = {
  hidden: { opacity: 0, x: -45 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      delay: customDelay,
      ease: easePremium,
    },
  }),
};

export const slideRightVariant = {
  hidden: { opacity: 0, x: 45 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      delay: customDelay,
      ease: easePremium,
    },
  }),
};

export const cardTiltVariant = {
  hidden: { opacity: 0, y: 35, rotateX: 8 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      delay: customDelay,
      ease: easePremium,
    },
  }),
};
