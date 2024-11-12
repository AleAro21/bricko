'use client';
import Add from '@/app/estate/people/Add';
import DashboardLayout from '@/components/common/DashboardLayout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const page = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const clickHandler = () => {
    setShowModal(true);
  };
  const handleClick = (e, index) => {
    e.preventDefault();
    setActiveIndex(index === activeIndex ? null : index);
  };

  const data = [
    {
      title: "Amigos de la familia",
    },
    {
      title: "Fideicomisarios de despedida",
    },
    {
      title: "Amigos y familiares y fideicomisarios de Testador",
    },
  ];

  return (
    <>
      <Add setShowModal={setShowModal} showModal={showModal} />
      <DashboardLayout>
        <div className='container w-3/4 mx-auto flex flex-col h-full min-h-screen'>
          <div className='w-full flex flex-col py-12'>
            <div className='w-full flex'>
              <div className='w-[50%] flex flex-col'>
                
                <div className=''>
                <p className="title py-2 ">
                    ¿A quién le gustaría elegir como su albacea?
                  </p>
                  <div className="bg-white rounded-lg overflow-hidden ">
                    {data &&
                      data?.map((items, index) => (
                        <div key={index} className="">
                          <p
                            onClick={(e) => handleClick(e, index)}
                            className={`text-style cursor-pointer px-4 py-6 ${
                              activeIndex === index
                                ? "bg-[#0171e3] text-white"
                                : ""
                            }`}
                          >
                            {items.title}
                          </p>
                        </div>
                      ))}
                  </div>
                  <p className='title py-2 '>
                    ¿A quién quieres como tus albaceas?
                  </p>
                  <div className='bg-white w-full rounded-lg my-4 px-4 py-6 flex justify-between items-center'>
                    <div className=''>
                      <p className='sm-title'>Nombre Completor Contacto</p>
                      <p className='text-style'>test@testador.com</p>
                    </div>
                    <div className=''>
                      <input type='checkbox' className='w-6 h-6 bg-white' />
                    </div>
                  </div>
                  <div
                    onClick={clickHandler}
                    className='bg-white my-4 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer'
                  >
                    <p className='flex gap-2 py-10 text-style'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 448 512'
                        width={'24px'}
                        height={'24px'}
                      >
                        <path d='M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z' />
                      </svg>
               
                    </p>
                  </div>
                </div>
                <div className='w-full flex items-center justify-between'>
                 
                  <button
                    onClick={() => router.push('/summary?completed=executers')}
                    className='text-[14px] text-[#FFFFFF] ml-auto mr-0 font-[600] bg-[#0171e3] px-4 py-4 rounded-[100px] uppercase mt-4'
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
