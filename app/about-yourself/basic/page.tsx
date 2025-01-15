"use client";
import { FC, FormEvent, useState } from 'react';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import AddressAutocomplete, { AddressData } from "@/components/common/address/AddressAutocomplete";
import type { E164Number } from 'libphonenumber-js/core';

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

  const handlePhoneChange = (value: E164Number | undefined): void => {
    setFormValues(prev => ({ ...prev, phone: value }));
  };

  const handleAddressSelect = (addressData: AddressData): void => {
    setFormValues(prev => ({
      ...prev,
      address1: addressData.streetAddress,
      city: addressData.city,
      postalCode: addressData.postalCode,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    router.push("/about-yourself/partner");
  };

  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormValues(prev => ({ ...prev, [id]: value }));
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Detalles de Contacto</h1>
            <p className="mt-4 text-lg text-gray-600">
              Necesitamos tu información de contacto para completar el testamento.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Tu Dirección
                  </h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Ingresa la dirección donde resides actualmente.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="address-input" className="block text-sm font-medium text-gray-700 mb-2">
                        Dirección Línea 1 <span className="text-red-500">*</span>
                      </label>
                      <AddressAutocomplete
                        onAddressSelect={handleAddressSelect}
                        defaultValue={formValues.address1}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="address2" className="block text-sm font-medium text-gray-700 mb-2">
                        Dirección Línea 2
                      </label>
                      <input
                        type="text"
                        id="address2"
                        value={formValues.address2}
                        onChange={handleManualChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-base"
                        placeholder="Apartamento, suite, unidad, etc."
                      />
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                        Ciudad <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        value={formValues.city}
                        onChange={handleManualChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-base"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
                        Código Postal <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        value={formValues.postalCode}
                        onChange={handleManualChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-base"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Número de Teléfono
                  </h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Sólo te llamaremos si necesitamos ayudarte con tu testamento.
                  </p>
                  <div className="mt-4">
                    <PhoneInput
                      international
                      defaultCountry="MX"
                      value={formValues.phone}
                      onChange={handlePhoneChange}
                      placeholder="Opcional"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-base"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center px-6 py-3 rounded-xl bg-blue-600 text-white text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Guardar y continuar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BasicPage;