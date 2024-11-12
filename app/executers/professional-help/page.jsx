"use client";
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  return (
    <>
      <DashboardLayout>
        <div className="container w-3/4 mx-auto flex flex-col h-full min-h-screen">
          <div className="w-full flex flex-col py-12">
            <div className="w-full flex">
              <div className="w-[50%] flex flex-col">
                <div className="">
                  <p className="title py-2 ">
                    Pensando en elegir un albacea profesional
                  </p>
                  <p className="text-style py-4">
                    Incluso si un patrimonio es sencillo, ser albacea puede
                    llevar mucho tiempo y ser complicado. Es una de las
                    principales razones por las que dos tercios de las personas
                    eligen a un profesional para hacerlo.
                  </p>
                  <p className="text-style py-4">
                    A veces la gente elige un abogado, pero también se puede
                    utilizar un servicio de albacea profesional. El nuestro se
                    llama Testador Trustees y se basa en los mismos principios
                    de utilizar la tecnología para ofrecer una experiencia
                    moderna a un precio asequible.
                  </p>
                  <p className="text-style py-4">
                    Los costos de los albaceas profesionales pueden variar
                    enormemente, por lo que es algo en lo que debe pensar antes
                    de decidir.
                  </p>
                </div>
                <div className="w-full flex items-center justify-between">
                  <button
                    onClick={() =>
                      router.push("/executers/friends-family-farewill-trustee")
                    }
                    className="text-[14px] text-[#FFFFFF] ml-auto mr-0 font-[600] bg-[#0171e3] px-4 py-4 rounded-[100px] uppercase mt-4"
                  >
                    CONTINUAR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default page;
