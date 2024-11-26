"use client";
import { FC, useState } from 'react';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/reusables/PrimaryButton";

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
      <div className="container w-3/4 mx-auto flex flex-col h-full min-h-screen">
        <div className="w-full flex flex-col py-12">
          <div className="w-full flex">
            <div className="w-[50%] flex flex-col">
              <div>
                <p className="title py-2">¿Tienes hijos?</p>
                <p className="text-style py-4">
                  Si su primer hijo está en camino, seleccione "No" por ahora.
                  Siempre podrás actualizar esto en el futuro.
                </p>
                <p className="text-style py-4">
                  Agregue todos sus hijos biológicos y legalmente adoptados,
                  quiera o no dejarles cosas en su testamento.
                </p>
                <p className="text-style py-4">
                  No agregue ningún hijastro aquí. Puede agregarlos más tarde si
                  desea dejarlos como parte de su patrimonio.
                </p>
                <div className="bg-white rounded-lg overflow-hidden">
                  {data.map((item, index) => (
                    <div
                      key={index}
                      onClick={(e) => handleClick(e, index)}
                      className="group cursor-pointer"
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
                          {item.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full flex items-center justify-between">
                <div
                  onClick={() => router.back()}
                  className="flex items-center text-[14px] font-[500] gap-2 pt-1 text-[#9999] cursor-pointer border-b border-transparent hover:border-[#9999] transition-all delay-150"
                ></div>
                <PrimaryButton onClick={() => router.push("/about-yourself/pets")}>
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

export default ChildrenPage;