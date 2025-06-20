import { FC } from 'react';
import Modal from '@/components/common/Modal';
import PrimaryButton from "@/components/reusables/PrimaryButton";

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
      <div className="w-full min-w-[400px] max-w-2xl mx-auto">
        <div className="inline-flex items-center h-[32px] bg-[#f95940] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5">
          <span className="text-[#f95940] text-[14px] font-[400]">NUEVO ACTIVO</span>
        </div>

        <h2 className="text-[22px] font-[500] text-[#1d1d1f] mb-6">
          Agregar nueva cuenta o propiedad
        </h2>

        <div className="w-full">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="assetType" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                Tipo de activo <span className="text-[#f95940]">*</span>
              </label>
              <select
                id="assetType"
                name="assetType"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#f95940] transition-all text-[16px]"
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
              <label htmlFor="name" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                Nombre del activo <span className="text-[#f95940]">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#f95940] transition-all text-[16px]"
                placeholder="Ej: Casa Principal, Cuenta BBVA"
              />
            </div>

            <div>
              <label htmlFor="value" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                Valor estimado (MXN) <span className="text-[#f95940]">*</span>
              </label>
              <input
                type="number"
                id="value"
                name="value"
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#f95940] transition-all text-[16px]"
                placeholder="0.00"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                Ubicación o Institución
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#f95940] transition-all text-[16px]"
                placeholder="Ej: BBVA, Av. Reforma 123"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                Descripción o notas adicionales
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#f95940] transition-all text-[16px] resize-none"
                placeholder="Información adicional relevante"
              />
            </div>

            <div className="pt-2">
              <PrimaryButton type="submit" className="w-full">
                Agregar
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default Add;