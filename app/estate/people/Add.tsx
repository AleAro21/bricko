import { FC } from 'react';
import Modal from '@/components/common/Modal';
import PrimaryButton from "@/components/reusables/PrimaryButton";

interface AddProps {
  setShowModal: (show: boolean) => void;
  showModal: boolean;
  onAddHeir: (heir: HeirData) => void;
}

export interface HeirData {
  id: string;
  name: string;
  relationship: string;
  percentage: number;
  backupHeir?: string;
}

const relationshipOptions = [
  { value: 'spouse', label: 'Cónyuge' },
  { value: 'child', label: 'Hijo/a' },
  { value: 'parent', label: 'Padre/Madre' },
  { value: 'sibling', label: 'Hermano/a' },
  { value: 'other', label: 'Otro' },
];

const Add: FC<AddProps> = ({ setShowModal, showModal, onAddHeir }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newHeir: HeirData = {
      id: crypto.randomUUID(),
      name: formData.get('name') as string,
      relationship: formData.get('relationship') as string,
      percentage: Number(formData.get('percentage')),
      backupHeir: formData.get('backupHeir') as string,
    };

    onAddHeir(newHeir);
    setShowModal(false);
  };

  return (
    <Modal setShowModal={setShowModal} showModal={showModal}>
      <div className="w-full min-w-[400px] max-w-2xl mx-auto">
        <div className="inline-flex items-center h-[32px] bg-[#f95940] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5">
          <span className="text-[#f95940] text-[14px] font-[400]">NUEVO HEREDERO</span>
        </div>

        <h2 className="text-[22px] font-[500] text-[#1d1d1f] mb-6">
          Agregar nuevo heredero
        </h2>

        <div className="w-full">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                Nombre completo <span className="text-[#f95940]">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#f95940] transition-all text-[16px]"
                placeholder="Nombre del heredero"
              />
            </div>

            <div>
              <label htmlFor="relationship" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                Relación <span className="text-[#f95940]">*</span>
              </label>
              <select
                id="relationship"
                name="relationship"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#f95940] transition-all text-[16px]"
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

            <div>
              <label htmlFor="percentage" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                Porcentaje de herencia <span className="text-[#f95940]">*</span>
              </label>
              <input
                type="number"
                id="percentage"
                name="percentage"
                required
                min="0"
                max="100"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#f95940] transition-all text-[16px]"
                placeholder="0"
              />
            </div>

            <div>
              <label htmlFor="backupHeir" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                Heredero de respaldo
              </label>
              <input
                type="text"
                id="backupHeir"
                name="backupHeir"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#f95940] transition-all text-[16px]"
                placeholder="Nombre del heredero de respaldo"
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