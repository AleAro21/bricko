"use client";
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Add from "./Add";
import { sub } from "date-fns";

const page = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  console.log("selectedItem: ", selectedItem);

  const handleClick = (e, index, items) => {
    console.log("item: ", items);
    e.preventDefault();
    setActiveIndex(index === activeIndex ? null : index);
    setSelectedItem(items);
  };

  const clickPartner = () => {
    setShowModal(true);
  };
  const handleSave = () => {
    router.push("/about-yourself/children");
  };
  const data = [
    {
      title: "Soltero",
      subTitle:
        "Libre de vínculos matrimoniales; puede contraer matrimonio si lo desea.",
      items: {
        itemTiltle: "",
        itemData: null,
      },
    },
    {
      title: "Casado",
      subTitle:
        "Unión legal entre dos personas; ambos asumen derechos y obligaciones.",
      items: {
        itemTiltle: "",
        itemData: "/about-yourself/live-with-partner",
      },
    },

    {
      title: "Viudo",
      subTitle:
        "Matrimonio disuelto legalmente; cada uno retoma su estado de soltería.",
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
      subTitle:
        "Relación de hecho reconocida si la pareja vive junta y cumple ciertos requisitos.",
      items: {
        itemTiltle: "",
        itemData: "/about-yourself/live-with-partner",
      },
    },
  ];
  return (
    <DashboardLayout>
      <Add setShowModal={setShowModal} showModal={showModal} />
      <div className="container w-3/4 mx-auto flex flex-col h-full min-h-screen">
        <div className="w-full flex flex-col py-12">
          <div className="w-full flex">
            <div className="w-[50%] flex flex-col">
              <div className="">
                <p className="title py-2 ">Cuál es tu estado civil?</p>
                <p className="text-style py-4">
                  Seleccione su estado legal actual, incluso si sabe que va a
                  cambiar pronto. Siempre podrás actualizar esto en el futuro.
                </p>
                <div className="bg-white rounded-lg overflow-hidden">
                  {data &&
                    data?.map((items, index) => (
                      <div key={index} className="">
                        <p
                          onClick={(e) => handleClick(e, index, items)}
                          className={`text-style cursor-pointer px-4 py-6 ${
                            activeIndex === index
                              ? "bg-[#ffdf4e] text-white"
                              : "hover:bg-[#ffdf4e]"
                          }`}
                        >
                          {items.title}
                          <p className="text-gray-400 text-sm">
                            {items.subTitle}
                          </p>
                        </p>
                      </div>
                    ))}
                </div>
                {selectedItem?.title == "Casado" && (
                  <div
                    onClick={clickPartner}
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
                )}
                {selectedItem?.title == "Viudo" && (
                  <div
                    onClick={clickPartner}
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
                )}
                {selectedItem?.title == "Divorciado" && (
                  <div
                    onClick={clickPartner}
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
                )}
                {selectedItem?.title == "Concubinato" && (
                  <div
                    onClick={clickPartner}
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
                )}
              </div>
              <div className="flex justify-end py-4">
                <button
                  type="submit"
                  className="text-[14px] text-[#000000] font-[600] bg-[#FFDF4E] px-4 py-4 rounded-[100px] uppercase mt-4"
                >
                  Guardar y continuar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default page;
