"use client";
import { FC } from 'react';
import Modal from '@/components/common/Modal';

interface AddProps {
  setShowModal: (show: boolean) => void;
  showModal: boolean;
  onAddExecutor?: (executor: ExecutorData) => void;
}

export interface ExecutorData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  relationship: string;
  isBackupExecutor: boolean;
}

const relationshipOptions = [
  { value: 'family', label: 'Familiar' },
  { value: 'friend', label: 'Amigo' },
  { value: 'professional', label: 'Profesional' },
  { value: 'lawyer', label: 'Abogado' },
  { value: 'accountant', label: 'Contador' },
  { value: 'other', label: 'Otro' },
];

const Add: FC<AddProps> = ({ setShowModal, showModal, onAddExecutor }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newExecutor: ExecutorData = {
      id: crypto.randomUUID(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      relationship: formData.get('relationship') as string,
      isBackupExecutor: formData.get('isBackupExecutor') === 'true',
    };

    onAddExecutor?.(newExecutor);
    setShowModal(false);
  };

  return (
    <Modal setShowModal={setShowModal} showModal={showModal}>
      <div className="w-full min-w-[400px]">
        <h2 className="text-[22px] font-[500] text-[#1d1d1f] mb-4">Agregar Albacea</h2>
        <div className="w-full">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-[14px] font-[400] text-[#1d1d1f] mb-2">
                Nombre completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] focus:ring-1 focus:ring-[#047aff] transition-all text-[16px]"
                placeholder="Nombre del albacea"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[14px] font-[400] text-[#1d1d1f] mb-2">
                Correo electrónico <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] focus:ring-1 focus:ring-[#047aff] transition-all text-[16px]"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-[14px] font-[400] text-[#1d1d1f] mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] focus:ring-1 focus:ring-[#047aff] transition-all text-[16px]"
                placeholder="(opcional)"
              />
            </div>

            <div>
              <label htmlFor="relationship" className="block text-[14px] font-[400] text-[#1d1d1f] mb-2">
                Relación <span className="text-red-500">*</span>
              </label>
              <select
                id="relationship"
                name="relationship"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] focus:ring-1 focus:ring-[#047aff] transition-all text-[16px]"
                defaultValue=""
              >
                <option value="" disabled>Seleccionar relación</option>
                {relationshipOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isBackupExecutor"
                name="isBackupExecutor"
                value="true"
                className="h-4 w-4 rounded border-gray-300 text-[#047aff] focus:ring-[#047aff]"
              />
              <label htmlFor="isBackupExecutor" className="text-[14px] font-[400] text-[#1d1d1f]">
                Designar como albacea suplente
              </label>
            </div>

            <button
              type="submit"
              className="w-full inline-flex justify-center px-6 py-2.5 rounded-xl bg-[#047aff] text-white text-[16px] font-[500] hover:bg-[#0056d6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#047aff] transition-colors"
            >
              Agregar Albacea
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default Add;