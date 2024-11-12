"use client";
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Page = () => {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(true);

  const handlePhoneChange = (value) => {
    setPhone(value);
    setIsPhoneValid(value.length >= 10 && value.length <= 15); // Basic validation for length
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate phone number if not empty
    if (phone && !isPhoneValid) {
      alert("Por favor, introduzca un número de teléfono válido");
      return;
    }

    router.push("/about-yourself/partner");
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
                <label htmlFor="address1" className="text-style">
                  {`Dirección Línea 1`}
                </label>
                <input
                  type="text"
                  id="address1"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2"
                  required
                />
                <div className="w-full my-2">
                  <label htmlFor="address2" className="text-style mt-4">
                    {`Dirección Línea 2`}
                  </label>
                  <input
                    type="text"
                    id="address2"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2"
                  />
                </div>
                <div className="w-full my-4 flex items-center justify-between gap-4">
                  <div className="w-[60%]">
                    <label htmlFor="city" className="text-style mt-4">
                      {`Ciudad`}
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2"
                      required
                    />
                  </div>
                  <div className="w-[40%]">
                    <label htmlFor="postalCode" className="text-style mt-4">
                      {`Código postal`}
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="w-full border-t-2 pt-4">
                <p className="text-style">Tu número de teléfono (opcional)</p>
                <label htmlFor="phone" className="text-style">
                  {`Sólo te llamaremos para ayudarte con tu testamento`}
                </label>
                <PhoneInput
                  country={"us"}
                  value={phone}
                  onChange={handlePhoneChange}
                  inputProps={{
                    name: "phone",
                    required: false,
                    autoFocus: false,
                  }}
                  containerClass="w-full bg-white rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 my-2 flex items-center" // Removed border here
                  inputClass={`w-full bg-transparent border-none p-6 text-sm focus:outline-none ${
                    isPhoneValid ? "" : "border-red-500"
                  }`}
                  buttonStyle={{
                    border: "none",
                    background: "transparent",
                  }}
                  dropdownStyle={{
                    border: "none",
                    boxShadow: "none",
                  }}
                />

                {!isPhoneValid && (
                  <p className="text-red-500 text-sm">
                    Por favor, introduzca un número de teléfono válido
                  </p>
                )}
              </div>
              <div className="flex justify-end py-4">
                <button
                  type="submit"
                  className="text-[14px] text-[#FFFFFF] font-[600] bg-[#0171e3] px-4 py-4 rounded-[100px] uppercase mt-4"
                >
                  Guardar y continuar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Page;
