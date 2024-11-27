"use client";
import { FC, useState, MouseEvent } from "react";
import Add from "@/app/estate/people/Add";
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/reusables/PrimaryButton";

interface ExecutorOption {
  title: string;
}

const ChooseExecutorsPage: FC = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const clickHandler = (): void => {
    setShowModal(true);
  };

  const handleClick = (e: MouseEvent<HTMLParagraphElement>, index: number): void => {
    e.preventDefault();
    setActiveIndex(index === activeIndex ? null : index);
  };

  const executorOptions: ExecutorOption[] = [
    {
      title: "Amigos de la familia",
    },
    {
      title: "Fideicomisarios de despedida",
    },
    {
      title: "Amigos y familiares y fideicomisarios de Testador",
    },
  ];

  return (
    <>
      <Add setShowModal={setShowModal} showModal={showModal} />
      <DashboardLayout>
        <div className="container w-3/4 mx-auto flex flex-col h-full min-h-screen">
          <div className="w-full flex flex-col py-12">
            <div className="w-full flex">
              <div className="w-[50%] flex flex-col">
                <div>
                  <p className="title py-2">
                    ¿A quién le gustaría elegir como su albacea?
                  </p>
                  <div className="bg-white rounded-lg overflow-hidden">
                    {executorOptions.map((option, index) => (
                      <div key={index}>
                        <p
                          onClick={(e) => handleClick(e, index)}
                          className={`cursor-pointer px-4 py-6 ${
                            activeIndex === index
                              ? "bg-[#0171e3] text-white"
                              : "text-gray-800 hover:bg-[#0171e3] hover:text-white"
                          }`}
                        >
                          {option.title}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="title py-2">
                    ¿A quién quieres como tus albaceas?
                  </p>
                  <div className="bg-white w-full rounded-lg my-4 px-4 py-6 flex justify-between items-center">
                    <div>
                      <p className="sm-title">Nombre Completor Contacto</p>
                      <p className="text-style">test@testador.com</p>
                    </div>
                    <div>
                      <input 
                        type="checkbox" 
                        className="w-6 h-6 bg-white"
                        aria-label="Seleccionar albacea"
                      />
                    </div>
                  </div>
                  <div
                    onClick={clickHandler}
                    className="bg-white my-4 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer"
                  >
                    <p className="flex gap-2 py-10 text-style">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        width="24"
                        height="24"
                      >
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                      </svg>
                    </p>
                  </div>
                </div>
                <div className="w-full flex items-center justify-end">
                  <PrimaryButton
                    onClick={() => router.push("/summary?completed=executers")}
                  >
                    Guardar y continuar
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ChooseExecutorsPage;