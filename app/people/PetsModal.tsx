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
      <div className='w-full min-w-[400px]'>
        <p className='sm-title'>Agregar una mascota</p>
        <div className='w-full'>
          <form className='mx-auto my-4' onSubmit={handleSubmit}>
            <div className='w-full py-4'>
              <label htmlFor='petName' className='text-style'>
                El nombre de tu mascota
              </label>
              <input
                type='text'
                id='petName'
                className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                required
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

export default PetModal;