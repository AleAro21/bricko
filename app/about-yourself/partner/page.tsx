"use client";
import { FC, useState } from 'react';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import Add from "./Add";

interface MaritalStatusItem {
  title: string;
  subTitle: string;
  items: {
    itemTiltle: string;
    itemData: string | null;
  };
}

const PartnerPage: FC = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<MaritalStatusItem | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, index: number, items: MaritalStatusItem): void => {
    e.preventDefault();
    setActiveIndex(index === activeIndex ? null : index);
    setSelectedItem(items);
  };

  const handlePartnerClick = (): void => {
    setShowModal(true);
  };

  const handleSave = (): void => {
    router.push("/about-yourself/children");
  };

  const data: MaritalStatusItem[] = [
    {
      title: "Soltero",
      subTitle: "Libre de vínculos matrimoniales; puede contraer matrimonio si lo desea.",
      items: {
        itemTiltle: "",
        itemData: null,
      },
    },
    {
      title: "Casado",
      subTitle: "Unión legal entre dos personas; ambos asumen derechos y obligaciones.",
      items: {
        itemTiltle: "",
        itemData: "/about-yourself/live-with-partner",
      },
    },
    {
      title: "Viudo",
      subTitle: "Matrimonio disuelto legalmente; cada uno retoma su estado de soltería.",
      items: {
        itemTiltle: "",
        itemData: "/about-yourself/live-with-partner",
      },
    },
    {
      title: "Concubinato",
      subTitle: "Estado de quien ha perdido a su cónyuge por fallecimiento.",
      items: {
        itemTiltle: "",
        itemData: "/about-yourself/live-with-partner",
      },
    },
    {
      title: "Divorciado",
      subTitle: "Relación de hecho reconocida si la pareja vive junta y cumple ciertos requisitos.",
      items: {
        itemTiltle: "",
        itemData: "/about-yourself/live-with-partner",
      },
    },
  ];

  const renderAddPartnerButton = (title: string): JSX.Element | null => {
    if (["Casado", "Viudo", "Divorciado", "Concubinato"].includes(title)) {
      return (
        <div
          onClick={handlePartnerClick}
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
            Agregar Pareja
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardLayout>
      <Add setShowModal={setShowModal} showModal={showModal} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">¿Cuál es tu estado civil?</h1>
            <p className="mt-4 text-lg text-gray-600">
              Seleccione su estado legal actual, incluso si sabe que va a
              cambiar pronto. Siempre podrás actualizar esto en el futuro.
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

          {selectedItem && renderAddPartnerButton(selectedItem.title)}

          <div className="pt-6 flex justify-end">
            <button
              onClick={handleSave}
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

export default PartnerPage;