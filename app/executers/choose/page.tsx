"use client";
import { FC, useState } from 'react';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import Add, { ExecutorData } from "./Add";
import { motion } from 'framer-motion';
import PrimaryButton from "@/components/reusables/PrimaryButton";
import Link from "next/link";

interface ExecutorOption {
  title: string;
  subTitle: string;
}

const ChooseExecutorsPage: FC = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<ExecutorOption | null>(null);
  const [executors, setExecutors] = useState<ExecutorData[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, index: number, option: ExecutorOption): void => {
    e.preventDefault();
    setActiveIndex(index === activeIndex ? null : index);
    setSelectedOption(option);
  };

  const handleAddClick = (): void => {
    setShowModal(true);
  };

  const handleAddExecutor = (executor: ExecutorData): void => {
    setExecutors([...executors, executor]);
  };

  const executorOptions: ExecutorOption[] = [
    {
      title: "Amigos de la familia",
      subTitle: "Seleccione amigos cercanos que conozcan bien a su familia y sus deseos.",
    },
    {
      title: "Fideicomisarios de despedida",
      subTitle: "Profesionales especializados en la administración de patrimonios.",
    },
    {
      title: "Amigos y familiares y fideicomisarios de Testador",
      subTitle: "Una combinación de personas de confianza y profesionales.",
    },
  ];

  return (
    <>
      <Add setShowModal={setShowModal} showModal={showModal} onAddExecutor={handleAddExecutor} />
      <DashboardLayout>
        <motion.div 
          className="min-h-screen bg-[#f5f5f7]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-5 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md">
                      <span className="text-[#047aff] text-[14px] font-[400]">ALBACEAS</span>
                    </div>
                    <Link href="#" className="inline-flex items-center h-[32px] text-[#047aff] hover:text-[#0456b0]">
                      <span className="w-5 h-5 inline-flex items-center justify-center rounded-full border border-[#047aff] text-sm">?</span>
                    </Link>
                  </div>

                  <h1 className='text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]'>
                    <span className='text-[#1d1d1f]'>¿A quién le gustaría elegir como su </span>
                    <span className='bg-gradient-to-r from-[#3d9bff] to-[#047aff] inline-block text-transparent bg-clip-text'>albacea?</span>
                  </h1>
                  <p className="text-[16px] text-[#1d1d1f] leading-6 mb-4">
                    Seleccione el tipo de albaceas que prefiere para administrar su patrimonio.
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                  {executorOptions.map((option, index) => (
                    <div
                      key={index}
                      className="cursor-pointer transition-all"
                      onClick={(e) => handleClick(e, index, option)}
                    >
                      <div
                        className={`px-6 py-4 ${
                          index !== 0 ? 'border-t border-gray-100' : ''
                        } ${
                          activeIndex === index
                            ? 'bg-[#047aff]'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <h3
                          className={`text-[17px] font-[500] ${
                            activeIndex === index
                              ? 'text-white'
                              : 'text-[#1d1d1f]'
                          }`}
                        >
                          {option.title}
                        </h3>
                        <p
                          className={`mt-1 text-[14px] ${
                            activeIndex === index
                              ? 'text-blue-100'
                              : 'text-gray-500'
                          }`}
                        >
                          {option.subTitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h2 className="text-[22px] font-[500] text-[#1d1d1f] mb-4">
                    ¿A quién quieres como tus albaceas?
                  </h2>
                  
                  {executors.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
                      <div className="space-y-4">
                        {executors.map((executor) => (
                          <div
                            key={executor.id}
                            className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-[17px] font-[500] text-[#1d1d1f]">{executor.name}</h3>
                                <p className="text-[14px] text-gray-500">{executor.email}</p>
                                {executor.phone && (
                                  <p className="text-[14px] text-gray-500">{executor.phone}</p>
                                )}
                                <p className="text-[14px] text-gray-500">{executor.relationship}</p>
                                {executor.isBackupExecutor && (
                                  <p className="text-[14px] text-[#047aff]">Albacea suplente</p>
                                )}
                              </div>
                              <div>
                                <input 
                                  type="checkbox" 
                                  checked
                                  className="h-6 w-6 rounded border-gray-300 text-[#047aff] focus:ring-[#047aff]"
                                  aria-label="Seleccionar albacea"
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div
                    onClick={handleAddClick}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden"
                  >
                    <div className="flex items-center justify-center gap-2 py-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        width="24"
                        height="24"
                        className="fill-[#047aff]"
                      >
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                      </svg>
                      <span className="text-[#047aff] font-[500]">Agregar Albacea</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex justify-end">
                  <PrimaryButton
                    onClick={() => router.push("/summary?completed=executers")}
                  >
                    Guardar y continuar
                  </PrimaryButton>
                </div>
              </div>

              {executors.length > 0 && (
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h2 className="text-[22px] font-[500] text-[#1d1d1f] mb-4">Resumen de Albaceas</h2>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      {executors.filter(e => !e.isBackupExecutor).map((executor) => (
                        <div key={executor.id} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#047aff] flex items-center justify-center mt-0.5">
                            <svg
                              className="w-3.5 h-3.5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-[16px] font-[500] text-[#1d1d1f]">{executor.name}</p>
                            <p className="text-[14px] text-gray-500">Albacea Principal</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {executors.some(e => e.isBackupExecutor) && (
                      <div>
                        <h3 className="text-[17px] font-[500] text-[#1d1d1f] mb-4">Albaceas Suplentes</h3>
                        <div className="space-y-4">
                          {executors.filter(e => e.isBackupExecutor).map((executor) => (
                            <div key={executor.id} className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#047aff] flex items-center justify-center mt-0.5">
                                <svg
                                  className="w-3.5 h-3.5 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                              <div>
                                <p className="text-[16px] font-[500] text-[#1d1d1f]">{executor.name}</p>
                                <p className="text-[14px] text-gray-500">Albacea Suplente</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </DashboardLayout>
    </>
  );
};

export default ChooseExecutorsPage;