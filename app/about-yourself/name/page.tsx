"use client";
import { FC, FormEvent, useState } from 'react';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import { isValid, parse, differenceInYears } from "date-fns";
import PrimaryButton from "@/components/reusables/PrimaryButton";
import Calendar from "@/components/common/calendar/Calendar";
import { validateAge } from "@/components/common/calendar/dateValidation";

interface FormValues {
  fullName: string;
  secondName: string;
  fatherLastName: string;
  motherLastName: string;
  birthDate: Date | null;
}

const NamePage: FC = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState<FormValues>({
    fullName: "",
    secondName: "",
    fatherLastName: "",
    motherLastName: "",
    birthDate: null,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { fullName, fatherLastName, motherLastName, birthDate } = formValues;

    // Check if required fields are filled
    if (!fullName || !fatherLastName || !motherLastName) {
      alert("Por favor, complete todos los campos obligatorios");
      return;
    }

    // Validate age
    const ageError = validateAge(birthDate);
    if (ageError) {
      alert(ageError);
      return;
    }

    router.push("/about-yourself/basic");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleDateChange = (date: Date | null): void => {
    setFormValues((prev) => ({ ...prev, birthDate: date }));
  };

  return (
    <DashboardLayout>
      <div className="container w-3/4 mx-auto flex flex-col h-full min-h-screen">
        <div className="w-full flex flex-col py-12">
          <p className="title">Primero, vamos a conocerte</p>
          <div className="w-full flex">
            <form onSubmit={handleSubmit} className="w-[50%] flex flex-col">
              <div className="w-full">
                <p className="sm-title pt-6">
                  ¿Cuál es su nombre legal completo?
                </p>
                <p className="text-style py-4">
                  Este es el nombre que figura en su pasaporte o permiso de
                  conducir.
                </p>
                <p className="text-style">Nombre *</p>
                <input
                  type="text"
                  id="fullName"
                  value={formValues.fullName}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2"
                  required
                />
              </div>
              <div className="w-full">
                <p className="text-style">Segundo Nombre</p>
                <input
                  type="text"
                  id="secondName"
                  value={formValues.secondName}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2"
                />
              </div>
              <div className="w-full">
                <p className="text-style">Apellido Paterno *</p>
                <input
                  type="text"
                  id="fatherLastName"
                  value={formValues.fatherLastName}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2"
                  required
                />
              </div>
              <div className="w-full">
                <p className="text-style">Apellido Materno *</p>
                <input
                  type="text"
                  id="motherLastName"
                  value={formValues.motherLastName}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2"
                  required
                />
              </div>

              <div className="w-full border-t-2 mt-3">
                <p className="text-style pt-4">Tu fecha de nacimiento *</p>
                <Calendar
                  selectedDate={formValues.birthDate}
                  onChange={handleDateChange}
                  minDate={new Date(1923, 0, 1)}
                  maxDate={new Date()}
                  placeholderText="Seleccionar fecha de nacimiento"
                />
                <div className="flex justify-end py-4">
                  <PrimaryButton type="submit">
                    Guardar y continuar
                  </PrimaryButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NamePage;