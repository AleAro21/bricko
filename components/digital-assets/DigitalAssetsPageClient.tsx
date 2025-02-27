'use client';

import { FC, useState } from 'react';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import AddAsset from '@/app/digital-asset/AddAsset';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import PrimaryButton from '@/components/reusables/PrimaryButton';
import Link from 'next/link';
import {
  Cloud,
  CurrencyBtc,
  Globe,
  Envelope,
  GameController,
  Question,
} from 'phosphor-react';
import type { UserAsset, AssetOption, User, Will } from '@/types';
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
  '#4BC0C0'
];

interface DigitalAssetsPageClientProps {
  user: User;
  assets: UserAsset[];
  testament: Will | null;
  assetOptions: AssetOption[];
}

const DigitalAssetsPageClient: FC<DigitalAssetsPageClientProps> = ({
  user,
  assets: initialAssets,
  testament,
  assetOptions,
}) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [assets, setAssets] = useState<UserAsset[]>(initialAssets);
  const [saving, setSaving] = useState(false);

  const assetTypeIcons: Record<string, JSX.Element> = {
    cloud_storage: <Cloud className="w-6 h-6" weight="thin" />,
    cryptocurrencies: <CurrencyBtc className="w-6 h-6" weight="thin" />,
    domain_names: <Globe className="w-6 h-6" weight="thin" />,
    email_accounts: <Envelope className="w-6 h-6" weight="thin" />,
    gaming_accounts: <GameController className="w-6 h-6" weight="thin" />,
    other_digital_assets: <Question className="w-6 h-6" weight="thin" />,
  };

  const getChartData = () => {
    const data = assets.reduce((acc, asset) => {
      const option = assetOptions.find(opt => opt.id === asset.categoryId);
      const label = option ? option.label : "Otros";
      const existing = acc.find(item => item.name === label);
      if (existing) {
        existing.value += 1;
      } else {
        acc.push({ name: label, value: 1 });
      }
      return acc;
    }, [] as { name: string; value: number }[]);
    const total = data.reduce((sum, item) => sum + item.value, 0);
    return data.map(item => ({ ...item, percentage: total ? (item.value / total) * 100 : 0 }));
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    if (percent < 0.05) return null;
    return (
      <text
        x={x}
        y={y}
        fill="#1d1d1f"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-[14px] font-normal"
      >
        {`${name} (${(percent * 100).toFixed(1)}%)`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
          <p className="text-[#1d1d1f] font-medium">{payload[0].name}</p>
          <p className="text-[#047aff] font-normal">{`${payload[0].payload.value} activo${payload[0].payload.value !== 1 ? 's' : ''}`}</p>
          <p className="text-[#047aff] font-normal">{payload[0].payload.percentage.toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

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
      setSaving(true);
    });
    let didNavigate = false;
    try {
      router.push("/summary?completed=digital-assets");
      didNavigate = true;
    } catch (error) {
      console.error("Error saving digital assets:", error);
    } finally {
      if (!didNavigate) {
        setSaving(false);
      }
    }
  };

  return (
    <>
      <AddAsset
        showModal={showModal}
        setShowModal={setShowModal}
        onAddAsset={handleAddAsset}
        assetOptions={assetOptions}
      />
      <DashboardLayout>
        <motion.div
          className="min-h-screen bg-[#f5f5f7]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-5 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-8 lg:gap-24">
              {/* Left column with main content */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md">
                      <span className="text-[#047aff] text-[14px] font-normal">ACTIVOS DIGITALES</span>
                    </div>
                    <Link href="#" className="inline-flex items-center h-[32px] text-[#047aff] hover:text-[#0456b0]">
                      <span className="w-5 h-5 inline-flex items-center justify-center rounded-full border border-[#047aff] text-sm">?</span>
                    </Link>
                  </div>
                  <h1 className="text-[32px] sm:text-[38px] font-medium tracking-[-1.5px] leading-[1d1d1f] sm:leading-[52px] mb-[15px]">
                    <span className="text-[#1d1d1f]">¿Tiene algún </span>
                    <span className="bg-gradient-to-r from-[#3d9bff] to-[#047aff] inline-block text-transparent bg-clip-text">
                      activo digital
                    </span>
                    <span className="text-[#1d1d1f]">?</span>
                  </h1>
                  <p className="text-[16px] text-[#1d1d1f] leading-6">
                    Los activos digitales incluyen cuentas en línea, redes sociales, criptomonedas y otros contenidos digitales que desee gestionar después de su fallecimiento.
                  </p>
                </div>

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
                    <span className="text-[#047aff] font-medium">Agregar Activo Digital</span>
                  </div>
                </div>

                {assets.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="p-6">
                      <h2 className="text-[22px] font-medium text-[#1d1d1f] mb-4">Activos Digitales</h2>
                      <div className="space-y-4">
                        {assets.map((asset) => {
                          const option = assetOptions.find(opt => opt.id === asset.categoryId);
                          const assetType = option?.key || 'other_digital_assets';
                          return (
                            <div key={asset.id} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                              <div className="flex items-start gap-4">
                                <div className="p-3 bg-[#047aff] bg-opacity-10 rounded-lg text-[#047aff]">
                                  {assetTypeIcons[assetType]}
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h3 className="text-[17px] font-medium text-[#1d1d1f]">{asset.name}</h3>
                                      <p className="text-[14px] text-gray-500">{option?.label || "Otros"}</p>
                                      {asset.metadata && (asset.metadata as any).accountName && (
                                        <p className="text-[14px] text-gray-500">{(asset.metadata as any).accountName}</p>
                                      )}
                                    </div>
                                    {asset.metadata && (asset.metadata as any).hasBackupCodes && (
                                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Códigos de respaldo disponibles
                                      </span>
                                    )}
                                  </div>
                                  {asset.metadata && (asset.metadata as any).instructions && (
                                    <p className="mt-2 text-[14px] text-[#1d1d1f]">
                                      {(asset.metadata as any).instructions}
                                    </p>
                                  )}
                                  {asset.metadata && (asset.metadata as any).backupLocation && (
                                    <p className="mt-1 text-[14px] text-gray-500">
                                      Ubicación de respaldo: {(asset.metadata as any).backupLocation}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
                <div className="pt-6 flex justify-end">
                  <PrimaryButton onClick={handleSave} disabled={saving}>
                    {saving ? <Spinner size={24} /> : "Guardar y continuar"}
                  </PrimaryButton>
                </div>
              </div>

              {/* Right column: Either a chart if assets exist or fallback info */}
              {assets.length > 0 ? (
                <div className="bg-white rounded-2xl shadow-md p-6 h-fit lg:sticky lg:top-6">
                  <h2 className="text-[22px] font-medium text-[#1d1d1f] mb-4">Distribución de Activos Digitales</h2>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getChartData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {getChartData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-8 space-y-4">
                    {getChartData().map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                          <span className="text-[16px] text-[#1d1d1f]">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-[16px] font-medium text-[#1d1d1f]">
                            {item.value} activo{item.value !== 1 ? 's' : ''}
                          </p>
                          <p className="text-[14px] text-gray-500">{item.percentage.toFixed(1)}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-md p-6 h-fit lg:sticky lg:top-6">
                  <h2 className="text-[20px] font-medium text-[#1d1d1f] mb-4">¿Qué son los activos digitales?</h2>
                  <div className="space-y-4">
                    <p className="text-[15px] text-[#1d1d1f] leading-6">
                      Los activos digitales son cualquier contenido o cuenta que existe en formato digital:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#047aff] flex items-center justify-center mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[15px] text-[#1d1d1f] leading-6">
                          Redes sociales y cuentas de correo electrónico
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#047aff] flex items-center justify-center mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[15px] text-[#1d1d1f] leading-6">
                          Criptomonedas y activos digitales financieros
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#047aff] flex items-center justify-center mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[15px] text-[#1d1d1f] leading-6">
                          Almacenamiento en la nube y documentos digitales
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#047aff] flex items-center justify-center mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[15px] text-[#1d1d1f] leading-6">
                          Suscripciones y servicios digitales
                        </span>
                      </li>
                    </ul>
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

export default DigitalAssetsPageClient;
