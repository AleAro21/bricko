"use client";
import { FC, FormEvent, useState } from 'react';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import { isValid, parse, differenceInYears } from "date-fns";
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { fullName, fatherLastName, motherLastName, birthDate } = formValues;

    if (!fullName || !fatherLastName || !motherLastName) {
      alert("Por favor, complete todos los campos obligatorios");
      return;
    }

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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Primero, vamos a conocerte</h1>
            <p className="mt-4 text-lg text-gray-600">
              Necesitamos algunos datos personales para comenzar con tu testamento.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    ¿Cuál es su nombre legal completo?
                  </h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Este es el nombre que figura en su pasaporte o permiso de conducir.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        value={formValues.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-base"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="secondName" className="block text-sm font-medium text-gray-700 mb-2">
                        Segundo Nombre
                      </label>
                      <input
                        type="text"
                        id="secondName"
                        value={formValues.secondName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-base"
                      />
                    </div>

                    <div>
                      <label htmlFor="fatherLastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Apellido Paterno <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fatherLastName"
                        value={formValues.fatherLastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-base"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="motherLastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Apellido Materno <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="motherLastName"
                        value={formValues.motherLastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-base"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Fecha de nacimiento
                  </h2>
                  <div className="mt-4">
                    <Calendar
                      selectedDate={formValues.birthDate}
                      onChange={handleDateChange}
                      minDate={new Date(1923, 0, 1)}
                      maxDate={new Date()}
                      placeholderText="Seleccionar fecha de nacimiento"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-base"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center px-6 py-3 rounded-xl bg-blue-600 text-white text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Guardar y continuar
                </button>
              </div>
            </form>
            <ProgressIndicator
              currentSection={1}
              totalSections={5}
              title="Progreso del testamento" // Optional
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NamePage;