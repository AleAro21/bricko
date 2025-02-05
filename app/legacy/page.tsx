'use client';

import { FC, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/common/DashboardLayout";
import { motion } from "framer-motion";
import PrimaryButton from "@/components/reusables/PrimaryButton";

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
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5">
                <span className="text-[#047aff] text-[14px] font-[400]">ASIGNAR LEGADO</span>
              </div>

              <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                <span className="text-[#1d1d1f]">Asignar </span>
                <span className="bg-gradient-to-r from-[#3d9bff] to-[#047aff] inline-block text-transparent bg-clip-text">
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#047aff] focus:ring focus:ring-[#047aff] focus:ring-opacity-50"
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
                        className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:border-[#047aff] focus:ring focus:ring-[#047aff] focus:ring-opacity-50"
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#047aff] focus:ring focus:ring-[#047aff] focus:ring-opacity-50"
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
                className="px-6 py-2.5 text-[#047aff] hover:text-[#0171e3] transition-colors duration-200"
              >
                Volver
              </button>
              <PrimaryButton
                onClick={() => router.push("/summary?completed=legacy")}
              >
                Guardar y continuar
              </PrimaryButton>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default AssignLegacyPage;