import { FC } from 'react';
import Modal from '@/components/common/Modal';

interface AddProps {
  setShowModal: (show: boolean) => void;
  showModal: boolean;
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

const Add: FC<AddProps> = ({ setShowModal, showModal }) => {
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

    // Here you would typically handle the new executor data
    // For now we just close the modal
    setShowModal(false);
  };

  return (
    <Modal setShowModal={setShowModal} showModal={showModal}>
      <div className="w-full min-w-[400px]">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Agregar Albacea</h2>
        <div className="w-full">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-base"
                placeholder="Nombre del albacea"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-base"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-base"
                placeholder="(opcional)"
              />
            </div>

            <div>
              <label htmlFor="relationship" className="block text-sm font-medium text-gray-700 mb-2">
                Relación <span className="text-red-500">*</span>
              </label>
              <select
                id="relationship"
                name="relationship"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-base"
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
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="isBackupExecutor" className="text-sm font-medium text-gray-700">
                Designar como albacea suplente
              </label>
            </div>

            <button
              type="submit"
              className="w-full inline-flex justify-center px-6 py-3 rounded-xl bg-blue-600 text-white text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
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