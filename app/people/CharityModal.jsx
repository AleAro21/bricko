import Modal from '@/components/common/Modal';
import React from 'react';

const CharityModal = ({ setShowModal, showModal }) => {
  return (
    <Modal setShowModal={setShowModal} showModal={showModal}>
      <div className='w-full min-w-[400px]'>
        <p className='sm-title'>Añadir una nueva organización benéfica</p>
        <div className='w-full'>
          <form className='mx-auto my-4'>
            <div className='w-full py-4'>
              <p className='text-style'>El nombre de su organización benéfica</p>
              <label htmlFor='country' className='text-style'>
                {`p.ej. Apoyo al cáncer de Macmillan`}
              </label>
              <input
                type='text'
                id='country'
                className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                required
              />
            </div>
            <div className='w-full py-4'>
              <p className='text-style'>
              Número de organización benéfica registrada (6 o 7 dígitos)
              </p>
              <label htmlFor='country' className='text-style'>
                {`p.ej. 261017`}
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
              className='w-full text-[14px] text-[#000000] font-[600] bg-[#FFDF4E] px-4 py-4 rounded-[100px] uppercase mt-4'
            >
              Agregar
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default CharityModal;
