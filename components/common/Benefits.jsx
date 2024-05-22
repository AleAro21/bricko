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
              ? 'Incluye ser empresario individual, o formar parte de cualquier tipo de sociedad.'
              : 'Make your will online'}
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
                    Divide your property and accounts between friends, family
                    and charities.
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
                    ? 'Reserva tu devolución de llamada sin costo'
                    : 'Continue Online'}
                </Link>
              </div>
            </div>
            <div className='border rounded-[5px] p-4 my-2'>
              <div className=''>
                <p className='sm-title text-center flex flex-wrap items-center gap-2 justify-center py-2'>
                  O si prefieres, contáctanos directamente al.{' '}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'
                    className='w-[24px] h-[24px]'
                  >
                    <path d='M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z' />
                  </svg>{' '}
                  123 456 7890
                </p>
                <p className='text-style text-center py-2'>
                  Horario de atención: Lunes a Viernes de 9:00 a.m. a 6:00 p.m.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full flex items-center justify-between'>
          <div
            onClick={() => router.back()}
            className='flex items-center text-[14px] font-[500] gap-2 text-[#9999]  cursor-pointer border-b border-transparent hover:border-[#9999] transiton-all delay-150'
          >
            <svg
              height={'14px'}
              width={'14px'}
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 320 512'
            >
              <path
                fill='#9999'
                d='M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z'
              />
            </svg>
            Back
          </div>
        </div>
      </div>
    </>
  );
};

export default Benefit;
