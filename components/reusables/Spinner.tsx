import React from 'react';
import { motion } from 'framer-motion';

interface SpinnerProps {
  size?: number;
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 40, color = '#047aff' }) => {
  return (
    <div className="flex justify-center items-center">
      <motion.div
        className="rounded-full border-t-2 border-b-2"
        style={{
          width: size,
          height: size,
          borderColor: color,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default Spinner;