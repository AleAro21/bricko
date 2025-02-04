'use client';

import { FC, FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/reusables/PrimaryButton";
import Calendar from "@/components/common/calendar/Calendar";
import { validateAge } from "@/components/common/calendar/dateValidation";
import ProgressIndicator from "@/components/reusables/ProgressIndicator";

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { fullName, fatherLastName, motherLastName, birthDate } = formValues;

    if (!fullName || !fatherLastName || !motherLastName) {
      setErrorMessage("Por favor, complete todos los campos obligatorios");
      return;
    }

    const ageError = validateAge(birthDate);
    if (ageError) {
      setErrorMessage(ageError);
      return;
    }

    router.push("/about-yourself/basic");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
    setErrorMessage(null);
  };

  const handleDateChange = (date: Date | null): void => {
    setFormValues((prev) => ({ ...prev, birthDate: date }));
    setErrorMessage(null);
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="container mx-auto flex flex-col flex-grow bg-[#f5f5f7] overflow-hidden"
      >
        <div className="w-full max-w-6xl mx-auto flex flex-col min-h-[75vh] mb-4 px-4 sm:px-5">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 h-full py-12">
            {/* Left column - Title section */}
            <div className="lg:w-1/3">
              <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5">
                <span className="text-[#047aff] text-[14px] font-[400]">DATOS PERSONALES</span>
              </div>

              <h1 className='text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]'>
                <span className='text-[#1d1d1f]'>Primero, vamos a </span>
                <span className='bg-gradient-to-r from-[#3d9bff] to-[#047aff] inline-block text-transparent bg-clip-text'>conocerte</span>
              </h1>

              <p className="text-[16px] text-[#1d1d1f] leading-6 mb-8">
                Necesitamos algunos datos personales para comenzar con tu testamento.
              </p>

              <ProgressIndicator
                currentSection={1}
                totalSections={5}
                title="Progreso de la sección"
              />
            </div>

            {/* Right column - Form in white container */}
            <div className='w-full lg:w-3/5'>
              <div className="bg-white rounded-2xl px-4 sm:px-8 md:px-12 py-8 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-[22px] font-[500] text-[#1d1d1f] mb-4">
                        ¿Cuál es su nombre legal completo?
                      </h2>
                      <p className="text-[14px] text-[#6e6e73] mb-8">
                        Este es el nombre que figura en su pasaporte o permiso de conducir.
                      </p>

                      <div className="space-y-5">
                        <div>
                          <label htmlFor="fullName" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                            Nombre <span className="text-[#047aff]">*</span>
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            value={formValues.fullName}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="secondName" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                            Segundo Nombre
                          </label>
                          <input
                            type="text"
                            id="secondName"
                            value={formValues.secondName}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all"
                          />
                        </div>

                        <div>
                          <label htmlFor="fatherLastName" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                            Apellido Paterno <span className="text-[#047aff]">*</span>
                          </label>
                          <input
                            type="text"
                            id="fatherLastName"
                            value={formValues.fatherLastName}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="motherLastName" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                            Apellido Materno <span className="text-[#047aff]">*</span>
                          </label>
                          <input
                            type="text"
                            id="motherLastName"
                            value={formValues.motherLastName}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="pt-8 border-t border-gray-100">
                      <h2 className="text-[22px] font-[500] text-[#1d1d1f] mb-4">
                        Fecha de nacimiento
                      </h2>
                      <div className="mt-4">
                        <Calendar
                          selectedDate={formValues.birthDate}
                          onChange={handleDateChange}
                          minDate={new Date(1923, 0, 1)}
                          maxDate={new Date()}
                          placeholderText="Seleccionar fecha de nacimiento"
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {errorMessage && (
                    <p className="text-red-500 text-[14px] text-center mt-4">{errorMessage}</p>
                  )}

                  <div className="flex justify-center pt-6">
                    <PrimaryButton type="submit">
                      Guardar y continuar
                    </PrimaryButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default NamePage;