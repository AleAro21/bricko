"use client";
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const router = useRouter();
  const [nameValue1, setNameValue1] = useState(50); // Initial value set to 50 for each input to make a total of 100
  const [nameValue2, setNameValue2] = useState(50);

  const handleInputChange = (e, setter) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setter(value);
    }
  };

  return (
    <DashboardLayout>
      <div className="container w-3/4 mx-auto flex flex-col h-full min-h-screen">
        <div className="w-full flex flex-col py-12">
          <div className="w-full flex">
            <div className="w-[50%] flex flex-col">
              <div className="">
                <p className="title py-2 md:w-[80%]">
                  ¿Cómo le gustaría compartir su patrimonio?
                </p>
                <p className="text-style py-4">
                  Puedes elegir copias de seguridad en la página siguiente en
                  caso de que las personas que hayas elegido mueran antes que
                  tú.
                </p>

                {/* Name Input 1 */}
                <div className="flex gap-3 items-center w-full max-w-[400px]">
                  <input
                    type="number"
                    id="name1"
                    className="bg-white border w-full max-w-[150px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 my-2"
                    required
                    value={nameValue1}
                    onChange={(e) => handleInputChange(e, setNameValue1)}
                  />
                  <label htmlFor="name1" className="text-style">
                    {`Nombre Completo Contacto 1`}
                  </label>
                </div>

                {/* Name Input 2 */}
                <div className="flex gap-3 items-center w-full max-w-[400px]">
                  <input
                    type="number"
                    id="name2"
                    className="bg-white border w-full max-w-[150px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 my-2"
                    required
                    value={nameValue2}
                    onChange={(e) => handleInputChange(e, setNameValue2)}
                  />
                  <label htmlFor="name2" className="text-style">
                    {`Nombre Completo Contacto 2`}
                  </label>
                </div>

                {/* Total Display */}
                <div className="flex gap-3 items-center w-full max-w-[300px]">
                  <p
                    className={`border ${
                      nameValue1 + nameValue2 === 100
                        ? "border-gray-300"
                        : "border-red-500"
                    } text-style w-full max-w-[150px] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 my-2`}
                  >
                    {nameValue1 + nameValue2} %
                  </p>
                  <label htmlFor="country" className="text-style">
                    Total
                  </label>
                </div>
                {nameValue1 + nameValue2 !== 100 && (
                  <p className="text-red-500 text-sm mt-2">
                    El total debe ser exactamente 100%.
                  </p>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="w-full flex items-end justify-end">
                <button
                  onClick={() => {
                    if (nameValue1 + nameValue2 === 100) {
                      router.push("/estate/secondary");
                    }
                  }}
                  className="text-[14px] text-[#000000] font-[600] bg-[#FFDF4E] px-4 py-4 rounded-[100px] uppercase mt-4"
                  disabled={nameValue1 + nameValue2 !== 100}
                >
                  CONTINUAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Page;
