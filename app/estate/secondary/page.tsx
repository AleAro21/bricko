"use client";
import { FC, useState } from 'react';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';
import PrimaryButton from "@/components/reusables/PrimaryButton";

interface ShareOption {
  title: string;
  subTitle: string;
  items: {
    itemTitle: string;
    itemData: string | null;
  };
}

const SharePage: FC = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<ShareOption | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, index: number, items: ShareOption): void => {
    e.preventDefault();
    setActiveIndex(index === activeIndex ? null : index);
    setSelectedItem(items);
  };

  const data: ShareOption[] = [
    {
      title: "Sus hijos",
      subTitle: "Todos los hijos biológicos y legalmente adoptados heredarán por igual.",
      items: {
        itemTitle: "",
        itemData: null,
      },
    },
    {
      title: "Personas u organizaciones benéficas específicas",
      subTitle: "Seleccione beneficiarios específicos para heredar esta parte del patrimonio.",
      items: {
        itemTitle: "",
        itemData: null,
      },
    },
  ];

  return (
    <DashboardLayout>
      <motion.div 
        className="min-h-screen bg-[#f5f5f7]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-5 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
            {/* Left Column - Title and Description */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5">
                  <span className="text-[#047aff] text-[14px] font-[400]">BENEFICIARIOS SECUNDARIOS</span>
                </div>

                <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                  <span className="text-[#1d1d1f]">Si su contacto de confianza fallece, </span>
                  <span className="bg-gradient-to-r from-[#3d9bff] to-[#047aff] inline-block text-transparent bg-clip-text">
                    ¿quién heredará su parte?
                  </span>
                </h1>
                <p className="text-[16px] text-[#1d1d1f] leading-6">
                  Escribir un testamento consiste en estar preparado para lo
                  inesperado. Es por eso que también le pedimos que nombre
                  refuerzos en caso de que el beneficiario elegido muera antes
                  que usted. Estos se conocen como beneficiarios secundarios.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-[16px] text-[#1d1d1f] leading-6">
                  La selección de "sus hijos" incluye a todos los hijos
                  biológicos y legalmente adoptados, pero no a sus hijastros.
                </p>
                <p className="text-[16px] text-[#1d1d1f] leading-6">
                  Si tanto su beneficiario original como suplente mueren antes
                  que usted, esta parte de su patrimonio se dividirá entre sus
                  otros beneficiarios.
                </p>
              </div>

              <div className="pt-6 flex justify-end">
                <PrimaryButton
                  onClick={() => router.push("/summary?completed=estate")}
                >
                  Guardar y continuar
                </PrimaryButton>
              </div>
            </div>

            {/* Right Column - Options */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                {data.map((items, index) => (
                  <div
                    key={index}
                    className="cursor-pointer transition-all"
                    onClick={(e) => handleClick(e, index, items)}
                  >
                    <div
                      className={`px-6 py-4 ${
                        index !== 0 ? 'border-t border-gray-100' : ''
                      } ${
                        activeIndex === index
                          ? 'bg-[#047aff] text-white'
                          : 'hover:bg-[#047aff] hover:bg-opacity-5'
                      }`}
                    >
                      <h3 className="text-[17px] font-[500]">
                        {items.title}
                      </h3>
                      <p className={`mt-1 text-[14px] ${
                        activeIndex === index
                          ? 'text-white text-opacity-80'
                          : 'text-gray-500'
                      }`}>
                        {items.subTitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default SharePage;