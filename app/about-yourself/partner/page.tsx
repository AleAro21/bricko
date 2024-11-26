"use client";
import { FC, useState } from 'react';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import Add from "./Add";
import PrimaryButton from "@/components/reusables/PrimaryButton";

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
          className="bg-white rounded-lg overflow-hidden flex items-center justify-center cursor-pointer my-4"
        >
          <p className="flex gap-2 py-10 text-style">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="24px"
              height="24px"
            >
              <path
                d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                fill="#0066cc"
              />
            </svg>
            Agregar Pareja
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardLayout>
      <Add setShowModal={setShowModal} showModal={showModal} />
      <div className="container w-3/4 mx-auto flex flex-col h-full min-h-screen">
        <div className="w-full flex flex-col py-12">
          <div className="w-full flex">
            <div className="w-[50%] flex flex-col">
              <div className="">
                <p className="title py-2">¿Cuál es tu estado civil?</p>
                <p className="text-style py-4">
                  Seleccione su estado legal actual, incluso si sabe que va a
                  cambiar pronto. Siempre podrás actualizar esto en el futuro.
                </p>
                <div className="bg-white rounded-lg overflow-hidden">
                  {data.map((items, index) => (
                    <div
                      key={index}
                      className="group cursor-pointer"
                      onClick={(e) => handleClick(e, index, items)}
                    >
                      <div
                        className={`px-4 py-6 ${
                          activeIndex === index
                            ? "bg-[#0171e3]"
                            : "hover:bg-[#0171e3]"
                        }`}
                      >
                        <p
                          className={`text-lg ${
                            activeIndex === index
                              ? "text-white"
                              : "text-gray-800 group-hover:text-white"
                          }`}
                        >
                          {items.title}
                        </p>
                        <p
                          className={`text-sm ${
                            activeIndex === index
                              ? "text-white"
                              : "text-gray-400 group-hover:text-white"
                          }`}
                        >
                          {items.subTitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {selectedItem && renderAddPartnerButton(selectedItem.title)}
              </div>
              <div className="flex justify-end py-4">
                <PrimaryButton onClick={handleSave}>
                  Guardar y continuar
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PartnerPage;