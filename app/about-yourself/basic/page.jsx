'use client';
import DashboardLayout from '@/components/common/DashboardLayout';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/about-yourself/partner');
  };
  return (
    <DashboardLayout>
      <div className='container w-3/4 mx-auto flex flex-col h-full min-h-screen'>
        <div className='w-full flex flex-col py-12'>
          <p className='title py-4'>Tus detalles de contacto</p>
          <form onSubmit={handleSubmit} className='w-full flex'>
            <div className='w-[50%] flex flex-col'>
              <div className='w-full pb-4 border-b'>
                <p className='sm-title py-4'>Su dirección</p>
                <label htmlFor='country' className='text-style'>
                  {`Dirección Línea 1`}
                </label>
                <input
                  type='text'
                  id='country'
                  className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                  required
                />
                <div className='w-full my-2'>
                  <label htmlFor='country' className='text-style mt-4'>
                    {`Dirección Línea 2`}
                  </label>
                  <input
                    type='text'
                    id='country'
                    className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                    required
                  />
                </div>
                <div className='w-full my-4 flex items-center justify-between gap-4'>
                  <div className='w-[60%]'>
                    <label htmlFor='country' className='text-style mt-4'>
                      {`ciudad`}
                    </label>
                    <input
                      type='text'
                      id='country'
                      className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                      required
                    />
                  </div>
                  <div className='w-[40%]'>
                    <label htmlFor='country' className='text-style mt-4'>
                      {`Código postal`}
                    </label>
                    <input
                      type='text'
                      id='country'
                      className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                      required
                    />
                  </div>
                </div>
              </div>
              <div className='w-full bordert-2 pt-4'>
                <p className='text-style'>Tu número de teléfono (opcional)</p>
                <label htmlFor='country' className='text-style'>
                  {`Sólo te llamaremos para ayudarte con tu testamento`}
                </label>
                <input
                  type='text'
                  id='country'
                  className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                  required
                />
              </div>
              <div className='flex items-center justify-between py-4'>
                <div
                  onClick={() => router.back()}
                  className='flex items-center text-[14px] font-[500] gap-2  pt-1 text-[#9999] cursor-pointer border-b border-transparent hover:border-[#9999] transiton-all delay-150 border-b border-transparent hover:border-[#9999] transiton-all delay-150'
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
                  type='submit'
                  className='text-[14px] text-[#4a4a4a] font-[600] bg-[#FFDF4E] px-4 py-4 rounded-[5px] uppercase mt-4'
                >
                  CONTINUAR
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default page;
