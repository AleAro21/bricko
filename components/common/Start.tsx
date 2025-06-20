'use client';

import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface InheritanceTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: 'manual' | 'legal' | 'universal') => void;
}

const InheritanceTypeModal: FC<InheritanceTypeModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const router = useRouter();
  const [showInfoModal, setShowInfoModal] = useState(false);

  const options = [
    {
      type: 'manual',
      title: 'Definir activos manualmente',
      description: 'Especifica tus activos y asigna beneficiarios individualmente',
      info: 'Al elegir la distribución manual, podrás especificar cada uno de tus activos y asignar beneficiarios específicos para cada uno. Este método te da el mayor control sobre cómo se distribuirán tus bienes, permitiéndote hacer asignaciones detalladas y personalizadas.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#f95940">
          <path d="M19 14a1 1 0 0 0-1 1v3h-3a1 1 0 0 0 0 2h4a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1zm-8-6h2v3a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1h-3a1 1 0 0 0 0 2zM6 18h3a1 1 0 0 0 0-2H7v-3a1 1 0 0 0-2 0v4a1 1 0 0 0 1 1zM8 9h3a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2z"/>
        </svg>
      ),
    },
    {
      type: 'legal',
      title: 'Herederos legales',
      description: 'Distribuir según la ley de sucesiones',
      info: 'La distribución legal sigue las reglas establecidas por la ley de sucesiones. En este caso, tus bienes se distribuirán entre tus herederos legales según el orden y proporción que establece la ley, sin necesidad de especificar la distribución manualmente.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#f95940">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      ),
    },
    {
      type: 'universal',
      title: 'Heredero universal',
      description: 'Designar un único heredero para todos los bienes',
      info: 'Al elegir un heredero universal, todos tus bienes pasarán a una única persona. Esta opción es más simple y directa, pero significa que todos tus activos irán a un solo beneficiario que heredará la totalidad de tu patrimonio.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#f95940">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V18h14v-1.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V18h6v-1.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
      ),
    },
  ];

  const handleClose = () => {
    router.push('/summary');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
        >
          <div className="fixed inset-0 bg-black/50" onClick={handleClose} />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-white rounded-2xl p-8 shadow-2xl w-full max-w-4xl z-10"
          >
            <button
              onClick={handleClose}
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

            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-[32px] font-medium text-[#1d1d1f]">
                  ¿Cómo quieres distribuir tus bienes?
                </h2>
                <button
                  onClick={() => setShowInfoModal(true)}
                  className="w-6 h-6 rounded-full border border-[#f95940] flex items-center justify-center text-[#f95940]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                  </svg>
                </button>
              </div>
              <p className="text-[18px] text-gray-600 mt-4">
                Selecciona el método que mejor se adapte a tus necesidades
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {options.map((option) => (
                <motion.div
                  key={option.type}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl p-6 cursor-pointer border border-gray-200 hover:border-[#f95940] hover:shadow-lg transition-all"
                  onClick={() => onSelect(option.type as 'manual' | 'legal' | 'universal')}
                >
                  <div className="w-12 h-12 rounded-full bg-[#f95940] bg-opacity-10 flex items-center justify-center mb-4">
                    {option.icon}
                  </div>
                  <h3 className="text-[20px] font-medium text-[#1d1d1f] mb-2">
                    {option.title}
                  </h3>
                  <p className="text-[16px] text-gray-600">
                    {option.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setShowInfoModal(true)}
                className="text-[14px] text-[#0066CC] font-medium hover:underline"
              >
                ¿Necesitas ayuda para decidir?
              </button>
            </div>
          </motion.div>

          <AnimatePresence>
            {showInfoModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center z-[60]"
              >
                <div className="fixed inset-0 bg-black/50" onClick={() => setShowInfoModal(false)} />
                <div className="relative bg-white rounded-2xl p-8 shadow-2xl w-full max-w-2xl z-10">
                  <button
                    onClick={() => setShowInfoModal(false)}
                    className="absolute top-4 right-4 w-8 h-8 bg-[#e8e8ed] rounded-full flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#6e6e73]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <h2 className="text-[30px] font-semibold text-[#1d1d1f] mb-6">
                    Tipos de distribución de bienes
                  </h2>
                  <div className="space-y-6">
                    {options.map((option) => (
                      <div key={option.type} className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
                        <h3 className="text-[22px] font-medium text-[#1d1d1f] mb-3">
                          {option.title}
                        </h3>
                        <p className="text-[17px] font-[400] text-gray-700 tracking-[0.1px] leading-[1.6]">
                          {option.info}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InheritanceTypeModal;