'use client';
import DashboardLayout from '@/components/common/DashboardLayout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const page = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(1);

  const handleClick = (e, index) => {
    e.preventDefault();
    setActiveIndex(index === activeIndex ? null : index);
  };
  const data = [
    {
      title: 'Amigos de la familia',
    },
    {
      title: 'Fideicomisarios de despedida',
    },
    {
      title: 'Amigos y familiares y fideicomisarios de Farewill',
    },
  ];
  return (
    <>
      <DashboardLayout>
        <div className='container w-3/4 mx-auto flex flex-col h-full min-h-screen'>
          <div className='w-full flex flex-col py-12'>
            <div className='w-full flex'>
              <div className='w-[50%] flex flex-col'>
                <div className=''>
                  <p className='title py-2 '>Elegir a tus albaceas</p>
                  <p className='text-style py-4'>
                    Puedes elegir entre uno y cuatro ejecutores. Recomendamos
                    elegir más de uno, especialmente si alguno de los
                    beneficiarios de su testamento es actualmente menor de 18
                    años.
                  </p>
                  <p className='title py-2 '>Elegir amigos y familiares</p>
                  <div className='text-style py-4'>
                    Ser albacea puede ser estresante. Hay algunas cosas
                    importantes a considerar si elige amigos o familiares:
                    <ul className='list-disc px-6'>
                      <li className='text-style'>Que sean mayores de 18</li>
                      <li className='text-style'>que confías en ellos</li>
                      <li className='text-style'>
                        Son buenos con las finanzas y el papeleo.
                      </li>
                      <li className='text-style'>
                        Estás feliz de decirles que los has elegido.
                      </li>
                    </ul>
                  </div>
                  <p className='title py-2 '>
                    Elegir fideicomisarios de Farewill
                  </p>
                  <p className='text-style py-4'>
                    Aproximadamente dos tercios de las personas eligen un
                    albacea profesional para que les ayude con su patrimonio
                    después de su muerte. Incluso si elige amigos y familiares
                    como albaceas, lo más probable es que consulten a un
                    profesional para que los ayude de todos modos.
                  </p>
                  <div className='text-style py-4'>
                    Los fideicomisarios de Farewill pueden:
                    <ul className='list-disc px-6'>
                      <li className='text-style'>
                        Quita el estrés a familiares y amigos
                      </li>
                      <li className='text-style'>
                        Actuar como un tercero justo y objetivo si surge un
                        conflicto.
                      </li>
                      <li className='text-style'>
                        Resolver el proceso sucesorio de forma rápida y
                        profesional
                      </li>
                      <li className='text-style'>
                        Ahorre tiempo y dinero a su familia en comparación con
                        la elección de un profesional tradicional después de su
                        muerte.
                      </li>
                    </ul>
                  </div>
                  <p className='title py-2 '>
                    Elegir juntos a amigos, familiares y fideicomisarios de
                    Farewill
                  </p>
                  <p className='text-style py-4'>
                    Reunir a personas que lo conocieron personalmente con un
                    profesional para que se encargue de los aspectos técnicos
                    puede brindar equilibrio y hacer que las cosas sean menos
                    estresantes. Compartiríamos el trabajo de manera justa y
                    adecuada según quién sea mejor para cada tarea.
                  </p>
                  <p className='title py-2 '>Sin compromisos duros.</p>
                  <p className='text-style py-4'>
                    Si sus coejecutores se sienten lo suficientemente cómodos
                    administrando su patrimonio y no necesitan ayuda profesional
                    (a diferencia de muchos albaceas profesionales), no cobramos
                    por hacernos a un lado si no somos necesarios.
                  </p>
                  <p className='title py-2 '>
                    ¿A quién le gustaría elegir como su albacea?
                  </p>
                  <div className='bg-white rounded-lg overflow-hidden '>
                    {data &&
                      data?.map((items, index) => (
                        <div key={index} className=''>
                          <p
                            onClick={(e) => handleClick(e, index)}
                            className={`text-style cursor-pointer px-4 py-6 ${
                              activeIndex === index
                                ? 'bg-[#ffdf4e] text-white'
                                : ''
                            }`}
                          >
                            {items.title}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
                <div className='w-full flex items-center justify-between'>
                  <div
                    onClick={() => router.back()}
                    className='flex items-center text-[14px] font-[500] gap-2  pt-1 text-[#9999] cursor-pointer border-b border-transparent hover:border-[#9999] transiton-all delay-150'
                  >
                    <svg
                      height={'14px'}
                      width={'14px'}
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 320 512'
                    >
                      <path
                        fill='#0000FF'
                        d='M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z'
                      />
                    </svg>
                    Back
                  </div>
                  <button
                    onClick={() => router.push('/executers/choose')}
                    className='text-[14px] text-[#8D9495] ml-auto mr-0 font-[600] bg-[#FFDF4E] px-4 py-4 rounded-[100px] uppercase mt-4'
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
