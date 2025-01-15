"use client";
import { FC, useState } from 'react';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";

interface PetOption {
  title: string;
}

const PetsPage: FC = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, index: number): void => {
    e.preventDefault();
    setActiveIndex(index === activeIndex ? null : index);
  };

  const data: PetOption[] = [
    { title: "Sí" },
    { title: "No" }
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">¿Tiene mascotas?</h1>
              <p className="mt-4 text-lg text-gray-600">
                Puedes elegir tutores para tus mascotas en la siguiente sección.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="cursor-pointer transition-colors"
                  onClick={(e) => handleClick(e, index)}
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
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 flex justify-end">
              <button
                onClick={() => router.push("/summary?completed=about-your-self")}
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

export default PetsPage;