'use client';
import { motion } from "framer-motion";
import Spinner from "@/components/reusables/Spinner";

const LoadingFallback = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#f5f5f7] bg-opacity-80 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center"
      >
        <Spinner size={60} color="#047aff" />
        <p className="mt-4 text-[#047aff] font-medium text-lg">Cargando...</p>
      </motion.div>
    </div>
  );
};

export default LoadingFallback;