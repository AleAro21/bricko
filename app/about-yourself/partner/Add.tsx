import { FC } from 'react';
import Modal from '@/components/common/Modal';

interface AddProps {
  setShowModal: (show: boolean) => void;
  showModal: boolean;
}

const Add: FC<AddProps> = ({ setShowModal, showModal }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <Modal setShowModal={setShowModal} showModal={showModal}>
      <div className='w-full min-w-[400px]'>
        <p className='sm-title'>Agregar pareja</p>
        <div className='w-full'>
          <form className='mx-auto my-4' onSubmit={handleSubmit}>
            <div className='w-full py-4'>
              <label htmlFor='fullName' className='text-style'>
                Nombre completo
              </label>
              <input
                type='text'
                id='fullName'
                className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                required
              />
            </div>
            <div className='w-full py-4'>
              <label htmlFor='email' className='text-style'>
                Dirección de correo electrónico
              </label>
              <input
                type='email'
                id='email'
                className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                required
              />
            </div>
            <p className='sm-title'>Fecha de nacimiento</p>
            <div className='flex items-center justify-start gap-3'>
              <div className='flex gap-3 items-center h-5 px-4 py-4 rounded-[24px]'>
                <input
                  id='adult'
                  type='radio'
                  name='age'
                  value='adult'
                  className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800'
                  required
                />
                <label htmlFor='adult'>mayores de 18</label>
              </div>
              <div className='flex gap-3 items-center h-5 px-4 py-4 rounded-[24px]'>
                <input
                  id='minor'
                  type='radio'
                  name='age'
                  value='minor'
                  className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800'
                  required
                />
                <label htmlFor='minor'>menores de 18 años</label>
              </div>
            </div>
            <button
              type='submit'
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

export default Add;