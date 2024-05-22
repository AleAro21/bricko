'use client';
import { useRouter } from 'next/navigation';
import graylogo from '../../../assets/greylogo.png';
import Image from 'next/image';
import { useState } from 'react';
const page = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const pass = Number(password.length) * 10;
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/start/congratulation');
  };
  return (
    <>
      <main className='container w-3/4 mx-auto flex flex-col h-full min-h-screen'>
        <div className='py-4 '>
          <Image src={graylogo} width={100} />
        </div>
        <div className='flex flex-col md:w-[50%] max-w-[500px] mx-auto items-center justify-center h-full'>
          <div className=''>
            <p className='title py-2 text-center md:w-[60%] mx-auto'>
              Crea tu contraseña
            </p>
            <p className='text-style py-4 text-center md:w-[60%] mx-auto'>
              Una contraseña fuerte es tu primera defensa. Asegúrate de no
              compartirla
            </p>
            <form onSubmit={handleSubmit} className=''>
              <div className='mb-2'>
                <div className='py-3'>
                  <label htmlFor='country' className='text-style'>
                    {`Contraseña (mínimo 10 caracteres)`}
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id='country'
                    className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6'
                    required
                    minLength={10}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className='flex items-center justify-end text-style py-4 gap-2'
                  >
                    {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                  <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                  <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
                </svg>
                      
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                    </svg>
                    )}
                    <span className='text-[#4a4a4a]'>
                      {showPassword ? 'Hide' : 'Mostrar'}
                    </span>
                  </div>
                </div>
                <div className='flex w-full h-[5px] bg-gray-500 rounded-lg items-center my-2'>
                  <div
                    className={`${
                      pass >= 100 ? 'bg-green-700' : 'bg-red-500'
                    } h-full flex rounded-lg `}
                    style={{ width: pass + '%' }}
                  ></div>
                </div>
                <button
                  type='submit'
                  className='w-full text-[14px] text-[#4a4a4a] font-[600] bg-[#FFDF4E] px-4 py-4 rounded-[5px] uppercase my-2'
                >
                  CONTINUAR
                </button>
                <p className='text-style text-center pt-4'>
                  Creando una cuenta, aceptas estar en conformidad con nuestros
                  Términos y Políticas de Privacidad.
                </p>
              </div>
            </form>
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
