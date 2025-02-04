'use client';

import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import Add from "./Add";
import PrimaryButton from "@/components/reusables/PrimaryButton";
import ProgressIndicator from "@/components/reusables/ProgressIndicator";

interface MaritalStatusItem {
  title: string;
  subTitle: string;
  items: {
    itemTiltle: string;
    itemData: string | null;
  };
}

const PartnerPage: FC = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<MaritalStatusItem | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, index: number, items: MaritalStatusItem): void => {
    e.preventDefault();
    setActiveIndex(index === activeIndex ? null : index);
    setSelectedItem(items);
  };

  const handlePartnerClick = (): void => {
    setShowModal(true);
  };

  const handleSave = (): void => {
    router.push("/about-yourself/children");
  };

  const data: MaritalStatusItem[] = [
    {
      title: "Soltero",
      subTitle: "Libre de vínculos matrimoniales; puede contraer matrimonio si lo desea.",
      items: {
        itemTiltle: "",
        itemData: null,
      },
    },
    {
      title: "Casado",
      subTitle: "Unión legal entre dos personas; ambos asumen derechos y obligaciones.",
      items: {
        itemTiltle: "",
        itemData: "/about-yourself/live-with-partner",
      },
    },
    {
      title: "Viudo",
      subTitle: "Matrimonio disuelto legalmente; cada uno retoma su estado de soltería.",
      items: {
        itemTiltle: "",
        itemData: "/about-yourself/live-with-partner",
      },
    },
    {
      title: "Concubinato",
      subTitle: "Estado de quien ha perdido a su cónyuge por fallecimiento.",
      items: {
        itemTiltle: "",
        itemData: "/about-yourself/live-with-partner",
      },
    },
    {
      title: "Divorciado",
      subTitle: "Relación de hecho reconocida si la pareja vive junta y cumple ciertos requisitos.",
      items: {
        itemTiltle: "",
        itemData: "/about-yourself/live-with-partner",
      },
    },
  ];

  const renderAddPartnerButton = (title: string): JSX.Element | null => {
    if (["Casado", "Viudo", "Divorciado", "Concubinato"].includes(title)) {
      return (
        <div
          onClick={handlePartnerClick}
          className="bg-white rounded-xl border border-gray-200 hover:border-[#047aff] transition-colors cursor-pointer mt-4"
        >
          <div className="flex items-center justify-center gap-2 py-4 text-[#047aff] font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="20"
              height="20"
              className="fill-current"
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
            Agregar Pareja
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardLayout>
      <Add setShowModal={setShowModal} showModal={showModal} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="container mx-auto flex flex-col flex-grow bg-[#f5f5f7] overflow-hidden"
      >
        <div className="w-full max-w-6xl mx-auto flex flex-col min-h-[100vh] mb-4 px-4 sm:px-5">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 h-full py-12">
            {/* Left column - Title section */}
            <div className="lg:w-1/3">
              <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5">
                <span className="text-[#047aff] text-[14px] font-[400]">ESTADO CIVIL</span>
              </div>

              <h1 className='text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]'>
                <span className='text-[#1d1d1f]'>¿Cuál es tu </span>
                <span className='bg-gradient-to-r from-[#3d9bff] to-[#047aff] inline-block text-transparent bg-clip-text'>estado civil</span>
                <span className='text-[#1d1d1f]'>?</span>
              </h1>

              <p className="text-[16px] text-[#1d1d1f] leading-6 mb-8">
                Seleccione su estado legal actual, incluso si sabe que va a
                cambiar pronto. Siempre podrás actualizar esto en el futuro.
              </p>

              <ProgressIndicator
                currentSection={3}
                totalSections={5}
                title="Progreso de la sección"
              />
            </div>

            {/* Right column - Form in white container */}
            <div className='w-full lg:w-3/5'>
              <div className="bg-white rounded-2xl px-4 sm:px-8 md:px-12 py-8 shadow-lg">
                <div className="space-y-4">
                  {data.map((items, index) => (
                    <div
                      key={index}
                      className="cursor-pointer transition-colors"
                      onClick={(e) => handleClick(e, index, items)}
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
                          {items.title}
                        </h3>
                        <p
                          className={`mt-1 text-[14px] ${
                            activeIndex === index
                              ? 'text-blue-100'
                              : 'text-[#6e6e73]'
                          }`}
                        >
                          {items.subTitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedItem && renderAddPartnerButton(selectedItem.title)}

                <div className="flex justify-center pt-6 mt-8">
                  <PrimaryButton onClick={handleSave}>
                    Guardar y continuar
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default PartnerPage;