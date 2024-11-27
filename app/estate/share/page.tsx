"use client";
import { FC, ChangeEvent, useState } from "react";
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/reusables/PrimaryButton";

interface ShareInputProps {
  id: string;
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const ShareInput: FC<ShareInputProps> = ({ id, value, onChange, label }) => (
  <div className="flex gap-3 items-center w-full max-w-[400px]">
    <input
      type="number"
      id={id}
      className="bg-white border w-full max-w-[150px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 my-2"
      required
      value={value}
      onChange={onChange}
    />
    <label htmlFor={id} className="text-style">
      {label}
    </label>
  </div>
);

const SharePage: FC = () => {
  const router = useRouter();
  const [nameValue1, setNameValue1] = useState<number>(50);
  const [nameValue2, setNameValue2] = useState<number>(50);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setter: (value: number) => void
  ): void => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setter(value);
    }
  };

  const total: number = nameValue1 + nameValue2;
  const isValidTotal: boolean = total === 100;

  return (
    <DashboardLayout>
      <div className="container w-3/4 mx-auto flex flex-col h-full min-h-screen">
        <div className="w-full flex flex-col py-12">
          <div className="w-full flex">
            <div className="w-[50%] flex flex-col">
              <div>
                <p className="title py-2 md:w-[80%]">
                  ¿Cómo le gustaría compartir su patrimonio?
                </p>
                <p className="text-style py-4">
                  Puedes elegir copias de seguridad en la página siguiente en
                  caso de que las personas que hayas elegido mueran antes que
                  tú.
                </p>

                <ShareInput
                  id="name1"
                  value={nameValue1}
                  onChange={(e) => handleInputChange(e, setNameValue1)}
                  label="Nombre Completo Contacto 1"
                />

                <ShareInput
                  id="name2"
                  value={nameValue2}
                  onChange={(e) => handleInputChange(e, setNameValue2)}
                  label="Nombre Completo Contacto 2"
                />

                <div className="flex gap-3 items-center w-full max-w-[300px]">
                  <p
                    className={`border ${
                      isValidTotal
                        ? "border-gray-300"
                        : "border-red-500"
                    } text-style w-full max-w-[150px] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-4 my-2`}
                  >
                    {total} %
                  </p>
                  <label className="text-style">
                    Total
                  </label>
                </div>
                {!isValidTotal && (
                  <p className="text-red-500 text-sm mt-2">
                    El total debe ser exactamente 100%.
                  </p>
                )}
              </div>

              <div className="w-full flex items-end justify-end">
                <PrimaryButton
                  onClick={() => {
                    if (isValidTotal) {
                      router.push("/estate/secondary");
                    }
                  }}
                >
                  Guardar y continuar
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SharePage;