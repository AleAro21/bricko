'use client';

import { FC, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/common/DashboardLayout";
import { motion } from "framer-motion";
import PrimaryButton from "@/components/reusables/PrimaryButton";
import Link from "next/link";

const legacyTypeNames = {
  single: "Artículo Único",
  collection: "Colección",
  vehicle: "Vehículo",
  money: "Dinero",
  other: "Otro"
};

const AssignLegacyPage: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams?.get('type') || 'single';
  const [selectedPerson, setSelectedPerson] = useState<string>("");

  // Mock data for demonstration - replace with your actual data
  const people = [
    { id: "1", name: "Juan Pérez" },
    { id: "2", name: "María García" },
    { id: "3", name: "Carlos López" }
  ];

  return (
    <DashboardLayout>
      <motion.div
        className="min-h-screen bg-[#f5f5f7]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-5 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-8 lg:gap-24">
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="inline-flex items-center h-[32px] bg-[#f95940] bg-opacity-10 px-[12px] py-[6px] rounded-md">
                    <span className="text-[#f95940] text-[14px] font-[400]">ASIGNAR LEGADO</span>
                  </div>
                  <Link href="#" className="inline-flex items-center h-[32px] text-[#f95940] hover:text-[#0456b0]">
                    <span className="w-5 h-5 inline-flex items-center justify-center rounded-full border border-[#f95940] text-sm">?</span>
                  </Link>
                </div>

                <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                  <span className="text-[#1d1d1f]">Asignar </span>
                  <span
                    style={{ backgroundImage: "linear-gradient(to left, #f95940 30%, #f95940 100%)" }}
                    className="inline-block text-transparent bg-clip-text"
                  >
                    {legacyTypeNames[type as keyof typeof legacyTypeNames]}
                  </span>
                </h1>

                <p className="text-[16px] text-[#1d1d1f] leading-6 mb-8">
                  Describa el legado que desea asignar y seleccione a la persona que lo recibirá.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-[17px] font-[500] text-[#1d1d1f] mb-2">
                      Descripción del Legado
                    </label>
                    <textarea
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#f95940] focus:ring focus:ring-[#f95940] focus:ring-opacity-50 transition-all"
                      rows={4}
                      placeholder="Describa el legado en detalle..."
                    />
                  </div>

                  {type === 'money' && (
                    <div>
                      <label className="block text-[17px] font-[500] text-[#1d1d1f] mb-2">
                        Cantidad
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:border-[#f95940] focus:ring focus:ring-[#f95940] focus:ring-opacity-50 transition-all"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-[17px] font-[500] text-[#1d1d1f] mb-2">
                      Asignar a
                    </label>
                    <select
                      value={selectedPerson}
                      onChange={(e) => setSelectedPerson(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#f95940] focus:ring focus:ring-[#f95940] focus:ring-opacity-50 transition-all"
                    >
                      <option value="">Seleccione una persona</option>
                      {people.map((person) => (
                        <option key={person.id} value={person.id}>
                          {person.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => router.back()}
                  className="px-6 py-2.5 text-[#f95940] hover:text-[#0456b0] transition-colors duration-200"
                >
                  Volver
                </button>
                <PrimaryButton
                  onClick={() => router.push("/summary?completed=legacy")}
                  disabled={!selectedPerson}
                >
                  Guardar y continuar
                </PrimaryButton>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 h-fit lg:sticky lg:top-6">
              <h2 className="text-[20px] font-[500] text-[#1d1d1f] mb-4">Instrucciones</h2>
              <div className="space-y-4">
                <p className="text-[15px] text-[#1d1d1f] leading-6">
                  Para asignar un legado, siga estos pasos:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#f95940] flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[15px] text-[#1d1d1f] leading-6">
                      Proporcione una descripción detallada del legado
                    </span>
                  </li>
                  {type === 'money' && (
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#f95940] flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[15px] text-[#1d1d1f] leading-6">
                        Especifique la cantidad exacta del legado monetario
                      </span>
                    </li>
                  )}
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#f95940] flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[15px] text-[#1d1d1f] leading-6">
                      Seleccione la persona que recibirá el legado
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default AssignLegacyPage;