'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import graylogo from '../../assets/greylogo.png';
import Image from 'next/image';
import Link from 'next/link';
const Benefit = () => {
  const router = useRouter();
  const params = useSearchParams();
  const recommedation = params.get('recommendation');
  return (
    <>
      <div className='py-4 '>
        <Image src={graylogo} width={100} />
      </div>
      <div className='flex flex-col md:w-[50%] max-w-[500px] mx-auto items-center justify-center py-6 h-full min-h-[80vh]'>
        <div className=''>
          <p className='title py-2 text-center md:w-[80%] mx-auto'>
            {recommedation == 'telephonic'
              ? 'Lo sentimos por el momento no cumples con los requisitos para crear tu testamento en línea'
              : 'Crea tu Testamento Digital'}
          </p>
          <div className='py-2'>
            <div className='border rounded-[5px] p-4 w-full'>
              <div className='flex items-start py-2 gap-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 512 512'
                  className='w-[30px] h-[30px] my-1 min-h-[30px] min-w-[30px] '
                >
                  <path
                    fill='#04724D'
                    d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z'
                  />
                </svg>
                <div className=''>
                  <p className='sm-title'>Comparte lo que más valoras</p>
                  <p className='text-style'>
                    Distribuye tu patrimonio, incluyendo propiedades y cuentas,
                    de manera justa entre tus seres queridos y/u organizaciones
                    benéficas.
                  </p>
                </div>
              </div>
              <div className='flex items-start py-2 gap-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 512 512'
                  className='w-[30px] min-h-[30px] min-w-[30px] h-[30px] my-1'
                >
                  <path
                    fill='#04724D'
                    d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z'
                  />
                </svg>
                <div className=''>
                  <p className='sm-title'>Comparte lo que más valoras</p>
                  <p className='text-style'>
                    Organiza la distribución de tus bienes con la ayuda de
                    nuestro equipo experto, todo mediante una llamada
                    telefónica.
                  </p>
                </div>
              </div>
           
              <div className='w-full text-[14px] text-[#4a4a4a] font-[600] bg-[#FFDF4E] px-4 py-4 mt-2 rounded-[5px] uppercase text-center'>
                <Link
                  href={
                    recommedation == 'telephonic'
                      ? '/booking/will??utm_source=sign_up_telephone'
                      : '/start/basics'
                  }
                >
                  {recommedation == 'telephonic'
                    ? 'Obtener más información'
                    : 'Continue Online' }
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      
      </div>
    </>
  );
};

export default Benefit;
