'use client';

import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/common/DashboardLayout';
import { useRouter } from 'next/navigation';
import PrimaryButton from '@/components/reusables/PrimaryButton';
import ProgressIndicator from '@/components/reusables/ProgressIndicator';
import Link from 'next/link';
import Spinner from '@/components/reusables/Spinner';
import { updateUserAction } from '@/app/actions/userActions';
import { createContactAction } from '@/app/actions/contactActions';
import type { Contact } from '@/types';
import Add from "@/app/about-yourself/partner/Add";
import { flushSync } from 'react-dom';
import { PencilSimple, Trash } from 'phosphor-react';

interface MaritalStatusItem {
  title: string;
  subTitle: string;
  value: string;
  items: {
    itemTiltle: string;
    itemData: string | null;
  };
}

interface PartnerFormProps {
  userId: string;
  initialMaritalStatus: string | null;
  initialPartner: Contact | null;
}

const maritalStatusOptions: MaritalStatusItem[] = [
  {
    title: "Soltero",
    value: "single",
    subTitle:
      "Sin vínculo matrimonial; incluye a quienes nunca se han casado, viudos y divorciados, pudiendo contraer matrimonio nuevamente.",
    items: { itemTiltle: "", itemData: null },
  },
  {
    title: "Casado",
    value: "married",
    subTitle:
      "Unión legal entre dos personas; ambos asumen derechos y obligaciones.",
    items: { itemTiltle: "", itemData: "/about-yourself/live-with-partner" },
  },
  {
    title: "Concubinato",
    value: "concubinage",
    subTitle:
      "Relación de hecho reconocida si la pareja vive junta y cumple ciertos requisitos.",
    items: { itemTiltle: "", itemData: "/about-yourself/live-with-partner" },
  },
];

