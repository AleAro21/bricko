'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/common/DashboardLayout';
import { motion } from 'framer-motion';
import { Plus, Trash, Warning, Info, CaretRight, Coins } from 'phosphor-react';
import PrimaryButton from '@/components/reusables/PrimaryButton';

interface Beneficiary {
  id: string;
  name: string;
  relationship: string;
  tokens: number;
}

const BeneficiariesClient: FC = () => {
  const router = useRouter();
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
    { id: '1', name: '', relationship: '', tokens: 100 }
  ]);

  const totalTokens = 100; // This should come from the previous step

  const addBeneficiary = () => {
    if (beneficiaries.length >= 5) return;
    
    const currentTotal = beneficiaries.reduce((sum, b) => sum + b.tokens, 0);
    const newTokens = Math.max(0, totalTokens - currentTotal);
    
    setBeneficiaries([
      ...beneficiaries,
      {
        id: Date.now().toString(),
        name: '',
        relationship: '',
        tokens: newTokens
      }
    ]);
  };

  const removeBeneficiary = (id: string) => {
    if (beneficiaries.length <= 1) return;
    setBeneficiaries(beneficiaries.filter(b => b.id !== id));
  };

  const updateBeneficiary = (id: string, field: keyof Beneficiary, value: string | number) => {
    setBeneficiaries(beneficiaries.map(b => 
      b.id === id ? { ...b, [field]: value } : b
    ));
  };

  const totalAssignedTokens = beneficiaries.reduce((sum, b) => sum + b.tokens, 0);
  const isValid = totalAssignedTokens === totalTokens && beneficiaries.every(b => 
    b.name.trim() && b.relationship.trim() && b.tokens > 0
  );

  const handleSubmit = () => {
    router.push('/verify-identity');
  };

  return (
    <DashboardLayout>
      <div className="relative min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="relative flex flex-col min-h-screen"
        >
          <main className="container mx-auto flex flex-col flex-grow overflow-hidden">
            <div className="w-full max-w-6xl mx-auto flex flex-col min-h-[75vh] mb-4 px-4 sm:px-5 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                {/* Left Column */}
                <div className="space-y-8">
                  <div>
                    <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5">
                      <span className="text-[#047aff] text-[14px] font-[400]">BENEFICIARIOS</span>
                    </div>
                    <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                      <span className="text-[#1d1d1f]">Asigna los </span>
                      <span
                        style={{
                          backgroundImage: "linear-gradient(to left, #047aff 30%, #0d4ba3 100%)",
                        }}
                        className="inline-block text-transparent bg-clip-text"
                      >
                        tokens
                      </span>
                    </h1>

                    <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
                      <div className="flex items-start gap-3 mb-6">
                        <Info weight="fill" className="text-blue-500 w-5 h-5 mt-1" />
                        <p className="text-sm text-gray-600">
                          Designa a las personas que recibirán los tokens de tu activo. 
                          Puedes agregar hasta 5 beneficiarios y distribuir los {totalTokens} tokens entre ellos.
                        </p>
                      </div>

                      <div className="space-y-4">
                        {beneficiaries.map((beneficiary, index) => (
                          <div key={beneficiary.id} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="font-medium">Beneficiario {index + 1}</h3>
                              {beneficiaries.length > 1 && (
                                <button
                                  onClick={() => removeBeneficiary(beneficiary.id)}
                                  className="text-red-500 hover:text-red-600"
                                >
                                  <Trash size={20} />
                                </button>
                              )}
                            </div>
                            
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Nombre completo
                                </label>
                                <input
                                  type="text"
                                  value={beneficiary.name}
                                  onChange={(e) => updateBeneficiary(beneficiary.id, 'name', e.target.value)}
                                  className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Ej. Juan Pérez González"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Parentesco
                                </label>
                                <select
                                  value={beneficiary.relationship}
                                  onChange={(e) => updateBeneficiary(beneficiary.id, 'relationship', e.target.value)}
                                  className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                >
                                  <option value="">Seleccionar parentesco</option>
                                  <option value="Cónyuge">Cónyuge</option>
                                  <option value="Hijo/a">Hijo/a</option>
                                  <option value="Padre/Madre">Padre/Madre</option>
                                  <option value="Hermano/a">Hermano/a</option>
                                  <option value="Otro">Otro</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Número de tokens
                                </label>
                                <input
                                  type="number"
                                  value={beneficiary.tokens}
                                  onChange={(e) => updateBeneficiary(beneficiary.id, 'tokens', Number(e.target.value))}
                                  className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                  min="0"
                                  max={totalTokens}
                                />
                              </div>
                            </div>
                          </div>
                        ))}

                        {beneficiaries.length < 5 && (
                          <button
                            onClick={addBeneficiary}
                            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
                          >
                            <Plus size={24} className="mx-auto" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-yellow-50 p-4 rounded-lg">
                      <Warning weight="fill" className="text-yellow-500 w-5 h-5 mt-1" />
                      <div className="text-sm text-yellow-700">
                        <p className="font-medium mb-1">Importante:</p>
                        <ul className="list-disc ml-4 space-y-1">
                          <li>El total de tokens debe sumar {totalTokens}</li>
                          <li>Verifica que los nombres estén escritos correctamente</li>
                          <li>Los beneficiarios deben ser mayores de edad</li>
                          <li>No puedes designarte a ti mismo como beneficiario</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <div className="sticky top-8">
                    <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
                      <h2 className="text-xl font-medium mb-4">Resumen de asignación</h2>
                      
                      <div className="space-y-4 mb-6">
                        {beneficiaries.map((beneficiary, index) => (
                          <div key={beneficiary.id} className="flex items-center justify-between py-2 border-b">
                            <div className="flex items-center gap-3">
                              <Coins className="text-blue-500 w-5 h-5" />
                              <div>
                                <p className="font-medium">
                                  {beneficiary.name || `Beneficiario ${index + 1}`}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {beneficiary.relationship || 'Pendiente'}
                                </p>
                              </div>
                            </div>
                            <span className="font-medium text-blue-500">
                              {beneficiary.tokens} tokens
                            </span>
                          </div>
                        ))}

                        <div className="flex justify-between font-medium pt-2">
                          <span>Total asignado:</span>
                          <span className={totalAssignedTokens === totalTokens ? 'text-green-500' : 'text-red-500'}>
                            {totalAssignedTokens} / {totalTokens} tokens
                          </span>
                        </div>
                      </div>

                      <PrimaryButton
                        onClick={handleSubmit}
                        disabled={!isValid}
                        className="w-full"
                      >
                        <div className="flex items-center justify-center gap-2">
                          Continuar
                          <CaretRight weight="bold" className="w-4 h-4" />
                        </div>
                      </PrimaryButton>

                      <p className="text-xs text-gray-500 text-center mt-4">
                        Al continuar, confirmas que la información proporcionada es correcta.
                      </p>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-6">
                      <div className="flex items-start gap-3">
                        <Info weight="fill" className="text-blue-600 flex-shrink-0 w-5 h-5 mt-1" />
                        <div>
                          <h3 className="text-[16px] font-[500] text-[#1d1d1f] mb-2">
                            Tokens garantizados
                          </h3>
                          <p className="text-[14px] text-gray-600">
                            Tus beneficiarios recibirán los tokens asignados que representan partes del activo tokenizado.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default BeneficiariesClient;