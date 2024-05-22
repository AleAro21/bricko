'use client';
import Add from '@/app/estate/people/Add';
import DashboardLayout from '@/components/common/DashboardLayout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
                  <p className='title py-2 '>
                    ¿A quién quieres como tus albaceas?
                  </p>
                  <div className='bg-white w-full rounded-lg my-4 px-4 py-6 flex justify-between items-center'>
                    <div className=''>
                      <p className='sm-title'>Aquí estará el nombre</p>
                      <p className='text-style'>abd@gmail.com</p>
                    </div>
                    <div className=''>
                      <input type='checkbox' className='w-6 h-6 bg-white' />
                    </div>
                  </div>
                  <div
                    onClick={clickHandler}
                    className='bg-white my-4 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer'
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
                      Agregar a alguien nuevo
                    </p>
                  </div>
                </div>
                <div className='w-full flex items-center justify-between'>
                  <div
                    onClick={() => router.back()}
                    className='flex items-center text-[14px] font-[500] gap-2  pt-1 text-[#9999] cursor-pointer border-b border-transparent hover:border-[#9999] transiton-all delay-150'
                  >
                    <svg
                      height={'14px'}
                      width={'14px'}
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 320 512'
                    >
                      <path
                        fill='#0000FF'
                        d='M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z'
                      />
                    </svg>
                    Back
                  </div>
                  <button
                    onClick={() => router.push('/summary?completed=executers')}
                    className='text-[14px] text-[#8D9495] ml-auto mr-0 font-[600] bg-[#FFDF4E] px-4 py-4 rounded-[5px] uppercase mt-4'
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