const PartnerForm: FC<PartnerFormProps> = ({
  userId,
  initialMaritalStatus,
  initialPartner,
}) => {
  const router = useRouter();
  const initialIndex = maritalStatusOptions.findIndex(
    (item) => item.value === initialMaritalStatus
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(
    initialIndex >= 0 ? initialIndex : null
  );
  const [selectedItem, setSelectedItem] = useState<MaritalStatusItem | null>(
    initialIndex >= 0 ? maritalStatusOptions[initialIndex] : null
  );
  const [partner, setPartner] = useState<Contact | null>(initialPartner);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleClick = (index: number, item: MaritalStatusItem): void => {
    setActiveIndex(index);
    setSelectedItem(item);
    setErrorMessage(null);
  };

  const handlePartnerClick = (): void => {
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditPartner = (): void => {
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeletePartner = async (): Promise<void> => {
    if (confirm('¿Estás seguro de que deseas eliminar esta pareja?')) {
      try {
        setLoading(true);
        setPartner(null);
        sessionStorage.removeItem('userContact');
      } catch (error) {
        console.error('Error deleting partner:', error);
        setErrorMessage("Error al eliminar la pareja. Por favor, intente nuevamente.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSave = async (): Promise<void> => {
    if (!selectedItem) {
      setErrorMessage("Por favor, selecciona un estado civil");
      return;
    }
    if (!userId) {
      setErrorMessage("No se encontró información del usuario");
      return;
    }
    
    flushSync(() => {
      setLoading(true);
    });
    let didNavigate = false;
    try {
      const updateResult = await updateUserAction({
        id: userId,
        maritalstatus: selectedItem.value,
      });
      if (!updateResult.success) {
        throw new Error(updateResult.error || "Error updating user");
      }
      
      if (
        (selectedItem.title === "Casado" ||
          selectedItem.title === "Concubinato") &&
        !partner
      ) {
        setErrorMessage(
          "Por favor, agregue su pareja haciendo clic en 'Agregar Cónyuge' o 'Agregar Pareja'."
        );
        return;
      }
      
      if (
        partner &&
        (partner.relationToUser === "spouse" || partner.relationToUser === "albacea")
      ) {
        const contactData = {
          name: partner.name,
          fatherLastName: partner.fatherLastName,
          motherLastName: partner.motherLastName,
          relationToUser: partner.relationToUser,
          email: partner.email,
          trustedContact: false,
          countryPhoneCode: partner.countryPhoneCode || '',
          phoneNumber: partner.phoneNumber || '',
          country: "MX",
          notes: partner.notes || '',
          governmentId: partner.governmentId || '',
          gender: partner.gender || '',
        };
  
        if (!partner.id) {
          const createdContact = await createContactAction(userId, contactData);
          sessionStorage.setItem('userContact', JSON.stringify(createdContact));
        }
      }
      router.push("/about-yourself/children");
      didNavigate = true;
    } catch (error: any) {
      console.error("Error updating marital status and contact:", error);
      setErrorMessage("Error al guardar los cambios. Por favor, intente nuevamente.");
    } finally {
      if (!didNavigate) {
        setLoading(false);
      }
    }
  };

  return (
    <DashboardLayout>
      <Add
        showModal={showModal}
        setShowModal={setShowModal}
        setPartner={setPartner}
        isEditing={isEditing}
        existingPartner={isEditing ? partner : null}
        partnerType={selectedItem?.title}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="container mx-auto flex flex-col flex-grow bg-[#f5f5f7] overflow-hidden"
      >
        <div className="w-full max-w-6xl mx-auto flex flex-col min-h-[100vh] mb-4 px-4 sm:px-5">
          <div className="py-12">
            {/* Top section with two columns */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 mb-8">
              <div className="lg:w-1/3">
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md">
                    <span className="text-[#047aff] text-[14px] font-[400]">SITUACIÓN CIVIL</span>
                  </div>
                  <Link href="#" className="inline-flex items-center h-[32px] text-[#047aff] hover:text-[#0456b0]">
                    <span className="w-5 h-5 inline-flex items-center justify-center rounded-full border border-[#047aff] text-sm">?</span>
                  </Link>
                </div>
                <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                  <span className="text-[#1d1d1f]">¿Cuál es tu </span>
                  <span className="bg-gradient-to-r from-[#3d9bff] to-[#047aff] inline-block text-transparent bg-clip-text">
                    situación civil
                  </span>
                  <span className="text-[#1d1d1f]">?</span>
                </h1>
                <p className="text-[16px] text-[#1d1d1f] leading-6 mb-8">
                  Seleccione su estado legal actual, incluso si sabe que va a cambiar pronto. Siempre podrá actualizar esto en el futuro.
                </p>
                <ProgressIndicator currentSection={3} totalSections={5} title="Progreso de la sección" />
              </div>

              <div className="lg:w-3/5">
                <div className="bg-white rounded-2xl px-4 sm:px-8 md:px-12 py-8 shadow-lg relative">
                  <div className="space-y-4 mb-8">
                    {maritalStatusOptions.map((item, index) => (
                      <div
                        key={index}
                        className="cursor-pointer transition-colors"
                        onClick={() => handleClick(index, item)}
                      >
                        <div
                          className={`px-6 py-4 rounded-xl border ${
                            activeIndex === index
                              ? 'bg-[#047aff] border-[#047aff]'
                              : 'border-gray-200 hover:border-[#047aff]'
                          }`}
                        >
                          <h3 className={`text-[17px] font-[400] ${activeIndex === index ? 'text-white' : 'text-[#1d1d1f]'}`}>
                            {item.title}
                          </h3>
                          <p className={`mt-1 text-[14px] ${activeIndex === index ? 'text-blue-100' : 'text-[#6e6e73]'}`}>
                            {item.subTitle}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedItem &&
                    (selectedItem.title === "Casado" ||
                      selectedItem.title === "Concubinato") &&
                    !partner && (
                      <div
                        onClick={handlePartnerClick}
                        className="bg-white rounded-xl border border-gray-200 hover:border-[#047aff] transition-colors cursor-pointer mb-8"
                      >
                        <div className="flex items-center justify-center gap-2 py-4 text-[#047aff] font-medium">
                          <div className="bg-[#047aff] rounded-full p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16" className="fill-white">
                              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                            </svg>
                          </div>
                          {selectedItem.title === "Casado" ? "Agregar Cónyuge" : "Agregar Pareja"}
                        </div>
                      </div>
                    )}

                  {errorMessage && (
                    <p className="text-red-500 text-[14px] text-center mt-4">{errorMessage}</p>
                  )}

                  <div className="flex justify-end pt-4 mt-4">
                    <PrimaryButton onClick={handleSave} disabled={loading}>
                      {loading ? <Spinner size={24} /> : "Guardar y continuar"}
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </div>

            {/* Partner card section - Single card width */}
            {partner && (partner.relationToUser === "spouse" || partner.relationToUser === "albacea") && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">
                  {partner.relationToUser === "spouse" ? "Cónyuge Registrado" : "Pareja Registrada"}
                </h3>
                <div className="max-w-md">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium">{partner.name}</h4>
                      <div className="flex gap-2">
                        <button
                          onClick={handleEditPartner}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <PencilSimple size={20} weight="thin" />
                        </button>
                        <button
                          onClick={handleDeletePartner}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash size={20} weight="thin" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      <strong>Apellido Paterno:</strong> {partner.fatherLastName}<br />
                      <strong>Apellido Materno:</strong> {partner.motherLastName}<br />
                      {partner.email && (<><strong>Correo:</strong> {partner.email}<br /></>)}
                      {partner.gender && (<><strong>Género:</strong> {partner.gender === 'male' ? 'Masculino' : 'Femenino'}<br /></>)}
                      {partner.birthDate && (<><strong>Fecha:</strong> {new Date(partner.birthDate).toLocaleDateString()}<br /></>)}
                      {partner.governmentId && (<><strong>ID:</strong> {partner.governmentId}<br /></>)}
                      {partner.phoneNumber && (<><strong>Teléfono:</strong> {partner.countryPhoneCode} {partner.phoneNumber}<br /></>)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default PartnerForm;