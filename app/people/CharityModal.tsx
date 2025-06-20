import { FC } from 'react';
import Modal from '@/components/common/Modal';

interface CharityModalProps {
  setShowModal: (show: boolean) => void;
  showModal: boolean;
}

const CharityModal: FC<CharityModalProps> = ({ setShowModal, showModal }) => {
  return (
    <Modal setShowModal={setShowModal} showModal={showModal}>
      <div className="w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Añadir una nueva organización benéfica</h2>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="charity-name" className="block text-sm font-medium text-gray-700 mb-1">
              El nombre de su organización benéfica
            </label>
            <p className="text-sm text-gray-500 mb-2">p.ej. Apoyo al cáncer de Macmillan</p>
            <input
              type="text"
              id="charity-name"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2.5"
              required
            />
          </div>

          <div>
            <label htmlFor="charity-number" className="block text-sm font-medium text-gray-700 mb-1">
              Número de organización benéfica registrada (6 o 7 dígitos)
            </label>
            <p className="text-sm text-gray-500 mb-2">p.ej. 261017</p>
            <input
              type="text"
              id="charity-number"
              pattern="[0-9]{6,7}"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2.5"
              required
            />
          </div>

          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="w-full bg-[#f95940] text-white px-4 py-2.5 rounded-lg hover:bg-[#f95940] transition-colors duration-200"
          >
            Agregar
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CharityModal;