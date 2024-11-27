"use client";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/common/DashboardLayout";
import Children from "./Children";
import PeopleModal from "./PeopleModal";
import CharityModal from "./CharityModal";
import PetModal from "./PetsModal";
import PrimaryButton from "@/components/reusables/PrimaryButton";

const PeoplePage: FC = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPeopleModal, setShowPeopleModal] = useState<boolean>(false);
  const [showCharityModal, setShowCharityModal] = useState<boolean>(false);
  const [showPetModal, setShowPetModal] = useState<boolean>(false);

  const clickHandler = (): void => {
    setShowModal(true);
  };

  const handlePet = (): void => {
    setShowPetModal(true);
  };

  const handleCharity = (): void => {
    setShowCharityModal(true);
  };

  const handlePeople = (): void => {
    setShowPeopleModal(true);
  };

  const AddButton = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      width="24px"
      height="24px"
    >
      <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
    </svg>
  );

  interface AddSectionProps {
    title: string;
    onClick: () => void;
  }

  const AddSection: FC<AddSectionProps> = ({ title, onClick }) => (
    <>
      <p className="title">{title}</p>
      <div
        onClick={onClick}
        className="bg-white rounded-lg overflow-hidden flex items-center justify-center cursor-pointer my-4"
      >
        <p className="flex gap-2 py-10 text-style">
          <AddButton />
        </p>
      </div>
    </>
  );

  return (
    <>
      <Children setShowModal={setShowModal} showModal={showModal} />
      <PeopleModal
        setShowModal={setShowPeopleModal}
        showModal={showPeopleModal}
      />
      <CharityModal
        setShowModal={setShowCharityModal}
        showModal={showCharityModal}
      />
      <PetModal setShowModal={setShowPetModal} showModal={showPetModal} />

      <DashboardLayout>
        <div className="container w-3/4 mx-auto flex flex-col h-full min-h-screen">
          <div className="w-full flex flex-col py-12">
            <div className="w-full flex">
              <div className="w-[50%] flex flex-col">
                <div>
                  <p className="title py-2">Agregar o editar detalles</p>
                  <p className="text-style py-4">
                    Esta es tu libreta de contactos. Úselo para:
                  </p>
                  <ul className="list-disc">
                    <li className="text-style">
                      <b> Añade detalles </b> para una nueva persona, mascota o
                      lugar, para que estén listos para incluirlos en su
                      testamento.
                    </li>
                    <li className="text-style">
                      <b> Edite los detalles— </b> actualícelos una vez y se
                      actualizarán automáticamente en todos los lugares donde se
                      mencionen en su testamento.
                    </li>
                  </ul>

                  <AddSection title="Niños" onClick={clickHandler} />
                  <AddSection title="Persona de confianza" onClick={handlePeople} />
                  <AddSection title="Mascota" onClick={handlePet} />
                  <AddSection title="Caridad" onClick={handleCharity} />
                </div>
                <div className="w-full flex items-end justify-end">
                  <PrimaryButton
                    onClick={() =>
                      router.push("/summary?completed=account-and-property")
                    }
                  >
                    Guardar y continuar
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default PeoplePage;