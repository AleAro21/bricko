'use client';

import { FC, FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import AddressAutocomplete, { AddressData } from "@/components/common/address/AddressAutocomplete";
import PrimaryButton from "@/components/reusables/PrimaryButton";
import ProgressIndicator from "@/components/reusables/ProgressIndicator";
import Link from "next/link";
import Spinner from "@/components/reusables/Spinner";
import { Address } from "@/types";

// Import the server action for updating the address.
import { updateUserAddressAction } from '@/app/actions/addressActions';
import { flushSync } from 'react-dom';

interface BasicAddressFormProps {
  initialAddress: Address | null;
  userId: string;
} 

const BasicAddressForm: FC<BasicAddressFormProps> = ({ initialAddress, userId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    street: initialAddress?.street || "",
    city: initialAddress?.city || "",
    state: initialAddress?.state || "",
    zipCode: initialAddress?.zipCode || "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

    // Force the spinner state to update immediately so it renders on the button.
    flushSync(() => {
      setLoading(true);
    });
    
    let didNavigate = false;
    try {
      const addressData: Address = {
        street,
        city,
        state,
        zipCode,
        country: "MX",
      };

      // Call the server action. Pass currentCity if there is an initial address.
      const updatedAddress = await updateUserAddressAction(
        userId,
        addressData,
        initialAddress ? initialAddress.city : undefined
      );

      // Optionally, store the returned address in sessionStorage.
      sessionStorage.setItem("userAddress", JSON.stringify(updatedAddress));

      router.push("/about-yourself/partner");
      didNavigate = true;
    } catch (error: any) {
      console.error("Error handling address:", error);
      setErrorMessage("Error al guardar la dirección. Por favor, intente nuevamente.");
    } finally {
      if (!didNavigate) {
        setLoading(false);
      }
    }
  };

  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormValues(prev => ({ ...prev, [id]: value }));
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
            {/* Left column - Title Section */}
            <div className="lg:w-1/3">
              <div className="flex items-center justify-between mb-2.5">
                <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md">
                  <span className="text-[#047aff] text-[14px] font-[400]">DATOS PERSONALES</span>
                </div>
              </div>
              <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                <span className="text-[#1d1d1f]">¿Dónde </span>
                <span
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #7abaff 1%, #047aff 60%, #0d4ba3 100%)",
                  }}
                  className="inline-block text-transparent bg-clip-text"
                >
                  vives?
                </span>
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
              <ProgressIndicator currentSection={2} totalSections={5} title="Progreso de la sección" />
            </div>

            {/* Right column - Form */}
            <div className="w-full lg:w-3/5">
              <div className="bg-white rounded-2xl px-4 sm:px-8 md:px-12 py-10 shadow-lg relative">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-[20px] font-[500] text-[#1d1d1f] mb-2">
                        Tu Dirección
                      </h2>
                      <p className="text-[14px] text-[#6e6e73] mb-5">
                        Ingresa la dirección donde resides actualmente.
                      </p>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="address-input" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                            Dirección<span className="text-[#047aff]">*</span>
                          </label>
                          <AddressAutocomplete
                            key={formValues.street}
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
                        <div>
                          <label htmlFor="country" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                            País
                          </label>
                          <input
                            type="text"
                            id="country"
                            value="México"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                            disabled
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {errorMessage && (
                    <p className="text-red-500 text-[14px] text-center mt-0">{errorMessage}</p>
                  )}
                  <div className="flex justify-end pt-6">
                    <PrimaryButton type="submit" disabled={loading}>
                      {loading ? <Spinner size={24} /> : "Guardar y continuar"}
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

export default BasicAddressForm;