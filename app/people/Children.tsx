import { FC, FormEvent } from 'react';
import Modal from '@/components/common/Modal';

interface ChildrenProps {
  setShowModal: (show: boolean) => void;
  showModal: boolean;
}

interface DateInputProps {
  label: string;
  id: string;
  placeholder?: string;
  className?: string;
}

const DateInput: FC<DateInputProps> = ({ label, id, placeholder, className = 'w-[25%]' }) => (
  <div className={className}>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type="text"
      id={id}
      placeholder={placeholder}
      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2.5"
      required
    />
  </div>
);

const Children: FC<ChildrenProps> = ({ setShowModal, showModal }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <Modal setShowModal={setShowModal} showModal={showModal}>
      <div className="w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Agregar un niño</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              El nombre completo de su hijo
            </label>
            <input
              type="text"
              id="fullName"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2.5"
              required
              minLength={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              La fecha de nacimiento de su hijo
            </label>
            <p className="text-sm text-gray-500 mb-2">Por ejemplo, 27 10 1983</p>
            <div className="flex gap-4">
              <DateInput label="Día" id="birthDay" placeholder="DD" />
              <DateInput label="Mes" id="birthMonth" placeholder="MM" />
              <DateInput label="Año" id="birthYear" placeholder="YYYY" className="w-[40%]" />
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

export default Children;