import Modal from '@/components/common/Modal';
import React from 'react';

const Add = ({ setShowModal, showModal }) => {
  return (
    <Modal setShowModal={setShowModal} showModal={showModal}>
      <div className='w-full min-w-[400px]'>
        <p className='sm-title'>Agregar nueva cuenta o propiedad</p>
        <div className='w-full'>
          <form className='mx-auto my-4'>
            <label htmlFor='countries' className='text-style'>
            Tipo de activo
            </label>
            <select
              id='countries'
              className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-gray-300 block w-full py-6 px-2 my-2'
            >
              <option selected>Seleccionar</option>
              <option value='US'>Account</option>
              <option value='CA'>Property</option>
            </select>
            <button
              onClick={() => setShowModal(false)}
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
