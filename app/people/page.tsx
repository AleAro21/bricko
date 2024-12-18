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

interface ContactCardProps {
  title: string;
  description: string;
  icon: JSX.Element;
  onClick: () => void;
}

const ContactCard: FC<ContactCardProps> = ({ title, description, icon, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#0171e3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative p-8">
      <div className="flex items-start space-x-6">
        <div className="p-4 rounded-2xl bg-[#0171e3]/5">
          <div className="text-[#0171e3]">{icon}</div>
        </div>
        <div className="flex-1 pt-2">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
      <motion.div 
        className="mt-6 h-1 bg-[#0171e3]/10 rounded-full overflow-hidden"
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.4 }}
      >
        <div className="h-full bg-[#0171e3] w-0 group-hover:w-full transition-all duration-500" />
      </motion.div>
    </div>
  </motion.div>
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
        <div className="max-w-6xl mx-auto px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Gestiona tus Contactos
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Organiza y administra la información de las personas importantes en tu vida
              y asegura que tus deseos sean cumplidos.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/50 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-100/50 p-8 mb-12"
          >
            <div className="flex items-center gap-4 text-[#0171e3]">
              <FaUserPlus size={24} />
              <h2 className="text-xl font-semibold">Comienza Agregando Contactos</h2>
            </div>
            <p className="mt-3 text-gray-500 pl-10">
              Selecciona una categoría para comenzar a agregar la información de tus seres queridos
              y beneficiarios.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactSections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <ContactCard {...section} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => router.push("/summary?completed=account-and-property")}
              className="px-8 py-4 bg-[#0171e3] text-white rounded-full font-medium hover:bg-[#0171e3]/90 transition-colors duration-300"
            >
              Continuar
            </button>
          </motion.div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default PeoplePage;