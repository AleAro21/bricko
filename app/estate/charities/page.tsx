"use client";
import { FC, useState } from 'react';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import Add, { CharityData } from "./Add";
import { motion } from 'framer-motion';
import PrimaryButton from "@/components/reusables/PrimaryButton";

const causeTranslations: { [key: string]: string } = {
  'health': 'Salud',
  'education': 'Educación',
  'environment': 'Medio Ambiente',
  'social': 'Causas Sociales',
  'animals': 'Protección Animal',
  'culture': 'Arte y Cultura',
  'other': 'Otra Causa'
};

const CharitiesPage: FC = () => {
  const router = useRouter();
  const [showAddCharity, setShowAddCharity] = useState<boolean>(false);
  const [includeCharities, setIncludeCharities] = useState<boolean | null>(null);
  const [charities, setCharities] = useState<CharityData[]>([]);

  const handleAddCharity = (charity: CharityData): void => {
    setCharities([...charities, charity]);
  };

  const handlePercentageChange = (id: string, newPercentage: number): void => {
    setCharities(prevCharities => 
      prevCharities.map(charity => 
        charity.id === id 
          ? { ...charity, percentage: Math.min(100, Math.max(0, newPercentage)) }
          : charity
      )
    );
  };

  const handleRemoveCharity = (id: string): void => {
    setCharities(prevCharities => prevCharities.filter(charity => charity.id !== id));
  };

  const totalPercentage = charities.reduce((sum, charity) => sum + charity.percentage, 0);

  return (
    <>
      <Add setShowModal={setShowAddCharity} showModal={showAddCharity} onAddCharity={handleAddCharity} />
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
              {/* Left Column - Title and Description */}
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5">
                    <span className="text-[#047aff] text-[14px] font-[400]">ORGANIZACIONES BENÉFICAS</span>
                  </div>

                  <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                    <span className="text-[#1d1d1f]">¿Le gustaría incluir una </span>
                    <span className="bg-gradient-to-r from-[#3d9bff] to-[#047aff] inline-block text-transparent bg-clip-text">
                      donación benéfica?
                    </span>
                  </h1>
                  <p className="text-[16px] text-[#1d1d1f] leading-6">
                    Muchas personas dejan parte de su patrimonio a organizaciones
                    benéficas para contribuir a causas que les apasionan.
                  </p>
                </div>

                <div className="pt-6 flex justify-end">
                  <PrimaryButton
                    onClick={() => router.push('/estate/secondary')}
                    disabled={includeCharities === true && totalPercentage !== 100}
                  >
                    Guardar y continuar
                  </PrimaryButton>
                </div>
              </div>

              {/* Right Column - Options and Content */}
              <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                  {[
                    { value: true, label: 'Sí' },
                    { value: false, label: 'No' }
                  ].map((option, index) => (
                    <div
                      key={index}
                      onClick={() => setIncludeCharities(option.value)}
                      className="cursor-pointer transition-all"
                    >
                      <div
                        className={`px-6 py-4 ${
                          index !== 0 ? 'border-t border-gray-100' : ''
                        } ${
                          includeCharities === option.value
                            ? 'bg-[#047aff] text-white'
                            : 'hover:bg-[#047aff] hover:bg-opacity-5'
                        }`}
                      >
                        <h3 className="text-[17px] font-[500]">
                          {option.label}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>

                {includeCharities && (
                  <>
                    <div
                      onClick={() => setShowAddCharity(true)}
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
                        <span className="text-[#047aff] font-[500]">Agregar Organización Benéfica</span>
                      </div>
                    </div>

                    {charities.length > 0 && (
                      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                        <div className="p-6">
                          <h2 className="text-[22px] font-[500] text-[#1d1d1f] mb-6">
                            Organizaciones Benéficas
                          </h2>

                          <div className="mb-6">
                            <div className="w-full bg-[#f5f5f7] rounded-full h-2.5">
                              <div 
                                className={`h-2.5 rounded-full ${
                                  totalPercentage > 100 ? 'bg-[#D00E01]' : 'bg-[#047aff]'
                                }`}
                                style={{ width: `${Math.min(totalPercentage, 100)}%` }}
                              ></div>
                            </div>
                            {totalPercentage !== 100 && (
                              <p className="text-[14px] text-[#D00E01] mt-2">
                                {totalPercentage > 100 
                                  ? 'El total no puede exceder el 100%'
                                  : 'El total debe sumar 100%'}
                              </p>
                            )}
                          </div>

                          <div className="space-y-4">
                            {charities.map((charity) => (
                              <div
                                key={charity.id}
                                className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0"
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="text-[17px] font-[500] text-[#1d1d1f]">{charity.name}</h3>
                                    <p className="text-[14px] text-gray-500">{causeTranslations[charity.cause]}</p>
                                    {charity.registrationNumber && (
                                      <p className="text-[14px] text-gray-500 mt-1">
                                        Registro: {charity.registrationNumber}
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="number"
                                        value={charity.percentage}
                                        onChange={(e) => handlePercentageChange(charity.id, Number(e.target.value))}
                                        className="w-20 px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all text-[16px]"
                                        min="0"
                                        max="100"
                                        step="1"
                                      />
                                      <span className="text-[#1d1d1f]">%</span>
                                    </div>
                                    <button
                                      onClick={() => handleRemoveCharity(charity.id)}
                                      className="text-gray-400 hover:text-[#D00E01] transition-colors"
                                      title="Eliminar"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 6h18"></path>
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </DashboardLayout>
    </>
  );
};

export default CharitiesPage;