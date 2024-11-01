import Modal from '@/components/common/Modal';
import React from 'react';

const Children = ({ setShowModal, showModal }) => {
  return (
    <Modal setShowModal={setShowModal} showModal={showModal}>
      <div className='w-full min-w-[400px]'>
        <p className='sm-title'>Agregar un niño</p>
        <div className='w-full'>
          <form className='mx-auto my-4'>
            <label htmlFor='country' className='text-style'>
              {`El nombre completo de su hijo`}
            </label>
            <input
              type='text'
              id='country'
              className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-4'
              required
              minLength={10}
            />
            <p className='text-style'>La fecha de nacimiento de su hijo</p>
            <p className='text-style'>Por ejemplo, 27 10 1983</p>
            <div className='flex w-full items-center justify-between my-2'>
              <div className='w-[25%]'>
                <label htmlFor='country1' className='text-style'>
                  {` Día`}
                </label>
                <input
                  type='text'
                  id='country1'
                  className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                  required
                  minLength={10}
                />
              </div>
              <div className='w-[25%]'>
                <label htmlFor='country1' className='text-style'>
                  {` Mes`}
                </label>
                <input
                  type='text'
                  id='country1'
                  className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                  required
                  minLength={10}
                />
              </div>
              <div className='w-[40%]'>
                <label htmlFor='country1' className='text-style'>
                  {`Año`}
                </label>
                <input
                  type='text'
                  id='country1'
                  className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                  required
                  minLength={10}
                />
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className='w-full text-[14px] text-[#000000] font-[600] bg-[#FFDF4E] px-4 py-4 rounded-[100px] uppercase mt-4'
            >
              ahorrar
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default Children;
