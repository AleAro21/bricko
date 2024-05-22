'use client';
import DashboardLayout from '@/components/common/DashboardLayout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const page = () => {
  const router = useRouter();
  return (
    <DashboardLayout>
      <div className='container w-3/4 mx-auto flex flex-col h-full min-h-screen'>
        <div className='w-full flex flex-col py-12'>
          <div className='w-full flex'>
            <div className='w-[50%] flex flex-col'>
              <div className=''>
                <p className='title py-2 md:w-[80%]'>
                  ¿Cómo le gustaría compartir su patrimonio?
                </p>
                <p className='text-style py-4'>
                  Puedes elegir copias de seguridad en la página siguiente en
                  caso de que las personas que hayas elegido mueran antes que
                  tú.
                </p>
                <div className='flex gap-3 items-center w-full max-w-[300px]'>
                  <input
                    type='text'
                    id='country'
                    className='bg-white border w-full max-w-[150px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-6 my-2'
                    required
                    defaultValue={100}
                    minLength={10}
                  />
                  <label htmlFor='country' className='text-style'>
                    {`Aquí Nombre`}
                  </label>
                </div>
                <div className='flex gap-3 items-center w-full max-w-[300px]'>
                  <p className='border text-style w-full max-w-[150px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-6 my-2'>
                    100 %
                  </p>
                  <label htmlFor='country' className='text-style'>
                    {`total`}
                  </label>
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
                  onClick={() => router.push('/estate/secondary')}
                  className='text-[14px] text-[#4a4a4a] font-[600] bg-[#FFDF4E] px-4 py-4 rounded-[5px] uppercase mt-4'
                >
                  CONTINUAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default page;
