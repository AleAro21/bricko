import Modal from '@/components/common/Modal';
import React from 'react';

const PetModal = ({ setShowModal, showModal }) => {
  return (
    <Modal setShowModal={setShowModal} showModal={showModal}>
      <div className='w-full min-w-[400px]'>
        <p className='sm-title'>Agregar una mascota</p>
        <div className='w-full'>
          <form className='mx-auto my-4'>
            <div className='w-full py-4'>
              <label htmlFor='country' className='text-style'>
                {`El nombre de tu mascota`}
              </label>
              <input
                type='text'
                id='country'
                className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                required
              />
            </div>
            <button
              onClick={() => setShowModal(false)}
              className='w-full text-[14px] text-[#4a4a4a] font-[600] bg-[#FFDF4E] px-4 py-4 rounded-[5px] uppercase mt-4'
            >
             ahorrar
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default PetModal;
