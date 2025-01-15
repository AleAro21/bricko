'use client';
import { FC, useState } from 'react';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";

interface ShareOption {
  title: string;
  subTitle: string;
  items: {
    itemTiltle: string;
    itemData: string | null;
  };
}

const SharePage: FC = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<ShareOption | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, index: number, items: ShareOption): void => {
    e.preventDefault();
    setActiveIndex(index === activeIndex ? null : index);
    setSelectedItem(items);
  };

  const data: ShareOption[] = [
    {
      title: "Sus niños",
      subTitle: "Todos los hijos biológicos y legalmente adoptados heredarán por igual.",
      items: {
        itemTiltle: "",
        itemData: null,
      },
    },
    {
      title: "Personas u organizaciones benéficas específicas",
      subTitle: "Seleccione beneficiarios específicos para heredar esta parte del patrimonio.",
      items: {
        itemTiltle: "",
        itemData: null,
      },
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Si contacto confianza muere antes que usted, ¿quién debería
              heredar su parte del patrimonio?
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Escribir un testamento consiste en estar preparado para lo
              inesperado. Es por eso que también le pedimos que nombre
              refuerzos en caso de que el beneficiario elegido muera antes
              que usted. Estos se conocen como beneficiarios secundarios.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {data.map((items, index) => (
              <div
                key={index}
                className="cursor-pointer transition-colors"
                onClick={(e) => handleClick(e, index, items)}
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
                    {items.title}
                  </h3>
                  <p
                    className={`mt-1 text-sm ${
                      activeIndex === index
                        ? 'text-blue-100'
                        : 'text-gray-500'
                    }`}
                  >
                    {items.subTitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <p className="text-lg text-gray-600">
              La selección de "sus hijos" incluye a todos los hijos
              biológicos y legalmente adoptados de ferfer yuygug, pero no a
              sus hijastros.
            </p>
            <p className="text-lg text-gray-600">
              Si tanto su beneficiario original como suplente mueren antes
              que usted, esta parte de su patrimonio se dividirá entre sus
              otros beneficiarios (las personas que ha elegido para heredar
              su patrimonio).
            </p>
          </div>

          <div className="pt-6 flex justify-end">
            <button
              onClick={() => router.push("/summary?completed=estate")}
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

export default SharePage;