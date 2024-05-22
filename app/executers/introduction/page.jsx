'use client';
import DashboardLayout from '@/components/common/DashboardLayout';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();

  return (
    <>
      <DashboardLayout>
        <div className='container w-3/4 mx-auto flex flex-col h-full min-h-screen'>
          <div className='w-full flex flex-col py-12'>
            <div className='w-full flex'>
              <div className='w-[50%] flex flex-col'>
                <div className=''>
                  <p className='title py-2 '>¿Qué es un albacea?</p>
                  <p className='text-style py-4'>
                  Los albaceas son responsables de llevar a cabo los detalles de su testamento después de su muerte. Esto se conoce como "administrar su patrimonio".
                  </p>
                  <p className='text-style py-4'>
                  Esto puede implicar ordenar sus finanzas, asegurarse de que se paguen las deudas o los impuestos y asegurarse de que lo restante se distribuya adecuadamente de acuerdo con su testamento. Es un papel serio que asumir.
                  </p>
                  <p className='text-style py-4'>
                  Podrás agregar tus regalos más tarde.
                  </p>
                  <p className='title py-6 '>
                  ¿A quién elijo para que sea mi albacea?
                  </p>
                  <p className='text-style py-4'>
                  Puede elegir albaceas profesionales, amigos y familiares, o una combinación de ambos.
                  </p>
                  <p className='text-style py-4'>
                  Hay bastantes detalles importantes que debemos analizar. Es por eso que es posible que tardemos un poco más en leer estas próximas páginas.
                  </p>
                </div>
                <div className='w-full flex items-center justify-between'>
                  <button
                    onClick={() => router.push('/executers/professional-help')}
                    className='text-[14px] text-[#8D9495] ml-auto mr-0 font-[600] bg-[#FFDF4E] px-4 py-4 rounded-[5px] uppercase mt-4'
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
