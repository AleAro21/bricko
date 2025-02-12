"use client";
import { FC, useState, useEffect } from 'react';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import AddAsset from "./AddAsset";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import PrimaryButton from "@/components/reusables/PrimaryButton";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { apiService } from '@/app/apiService';
import { fetchAuthSession } from "aws-amplify/auth";
import { UserAsset, Will, CreateWillRequest } from '@/types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

// A mapping from your asset type key to the UUID and default description.
const assetCategoryMapping: { [key: string]: { id: string, defaultDescription: string } } = {
  digital_account: { id: "a19dfcc7-e4c3-11ef-8562-0a4c8cf7c281", defaultDescription: "Digital accounts (e.g., PayPal, Stripe, neobanks)" },
  crypto: { id: "a19e0657-e4c3-11ef-8562-0a4c8cf7c281", defaultDescription: "Cryptocurrencies (Bitcoin, Ethereum, etc.)" },
  nft: { id: "a19e0978-e4c3-11ef-8562-0a4c8cf7c281", defaultDescription: "Non-fungible tokens (NFTs)" },
  // ... (other categories)
  other: { id: "a19e237c-e4c3-11ef-8562-0a4c8cf7c281", defaultDescription: "Other assets not categorized above" },
};

// Create a list of options for the dropdown.
const assetOptionsList = Object.keys(assetCategoryMapping).map((key) => ({
  id: assetCategoryMapping[key].id,
  key: key,
  value: key,
  label: key.replace(/_/g, ' '),
  categoryId: assetCategoryMapping[key].id,
  description: assetCategoryMapping[key].defaultDescription,
}));

const AccountAndPropertyPage: FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [assets, setAssets] = useState<UserAsset[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // New state to hold the user's testament (will)
  const [testament, setTestament] = useState<Will | null>(null);

  // Load user assets
  useEffect(() => {
    const loadAssets = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        const { tokens } = await fetchAuthSession();
        if (!tokens?.accessToken) {
          throw new Error("No authentication token available");
        }
        apiService.setToken(tokens.accessToken.toString());
        const fetchedAssets = await apiService.getUserAssets(user.id);
        setAssets(fetchedAssets);
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setLoading(false);
      }
    };
    loadAssets();
  }, [user]);

  useEffect(() => {
    const loadTestament = async () => {
      if (!user?.id) return;
      try {
        const { tokens } = await fetchAuthSession();
        if (!tokens?.accessToken) {
          throw new Error("No authentication token available");
        }
        apiService.setToken(tokens.accessToken.toString());
  
        const willsResponse = await apiService.getAllWills(user.id);
        const willsArray = Array.isArray(willsResponse) ? willsResponse : [];
  
        if (willsArray.length > 0) {
          setTestament(willsArray[0]);
          console.log("Testament already exists:", willsArray[0]);
        } else {
          // No wills found, so create a new one directly.
          const newWillData: CreateWillRequest = {
            legalAdvisor: "",
            notes: "",
            terms: ""
          };
          const newWill = await apiService.createWill(user.id, newWillData);
          setTestament(newWill);
          console.log("Created new testament:", newWill);
        }
      } catch (error: any) {
        console.error("Error loading or creating testament:", error);
      }
    };
  
    loadTestament();
  }, [user]);
  
  


  const getChartData = () => {
    const data = assets.reduce((acc, asset) => {
      // Use the asset’s categoryId to get the label from our mapping.
      const mappingEntry = Object.values(assetCategoryMapping).find(entry => entry.id === asset.categoryId);
      const label = mappingEntry ? mappingEntry.defaultDescription.split('(')[0].trim() : "Other";
      const existing = acc.find(item => item.name === label);
      if (existing) {
        existing.value += asset.value;
      } else {
        acc.push({ name: label, value: asset.value });
      }
      return acc;
    }, [] as { name: string; value: number }[]);
    const total = data.reduce((sum, item) => sum + item.value, 0);
    return data.map(item => ({
      ...item,
      percentage: total ? (item.value / total) * 100 : 0
    }));
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
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

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
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

  const handleAddAsset = async (newAsset: UserAsset) => {
    if (!user?.id) return;
    try {
      const { tokens } = await fetchAuthSession();
      if (!tokens?.accessToken) {
        throw new Error("No authentication token available");
      }
      apiService.setToken(tokens.accessToken.toString());
      const createdAsset = await apiService.createUserAsset(user.id, newAsset);
      setAssets(prev => [...prev, createdAsset]);
    } catch (error) {
      console.error("Error creating asset:", error);
    }
  };

  return (
    <>
      <AddAsset
        showModal={showModal}
        setShowModal={setShowModal}
        onAddAsset={handleAddAsset}
        assetOptions={assetOptionsList}
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md">
                      <span className="text-[#047aff] text-[14px] font-normal">CUENTAS Y PROPIEDADES</span>
                    </div>
                    <Link href="#" className="inline-flex items-center h-[32px] text-[#047aff] hover:text-[#0456b0]">
                      <span className="w-5 h-5 inline-flex items-center justify-center rounded-full border border-[#047aff] text-sm">?</span>
                    </Link>
                  </div>

                  <h1 className="text-[32px] sm:text-[38px] font-medium tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                    <span className="text-[#1d1d1f]">Enumere sus </span>
                    <span className="bg-gradient-to-r from-[#3d9bff] to-[#047aff] inline-block text-transparent bg-clip-text">
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

                <div
                  onClick={() => setShowModal(true)}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden"
                >
                  <div className="flex items-center justify-center gap-2 py-8">
                    <div className="w-8 h-8 rounded-full bg-[#047aff] flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        width="16"
                        height="16"
                        className="fill-white"
                      >
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                      </svg>
                    </div>
                    <span className="text-[#047aff] font-medium">Agregar cuenta o propiedad</span>
                  </div>
                </div>

                {assets.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="p-6">
                      <h2 className="text-[22px] font-medium text-[#1d1d1f] mb-4">Cuentas y Propiedades</h2>
                      <div className="space-y-4">
                        {assets.map(asset => (
                          <div key={asset.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-[17px] font-medium text-[#1d1d1f]">{asset.name}</h3>
                                <p className="text-[14px] text-gray-500">
                                  {Object.keys(assetCategoryMapping).find(key => assetCategoryMapping[key].id === asset.categoryId)?.replace(/_/g, ' ') || "Other"}
                                </p>
                                {asset.metadata && (asset.metadata as any).location && (
                                  <p className="text-[14px] text-gray-500">
                                    {(asset.metadata as any).location}
                                  </p>
                                )}
                                {asset.metadata && (asset.metadata as any).description && (
                                  <p className="text-[14px] text-gray-500 mt-1">
                                    {(asset.metadata as any).description}
                                  </p>
                                )}
                              </div>
                              <p className="text-[17px] font-medium text-[#1d1d1f]">
                                {formatCurrency(asset.value)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-6 flex justify-end">
                  <PrimaryButton onClick={() => router.push("/summary?completed=account-and-property")}>
                    Guardar y continuar
                  </PrimaryButton>
                </div>
              </div>

              {assets.length > 0 && (
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h2 className="text-[22px] font-medium text-[#1d1d1f] mb-4">Distribución de Activos</h2>
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
    </>
  );
};

export default AccountAndPropertyPage;
