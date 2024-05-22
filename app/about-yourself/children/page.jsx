'use client';
import DashboardLayout from '@/components/common/DashboardLayout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const page = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(1);

  const handleClick = (e, index) => {
    e.preventDefault();
    setActiveIndex(index === activeIndex ? null : index);
  };
  const data = [
    {
      title: 'Sí',
    },
    {
      title: 'No',
    },
  ];
  return (
    <DashboardLayout>
      <div className='container w-3/4 mx-auto flex flex-col h-full min-h-screen'>
        <div className='w-full flex flex-col py-12'>
          <div className='w-full flex'>
            <div className='w-[50%] flex flex-col'>
              <div className=''>
                <p className='title py-2 '>¿Tienes hijos?</p>
                <p className='text-style py-4'>
                  Si su primer hijo está en camino, seleccione “No” por ahora.
                  Siempre podrás actualizar esto en el futuro.
                </p>
                <p className='text-style py-4'>
                  Agregue todos sus hijos biológicos y legalmente adoptados,
                  quiera o no dejarles cosas en su testamento.
                </p>
                <p className='text-style py-4'>
                  No agregue ningún hijastro aquí. Puede agregarlos más tarde si
                  desea dejarlos como parte de su patrimonio.
                </p>
                <div className='bg-white rounded-lg overflow-hidden'>
                  {data &&
                    data?.map((items, index) => (
                      <div key={index} className=''>
                        <p
                          onClick={(e) => handleClick(e, index)}
                          className={`text-style cursor-pointer px-4 py-6 ${
                            activeIndex === index
                              ? 'bg-[#ffdf4e] text-white'
                              : ''
                          }`}
                        >
                          {items.title}
                        </p>
                      </div>
                    ))}
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
                  onClick={() => router.push('/about-yourself/pets')}
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
