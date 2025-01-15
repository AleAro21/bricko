"use client";
import { FC, useState } from 'react';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import Add from "./Add";

interface ExecutorOption {
  title: string;
  subTitle: string;
}

const ChooseExecutorsPage: FC = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<ExecutorOption | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, index: number, option: ExecutorOption): void => {
    e.preventDefault();
    setActiveIndex(index === activeIndex ? null : index);
    setSelectedOption(option);
  };

  const handleAddClick = (): void => {
    setShowModal(true);
  };

  const executorOptions: ExecutorOption[] = [
    {
      title: "Amigos de la familia",
      subTitle: "Seleccione amigos cercanos que conozcan bien a su familia y sus deseos.",
    },
    {
      title: "Fideicomisarios de despedida",
      subTitle: "Profesionales especializados en la administración de patrimonios.",
    },
    {
      title: "Amigos y familiares y fideicomisarios de Testador",
      subTitle: "Una combinación de personas de confianza y profesionales.",
    },
  ];

  return (
    <DashboardLayout>
      <Add setShowModal={setShowModal} showModal={showModal} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              ¿A quién le gustaría elegir como su albacea?
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Seleccione el tipo de albaceas que prefiere para administrar su patrimonio.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {executorOptions.map((option, index) => (
              <div
                key={index}
                className="cursor-pointer transition-colors"
                onClick={(e) => handleClick(e, index, option)}
              >
                <div
                  className={`px-6 py-4 ${
                    index !== 0 ? 'border-t border-gray-100' : ''
                  } ${
                    activeIndex === index
                      ? 'bg-blue-600'
                      : 'hover:bg-blue-50'
                  }`}
                >
                  <h3
                    className={`text-lg font-medium ${
                      activeIndex === index
                        ? 'text-white'
                        : 'text-gray-900'
                    }`}
                  >
                    {option.title}
                  </h3>
                  <p
                    className={`mt-1 text-sm ${
                      activeIndex === index
                        ? 'text-blue-100'
                        : 'text-gray-500'
                    }`}
                  >
                    {option.subTitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              ¿A quién quieres como tus albaceas?
            </h2>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-900">Nombre Completor Contacto</h3>
                  <p className="text-sm text-gray-500">test@testador.com</p>
                </div>
                <div>
                  <input 
                    type="checkbox" 
                    className="h-6 w-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    aria-label="Seleccionar albacea"
                  />
                </div>
              </div>
            </div>

            <div
              onClick={handleAddClick}
              className="bg-white rounded-xl border border-gray-200 hover:border-blue-500 transition-colors cursor-pointer mt-4"
            >
              <div className="flex items-center justify-center gap-2 py-4 text-blue-600 font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="20"
                  height="20"
                  className="fill-current"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
                Agregar Albacea
              </div>
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button
              onClick={() => router.push("/summary?completed=executers")}
              className="inline-flex justify-center px-6 py-3 rounded-xl bg-blue-600 text-white text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Guardar y continuar
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChooseExecutorsPage;