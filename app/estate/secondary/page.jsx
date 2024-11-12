'use client';
import DashboardLayout from '@/components/common/DashboardLayout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const page = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, index) => {
    e.preventDefault();
    setActiveIndex(index === activeIndex ? null : index);
  };
  const data = [
    {
      title: 'Sus niños',
    },
    {
      title: 'Personas u organizaciones benéficas específicas',
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
                  Si contacto confianza muere antes que usted, ¿quién debería heredar
                  su parte del patrimonio?
                </p>
                <p className='text-style py-4'>
                  Escribir un testamento consiste en estar preparado para lo
                  inesperado. Es por eso que también le pedimos que nombre
                  refuerzos en caso de que el beneficiario elegido muera antes
                  que usted. Estos se conocen como beneficiarios secundarios.
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
                <p className='text-style py-4'>
                  La selección de “sus hijos” incluye a todos los hijos
                  biológicos y legalmente adoptados de ferfer yuygug, pero no a
                  sus hijastros.
                </p>
                <p className='text-style py-4'>
                  Si tanto su beneficiario original como suplente mueren antes
                  que usted, esta parte de su patrimonio se dividirá entre sus
                  otros beneficiarios (las personas que ha elegido para heredar
                  su patrimonio).
                </p>
              </div>
              <div className='w-full flex items-end justify-end'>
               
                <button
                  onClick={() => router.push('/summary?completed=estate')}
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
