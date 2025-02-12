'use client';

import { FC, FormEvent, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import AddressAutocomplete, { AddressData } from "@/components/common/address/AddressAutocomplete";
import PrimaryButton from "@/components/reusables/PrimaryButton";
import ProgressIndicator from "@/components/reusables/ProgressIndicator";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import Spinner from "@/components/reusables/Spinner";
import { apiService } from '@/app/apiService';
import { fetchAuthSession } from "aws-amplify/auth";

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
}

const BasicPage: FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [formValues, setFormValues] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadUserAddress = async () => {
      if (!user?.id) {
        setIsInitialLoading(false);
        return;
      }
  
      try {
        // First check session storage
        const storedAddress = sessionStorage.getItem('userAddress');
        if (storedAddress) {
          const parsedAddress = JSON.parse(storedAddress);
          // Normalize to a single object (if stored as an array, get the first element)
          const address = Array.isArray(parsedAddress) ? parsedAddress[0] : parsedAddress;
          
          if (address) {
            setFormValues({
              street: address.street || "",
              city: address.city || "",
              state: address.state || "",
              zipCode: address.zipCode || "",
            });
            setIsInitialLoading(false);
            return;
          }
        }
  
        // If no stored address, fetch from API
        const { tokens } = await fetchAuthSession();
        if (!tokens?.accessToken) {
          throw new Error("No authentication token available");
        }
  
        apiService.setToken(tokens.accessToken.toString());
        const response = await apiService.getUserAddress(user.id);
  
        if (response) {
          // Normalize the response and store only a single address object
          const addressToStore = Array.isArray(response) ? response[0] : response;
          sessionStorage.setItem('userAddress', JSON.stringify(addressToStore));
          
          setFormValues({
            street: addressToStore.street || "",
            city: addressToStore.city || "",
            state: addressToStore.state || "",
            zipCode: addressToStore.zipCode || "",
          });
        }
      } catch (error) {
        console.error('Error loading user address:', error);
        // Don't show error message for 404 (no address yet)
        if ((error as any).response?.status !== 404) {
          setErrorMessage("Error al cargar la dirección. Por favor, intente nuevamente.");
        }
      } finally {
        setIsInitialLoading(false);
      }
    };
  
    loadUserAddress();
  }, [user?.id]);
  

  const handleAddressSelect = (addressData: AddressData): void => {
    setFormValues(prev => ({
      ...prev,
      street: addressData.street,
      city: addressData.city,
      state: addressData.state,
      zipCode: addressData.postalCode,
    }));
    setErrorMessage(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const { street, city, state, zipCode } = formValues;

    if (!street || !city || !state || !zipCode) {
      setErrorMessage("Por favor, complete todos los campos obligatorios");
      return;
    }

    if (!user?.id) {
      setErrorMessage("No se encontró información del usuario");
      return;
    }

    try {
      // Retrieve and normalize the stored address from session storage
      const storedAddress = sessionStorage.getItem('userAddress');
      let currentAddress: Address | null = null;
      if (storedAddress) {
        const parsedAddress = JSON.parse(storedAddress);
        currentAddress = Array.isArray(parsedAddress) ? parsedAddress[0] : parsedAddress;
      }

      // Check if address data has changed
      const hasDataChanged = !currentAddress ||
        currentAddress.street !== street ||
        currentAddress.city !== city ||
        currentAddress.state !== state ||
        currentAddress.zipCode !== zipCode;

      if (hasDataChanged) {
        setLoading(true);

        const { tokens } = await fetchAuthSession();
        if (!tokens?.accessToken) {
          throw new Error("No authentication token available");
        }

        apiService.setToken(tokens.accessToken.toString());

        // Prepare address data
        const addressData = {
          street,
          city,
          state,  
          zipCode,
          country: "MX", // Default to Mexico since the form is in Spanish
        };

        let response;
        if (currentAddress) {
          // Update the existing address.
          // NOTE: Ensure you pass the correct identifier here; currently using `currentAddress.city` as a placeholder.
          response = await apiService.updateUserAddress(currentAddress.city, addressData);
        } else {
          // Create a new address entry.
          response = await apiService.createUserAddress(user.id, addressData);
        }

        if (response) {
          const addressToStore = Array.isArray(response) ? response[0] : response;
          sessionStorage.setItem('userAddress', JSON.stringify(addressToStore));
        }
      }

      // Navigate to the next page regardless of whether data was updated
      router.push("/about-yourself/partner");
    } catch (error) {
      console.error('Error handling address:', error);
      setErrorMessage("Error al guardar la dirección. Por favor, intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormValues(prev => ({ ...prev, [id]: value }));
    setErrorMessage(null);
    console.log('Form values:', formValues);
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="container mx-auto flex flex-col flex-grow bg-[#f5f5f7] overflow-hidden"
      >
        <div className="w-full max-w-6xl mx-auto flex flex-col min-h-[75vh] mb-4 px-4 sm:px-5">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 h-full py-12">
            {/* Left column - Title section */}
            <div className="lg:w-1/3">
              <div className="flex items-center justify-between mb-2.5">
                <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md">
                  <span className="text-[#047aff] text-[14px] font-[400]">DATOS PERSONALES</span>
                </div>
              </div>

              <h1 className='text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]'>
                <span className='text-[#1d1d1f]'>¿Dónde </span>
                <span className='bg-gradient-to-r from-[#3d9bff] to-[#047aff] inline-block text-transparent bg-clip-text'>vives?</span>
              </h1>

              <p className="text-[16px] text-[#1d1d1f] leading-6 mb-5">
                Necesitamos tu dirección para completar el testamento.
              </p>

              <div className="flex justify-end items-center gap-2 mb-5">
                <Link href="#" className="inline-flex items-center h-[32px] text-[#047aff] hover:text-[#0456b0]">
                  <span className="w-5 h-5 inline-flex items-center justify-center rounded-full border border-[#047aff] text-sm">?</span>
                </Link>
                <p className="text-[14px] text-[#000000]">Articulo relacionado</p>
              </div>
              <ProgressIndicator
                currentSection={2}
                totalSections={5}
                title="Progreso de la sección"
              />
            </div>

            {/* Right column - Form in white container */}
            <div className='w-full lg:w-3/5'>
              <div className="bg-white rounded-2xl px-4 sm:px-8 md:px-12 py-10 shadow-lg relative">
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

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-7">
                    <div>
                      <h2 className="text-[20px] font-[500] text-[#1d1d1f] mb-2">
                        Tu Dirección
                      </h2>
                      <p className="text-[14px] text-[#6e6e73] mb-5">
                        Ingresa la dirección donde resides actualmente.
                      </p>

                      <div className="space-y-5">
                        <div>
                          <label htmlFor="address-input" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                            Dirección Línea 1 <span className="text-[#047aff]">*</span>
                          </label>
                          <AddressAutocomplete
                            key={formValues.street} // Force re-render when street changes
                            onAddressSelect={handleAddressSelect}
                            defaultValue={formValues.street}
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="city" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                            Ciudad <span className="text-[#047aff]">*</span>
                          </label>
                          <input
                            type="text"
                            id="city"
                            value={formValues.city}
                            onChange={handleManualChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="state" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                            Estado <span className="text-[#047aff]">*</span>
                          </label>
                          <input
                            type="text"
                            id="state"
                            value={formValues.state}
                            onChange={handleManualChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="zipCode" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                            Código Postal <span className="text-[#047aff]">*</span>
                          </label>
                          <input
                            type="text"
                            id="zipCode"
                            value={formValues.zipCode}
                            onChange={handleManualChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {errorMessage && (
                    <p className="text-red-500 text-[14px] text-center mt-0">{errorMessage}</p>
                  )}

                  <div className="flex justify-end pt-6">
                    <PrimaryButton type="submit">
                      Guardar y continuar
                    </PrimaryButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default BasicPage;
