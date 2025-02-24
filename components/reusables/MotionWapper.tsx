// components/MotionWrapper.client.tsx
'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MotionWrapperProps {
  children: ReactNode;
}

export default function MotionWrapper({ children }: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col min-h-screen"
    >
      {children}
    </motion.div>
  );
}
