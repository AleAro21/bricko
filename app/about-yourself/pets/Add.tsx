'use client';

import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'phosphor-react';
import PrimaryButton from "@/components/reusables/PrimaryButton";

interface AddProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

const Add: FC<AddProps> = ({ showModal, setShowModal }) => {
  return (
    <AnimatePresence>
      {showModal && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl z-50 p-4"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="relative px-6 py-4 border-b border-gray-100">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} weight="bold" />
                </button>
                <h2 className="text-[22px] font-[500] text-[#1d1d1f]">Agregar Mascota</h2>
                <p className="text-[14px] text-[#6e6e73] mt-1">
                  Ingresa los datos de tu mascota para incluirla en el testamento
                </p>
              </div>

              {/* Form */}
              <div className="p-6">
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2">
                        Nombre <span className="text-[#047aff]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="type" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2">
                        Tipo de mascota <span className="text-[#047aff]">*</span>
                      </label>
                      <select
                        id="type"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all"
                        required
                      >
                        <option value="">Seleccionar tipo</option>
                        <option value="dog">Perro</option>
                        <option value="cat">Gato</option>
                        <option value="bird">Ave</option>
                        <option value="other">Otro</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="age" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2">
                        Edad <span className="text-[#047aff]">*</span>
                      </label>
                      <input
                        type="number"
                        id="age"
                        min="0"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2">
                        Descripción
                      </label>
                      <textarea
                        id="description"
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all"
                        placeholder="Características especiales, necesidades, etc."
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-6 py-2.5 rounded-lg text-[#1d1d1f] hover:bg-gray-100 transition-colors text-[14px] font-medium"
                    >
                      Cancelar
                    </button>
                    <PrimaryButton type="submit">
                      Guardar
                    </PrimaryButton>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Add;