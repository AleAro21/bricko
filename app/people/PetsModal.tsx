import { FC, FormEvent } from 'react';
import Modal from '@/components/common/Modal';

interface PetModalProps {
  setShowModal: (show: boolean) => void;
  showModal: boolean;
}

const PetModal: FC<PetModalProps> = ({ setShowModal, showModal }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <Modal setShowModal={setShowModal} showModal={showModal}>
      <div className="w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Agregar una mascota</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="petName" className="block text-sm font-medium text-gray-700 mb-1">
              El nombre de tu mascota
            </label>
            <input
              type="text"
              id="petName"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2.5"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#047aff] text-white px-4 py-2.5 rounded-lg hover:bg-[#0171e3] transition-colors duration-200"
          >
            Agregar
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default PetModal;