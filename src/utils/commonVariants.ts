import { Variants } from 'framer-motion';

const commonVariants: Variants = {
  visible: {
    opacity: 1,
    scale: 1,
    position: 'static',
    zIndex: 1,
    height: 'auto',
    transition: {
      delay: 0.1,
    },
  },
  removed: {
    opacity: 0,
    scale: 0.6,
    height: 0,
    zIndex: -1,
    marginBottom: 0,
  },
};

export default commonVariants;
