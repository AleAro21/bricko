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
    <label htmlFor={id} className='text-style'>
      {label}
    </label>
    <input
      type='text'
      id={id}
      placeholder={placeholder}
      className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
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
      <div className='w-full min-w-[400px]'>
        <p className='sm-title'>Agregar un niño</p>
        <div className='w-full'>
          <form className='mx-auto my-4' onSubmit={handleSubmit}>
            <label htmlFor='fullName' className='text-style'>
              El nombre completo de su hijo
            </label>
            <input
              type='text'
              id='fullName'
              className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-4'
              required
              minLength={10}
            />
            <p className='text-style'>La fecha de nacimiento de su hijo</p>
            <p className='text-style'>Por ejemplo, 27 10 1983</p>
            <div className='flex w-full items-center justify-between my-2'>
              <DateInput
                label="Día"
                id="birthDay"
                placeholder="DD"
              />
              <DateInput
                label="Mes"
                id="birthMonth"
                placeholder="MM"
              />
              <DateInput
                label="Año"
                id="birthYear"
                placeholder="YYYY"
                className="w-[40%]"
              />
            </div>

            <button
              type="submit"
              className='w-full text-[14px] text-[#FFFFFF] font-[600] bg-[#0171e3] px-4 py-4 rounded-[100px] uppercase mt-4'
            >
              Agregar
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default Children;