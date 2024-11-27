"use client";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import graylogo from "../../../assets/greylogo.png";

interface ItemData {
  listTitle: string;
}

interface Items {
  itemTiltle: string;
  itemData: ItemData[] | null;
}

interface DataItem {
  title: string;
  items: Items;
}

const CongratulationsPage: FC = () => {
  const router = useRouter();
  const [childData, setChildData] = useState<ItemData[] | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLParagraphElement>, items: DataItem): void => {
    e.preventDefault();
    if (items?.items?.itemData == null) {
      router.push("/summary");
    } else {
      setChildData(items?.items?.itemData);
    }
  };

  const handleChildData = (e: React.MouseEvent<HTMLParagraphElement>): void => {
    e.preventDefault();
    router.push("/summary");
  };

  const data: DataItem[] = [
    {
      title: "Producto financiero (Banco, Seguro, Afore, Pension)",
      items: {
        itemTiltle: "",
        itemData: null,
      },
    },
    {
      title: "Internet (Google, redes sociales, sitio web o app)",
      items: {
        itemTiltle: "",
        itemData: null,
      },
    },
    {
      title: "Recomendación (amigos, familia, colegas)",
      items: {
        itemTiltle: "",
        itemData: null,
      },
    },
    {
      title: "Medios tradicionales (periódico, revista, TV, radio, metro)",
      items: {
        itemTiltle: "",
        itemData: null,
      },
    },
    {
      title: "A través de una organización benéfica",
      items: {
        itemTiltle: "",
        itemData: null,
      },
    },
    {
      title: "Otro",
      items: {
        itemTiltle: "",
        itemData: null,
      },
    },
  ];

  return (
    <>
      <main className="container w-3/4 mx-auto flex flex-col h-full min-h-screen">
        <div className="py-4">
          <Image src={graylogo} width={100} alt="Logo" />
        </div>
        <div className="flex flex-col md:w-[50%] max-w-[500px] mx-auto items-center justify-center h-full min-h-[80vh]">
          <div>
            <p className="title py-2 text-center mx-auto">
              ¡Felicidades! Estás un paso más cerca de la tranquilidad.
            </p>
            <p className="text-style py-4 text-center mx-auto">
              Nos encantaría saber, ¿cómo descubriste Testamento.mx?
            </p>
            <div className="py-4 bg-white rounded-lg">
              {childData
                ? childData.map((item, index) => (
                    <div key={index}>
                      <p
                        onClick={handleChildData}
                        className="text-style cursor-pointer p-4 hover:bg-[#0171e3] hover:text-white transition-colors"
                      >
                        {item.listTitle}
                      </p>
                    </div>
                  ))
                : data.map((item, index) => (
                    <div key={index}>
                      <p
                        onClick={(e) => handleClick(e, item)}
                        className="text-style cursor-pointer p-4 hover:bg-[#0171e3] hover:text-white transition-colors"
                      >
                        {item.title}
                      </p>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CongratulationsPage;