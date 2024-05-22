'use client';
import DashboardLayout from '@/components/common/DashboardLayout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const page = () => {
  const router = useRouter();
  const [activeAccordion, setActiveAccordion] = useState(null);
  const toggleAccordion = (index) => {
    setActiveAccordion((prev) => (prev === index ? null : index));
  };
  return (
    <DashboardLayout>
      <div className='container w-3/4 mx-auto flex flex-col h-full min-h-screen'>
        <div className='w-full flex flex-col py-12'>
          <p className='title'>Bienvenido de nuevo Tu Nombre</p>
          <p className='text-style py-4'>Ordenemos tu testamento</p>
          <div className='w-full flex'>
            <div className='w-[50%] flex flex-col'>
              <div className='w-full bg-white flex items-start p-4 gap-4 rounded-lg'>
                <div className='w-[40px] h-[40px] font-lg text-[24px] text-white flex items-center justify-center bg-yellow-500 rounded-full'>
                  1
                </div>
                <div className='w-full'>
                  <p className='title'>Escribe tu testamento</p>
                  <p className='text-style'>
                  Eso le toma a la mayoría de las personas alrededor de 15 minutos.
                  </p>
                  <button
                    onClick={() => router.push('/summary')}
                    className='w-full text-[14px] text-[#4a4a4a] font-[600] bg-[#FFDF4E] px-4 py-4 rounded-[5px] uppercase mt-4'
                  >
                    EMPEZAR
                  </button>
                </div>
              </div>
              <div
                id='accordion-flush'
                data-accordion='collapse'
                data-active-classes='bg-white dark:bg-gray-900 text-gray-900 dark:text-white'
                data-inactive-classes='text-gray-500 dark:text-gray-400'
              >
                {[1, 2, 3].map((index) => (
                  <div key={index}>
                    <h2 id={`accordion-flush-heading-${index}`}>
                      <button
                        type='button'
                        className='flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3'
                        onClick={() => toggleAccordion(index)}
                        aria-expanded={
                          activeAccordion === index ? 'true' : 'false'
                        }
                        aria-controls={`accordion-flush-body-${index}`}
                      >
                        <span className='sm-title text-start'>
                          {index === 1
                            ? 'Nuestros especialistas revisan tu testamento'
                            : index === 2
                            ? 'Hazlo legal'
                            : 'Mantenga su testamento al día'}
                        </span>
                        {activeAccordion === index ? (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 512 512'
                            height={24}
                            width={24}
                            className='min-w-[24px] min-h-[24px]'
                          >
                            <path d='M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z' />
                          </svg>
                        ) : (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 512 512'
                            height={24}
                            width={24}
                            className='min-w-[24px] min-h-[24px]'
                          >
                            <path d='M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z' />
                          </svg>
                        )}
                      </button>
                    </h2>
                    <div
                      id={`accordion-flush-body-${index}`}
                      className={`${activeAccordion === index ? '' : 'hidden'}`}
                      aria-labelledby={`accordion-flush-heading-${index}`}
                    >
                      <div className='py-5 border-b border-gray-200 dark:border-gray-700'>
                        <p className='mb-2 text-gray-500 dark:text-gray-400'>
                          {index === 1
                            ? 'Nuestros especialistas comprobarán su testamento en un plazo de 5 días laborables. Si recomiendan algún cambio, realice las actualizaciones dentro de los 30 días y verificarán su testamento nuevamente. Simple.'
                            : index === 2
                            ? 'Para que su testamento sea legalmente vinculante, debe firmar una copia impresa frente a dos testigos. Puede optar por descargar e imprimir su testamento en casa o solicitar una copia impresa.'
                            : 'Una vez que haya firmado su testamento, es importante actualizarlo cuando cambien las circunstancias. Tradicionalmente, eso significa pagar los honorarios de un abogado o el costo de un testamento completamente nuevo. Con Farewill puedes realizar cambios ilimitados por solo £10 al año; encontrarás la opción al finalizar la compra.'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='w-[50%]'>
              <div className='mt-[10vh] border rounded-lg md:w-[80%] mx-auto p-6'>
                <p className='title'>Estamos aquí para ayudar</p>
                <div className='flex gap-2 py-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'
                    width={24}
                    height={24}
                  >
                    <path d='M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z' />
                  </svg>
                  <p className='text-style'> Llámanos al 123 456 7890 </p>
                </div>
                <div className='flex gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'
                    width={24}
                    height={24}
                  >
                    <path d='M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z' />
                  </svg>
                  <p className='text-style'>Envíenos un correo electrónico a hello@farewill.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default page;
