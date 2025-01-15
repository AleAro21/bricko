import { FC } from 'react';
import Modal from '@/components/common/Modal';

interface AddProps {
  setShowModal: (show: boolean) => void;
  showModal: boolean;
  onAddProperty: (property: PropertyData) => void;
}

interface AssetOption {
  value: string;
  label: string;
}

export interface PropertyData {
  id: string;
  type: string;
  name: string;
  value: number;
  description: string;
  location?: string;
}

const assetOptions: AssetOption[] = [
  { value: 'real-estate', label: 'Bienes Raíces' },
  { value: 'vehicle', label: 'Vehículos' },
  { value: 'savings', label: 'Cuenta de Ahorro' },
  { value: 'investment', label: 'Cuenta de Inversión' },
  { value: 'retirement', label: 'Cuenta de Retiro' },
  { value: 'insurance', label: 'Póliza de Seguro' },
  { value: 'other', label: 'Otros Activos' },
];

const Add: FC<AddProps> = ({ setShowModal, showModal, onAddProperty }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newProperty: PropertyData = {
      id: crypto.randomUUID(),
      type: formData.get('assetType') as string,
      name: formData.get('name') as string,
      value: Number(formData.get('value')),
      description: formData.get('description') as string,
      location: formData.get('location') as string,
    };

    onAddProperty(newProperty);
    setShowModal(false);
  };

  return (
    <Modal setShowModal={setShowModal} showModal={showModal}>
      <div className="w-full min-w-[400px]">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Agregar nueva cuenta o propiedad</h2>
        <div className="w-full">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="assetType" className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de activo <span className="text-red-500">*</span>
              </label>
              <select
                id="assetType"
                name="assetType"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-base"
                required
                defaultValue=""
              >
                <option value="" disabled>Seleccionar</option>
                {assetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del activo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-base"
                placeholder="Ej: Casa Principal, Cuenta BBVA"
              />
            </div>

            <div>
              <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-2">
                Valor estimado (MXN) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="value"
                name="value"
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-base"
                placeholder="0.00"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación o Institución
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-base"
                placeholder="Ej: BBVA, Av. Reforma 123"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción o notas adicionales
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-base"
                placeholder="Información adicional relevante"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex justify-center px-6 py-3 rounded-xl bg-blue-600 text-white text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Agregar
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default Add;