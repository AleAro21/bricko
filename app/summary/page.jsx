"use client";
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter, useSearchParams } from "next/navigation";
import PrimaryButton from "@/components/reusables/PrimaryButton";

const page = () => {
  const router = useRouter();
  const params = useSearchParams();
  const paramValue = params.get("completed");
  const pass = 5;

  return (
    <DashboardLayout>
      <div className="container w-3/4 mx-auto flex flex-col h-full min-h-screen">
        <div className="w-full flex flex-col py-12">
          <p className="title">Tu Testamento</p>
          <p className="text-style py-4">
            Te guiamos en cada etapa para asegurar que tu voluntad se refleje
            con claridad.
          </p>
          <div className="w-full flex">
            <div className="w-[50%] flex flex-col">
              <div className="border bg-white rounded-lg p-3 md:p-6 md:w-[80%] mt-4">
                <p className="text-style">Paso 1 (2-4 minutos):</p>
                <p className="title py-1">Cuentanos sobre ti</p>
                <p className="text-style">
                  Información para personalizar tu testamento.
                </p>
                <PrimaryButton
                  onClick={() => router.push("/about-yourself/name")}
                >
                  Continuar
                </PrimaryButton>
              </div>
              <div className="border rounded-lg p-3 md:p-6 md:w-[80%] mt-4 bg-white">
                <p className="text-style">Paso 2 (1-4 minutos):</p>
                <p className="title py-1">Cuentas y Propiedades</p>
                <p className="text-style">Menciona donde estan tus activos</p>
                <PrimaryButton
                  onClick={() => router.push("/account-and-property")}
                >
                  Continuar
                </PrimaryButton>
              </div>
              <div className="border rounded-lg p-3 md:p-6 md:w-[80%] mt-4 bg-white">
                <p className="text-style">Paso 3 (3-5 minutos):</p>
                <p className="title py-1">Herencia</p>
                <p className="text-style">
                  Define a las personas o entidades que heredarán tus bienes.
                </p>
                <PrimaryButton
                  onClick={() => router.push("/estate/introduction")}
                >
                  Continuar
                </PrimaryButton>
              </div>
              <div className="border rounded-lg p-3 md:p-6 md:w-[80%] mt-4 bg-white">
                <p className="text-style">Paso 4 (3-5 minutos):</p>
                <p className="title py-1">Albaceas</p>
                <p className="text-style">
                  Selecciona a la persona o personas encargadas de cumplir tus
                  últimas voluntades.
                </p>
                <PrimaryButton
                  onClick={() => router.push("/executers/introduction")}
                >
                  Continuar
                </PrimaryButton>
              </div>
              <p className="sm-title pt-4">Opcional</p>
              <div className="border bg-white rounded-lg p-3 md:p-6 md:w-[80%] mt-4">
                <p className="text-style">Regalos (2-4 minutos)</p>
                <p className="title py-1">Regalos</p>
                <p className="text-style">
                  Oportunidad de dejar regalos a personas especiales
                </p>
                <PrimaryButton onClick={() => router.push("")}>
                  Continuar
                </PrimaryButton>
              </div>
              <div className="border bg-white rounded-lg p-3 md:p-6 md:w-[80%] mt-4">
                <p className="text-style">Activos digitales (2-4 minutos)</p>
                <p className="title py-1">Activos digitales</p>
                <p className="text-style">
                  Distribuye tus bienes o derechos digitales
                </p>
                <PrimaryButton onClick={() => router.push("/digital-asset")}>
                  Continuar
                </PrimaryButton>
              </div>
            </div>
            <div className="w-[50%]">
              <div className="md:w-[80%] mt-3">
                <div className="w-full">
                  <p className="text-green-700 font-semibold text-[18px]">
                    Completado: {pass}%
                  </p>
                  <div className="flex w-full h-[10px] bg-gray-300 rounded-lg items-center my-2">
                    <div
                      className={`bg-green-700 h-full flex rounded-lg`}
                      style={{ width: pass + "%" }}
                    ></div>
                  </div>
                </div>
                <div className="w-full mt-[50px]">
                  <p className="title py-1">Tu voluntad</p>
                  <p className="text-style py-2">
                    La primera parte de su testamento tiene que ver contigo y tu
                    familia. Completa la informacion en el Paso 1 para avanzar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default page;
