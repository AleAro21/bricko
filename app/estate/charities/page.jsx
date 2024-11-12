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
                <p className='title py-2 '>
                  ¿Le gustaría incluir una donación a una organización benéfica?
                </p>
                <p className='text-style py-4'>
                  Muchas personas dejan parte de su patrimonio a organizaciones
                  benéficas para contribuir a causas que les apasionan.
                </p>
                <div className='bg-white rounded-lg overflow-hidden'>
                  {data &&
                    data?.map((items, index) => (
                      <div key={index} className=''>
                        <p
                          onClick={(e) => handleClick(e, index)}
                          className={`text-style cursor-pointer px-4 py-6 ${
                            activeIndex === index
                              ? 'bg-[#0171e3] text-white'
                              : ''
                          }`}
                        >
                          {items.title}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
              <div className='w-full flex items-end justify-end'>
               
                <button
                  onClick={() => router.push('/estate/share')}
                  className='text-[14px] text-[#FFFFFF] font-[600] bg-[#0171e3] px-4 py-4 rounded-[100px] uppercase mt-4'
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
