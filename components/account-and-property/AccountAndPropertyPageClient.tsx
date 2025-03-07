'use client';

import { FC, useState } from 'react';
import DashboardLayout from '@/components/common/DashboardLayout';
import { useRouter } from 'next/navigation';
import AddAsset from '@/app/account-and-property/AddAsset';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import PrimaryButton from '@/components/reusables/PrimaryButton';
import Link from 'next/link';
import { Baby, Users, Dog, Heart, UserPlus } from 'phosphor-react';
import type { UserAsset, AssetOption, User, Will, Contact } from '@/types';
import { createUserAssetAction } from '@/app/actions/assetActions';
import { flushSync } from 'react-dom';
import Spinner from '../reusables/Spinner';

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#4BC0C0',
  '#9966FF',
  '#FF9F40'
];

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const getChartData = (assets: UserAsset[], assetOptions: AssetOption[]) => {
  const data = assets.reduce((acc, asset) => {
    const option = assetOptions.find(opt => opt.id === asset.categoryId);
    const label = option ? option.label : "Other";
    const existing = acc.find(item => item.name === label);
    if (existing) {
      existing.value += asset.value;
    } else {
      acc.push({ name: label, value: asset.value });
    }
    return acc;
  }, [] as { name: string; value: number }[]);
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return data.map(item => ({ ...item, percentage: total ? (item.value / total) * 100 : 0 }));
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
        <p className="text-[#1d1d1f] font-medium">{payload[0].name}</p>
        <p className="text-[#047aff] font-normal">{formatCurrency(payload[0].value)}</p>
        <p className="text-[#047aff] font-normal">{payload[0].payload.percentage.toFixed(1)}%</p>
      </div>
    );
  }
  return null;
};

interface AccountAndPropertyPageClientProps {
  user: User;
  assets: UserAsset[];
  testament: Will | null;
  assetOptions: AssetOption[];
  contacts: Contact[];
}

type InheritanceType = 'manual' | 'legal' | 'universal';

