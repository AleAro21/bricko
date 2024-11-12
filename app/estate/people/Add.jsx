import Modal from '@/components/common/Modal';
import React from 'react';

const Add = ({ setShowModal, showModal }) => {
  return (
    <Modal setShowModal={setShowModal} showModal={showModal}>
      <div className='w-full min-w-[400px]'>
        <p className='sm-title'>Agregar persona</p>
        <div className='w-full'>
          <form className='mx-auto my-4'>
            <div className='w-full py-4'>
              <label htmlFor='country' className='text-style'>
                {`Nombre completo`}
              </label>
              <input
                type='text'
                id='country'
                className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                required
              />
            </div>
            <div className='w-full py-4'>
              <label htmlFor='country' className='text-style'>
                {`Dirección de correo electrónico`}
              </label>
              <input
                type='text'
                id='country'
                className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                required
              />
            </div>
            <div className='w-full py-4'>
              <label htmlFor='country' className='text-style'>
                {`Relación con el propietario`}
              </label>
              <input
                type='text'
                id='relation' 
                className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                required
              />
            </div>
            <p className='sm-title'>Edad</p>
            <div className='flex items-center justify-start gap-3'>
              <div className='flex gap-3 items-center h-5 px-4 py-4 rounded-[24px]'>
                <input
                  id='remember'
                  type='radio'
                  value=''
                  className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800'
                  required
                />
                mayores de 18
              </div>
              <div className='flex gap-3 items-center h-5 px-4 py-4 rounded-[24px]'>
                <input
                  id='remember'
                  type='radio'
                  value=''
                  className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800'
                  required
                />
                menores de 18 años
              </div>
            </div>
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
