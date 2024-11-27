'use client';
import { FC } from 'react';
import DashboardLayout from '@/components/common/DashboardLayout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PrimaryButton from "@/components/reusables/PrimaryButton";

interface CharityOption {
  title: string;
}

const CharitiesPage: FC = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, index: number): void => {
    e.preventDefault();
    setActiveIndex(index === activeIndex ? null : index);
  };

  const charityOptions: CharityOption[] = [
    { title: 'Sí' },
    { title: 'No' },
  ];

  return (
    <DashboardLayout>
      <div className='container w-3/4 mx-auto flex flex-col h-full min-h-screen'>
        <div className='w-full flex flex-col py-12'>
          <div className='w-full flex'>
            <div className='w-[50%] flex flex-col'>
              <div>
                <p className='title py-2'>
                  ¿Le gustaría incluir una donación a una organización benéfica?
                </p>
                <p className='text-style py-4'>
                  Muchas personas dejan parte de su patrimonio a organizaciones
                  benéficas para contribuir a causas que les apasionan.
                </p>
                <div className='bg-white rounded-lg overflow-hidden'>
                  {charityOptions.map((item, index) => (
                    <div
                      key={index}
                      onClick={(e) => handleClick(e, index)}
                      className='group cursor-pointer'
                    >
                      <p
                        className={`px-4 py-6 ${
                          activeIndex === index
                            ? 'bg-[#0171e3] text-white'
                            : 'text-gray-800 hover:bg-[#0171e3] hover:text-white'
                        }`}
                      >
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className='w-full flex items-end justify-end'>
                <PrimaryButton onClick={() => router.push('/estate/share')}>
                  Guardar y continuar
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CharitiesPage;