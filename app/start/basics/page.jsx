'use client';
import { useRouter } from 'next/navigation';
import graylogo from '../../../assets/greylogo.png';
import Image from 'next/image';
import Link from 'next/link';
const page = () => {
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(emailInput)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }
  
    router.push('/start/password');
  };
  
  return (
    <>
      <main className='container w-3/4 mx-auto flex flex-col h-full min-h-screen'>
        <div className='py-4 '>
          <Image src={graylogo} width={100} />
        </div>
        <div className='flex flex-col md:w-[50%] max-w-[500px] mx-auto items-center justify-center h-full '>
          <div className=''>
            <p className='title py-2 text-center md:w-[60%] mx-auto'>
              Crea tu Testamento Digital
            </p>
            <p className='text-style py-4 text-center md:w-[60%] mx-auto'>
              Nuestros usuarios pueden tardar 25 minutos en completar su
              testamento
            </p>
            <div className=''>
              <form onSubmit={handleSubmit}>
                <div class='mb-2'>
                  <div className='py-3'>
                    <label for='country' class='text-style'>
                      Nombre
                    </label>
                    <input
                      type='text'
                      id='country'
                      class='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6'
                      required
                    />
                  </div>
                  <div className='py-3'>
                    <label for='fatherLastName' class='text-style'>
                      Apellido Paterno
                    </label>
                    <input
                      type='text'
                      id='fatherLastName'
                      class='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6'
                      required
                    />
                  </div>
                  <div className='py-3'>
                    <label for='motherLastName' class='text-style'>
                      Apellido Materno
                    </label>
                    <input
                      type='text'
                      id='motherLastName'
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
                  <p className='text-style py-4 flex items-center gap-3'>
                    <input type='checkbox' className='h-[13px] w-[13px]' />
                    Acepto los términos y condiciones de Testamento.mx
                  </p>
                  <p className='text-style py-4 flex items-center gap-3'>
                    <input type='checkbox' className='h-[24px] w-[24px]' />
                    Deseo recibir correos electrónicos con consejos, ofertas y
                    actualizaciones ocasionales de Testamento.mx
                  </p>
                  <div className='w-full flec items-center justify-center text-center text-[14px] text-[#4a4a4a] font-[600] bg-[#FFDF4E] px-4 py-4 rounded-[5px] uppercase'>
                    <button type='submit'>CONTINUAR</button>
                  </div>
                  <p className='text-style pt-4'>Ya tengo cuenta Ingresar</p>
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
              Regresar
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default page;
