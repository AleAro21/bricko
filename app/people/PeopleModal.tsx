import { FC, FormEvent } from 'react';
import Modal from '@/components/common/Modal';

interface PeopleModalProps {
  setShowModal: (show: boolean) => void;
  showModal: boolean;
}

const PeopleModal: FC<PeopleModalProps> = ({ setShowModal, showModal }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <Modal setShowModal={setShowModal} showModal={showModal}>
      <div className="w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Agregar persona</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre completo
            </label>
            <input
              type="text"
              id="fullName"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2.5"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Dirección de correo electrónico
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2.5"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Edad</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="ageGroup"
                  value="over18"
                  className="h-4 w-4 text-blue-500 focus:ring-blue-400"
                  required
                />
                <span className="ml-2 text-sm text-gray-700">mayores de 18</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="ageGroup"
                  value="under18"
                  className="h-4 w-4 text-blue-500 focus:ring-blue-400"
                />
                <span className="ml-2 text-sm text-gray-700">menores de 18 años</span>
              </label>
            </div>
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

export default PeopleModal;