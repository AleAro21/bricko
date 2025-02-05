'use client';

import { FC, FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import AddressAutocomplete, { AddressData } from "@/components/common/address/AddressAutocomplete";
import type { E164Number } from 'libphonenumber-js/core';
import PrimaryButton from "@/components/reusables/PrimaryButton";
import ProgressIndicator from "@/components/reusables/ProgressIndicator";
import Link from "next/link";

interface FormValues {
  address1: string;
  address2: string;
  city: string;
  postalCode: string;
  phone: E164Number | undefined;
}

const BasicPage: FC = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState<FormValues>({
    address1: "",
    address2: "",
    city: "",
    postalCode: "",
    phone: undefined,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePhoneChange = (value: E164Number | undefined): void => {
    setFormValues(prev => ({ ...prev, phone: value }));
    setErrorMessage(null);
  };

  const handleAddressSelect = (addressData: AddressData): void => {
    setFormValues(prev => ({
      ...prev,
      address1: addressData.streetAddress,
      city: addressData.city,
      postalCode: addressData.postalCode,
    }));
    setErrorMessage(null);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { address1, city, postalCode } = formValues;

    if (!address1 || !city || !postalCode) {
      setErrorMessage("Por favor, complete todos los campos obligatorios");
      return;
    }

    router.push("/about-yourself/partner");
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
              <div className="bg-white rounded-2xl px-4 sm:px-8 md:px-12 py-10 shadow-lg">
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
                            defaultValue={formValues.address1}
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
                          <label htmlFor="postalCode" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                            Código Postal <span className="text-[#047aff]">*</span>
                          </label>
                          <input
                            type="text"
                            id="postalCode"
                            value={formValues.postalCode}
                            onChange={handleManualChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-5 mt-5 border-t border-gray-100">
                      <h2 className="text-[20px] font-[500] text-[#1d1d1f] mb-2">
                        Número de Teléfono
                      </h2>
                      <p className="text-[14px] text-[#6e6e73] mb-5">
                        Sólo te llamaremos si necesitamos ayudarte con tu testamento.
                      </p>
                      <div className="mt-4">
                        <PhoneInput
                          international
                          defaultCountry="MX"
                          value={formValues.phone}
                          onChange={handlePhoneChange}
                          placeholder="Opcional"
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all"
                        />
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