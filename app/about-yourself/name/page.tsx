"use client";
import { FC, FormEvent, useState } from 'react';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import { isValid, parse, differenceInYears } from "date-fns";
import PrimaryButton from "@/components/reusables/PrimaryButton";

interface FormValues {
  fullName: string;
  secondName: string;
  fatherLastName: string;
  motherLastName: string;
  day: string;
  month: string;
  year: string;
}

const NamePage: FC = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState<FormValues>({
    fullName: "",
    secondName: "",
    fatherLastName: "",
    motherLastName: "",
    day: "",
    month: "",
    year: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { fullName, day, month, year } = formValues;

    // Check if all required fields are filled
    if (!fullName || !day || !month || !year) {
      alert("Por favor, complete todos los campos obligatorios");
      return;
    }

    // Validate date format
    const dateString = `${year}-${month}-${day}`;
    const parsedDate = parse(dateString, "yyyy-MM-dd", new Date());
    if (!isValid(parsedDate)) {
      alert("Por favor, introduzca una fecha válida");
      return;
    }

    // Check age range (18 to 100 years)
    const age = differenceInYears(new Date(), parsedDate);
    if (age < 18 || age > 100) {
      alert("La edad debe ser mayor a 18 y menor a 100 años");
      return;
    }

    router.push("/about-yourself/basic");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
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
                  required
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
                <p className="text-style pt-4">Tu fecha de nacimiento</p>
                <p className="text-style pb-4">dd / mm / aa</p>
                <div className="flex w-full items-center justify-between">
                  <div className="w-[25%]">
                    <label htmlFor="day" className="text-style">
                      Día
                    </label>
                    <input
                      type="text"
                      id="day"
                      value={formValues.day}
                      onChange={handleChange}
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2"
                      required
                    />
                  </div>
                  <div className="w-[25%]">
                    <label htmlFor="month" className="text-style">
                      Mes
                    </label>
                    <input
                      type="text"
                      id="month"
                      value={formValues.month}
                      onChange={handleChange}
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2"
                      required
                    />
                  </div>
                  <div className="w-[40%]">
                    <label htmlFor="year" className="text-style">
                      Año
                    </label>
                    <input
                      type="text"
                      id="year"
                      value={formValues.year}
                      onChange={handleChange}
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2"
                      required
                    />
                  </div>
                </div>
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