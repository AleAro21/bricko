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
                    País de Residencia
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
        <div className='w-full flex items-end justify-end'>
          
          <button className='text-[14px] text-[#FFFFFF] font-[600] bg-[#0171e3] px-4 py-2 rounded-[100px] uppercase'>
            Enviar
          </button>
        </div>
      </div>
    </>
  );
};

export default WaitingList;
