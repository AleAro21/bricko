"use client";
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  return (
    <>
      <DashboardLayout>
        <div className="container w-3/4 mx-auto flex flex-col h-full min-h-screen">
          <div className="w-full flex flex-col py-12">
            <div className="w-full flex">
              <div className="w-[65%] flex flex-col">
                <div className="">
                  <p className="title py-2">Recomendaciones (Consultar abogados) </p>
                  <p className="text-style py-4">
                    Su patrimonio es todo lo que posee, excepto cualquier
                    obsequio específico que decida dejar a otras personas más
                    adelante. Esto se conoce como patrimonio residual.
                  </p>
                  <p className="text-style py-4">
                    En esta sección podrá dividir su patrimonio residual entre
                    personas e incluso organizaciones benéficas.
                  </p>
                  <p className="text-style py-4">
                    Podrás agregar tus regalos más tarde.
                  </p>

                  <div className="w-full">
                    <p className="sm-title py-4 flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="-10 -10 532 532"
                        width="24px"
                        height="24px"
                      >
                        <path
                          fill="#04724D"
                          d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                        />
                      </svg>
                      Qué incluye su patrimonio residual
                    </p>
                    <ul className="list-disc px-12">
                      <li className="text-style py-2">
                        Propiedades e inversiones no específicamente designadas
                      </li>
                      <li className="text-style py-2">
                        Bienes personales y artículos de valor que no estén
                        asignados
                      </li>
                      <li className="text-style py-2">
                        Fondos no designados en obsequios o legados específicos
                      </li>
                    </ul>
                  </div>

                  <div className="w-full">
                    <p className="sm-title py-4 flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width={"24px"}
                        height={"24px"}
                      >
                        <path
                          fill="#D00E01"
                          d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
                        />
                      </svg>
                      Lo que no incluye su patrimonio residual
                    </p>
                    <ul className="list-disc px-12">
                      <li className="text-style py-2">
                        Cuentas bancarias y cuentas de ahorro especiales (como
                        cuentas ISA, si aplican)
                      </li>
                      <li className="text-style py-2">
                        Inversiones específicas
                      </li>
                      <li className="text-style py-2">
                        Propiedades o bienes previamente asignados como
                        obsequios específicos
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="w-full flex items-end justify-end">
                  <button
                    onClick={() => router.push("/estate/people")}
                    className="text-[14px] text-[#FFFFFF] font-[600] bg-[#0171e3] px-4 py-4 rounded-[100px] uppercase mt-4"
                  >
                    CONTINUAR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default page;
