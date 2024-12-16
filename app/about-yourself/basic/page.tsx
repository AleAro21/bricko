"use client";
import { FC, FormEvent, useState } from 'react';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import PrimaryButton from "@/components/reusables/PrimaryButton";
import AddressAutocomplete, { AddressData } from "@/components/common/address/AddressAutocomplete";

interface FormValues {
  address1: string;
  address2: string;
  city: string;
  postalCode: string;
  phone: string;
}

const BasicPage: FC = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState<FormValues>({
    address1: "",
    address2: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(true);

  const handlePhoneChange = (value: string): void => {
    setFormValues(prev => ({ ...prev, phone: value }));
    setIsPhoneValid(value.length >= 10 && value.length <= 15);
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

    if (formValues.phone && !isPhoneValid) {
      alert("Por favor, introduzca un número de teléfono válido");
      return;
    }

    router.push("/about-yourself/partner");
  };

  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormValues(prev => ({ ...prev, [id]: value }));
  };

  return (
    <DashboardLayout>
      <div className="container w-3/4 mx-auto flex flex-col h-full min-h-screen">
        <div className="w-full flex flex-col py-12">
          <p className="title py-4">Detalles de contacto</p>
          <form onSubmit={handleSubmit} className="w-full flex">
            <div className="w-[50%] flex flex-col">
              <div className="w-full pb-4 border-b">
                <p className="sm-title py-4">Tu dirección</p>
                <div className="mb-4">
                  <label htmlFor="address-input" className="text-style">
                    Dirección Línea 1
                  </label>
                  <AddressAutocomplete
                    onAddressSelect={handleAddressSelect}
                    defaultValue={formValues.address1}
                    required
                  />
                </div>
                <div className="w-full my-2">
                  <label htmlFor="address2" className="text-style mt-4">
                    Dirección Línea 2
                  </label>
                  <input
                    type="text"
                    id="address2"
                    value={formValues.address2}
                    onChange={handleManualChange}
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2"
                  />
                </div>
                <div className="w-full my-4 flex items-center justify-between gap-4">
                  <div className="w-[60%]">
                    <label htmlFor="city" className="text-style mt-4">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={formValues.city}
                      onChange={handleManualChange}
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2"
                      required
                    />
                  </div>
                  <div className="w-[40%]">
                    <label htmlFor="postalCode" className="text-style mt-4">
                      Código postal
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      value={formValues.postalCode}
                      onChange={handleManualChange}
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="w-full border-t-2 pt-4">
                <p className="text-style">Tu número de teléfono (opcional)</p>
                <label htmlFor="phone" className="text-style">
                  Sólo te llamaremos para ayudarte con tu testamento
                </label>
                <div className="phone-input-container">
                  <input
                    type="tel"
                    id="phone"
                    value={formValues.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    className={`bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2 ${
                      !isPhoneValid && formValues.phone ? 'border-red-500' : ''
                    }`}
                  />
                </div>
                {!isPhoneValid && formValues.phone && (
                  <p className="text-red-500 text-sm">
                    Por favor, introduzca un número de teléfono válido
                  </p>
                )}
              </div>
              <div className="flex justify-end py-4">
                <PrimaryButton type="submit">
                  Guardar y continuar
                </PrimaryButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BasicPage;