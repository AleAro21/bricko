'use client';

import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import Add from "./Add";
import PrimaryButton from "@/components/reusables/PrimaryButton";
import ProgressIndicator from "@/components/reusables/ProgressIndicator";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { useContact } from "@/context/ContactContext";
import { apiService } from '@/app/apiService';
import { fetchAuthSession } from "aws-amplify/auth";
import Spinner from "@/components/reusables/Spinner";
import { Contact } from '@/types';

interface MaritalStatusItem {
  title: string;
  subTitle: string;
  value: string;
  items: {
    itemTiltle: string;
    itemData: string | null;
  };
}

const PartnerPage: FC = () => {
  const router = useRouter();
  const { user, refreshUser } = useUser();
  const { contact, saveContact } = useContact();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<MaritalStatusItem | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [partner, setPartner] = useState<Contact | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const data: MaritalStatusItem[] = [
    {
      title: "Soltero",
      value: "single",
      subTitle: "Libre de vínculos matrimoniales; puede contraer matrimonio si lo desea.",
      items: {
        itemTiltle: "",
        itemData: null,
      },
    },
    {
      title: "Casado",
      value: "married",
      subTitle: "Unión legal entre dos personas; ambos asumen derechos y obligaciones.",
      items: {
        itemTiltle: "",
        itemData: "/about-yourself/live-with-partner",
      },
    },
    {
      title: "Viudo",
      value: "widowed",
      subTitle: "Estado de quien ha perdido a su cónyuge por fallecimiento.",
      items: {
        itemTiltle: "",
        itemData: "/about-yourself/live-with-partner",
      },
    },
    {
      title: "Concubinato",
      value: "concubinage",
      subTitle: "Relación de hecho reconocida si la pareja vive junta y cumple ciertos requisitos.",
      items: {
        itemTiltle: "",
        itemData: "/about-yourself/live-with-partner",
      },
    },
    {
      title: "Divorciado",
      value: "divorced",
      subTitle: "Matrimonio disuelto legalmente; cada uno retoma su estado de soltería.",
      items: {
        itemTiltle: "",
        itemData: "/about-yourself/live-with-partner",
      },
    },
  ];

  // Load marital status and contact data on page load
  useEffect(() => {
    const loadData = async () => {
      if (!user?.id) {
        setIsInitialLoading(false);
        return;
      }

      try {
        // Check session storage for marital status and contact
        const storedMaritalStatus = sessionStorage.getItem('userMaritalStatus');
        const storedContact = sessionStorage.getItem('userContact');

        if (storedMaritalStatus && storedContact) {
          const maritalStatus = JSON.parse(storedMaritalStatus);
          const contactData: Contact = JSON.parse(storedContact);
          // Only set partner if its relation is "spouse" or "albacea"
          if (
            contactData &&
            (contactData.relationToUser === "spouse" || contactData.relationToUser === "albacea")
          ) {
            setPartner(contactData);
          } else {
            setPartner(null);
          }
          const selected = data.find(item => item.value === maritalStatus) || null;
          setSelectedItem(selected);
          // Set the active index based on the found marital status
          const index = data.findIndex(item => item.value === maritalStatus);
          if (index !== -1) {
            setActiveIndex(index);
          }
          setIsInitialLoading(false);
          return;
        }

        // Fetch marital status and contact from API
        const { tokens } = await fetchAuthSession();
        if (!tokens?.accessToken) {
          throw new Error("No authentication token available");
        }

        apiService.setToken(tokens.accessToken.toString());

        // Fetch marital status from user data
        const userResponse = await apiService.getUser(user.id);
        const maritalStatus = userResponse.maritalstatus;

        // Fetch contact data and filter allowed relations
        const contactsResponse = await apiService.getContacts(user.id);
        const filteredContacts = contactsResponse.filter((contact: Contact) =>
          contact.relationToUser === "spouse" || contact.relationToUser === "albacea"
        );
        const contactData = filteredContacts.length > 0 ? filteredContacts[0] : null;
        console.log('Filtered contact data:', contactData);

        // Store in session storage
        sessionStorage.setItem('userMaritalStatus', JSON.stringify(maritalStatus));
        sessionStorage.setItem('userContact', JSON.stringify(contactData));

        // Update state
        const selected = data.find(item => item.value === maritalStatus) || null;
        setSelectedItem(selected);
        const index = data.findIndex(item => item.value === maritalStatus);
        if (index !== -1) {
          setActiveIndex(index);
        }
        setPartner(contactData);
      } catch (error) {
        console.error('Error loading data:', error);
        // Optionally, set an error message here
      } finally {
        setIsInitialLoading(false);
      }
    };

    loadData();
  }, [user?.id]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, index: number, item: MaritalStatusItem): void => {
    e.preventDefault();
    setActiveIndex(index === activeIndex ? null : index);
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
        // Delete partner logic if needed; here we simply remove partner from state
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

    if (!user?.id) {
      setErrorMessage("No se encontró información del usuario");
      return;
    }

    try {
      setLoading(true);
      const { tokens } = await fetchAuthSession();
      if (!tokens?.accessToken) {
        throw new Error("No authentication token available");
      }

      apiService.setToken(tokens.accessToken.toString());

      // Update user's marital status
      await apiService.updateUser(user.id, {
        maritalstatus: selectedItem.value
      });

      // Save or update contact ONLY if it exists and has an allowed relation
      if (
        partner &&
        (partner.relationToUser === "spouse" || partner.relationToUser === "albacea")
      ) {
        const contactData: Contact = {
          id: partner.id,
          name: partner.name,
          fatherLastName: partner.fatherLastName,
          motherLastName: partner.motherLastName,
          relationToUser: partner.relationToUser,
          email: partner.email,
          trustedContact: false,
          countryPhoneCode: partner.countryPhoneCode || '',
          phoneNumber: partner.phoneNumber || '',
          country: "MX",
        };

        // Uncomment and update the logic below if you want to handle contact updates
        // if (partner.id) {
        //   await apiService.updateContact(user.id, partner.id, contactData);
        // } else {
          await apiService.createContact(user.id, contactData);
        // }

        // Store updated contact in session storage
        sessionStorage.setItem('userContact', JSON.stringify(contactData));
      }

      // Refresh user data and navigate to the next page
      await refreshUser();
      router.push("/about-yourself/children");
    } catch (error) {
      console.error('Error updating marital status and contact:', error);
      setErrorMessage("Error al guardar los cambios. Por favor, intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const renderAddPartnerButton = (title: string): JSX.Element | null => {
    if (["Casado", "Viudo", "Divorciado", "Concubinato"].includes(title)) {
      if (!partner) {
        return (
          <div
            onClick={handlePartnerClick}
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
              Agregar Pareja
            </div>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <DashboardLayout>
      <Add
        setShowModal={setShowModal}
        showModal={showModal}
        setPartner={setPartner}
        isEditing={isEditing}
        existingPartner={isEditing ? partner : null}
      />
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
              <div className="flex items-center gap-2 mb-2.5">
                <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md">
                  <span className="text-[#047aff] text-[14px] font-[400]">ESTADO CIVIL</span>
                </div>
                <Link href="#" className="inline-flex items-center h-[32px] text-[#047aff] hover:text-[#0456b0]">
                  <span className="w-5 h-5 inline-flex items-center justify-center rounded-full border border-[#047aff] text-sm">?</span>
                </Link>
              </div>

              <h1 className='text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]'>
                <span className='text-[#1d1d1f]'>¿Cuál es tu </span>
                <span className='bg-gradient-to-r from-[#3d9bff] to-[#047aff] inline-block text-transparent bg-clip-text'>estado civil</span>
                <span className='text-[#1d1d1f]'>?</span>
              </h1>

              <p className="text-[16px] text-[#1d1d1f] leading-6 mb-8">
                Seleccione su estado legal actual, incluso si sabes que va a
                cambiar pronto. Siempre podrás actualizar esto en el futuro.
              </p>

              <ProgressIndicator
                currentSection={3}
                totalSections={5}
                title="Progreso de la sección"
              />

              {/* Partner Card with Edit/Delete */}
              {partner && (partner.relationToUser === "spouse" || partner.relationToUser === "albacea") && (
                <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold">Pareja</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={handleEditPartner}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        onClick={handleDeletePartner}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>Nombre:</strong> {partner.name}<br />
                    <strong>Apellido Paterno:</strong> {partner.fatherLastName}<br />
                    <strong>Apellido Materno:</strong> {partner.motherLastName}<br />
                    <strong>Correo Electrónico:</strong> {partner.email}<br />
                    <strong>Relación:</strong> {partner.relationToUser}
                  </p>
                </div>
              )}
            </div>

            {/* Right column - Form in white container */}
            <div className='w-full lg:w-3/5'>
              <div className="bg-white rounded-2xl px-4 sm:px-8 md:px-12 py-8 shadow-lg relative">
                {(loading || isInitialLoading) && (
                  <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50 rounded-2xl">
                    <div className="text-center">
                      <Spinner size={50} />
                      <p className="mt-4 text-[#047aff] font-medium">
                        {loading ? 'Guardando...' : 'Cargando...'}
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {data.map((item, index) => (
                    <div
                      key={index}
                      className="cursor-pointer transition-colors"
                      onClick={(e) => handleClick(e, index, item)}
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

                {selectedItem && renderAddPartnerButton(selectedItem.title)}

                {errorMessage && (
                  <p className="text-red-500 text-[14px] text-center mt-4">{errorMessage}</p>
                )}

                <div className="flex justify-end pt-4 mt-4">
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
