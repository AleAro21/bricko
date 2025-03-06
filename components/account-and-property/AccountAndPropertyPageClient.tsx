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
}

const AccountAndPropertyPageClient: FC<AccountAndPropertyPageClientProps> = ({
  user,
  assets: initialAssets,
  testament,
  assetOptions,
}) => {
  const router = useRouter();
  const [assets, setAssets] = useState<UserAsset[]>(initialAssets);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState(false);

  // This handler opens the pop-up modal (managed by your AddAsset component)
  const handleAddAsset = async (newAsset: UserAsset) => {
    try {
      // Call our server action to create the asset securely
      const createdAsset = await createUserAssetAction(user.id, newAsset);
      // Update local state to show the new asset
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
      {/* AddAsset modal pop-up. It is rendered conditionally based on showModal */}
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
              {/* Add Asset Button: This button opens the pop-up modal */}
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
              {/* Assets List */}
              {assets.length > 0 && (
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
                <PrimaryButton onClick={handleSave} disabled={isSaving}>
                  {isSaving ? <Spinner size={24} /> : "Guardar y continuar"}
                </PrimaryButton>
              </div>
            </div>
            {/* Assets Distribution Chart */}
            {assets.length > 0 && (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-[22px] font-medium text-[#1d1d1f] mb-4">Distribución de Activos</h2>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={120}
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
                <div className="mt-8 space-y-4">
                  {chartData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                        <span className="text-[16px] text-[#1d1d1f]">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-[16px] font-medium text-[#1d1d1f]">{formatCurrency(item.value)}</p>
                        <p className="text-[14px] text-gray-500">{item.percentage.toFixed(1)}%</p>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-[18px] font-medium text-[#1d1d1f]">Total</span>
                      <span className="text-[18px] font-medium text-[#1d1d1f]">
                        {formatCurrency(assets.reduce((sum, asset) => sum + asset.value, 0))}
                      </span>
                    </div>
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
