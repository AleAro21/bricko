'use client';
import { useRouter } from 'next/navigation';
import graylogo from '../../assets/greylogo.png';
import Image from 'next/image';
const WaitingList = () => {
  const router = useRouter();
  return (
    <>
      <div className='py-4 '>
        <Image src={graylogo} width={100} />
      </div>
      <div className='flex flex-col md:w-[50%] max-w-[500px] mx-auto items-center justify-center h-[80vh]'>
        <div className=''>
          <p className='title py-6'>
            Una disculpa, en este momento solo estamos disponibles en México,
          </p>
          <p className='text-style py-4'>
            Si deseas saber cuándo estaremos disponibles en tu país, por favor,
            déjanos tu dirección de correo electrónico y el país donde vives.
          </p>
          <div className='py-6'>
            <form>
              <div class='mb-6'>
                <div className='py-3'>
                  <label for='country' class='text-style'>
                    Pais de Residencia
                  </label>
                  <input
                    type='text'
                    id='country'
                    class='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6'
                    required
                  />
                </div>
                <div className='py-3'>
                  <label for='email' class='text-style'>
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    class='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6'
                    required
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='w-full flex items-center justify-between'>
          <div
            onClick={() => router.back()}
            className='flex items-center text-[14px] font-[500] gap-2  pt-1 text-[#9999] cursor-pointer border-b border-transparent hover:border-[#9999] transiton-all delay-150'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 448 512'
              height={'14px'}
              width={'14px'}
            >
              <path
                fill='#9999'
                d='M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z'
              />
            </svg>
            Regresar
          </div>
          <button className='text-[14px] text-[#4a4a4a] font-[600] bg-[#FFDF4E] px-4 py-2 rounded-[5px] uppercase'>
            Enviar
          </button>
        </div>
      </div>
    </>
  );
};

export default WaitingList;
