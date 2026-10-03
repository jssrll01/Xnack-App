import { motion } from 'framer-motion';

const variants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: 'blur(6px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: 'blur(4px)',
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 1, 1],
    },
  },
};

export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ willChange: 'opacity, transform, filter' }}
    >
      {children}
    </motion.div>
  );
}
