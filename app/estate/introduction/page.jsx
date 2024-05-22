'use client';
import DashboardLayout from '@/components/common/DashboardLayout';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();

  return (
    <>
      <DashboardLayout>
        <div className='container w-3/4 mx-auto flex flex-col h-full min-h-screen'>
          <div className='w-full flex flex-col py-12'>
            <div className='w-full flex'>
              <div className='w-[50%] flex flex-col'>
                <div className=''>
                  <p className='title py-2 '>tu patrimonio</p>
                  <p className='text-style py-4'>
                  Su patrimonio es todo lo que posee, excepto cualquier obsequio específico que decida dejar a otras personas más adelante. Esto se conoce como patrimonio residual.
                  </p>
                  <p className='text-style py-4'>
                  En esta sección podrá dividir su patrimonio residual entre personas e incluso organizaciones benéficas.
                  </p>
                  <p className='text-style py-4'>
                  Podrás agregar tus regalos más tarde.
                  </p>
                  <div className='w-full'>
                    <p className='sm-title py-4 flex gap-2'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 448 512'
                        width={'24px'}
                        height={'24px'}
                      >
                        <path
                          fill='#04724D'
                          d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z'
                        />
                      </svg>
                      Lo que no incluye su patrimonio residual
                    </p>
                    <ul className='list-disc px-12'>
                      <li className='text-style py-2'>
                      Sus cuentas bancarias e ISA
                      </li>
                      <li className='text-style py-2'>
                      Sus cuentas bancarias e ISA
                      </li>
                      <li className='text-style py-2'>
                      Sus cuentas bancarias e ISA
                      </li>
                      <li className='text-style py-2'>
                      Sus cuentas bancarias e ISA
                      </li>
                      <li className='text-style py-2'>
                      Sus cuentas bancarias e ISA
                      </li>
                    </ul>
                  </div>
                  <div className='w-full'>
                    <p className='sm-title py-4 flex gap-2'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 512 512'
                        width={'24px'}
                        height={'24px'}
                      >
                        <path
                          fill='#D00E01'
                          d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z'
                        />
                      </svg>{' '}
                      Qué incluye su patrimonio residual
                    </p>
                    <ul className='list-disc px-12'>
                      <li className='text-style py-2'>
                      Sus cuentas bancarias e ISA
                      </li>
                      <li className='text-style py-2'>
                      Sus cuentas bancarias e ISA
                      </li>
                      <li className='text-style py-2'>
                      Sus cuentas bancarias e ISA
                      </li>
                      <li className='text-style py-2'>
                      Sus cuentas bancarias e ISA
                      </li>
                      <li className='text-style py-2'>
                      Sus cuentas bancarias e ISA
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='w-full flex items-center justify-between'>
                  <button
                    onClick={() => router.push('/estate/people')}
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
    </>
  );
};

export default page;
