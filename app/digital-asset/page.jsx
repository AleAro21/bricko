'use client';
import DashboardLayout from '@/components/common/DashboardLayout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Add from './Add';

const page = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const clickHandler = () => {
    setShowModal(true);
  };

  return (
    <>
      <Add setShowModal={setShowModal} showModal={showModal} />
      <DashboardLayout>
        <div className='container w-3/4 mx-auto flex flex-col h-full min-h-screen'>
          <div className='w-full flex flex-col py-12'>
            <div className='w-full flex'>
              <div className='w-[50%] flex flex-col'>
                <div className=''>
                  <p className='title py-2 '>¿Tiene algún activo digital?</p>
                  <p className='text-style py-4'>
                    Seleccionar activos digitales
                  </p>
                  <div
                    onClick={clickHandler}
                    className='bg-white rounded-lg overflow-hidden flex items-center justify-center cursor-pointer'
                  >
                    <p className='flex gap-2 py-10 text-style'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 448 512'
                        width={'24px'}
                        height={'24px'}
                      >
                        <path d='M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z' />
                      </svg>
                      
                    </p>
                  </div>
                </div>
                <div className='w-full flex items-end justify-end'>
                  
                  <button
                    onClick={() => router.push('/summary')}
                    className='text-[14px] text-[#000000] font-[600] bg-[#FFDF4E] px-4 py-4 rounded-[100px] uppercase mt-4'
                  >
                    CONTINUAR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default page;