const AccountAndPropertyPageClient: FC<AccountAndPropertyPageClientProps> = ({
  user,
  assets: initialAssets,
  testament,
  assetOptions,
  contacts,
}) => {
  const router = useRouter();
  const [assets, setAssets] = useState<UserAsset[]>(initialAssets);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState(false);
  const [inheritanceType, setInheritanceType] = useState<InheritanceType>('manual');
  const [selectedLegalHeirId, setSelectedLegalHeirId] = useState<string>('');

  const handleAddAsset = async (newAsset: UserAsset) => {
    try {
      const createdAsset = await createUserAssetAction(user.id, newAsset);
      setAssets(prev => [...prev, createdAsset]);
      setShowModal(false);
    } catch (error) {
      console.error("Error creating asset:", error);
    }
  };

  const handleSave = async () => {
    flushSync(() => {
      setIsSaving(true);
    });
    let didNavigate = false;
    try {
      if (inheritanceType === 'universal' && !selectedLegalHeirId) {
        alert("Por favor selecciona un heredero universal");
        setIsSaving(false);
        return;
      }
      
      // Here you would typically save the inheritance type and legal heir selection
      router.push("/summary?completed=account-and-property");
      didNavigate = true;
    } catch (error: any) {
      console.error("Error saving account and property:", error);
    } finally {
      if (!didNavigate) {
        setIsSaving(false);
      }
    }
  };

  const chartData = getChartData(assets, assetOptions);

  return (
    <DashboardLayout>
      <AddAsset
        showModal={showModal}
        setShowModal={setShowModal}
        onAddAsset={handleAddAsset}
        assetOptions={assetOptions}
      />
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
              {/* Page Header */}
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md">
                    <span className="text-[#047aff] text-[14px] font-normal">CUENTAS Y PROPIEDADES</span>
                  </div>
                  <Link href="#" className="inline-flex items-center h-[32px] text-[#047aff] hover:text-[#0456b0]">
                    <span className="w-5 h-5 inline-flex items-center justify-center rounded-full border border-[#047aff] text-sm">?</span>
                  </Link>
                </div>
                <h1 className="text-[32px] sm:text-[38px] font-medium tracking-[-1.5px] leading-[1d1d1f] sm:leading-[52px] mb-[15px]">
                  <span className="text-[#1d1d1f]">Enumere sus </span>
                  <span
                    style={{ backgroundImage: "linear-gradient(to right, #7abaff 1%, #047aff 60%, #0d4ba3 100%)" }}
                    className="inline-block text-transparent bg-clip-text"
                  >
                    cuentas y propiedades
                  </span>
                </h1>

                <p className="text-[16px] text-[#1d1d1f] leading-6 mb-4">
                  Esto incluye cuentas bancarias, pensiones, pólizas de seguros, etc.
                </p>
                <p className="text-[16px] text-[#1d1d1f] leading-6">
                  No solicitaremos detalles específicos como números de cuenta.
                </p>
              </div>

              {/* Inheritance Options */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-[20px] font-medium text-[#1d1d1f] mb-6">Tipo de Herencia</h2>
                <div className="space-y-4">
                  {/* Manual Option */}
                  <div
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      inheritanceType === 'manual'
                        ? 'border-[#047aff] bg-[#047aff] bg-opacity-5'
                        : 'border-gray-200 hover:border-[#047aff] hover:bg-gray-50'
                    }`}
                    onClick={() => setInheritanceType('manual')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#047aff] bg-opacity-10 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="#047aff">
                            <path d="M19 14a1 1 0 0 0-1 1v3h-3a1 1 0 0 0 0 2h4a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1zm-8-6h2v3a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1h-3a1 1 0 0 0 0 2zM6 18h3a1 1 0 0 0 0-2H7v-3a1 1 0 0 0-2 0v4a1 1 0 0 0 1 1zM8 9h3a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2z"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-[16px] font-medium text-[#1d1d1f]">
                            Definir activos manualmente
                          </h3>
                          <p className="text-[14px] text-gray-500">
                            Especifica tus activos y asigna beneficiarios individualmente
                          </p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="inheritanceType"
                        checked={inheritanceType === 'manual'}
                        onChange={() => setInheritanceType('manual')}
                        className="w-4 h-4 text-[#047aff] border-gray-300 focus:ring-[#047aff]"
                      />
                    </div>
                  </div>

                  {/* Legal Heirs Option */}
                  <div
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      inheritanceType === 'legal'
                        ? 'border-[#047aff] bg-[#047aff] bg-opacity-5'
                        : 'border-gray-200 hover:border-[#047aff] hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setInheritanceType('legal');
                      setSelectedLegalHeirId('');
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#047aff] bg-opacity-10 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="#047aff">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-[16px] font-medium text-[#1d1d1f]">
                            Herederos legales
                          </h3>
                          <p className="text-[14px] text-gray-500">
                            Distribuir según la ley de sucesiones
                          </p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="inheritanceType"
                        checked={inheritanceType === 'legal'}
                        onChange={() => {
                          setInheritanceType('legal');
                          setSelectedLegalHeirId('');
                        }}
                        className="w-4 h-4 text-[#047aff] border-gray-300 focus:ring-[#047aff]"
                      />
                    </div>
                  </div>

                  {/* Universal Heir Option */}
                  <div
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      inheritanceType === 'universal'
                        ? 'border-[#047aff] bg-[#047aff] bg-opacity-5'
                        : 'border-gray-200 hover:border-[#047aff] hover:bg-gray-50'
                    }`}
                    onClick={() => setInheritanceType('universal')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#047aff] bg-opacity-10 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="#047aff">
                            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V18h14v-1.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V18h6v-1.5c0-2.33-4.67-3.5-7-3.5z"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-[16px] font-medium text-[#1d1d1f]">
                            Heredero universal
                          </h3>
                          <p className="text-[14px] text-gray-500">
                            Designar un único heredero para todos los bienes
                          </p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="inheritanceType"
                        checked={inheritanceType === 'universal'}
                        onChange={() => setInheritanceType('universal')}
                        className="w-4 h-4 text-[#047aff] border-gray-300 focus:ring-[#047aff]"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Selection for Universal Heir */}
                {inheritanceType === 'universal' && (
                  <div className="mt-6 space-y-4">
                    <h3 className="text-[16px] font-medium text-[#1d1d1f]">
                      Selecciona el heredero universal
                    </h3>
                    {contacts.length > 0 ? (
                      <div className="grid grid-cols-1 gap-4">
                        {contacts.map((contact) => (
                          <div
                            key={contact.id}
                            className={`p-4 rounded-lg border transition-all cursor-pointer ${
                              selectedLegalHeirId === contact.id
                                ? 'border-[#047aff] bg-[#047aff] bg-opacity-5'
                                : 'border-gray-200 hover:border-[#047aff] hover:bg-gray-50'
                            }`}
                            onClick={() => contact.id && setSelectedLegalHeirId(contact.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                  <span className="text-[16px] font-medium text-gray-600">
                                    {contact.name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div>
                                  <h3 className="text-[16px] font-medium text-[#1d1d1f]">
                                    {contact.name}
                                  </h3>
                                  <p className="text-[14px] text-gray-500">
                                    {contact.relationToUser || 'Contacto'}
                                  </p>
                                </div>
                              </div>
                              <input
                                type="radio"
                                name="universalHeir"
                                checked={selectedLegalHeirId === contact.id}
                                onChange={() => contact.id && setSelectedLegalHeirId(contact.id)}
                                className="w-4 h-4 text-[#047aff] border-gray-300 focus:ring-[#047aff]"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[14px] text-[#D00E01] mt-2">
                        No hay contactos disponibles. Por favor, agrega contactos primero.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Add Asset Button - Only show if using manual mode */}
              {inheritanceType === 'manual' && (
                <div
                  onClick={() => setShowModal(true)}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden"
                >
                  <div className="flex items-center justify-center gap-2 py-8">
                    <div className="w-8 h-8 rounded-full bg-[#047aff] flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16" className="fill-white">
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                      </svg>
                    </div>
                    <span className="text-[#047aff] font-medium">Agregar activos</span>
                  </div>
                </div>
              )}

              {/* Assets List - Only show if using manual mode */}
              {inheritanceType === 'manual' && assets.length > 0 && (
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-[22px] font-medium text-[#1d1d1f] mb-4">Activos</h2>
                    <div className="space-y-4">
                      {assets.map(asset => (
                        <div key={asset.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-[17px] font-medium text-[#1d1d1f]">{asset.name}</h3>
                              <p className="text-[14px] text-gray-500">
                                {assetOptions.find(opt => opt.id === asset.categoryId)?.label || "Other"}
                              </p>
                              {asset.metadata && (asset.metadata as any).location && (
                                <p className="text-[14px] text-gray-500">{(asset.metadata as any).location}</p>
                              )}
                              {asset.metadata && (asset.metadata as any).description && (
                                <p className="text-[14px] text-gray-500 mt-1">{(asset.metadata as any).description}</p>
                              )}
                            </div>
                            <p className="text-[17px] font-medium text-[#1d1d1f]">{formatCurrency(asset.value)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-6 flex justify-end">
                <PrimaryButton 
                  onClick={handleSave} 
                  disabled={isSaving || (inheritanceType === 'universal' && !selectedLegalHeirId)}
                >
                  {isSaving ? <Spinner size={24} /> : "Guardar y continuar"}
                </PrimaryButton>
              </div>
            </div>

            {/* Assets Distribution Chart - Only show if using manual mode */}
            {inheritanceType === 'manual' && assets.length > 0 && (
              <div className="bg-white rounded-2xl shadow-md p-6 lg:sticky lg:top-6">
                <h2 className="text-[22px] font-medium text-[#1d1d1f] mb-6">Distribución de Activos</h2>
                <div className="w-full aspect-square max-h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius="90%"
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-8 space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  {chartData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 hover:bg-gray-50 rounded-lg px-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                        <span className="text-[16px] text-[#1d1d1f] truncate max-w-[200px]">{item.name}</span>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[16px] font-medium text-[#1d1d1f]">{formatCurrency(item.value)}</p>
                        <p className="text-[14px] text-gray-500">{item.percentage.toFixed(1)}%</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-[18px] font-medium text-[#1d1d1f]">Total</span>
                    <span className="text-[18px] font-medium text-[#1d1d1f]">
                      {formatCurrency(assets.reduce((sum, asset) => sum + asset.value, 0))}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default AccountAndPropertyPageClient;