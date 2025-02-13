"use client";
import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '@/components/common/Modal';

export interface ExecutorData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  // Use the granular contact relation here.
  relationship: string;
  isBackupExecutor: boolean;
}

interface AddProps {
  setShowModal: (show: boolean) => void;
  showModal: boolean;
  onAddExecutor?: (executor: ExecutorData) => void;
}

const relationshipOptions = [
  { value: 'sibling', label: 'Hermano/a' },
  { value: 'child', label: 'Hijo/a' },
  { value: 'spouse', label: 'Cónyuge' },
  { value: 'parent', label: 'Padre/Madre' },
  { value: 'albacea', label: 'Albacea' },
  { value: 'friend', label: 'Amigo/a' },
  { value: 'none', label: 'Ninguno' },
];

const Add: FC<AddProps> = ({ setShowModal, showModal, onAddExecutor }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [relationship, setRelationship] = useState<string>('sibling');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!name || !email || !relationship) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }
    const newExecutor: ExecutorData = {
      id: crypto.randomUUID(),
      name,
      email,
      phone,
      relationship,
      isBackupExecutor: false,
    };
    onAddExecutor?.(newExecutor);
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="bg-white rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-6 text-[#1d1d1f]">
          Agregar Albacea
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#6e6e73] mb-2">
              Nombre completo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all text-[16px]"
              placeholder="Nombre del albacea"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#6e6e73] mb-2">
              Correo electrónico <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all text-[16px]"
              placeholder="correo@ejemplo.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[#6e6e73] mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all text-[16px]"
              placeholder="(opcional)"
            />
          </div>
          <div>
            <label htmlFor="relationship" className="block text-sm font-medium text-[#6e6e73] mb-2">
              Relación <span className="text-red-500">*</span>
            </label>
            <select
              id="relationship"
              name="relationship"
              required
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all text-[16px]"
            >
              <option value="" disabled>Seleccionar relación</option>
              {relationshipOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-6 py-2 text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#047aff] text-white rounded-lg hover:bg-[#0456b0] transition-colors"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Add;
