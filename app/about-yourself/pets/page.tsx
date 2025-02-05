'use client';

import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import Add from "./Add";
import PrimaryButton from "@/components/reusables/PrimaryButton";
import ProgressIndicator from "@/components/reusables/ProgressIndicator";
import Link from "next/link";

interface PetOption {
  title: string;
  subTitle: string;
}

const PetsPage: FC = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAddPet, setShowAddPet] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, index: number): void => {
    e.preventDefault();
    setActiveIndex(index === activeIndex ? null : index);
    setShowAddPet(index === 0);
  };

  const handlePetClick = (): void => {
    setShowModal(true);
  };

  const data: PetOption[] = [
    {
      title: "Sí",
      subTitle: "Tengo mascotas que quiero incluir en mi testamento.",
    },
    {
      title: "No",
      subTitle: "No tengo mascotas que incluir en mi testamento.",
    },
  ];

  const renderAddPetButton = (): JSX.Element | null => {
    if (showAddPet) {
      return (
        <div
          onClick={handlePetClick}
          className="bg-white rounded-xl border border-gray-200 hover:border-[#047aff] transition-colors cursor-pointer mt-4"
        >
          <div className="flex items-center justify-center gap-2 py-4 text-[#047aff] font-medium">
            <div className="bg-[#047aff] rounded-full p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width="16"
                height="16"
                className="fill-white"
              >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
              </svg>
            </div>
            Agregar Mascota
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardLayout>
      <div className="relative min-h-screen">
        <Add showModal={showModal} setShowModal={setShowModal} />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="container mx-auto flex flex-col flex-grow bg-[#f5f5f7]"
        >
          <div className="w-full max-w-6xl mx-auto flex flex-col min-h-[100vh] mb-4 px-4 sm:px-5">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 h-full py-12">
              {/* Left column - Title section */}
              <div className="lg:w-1/3">
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md">
                    <span className="text-[#047aff] text-[14px] font-[400]">MASCOTAS</span>
                  </div>
                  <Link href="#" className="inline-flex items-center h-[32px] text-[#047aff] hover:text-[#0456b0]">
                    <span className="w-5 h-5 inline-flex items-center justify-center rounded-full border border-[#047aff] text-sm">?</span>
                  </Link>
                </div>

                <h1 className='text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]'>
                  <span className='text-[#1d1d1f]'>¿Tienes </span>
                  <span className='bg-gradient-to-r from-[#3d9bff] to-[#047aff] inline-block text-transparent bg-clip-text'>mascotas</span>
                  <span className='text-[#1d1d1f]'>?</span>
                </h1>

                <div className="space-y-4 mb-5">
                  <p className="text-[16px] text-[#1d1d1f] leading-6">
                    Puedes elegir tutores para tus mascotas en la siguiente sección.
                  </p>
                  <p className="text-[16px] text-[#1d1d1f] leading-6">
                    Agrega todas las mascotas que desees incluir en tu testamento.
                  </p>
                  <p className="text-[16px] text-[#1d1d1f] leading-6 mb-8">
                    Podrás actualizar esta información en cualquier momento.
                  </p>
                </div>

                <ProgressIndicator
                  currentSection={5}
                  totalSections={5}
                  title="Progreso de la sección"
                />
              </div>

              {/* Right column - Form in white container */}
              <div className='w-full lg:w-3/5'>
                <div className="bg-white rounded-2xl px-4 sm:px-8 md:px-12 py-8 shadow-lg">
                  <div className="space-y-4">
                    {data.map((item, index) => (
                      <div
                        key={index}
                        className="cursor-pointer transition-colors"
                        onClick={(e) => handleClick(e, index)}
                      >
                        <div
                          className={`px-6 py-4 rounded-xl border ${
                            activeIndex === index
                              ? 'bg-[#047aff] border-[#047aff]'
                              : 'border-gray-200 hover:border-[#047aff]'
                          }`}
                        >
                          <h3
                            className={`text-[17px] font-[400] ${
                              activeIndex === index
                                ? 'text-white'
                                : 'text-[#1d1d1f]'
                            }`}
                          >
                            {item.title}
                          </h3>
                          <p
                            className={`mt-1 text-[14px] ${
                              activeIndex === index
                                ? 'text-blue-100'
                                : 'text-[#6e6e73]'
                            }`}
                          >
                            {item.subTitle}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {renderAddPetButton()}

                  <div className="flex justify-end pt-4 mt-4">
                    <PrimaryButton onClick={() => router.push("/summary?completed=about-your-self")}>
                      Guardar y continuar
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default PetsPage;