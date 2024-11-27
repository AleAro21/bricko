"use client";
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Add from "./Add";
import PrimaryButton from "@/components/reusables/PrimaryButton";

const Page: React.FC = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  
  const clickHandler = (): void => {
    setShowModal(true);
  };

  return (
    <>
      <Add setShowModal={setShowModal} showModal={showModal} />
      <DashboardLayout>
        <div className="container w-3/4 mx-auto flex flex-col h-full min-h-screen">
          <div className="w-full flex flex-col py-12">
            <div className="w-full flex">
              <div className="w-[50%] flex flex-col">
                <div className="">
                  <p className="title py-2 ">
                    ¿Quién le gustaría que heredara su patrimonio?
                  </p>
                  <p className="text-style py-4">
                    Puedes decidir cuánto recibe cada persona en el siguiente
                    paso. También podrás elegir copias de seguridad en caso de
                    que alguno de ellos muera antes que tú.
                  </p>
                  <div className="bg-white w-full rounded-lg my-4 px-4 py-6 flex justify-between items-center">
                    <div className="">
                      <p className="sm-title">
                        Herederos legales por partes iguales
                      </p>
                      <p className="text-style"></p>
                    </div>
                    <div className="">
                      <input type="checkbox" className="w-6 h-6 bg-white" />
                    </div>
                  </div>
                  <div
                    onClick={clickHandler}
                    className="bg-white rounded-lg overflow-hidden flex items-center justify-center cursor-pointer"
                  >
                    <p className="flex gap-2 py-10 text-style">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        width="24px"
                        height="24px"
                      >
                        <path
                          fill="#0171e3"
                          d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                        />
                      </svg>
                    </p>
                  </div>
                </div>
                <div className="w-full flex items-end justify-end">
                  <PrimaryButton
                    onClick={() => router.push("/estate/charities")}
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

export default Page;