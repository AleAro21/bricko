import { FC } from 'react';
import Modal from '@/components/common/Modal';

interface AddProps {
  setShowModal: (show: boolean) => void;
  showModal: boolean;
  onAddCharity: (charity: CharityData) => void;
}

export interface CharityData {
  id: string;
  name: string;
  cause: string;
  percentage: number;
  registrationNumber?: string;
}

const causeOptions = [
  { value: 'health', label: 'Salud' },
  { value: 'education', label: 'Educación' },
  { value: 'environment', label: 'Medio Ambiente' },
  { value: 'social', label: 'Causas Sociales' },
  { value: 'animals', label: 'Protección Animal' },
  { value: 'culture', label: 'Arte y Cultura' },
  { value: 'other', label: 'Otra Causa' },
];

const Add: FC<AddProps> = ({ setShowModal, showModal, onAddCharity }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newCharity: CharityData = {
      id: crypto.randomUUID(),
      name: formData.get('name') as string,
      cause: formData.get('cause') as string,
      percentage: Number(formData.get('percentage')),
      registrationNumber: formData.get('registrationNumber') as string,
    };

    onAddCharity(newCharity);
    setShowModal(false);
  };

  return (
    <Modal setShowModal={setShowModal} showModal={showModal}>
      <div className="w-full min-w-[400px]">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Agregar Organización Benéfica</h2>
        <div className="w-full">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la organización <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-base"
                placeholder="Nombre de la organización benéfica"
              />
            </div>

            <div>
              <label htmlFor="cause" className="block text-sm font-medium text-gray-700 mb-2">
                Causa <span className="text-red-500">*</span>
              </label>
              <select
                id="cause"
                name="cause"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-base"
                defaultValue=""
              >
                <option value="" disabled>Seleccionar causa</option>
                {causeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="percentage" className="block text-sm font-medium text-gray-700 mb-2">
                Porcentaje de donación <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="percentage"
                name="percentage"
                required
                min="0"
                max="100"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-base"
                placeholder="0"
              />
            </div>

            <div>
              <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Número de registro (opcional)
              </label>
              <input
                type="text"
                id="registrationNumber"
                name="registrationNumber"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-base"
                placeholder="Número de registro de la organización"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex justify-center px-6 py-3 rounded-xl bg-blue-600 text-white text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Agregar Organización
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default Add;