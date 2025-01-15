'use client';
import { FC } from 'react';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";

const ExecutorsIntroductionPage: FC = () => {
  const router = useRouter();

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">¿Qué es un albacea?</h1>
              <p className="mt-4 text-lg text-gray-600">
                Los albaceas son responsables de llevar a cabo los detalles de su testamento después de su muerte. 
                Esto se conoce como "administrar su patrimonio".
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-lg text-gray-600">
                Esto puede implicar ordenar sus finanzas, asegurarse de que se paguen las deudas o los impuestos 
                y asegurarse de que lo restante se distribuya adecuadamente de acuerdo con su testamento. 
                Es un papel serio que asumir.
              </p>
              <p className="text-lg text-gray-600">
                Podrás agregar tus regalos más tarde.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                ¿A quién elijo para que sea mi albacea?
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-gray-600">
                  Puede elegir albaceas profesionales, amigos y familiares, o una combinación de ambos.
                </p>
                <p className="text-lg text-gray-600">
                  Hay bastantes detalles importantes que debemos analizar. Es por eso que es posible que 
                  tardemos un poco más en leer estas próximas páginas.
                </p>
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <button
                onClick={() => router.push('/executers/choose')}
                className="inline-flex justify-center px-6 py-3 rounded-xl bg-blue-600 text-white text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Guardar y continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ExecutorsIntroductionPage;