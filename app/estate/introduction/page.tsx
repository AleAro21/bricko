"use client";
import { FC } from 'react';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";

const IntroductionPage: FC = () => {
  const router = useRouter();

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">
                Recomendaciones (Consultar abogados)
              </h1>
              <div className="mt-4 space-y-4">
                <p className="text-lg text-gray-600">
                  Su patrimonio es todo lo que posee, excepto cualquier
                  obsequio específico que decida dejar a otras personas más
                  adelante. Esto se conoce como patrimonio residual.
                </p>
                <p className="text-lg text-gray-600">
                  En esta sección podrá dividir su patrimonio residual entre
                  personas e incluso organizaciones benéficas.
                </p>
                <p className="text-lg text-gray-600">
                  Podrás agregar tus regalos más tarde.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-10 -10 532 532"
                    width="24"
                    height="24"
                    className="flex-shrink-0"
                  >
                    <path
                      fill="#04724D"
                      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                    />
                  </svg>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Qué incluye su patrimonio residual
                  </h2>
                </div>
                <ul className="space-y-3 pl-9">
                  <li className="text-gray-600 flex items-center gap-2 before:content-['•'] before:text-gray-400 before:-ml-5">
                    Propiedades e inversiones no específicamente designadas
                  </li>
                  <li className="text-gray-600 flex items-center gap-2 before:content-['•'] before:text-gray-400 before:-ml-5">
                    Bienes personales y artículos de valor que no estén asignados
                  </li>
                  <li className="text-gray-600 flex items-center gap-2 before:content-['•'] before:text-gray-400 before:-ml-5">
                    Fondos no designados en obsequios o legados específicos
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="24"
                    height="24"
                    className="flex-shrink-0"
                  >
                    <path
                      fill="#D00E01"
                      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
                    />
                  </svg>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Lo que no incluye su patrimonio residual
                  </h2>
                </div>
                <ul className="space-y-3 pl-9">
                  <li className="text-gray-600 flex items-center gap-2 before:content-['•'] before:text-gray-400 before:-ml-5">
                    Cuentas bancarias y cuentas de ahorro especiales (como cuentas ISA, si aplican)
                  </li>
                  <li className="text-gray-600 flex items-center gap-2 before:content-['•'] before:text-gray-400 before:-ml-5">
                    Inversiones específicas
                  </li>
                  <li className="text-gray-600 flex items-center gap-2 before:content-['•'] before:text-gray-400 before:-ml-5">
                    Propiedades o bienes previamente asignados como obsequios específicos
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <button
                onClick={() => router.push("/estate/people")}
                className="inline-flex justify-center px-6 py-3 rounded-xl bg-blue-600 text-white text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Guardar y continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IntroductionPage;