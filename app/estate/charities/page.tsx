'use client';
import { FC, useState } from 'react';
import DashboardLayout from '@/components/common/DashboardLayout';
import { useRouter } from 'next/navigation';
import Add, { CharityData } from './Add';

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
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">
                  ¿Le gustaría incluir una donación a una organización benéfica?
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                  Muchas personas dejan parte de su patrimonio a organizaciones
                  benéficas para contribuir a causas que les apasionan.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {[
                  { value: true, label: 'Sí' },
                  { value: false, label: 'No' }
                ].map((option, index) => (
                  <div
                    key={index}
                    onClick={() => setIncludeCharities(option.value)}
                    className="cursor-pointer transition-colors"
                  >
                    <div
                      className={`px-6 py-4 ${
                        index !== 0 ? 'border-t border-gray-100' : ''
                      } ${
                        includeCharities === option.value
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-blue-50'
                      }`}
                    >
                      <h3 className={`text-lg font-medium`}>
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
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-blue-500 transition-colors cursor-pointer overflow-hidden"
                  >
                    <div className="flex items-center justify-center gap-2 py-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        width="24"
                        height="24"
                        className="fill-blue-600"
                      >
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                      </svg>
                      <span className="text-blue-600 font-medium">Agregar Organización Benéfica</span>
                    </div>
                  </div>

                  {charities.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="text-xl font-semibold text-gray-900">Organizaciones Benéficas</h2>
                          <div className="text-sm text-gray-500">
                            Total asignado: {totalPercentage}%
                          </div>
                        </div>

                        <div className="mb-6">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${
                                totalPercentage > 100 ? 'bg-red-600' : 'bg-blue-600'
                              }`}
                              style={{ width: `${Math.min(totalPercentage, 100)}%` }}
                            ></div>
                          </div>
                          {totalPercentage !== 100 && (
                            <p className="text-sm text-red-500 mt-2">
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
                              className="flex justify-between items-start p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors"
                            >
                              <div>
                                <h3 className="font-medium text-gray-900">{charity.name}</h3>
                                <p className="text-sm text-gray-500">{causeTranslations[charity.cause]}</p>
                                {charity.registrationNumber && (
                                  <p className="text-sm text-gray-500">
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
                                    className="w-20 px-2 py-1 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    min="0"
                                    max="100"
                                    step="1"
                                  />
                                  <span className="text-gray-600">%</span>
                                </div>
                                <button
                                  onClick={() => handleRemoveCharity(charity.id)}
                                  className="text-gray-400 hover:text-red-500 transition-colors"
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
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              <div className="pt-6 flex justify-end">
                <button
                  onClick={() => router.push('/estate/secondary')}
                  className="inline-flex justify-center px-6 py-3 rounded-xl bg-blue-600 text-white text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={includeCharities === true && totalPercentage !== 100}
                >
                  Guardar y continuar
                </button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default CharitiesPage;