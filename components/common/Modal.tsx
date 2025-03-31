import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  children: ReactNode;
  setShowModal: (show: boolean) => void;
  showModal: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, setShowModal, showModal }) => {
  const handleOverlayClick = () => {
    setShowModal(false);
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div
            className="fixed inset-0 bg-black/50"
            onClick={handleOverlayClick}
          />
          <div className="relative bg-white rounded-2xl p-8 shadow-2xl w-full max-w-2xl z-10">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-[#e8e8ed] rounded-full flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#6e6e73]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;