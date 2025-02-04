import { FC } from 'react';
import Modal from '@/components/common/Modal';
import PrimaryButton from "@/components/reusables/PrimaryButton";

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
      <div className="w-full min-w-[400px] max-w-2xl mx-auto">
        <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5">
          <span className="text-[#047aff] text-[14px] font-[400]">NUEVA ORGANIZACIÓN</span>
        </div>

        <h2 className="text-[22px] font-[500] text-[#1d1d1f] mb-6">
          Agregar organización benéfica
        </h2>

        <div className="w-full">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                Nombre de la organización <span className="text-[#047aff]">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all text-[16px]"
                placeholder="Nombre de la organización benéfica"
              />
            </div>

            <div>
              <label htmlFor="cause" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                Causa <span className="text-[#047aff]">*</span>
              </label>
              <select
                id="cause"
                name="cause"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all text-[16px]"
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
              <label htmlFor="percentage" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                Porcentaje de donación <span className="text-[#047aff]">*</span>
              </label>
              <input
                type="number"
                id="percentage"
                name="percentage"
                required
                min="0"
                max="100"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all text-[16px]"
                placeholder="0"
              />
            </div>

            <div>
              <label htmlFor="registrationNumber" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                Número de registro
              </label>
              <input
                type="text"
                id="registrationNumber"
                name="registrationNumber"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all text-[16px]"
                placeholder="Número de registro de la organización"
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