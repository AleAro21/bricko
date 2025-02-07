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
import { apiService } from '@/app/apiService';
import { fetchAuthSession } from "aws-amplify/auth";
import Spinner from "@/components/reusables/Spinner";
import { Address } from "@/types";

interface FormValues {
  street: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string; // Changed from postalCode to match API
}

const BasicPage: FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [formValues, setFormValues] = useState<FormValues>({
    street: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "", // Changed from postalCode to match API
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
          const address: Address = JSON.parse(storedAddress);
          setFormValues({
            street: address.street || "",
            address2: "", // This field isn't in the API
            city: address.city || "",
            state: address.state || "",
            zipCode: address.zipCode || "",
          });
          setIsInitialLoading(false);
          return;
        }

        // If no stored address, fetch from API
        const { tokens } = await fetchAuthSession();
        if (!tokens?.accessToken) {
          throw new Error("No authentication token available");
        }

        apiService.setToken(tokens.accessToken.toString());
        const response = await apiService.getUserAddress(user.id);
        
        if (response) {
          const address: Address = response;
          // Store in session storage
          sessionStorage.setItem('userAddress', JSON.stringify(address));
          
          setFormValues({
            street: address.street || "",
            address2: "", // This field isn't in the API
            city: address.city || "",
            state: address.state || "",
            zipCode: address.zipCode || "",
          });
        }
      } catch (error) {
        console.error('Error loading user address:', error);
        setErrorMessage("Error al cargar la dirección. Por favor, intente nuevamente.");
      } finally {
        setIsInitialLoading(false);
      }
    };

    loadUserAddress();
  }, [user?.id]);

  const handleAddressSelect = (addressData: AddressData): void => {
    setFormValues(prev => ({
      ...prev,
      street: addressData.streetAddress,
      city: addressData.city,
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
      setLoading(true);
      
      const { tokens } = await fetchAuthSession();
      if (!tokens?.accessToken) {
        throw new Error("No authentication token available");
      }

      apiService.setToken(tokens.accessToken.toString());

      const response = await apiService.createUserAddress(user.id, {
        street,
        city,
        state,
        zipCode,
        country: "MX", // Default to Mexico since the form is in Spanish
      });

      if (response) {
    
        sessionStorage.setItem('userAddress', JSON.stringify(response));
      }

      router.push("/about-yourself/partner");
    } catch (error) {
      console.error('Error creating address:', error);
      setErrorMessage("Error al guardar la dirección. Por favor, intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    // Map postalCode to zipCode if necessary
    const key = id === 'postalCode' ? 'zipCode' : id;
    setFormValues(prev => ({ ...prev, [key]: value }));
    setErrorMessage(null);
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
              <div className="flex items-center gap-2 mb-2.5">
                <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md">
                  <span className="text-[#047aff] text-[14px] font-[400]">INFORMACIÓN DE CONTACTO</span>
                </div>
                <Link href="#" className="inline-flex items-center h-[32px] text-[#047aff] hover:text-[#0456b0]">
                  <span className="w-5 h-5 inline-flex items-center justify-center rounded-full border border-[#047aff] text-sm">?</span>
                </Link>
              </div>
              <h1 className='text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]'>
                <span className='text-[#1d1d1f]'>Detalles de </span>
                <span className='bg-gradient-to-r from-[#3d9bff] to-[#047aff] inline-block text-transparent bg-clip-text'>contacto</span>
              </h1>

              <p className="text-[16px] text-[#1d1d1f] leading-6 mb-8">
                Necesitamos tu información de contacto para completar el testamento.
              </p>

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
                            onAddressSelect={handleAddressSelect}
                            defaultValue={formValues.street}
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="address2" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                            Dirección Línea 2
                          </label>
                          <input
                            type="text"
                            id="address2"
                            value={formValues.address2}
                            onChange={handleManualChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all"
                            placeholder="Apartamento, suite, unidad, etc."
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
                          <label htmlFor="postalCode" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                            Código Postal <span className="text-[#047aff]">*</span>
                          </label>
                          <input
                            type="text"
                            id="postalCode"
                            value={formValues.zipCode} // Note: Using zipCode here
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