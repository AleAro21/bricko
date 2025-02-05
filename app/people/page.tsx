'use client';

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/common/DashboardLayout";
import { motion } from "framer-motion";
import { FaUserPlus, FaUsers, FaPaw, FaHandHoldingHeart, FaChild } from 'react-icons/fa';
import Children from "./Children";
import PeopleModal from "./PeopleModal";
import CharityModal from "./CharityModal";
import PetModal from "./PetsModal";
import PrimaryButton from "@/components/reusables/PrimaryButton";

interface ContactCardProps {
  title: string;
  description: string;
  icon: JSX.Element;
  onClick: () => void;
}

const ContactCard: FC<ContactCardProps> = ({ title, description, icon, onClick }) => (
  <div    
    onClick={onClick}
    className="relative flex flex-col items-start p-8 rounded-xl transition-all duration-500 cursor-pointer w-full h-auto min-h-[150px] bg-white shadow-md hover:shadow-lg hover:scale-[1.02]"
  >
    <div className="flex items-center mb-3">
      <div className="w-10 h-10 flex items-center justify-center text-xl text-[#047aff]">
        {icon}
      </div>
    </div>
    <h3 className="text-[24px] sm:text-[28px] text-[#000000] font-[500] mb-2 pr-2 tracking-[0.1px] leading-[1.3]">
      {title}
    </h3>
    <p className="text-[14px] sm:text-[17px] font-[300] text-[#1d1d1f] mb-0 pr-4 tracking-[0.1px] leading-[1.3]">
      {description}
    </p>
  </div>
);

const PeoplePage: FC = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPeopleModal, setShowPeopleModal] = useState<boolean>(false);
  const [showCharityModal, setShowCharityModal] = useState<boolean>(false);
  const [showPetModal, setShowPetModal] = useState<boolean>(false);

  const contactSections = [
    {
      title: "Niños",
      description: "Agrega información sobre tus hijos o menores a cargo para asegurar su futuro y bienestar",
      icon: <FaChild size={28} />,
      onClick: () => setShowModal(true)
    },
    {
      title: "Persona de confianza",
      description: "Designa a las personas que confías para manejar aspectos importantes de tu testamento",
      icon: <FaUsers size={28} />,
      onClick: () => setShowPeopleModal(true)
    },
    {
      title: "Mascota",
      description: "Asegura el cuidado futuro de tus mascotas designando guardianes y recursos",
      icon: <FaPaw size={28} />,
      onClick: () => setShowPetModal(true)
    },
    {
      title: "Caridad",
      description: "Contribuye a causas importantes incluyendo organizaciones benéficas en tu testamento",
      icon: <FaHandHoldingHeart size={28} />,
      onClick: () => setShowCharityModal(true)
    }
  ];

  return (
    <>
      <Children setShowModal={setShowModal} showModal={showModal} />
      <PeopleModal setShowModal={setShowPeopleModal} showModal={showPeopleModal} />
      <CharityModal setShowModal={setShowCharityModal} showModal={showCharityModal} />
      <PetModal setShowModal={setShowPetModal} showModal={showPetModal} />

      <DashboardLayout>
        <motion.div 
          className="min-h-screen bg-[#f5f5f7]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-5 py-12">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5">
                  <span className="text-[#047aff] text-[14px] font-[400]">CONTACTOS</span>
                </div>

                <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                  <span className="text-[#1d1d1f]">Gestiona tus </span>
                  <span className="bg-gradient-to-r from-[#3d9bff] to-[#047aff] inline-block text-transparent bg-clip-text">
                    contactos
                  </span>
                </h1>
                <p className="text-[16px] text-[#1d1d1f] leading-6">
                  Organiza y administra la información de las personas importantes en tu vida
                  y asegura que tus deseos sean cumplidos.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactSections.map((section, index) => (
                  <ContactCard key={index} {...section} />
                ))}
              </div>

              {/* <div className="pt-6 flex justify-end">
                <PrimaryButton
                  onClick={() => router.push("/summary?completed=contacts")}
                >
                  Guardar y continuar
                </PrimaryButton>
              </div> */}
            </div>
          </div>
        </motion.div>
      </DashboardLayout>
    </>
  );
};

export default PeoplePage;