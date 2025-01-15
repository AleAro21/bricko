"use client";
import { FC, useState } from 'react';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";

interface ChildOption {
  title: string;
}

const ChildrenPage: FC = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, index: number): void => {
    e.preventDefault();
    setActiveIndex(index === activeIndex ? null : index);
  };

  const data: ChildOption[] = [
    { title: "Sí" },
    { title: "No" },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">¿Tienes hijos?</h1>
              <p className="mt-4 text-lg text-gray-600">
                Si su primer hijo está en camino, seleccione "No" por ahora.
                Siempre podrás actualizar esto en el futuro.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                Agregue todos sus hijos biológicos y legalmente adoptados,
                quiera o no dejarles cosas en su testamento.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                No agregue ningún hijastro aquí. Puede agregarlos más tarde si
                desea dejarlos como parte de su patrimonio.
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
                onClick={() => router.push("/about-yourself/pets")}
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

export default ChildrenPage;