import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, User, HandPointing } from 'phosphor-react';
import { useRouter } from 'next/navigation';

interface InheritanceTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: "HP" | "HL" | "HU") => void;
}

const InheritanceTypeModal: FC<InheritanceTypeModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const router = useRouter();

  const handleClose = () => {
    onClose();
    router.push('/summary');
  };

  const handleSelect = (type: "HP" | "HL" | "HU") => {
    onSelect(type);
    if (type === "HL") {
      // Call onSelect first
      onSelect(type);
      // Then refresh and redirect to summary
      window.location.href = '/summary';
    } else {
      // For other types, just call onSelect
      onSelect(type);
    }
  };

  const options = [
    {
      type: "HL",
      title: 'Herederos legales',
      description:
        'Distribuye tus bienes según la ley sin definir beneficiarios ni activos. Una opción tradicional y automática.',
      icon: <Users size={24} weight="regular" color="#047aff" />,
    },
    {
      type: "HU",
      title: 'Heredero universal',
      description:
        'Asigna todos los activos a un único heredero. Centraliza la herencia para una distribución simplificada.',
      icon: <User size={24} weight="regular" color="#047aff" />,
    },
    {
      type: "HP",
      title: 'Carga manual',
      description:
        'Personaliza la asignación de cada bien y beneficiario. Ideal para estructuras patrimoniales complejas.',
      icon: <HandPointing size={24} weight="regular" color="#047aff" />,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6"
        >
          {/* Clicking the overlay will just call onClose */}
          <div className="fixed inset-0 bg-black/50" onClick={handleClose} />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-white rounded-2xl p-4 sm:p-8 shadow-2xl w-full max-w-4xl z-10 max-h-[90vh] overflow-y-auto flex flex-col justify-center min-h-[50vh]"
          >
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 bg-[#e8e8ed] rounded-full flex items-center justify-center"
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

            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-[24px] sm:text-[32px] font-medium text-[#1d1d1f] mb-2 sm:mb-4">
                ¿Cómo quieres distribuir tus bienes?
              </h2>
              <p className="hidden sm:block text-[18px] text-gray-600">
                Selecciona la opción que mejor se adapte a tus necesidades.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {options.map((option) => (
                <motion.div
                  key={option.type}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl p-4 sm:p-6 cursor-pointer border border-gray-200 hover:border-[#047aff] hover:shadow-lg transition-all relative"
                  onClick={() => handleSelect(option.type as "HP" | "HL" | "HU")}
                >
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                    <span className="w-5 h-5 inline-flex items-center justify-center rounded-full border border-[#047aff] text-[#047aff] text-sm cursor-help">
                      ?
                    </span>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#047aff] bg-opacity-10 flex items-center justify-center mb-3 sm:mb-4">
                    {option.icon}
                  </div>
                  <h3 className="text-[18px] sm:text-[20px] font-medium text-[#1d1d1f] mb-1 sm:mb-2">
                    {option.title}
                  </h3>
                  <p className="text-[14px] sm:text-[16px] text-gray-600">
                    {option.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8 text-center">
              <button
                onClick={() => {}}
                className="text-[14px] text-[#0066CC] font-medium hover:underline"
              >
                ¿Necesitas ayuda para decidir?
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InheritanceTypeModal;