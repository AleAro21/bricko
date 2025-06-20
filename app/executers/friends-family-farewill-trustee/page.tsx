"use client";
import { FC, useState, MouseEvent } from "react";
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/reusables/PrimaryButton";

interface ExecutorOption {
  title: string;
}

const FriendsFamilyTrusteePage: FC = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number | null>(1);

  const handleClick = (e: MouseEvent<HTMLParagraphElement>, index: number): void => {
    e.preventDefault();
    setActiveIndex(index === activeIndex ? null : index);
  };

  const executorOptions: ExecutorOption[] = [
    {
      title: "Amigos de la familia",
    },
    {
      title: "Fideicomisarios de despedida",
    },
    {
      title: "Amigos y familiares y fideicomisarios de Testador",
    },
  ];

  return (
    <DashboardLayout>
      <div className="container w-3/4 mx-auto flex flex-col h-full min-h-screen">
        <div className="w-full flex flex-col py-12">
          <div className="w-full flex">
            <div className="w-[50%] flex flex-col">
              <div>
                <p className="title py-2">Elegir a tus albaceas</p>
                <p className="text-style py-4">
                  Puedes elegir entre uno y cuatro ejecutores. Recomendamos
                  elegir más de uno, especialmente si alguno de los
                  beneficiarios de su testamento es actualmente menor de 18
                  años.
                </p>
                <p className="title py-2">Elegir amigos y familiares</p>
                <div className="text-style py-4">
                  Ser albacea puede ser estresante. Hay algunas cosas
                  importantes a considerar si elige amigos o familiares:
                  <ul className="list-disc px-6">
                    <li className="text-style">Que sean mayores de 18</li>
                    <li className="text-style">que confías en ellos</li>
                    <li className="text-style">
                      Son buenos con las finanzas y el papeleo.
                    </li>
                    <li className="text-style">
                      Estás feliz de decirles que los has elegido.
                    </li>
                  </ul>
                </div>
                <p className="title py-2">
                  Elegir fideicomisarios de Testador
                </p>
                <p className="text-style py-4">
                  Aproximadamente dos tercios de las personas eligen un
                  albacea profesional para que les ayude con su patrimonio
                  después de su muerte. Incluso si elige amigos y familiares
                  como albaceas, lo más probable es que consulten a un
                  profesional para que los ayude de todos modos.
                </p>
                <div className="text-style py-4">
                  Los fideicomisarios de Testador pueden:
                  <ul className="list-disc px-6">
                    <li className="text-style">
                      Quita el estrés a familiares y amigos
                    </li>
                    <li className="text-style">
                      Actuar como un tercero justo y objetivo si surge un
                      conflicto.
                    </li>
                    <li className="text-style">
                      Resolver el proceso sucesorio de forma rápida y
                      profesional
                    </li>
                    <li className="text-style">
                      Ahorre tiempo y dinero a su familia en comparación con
                      la elección de un profesional tradicional después de su
                      muerte.
                    </li>
                  </ul>
                </div>
                <p className="title py-2">
                  Elegir juntos a amigos, familiares y fideicomisarios de
                  Testador
                </p>
                <p className="text-style py-4">
                  Reunir a personas que lo conocieron personalmente con un
                  profesional para que se encargue de los aspectos técnicos
                  puede brindar equilibrio y hacer que las cosas sean menos
                  estresantes. Compartiríamos el trabajo de manera justa y
                  adecuada según quién sea mejor para cada tarea.
                </p>
                <p className="title py-2">Sin compromisos duros.</p>
                <p className="text-style py-4">
                  Si sus coejecutores se sienten lo suficientemente cómodos
                  administrando su patrimonio y no necesitan ayuda profesional
                  (a diferencia de muchos albaceas profesionales), no cobramos
                  por hacernos a un lado si no somos necesarios.
                </p>
                <p className="title py-2">
                  ¿A quién le gustaría elegir como su albacea?
                </p>
                <div className="bg-white rounded-lg overflow-hidden">
                  {executorOptions.map((option, index) => (
                    <div key={index}>
                      <p
                        onClick={(e) => handleClick(e, index)}
                        className={`text-style cursor-pointer px-4 py-6 ${
                          activeIndex === index
                            ? "bg-[#f95940] text-white"
                            : ""
                        }`}
                      >
                        {option.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full flex items-center justify-end">
                <PrimaryButton onClick={() => router.push("/executers/choose")}>
                  CONTINUAR
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FriendsFamilyTrusteePage;