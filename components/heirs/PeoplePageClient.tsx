'use client';

import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/common/DashboardLayout';
import Add, { HeirData } from '@/app/estate/people/Add';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import PrimaryButton from '@/components/reusables/PrimaryButton';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import { fetchAuthSession } from 'aws-amplify/auth';
import { AssignmentType } from '@/types';
import { createAssignmentAction } from '@/app/actions/assignmentActions';
import { flushSync } from 'react-dom';
import Spinner from '../reusables/Spinner';

export type AssetDistribution = { [heirId: string]: number };

interface PeoplePageClientProps {
  user: any; // Replace with your proper User type
  contacts: any[]; // Array of Contact
  assets: any[]; // Array of UserAsset
  testament: any; // Will object or null
  assetOptions: any[]; // Array of AssetOption
}

const PeoplePageClient: FC<PeoplePageClientProps> = ({
  user,
  contacts,
  assets,
  testament,
  assetOptions,
}) => {
  const router = useRouter();

  // Map contacts into heir data
  const [heirs, setHeirs] = useState<HeirData[]>(
    contacts.map((contact) => ({
      id: contact.id,
      name: contact.name,
      relationship: contact.relationToUser || 'Contacto',
      percentage: 0, // will be set later
      backupHeir: contact.backupHeir || '',
    }))
  );

  const [localAssets, setLocalAssets] = useState<any[]>(assets);
  const [localTestament, setLocalTestament] = useState<any>(testament);
  const [distribution, setDistribution] = useState<{ [assetId: string]: AssetDistribution }>({});
  const [selectedAssetId, setSelectedAssetId] = useState<string>('');
  const [savingAssignments, setSavingAssignments] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Initialize per-asset distribution when both assets and heirs are loaded.
  useEffect(() => {
    if (localAssets.length > 0 && heirs.length > 0) {
      setDistribution((prev) => {
        const newDist = { ...prev };
        localAssets.forEach((asset) => {
          if (!newDist[asset.id]) {
            const defaultValue = 100 / heirs.length;
            const assetDist: AssetDistribution = {};
            heirs.forEach((heir) => {
              assetDist[heir.id] = Number(defaultValue.toFixed(1));
            });
            newDist[asset.id] = assetDist;
          }
        });
        return newDist;
      });
      if (!selectedAssetId && localAssets.length > 0) {
        setSelectedAssetId(localAssets[0].id);
      }
    }
  }, [localAssets, heirs, selectedAssetId]);

  // Handler when a new heir is added via the modal.
  const handleAddHeir = (heir: HeirData): void => {
    setHeirs((prev) => [...prev, heir]);
    setDistribution((prev) => {
      const newDist = { ...prev };
      localAssets.forEach((asset) => {
        // Recalculate equal distribution with the new heir included.
        const defaultValue = 100 / (heirs.length + 1);
        // Adjust each existing heir
        Object.keys(newDist[asset.id] || {}).forEach((heirId) => {
          newDist[asset.id][heirId] = Number(defaultValue.toFixed(1));
        });
        // Add new heir
        newDist[asset.id][heir.id] = Number(defaultValue.toFixed(1));
      });
      return newDist;
    });
  };

  // Handler for updating distribution percentage for a given asset and heir.
  const handleAssetDistributionChange = (assetId: string, heirId: string, newValue: number) => {
    setDistribution((prev) => ({
      ...prev,
      [assetId]: {
        ...prev[assetId],
        [heirId]: newValue,
      },
    }));
  };

  // For chart visualization: distribution data for the selected asset.
  const getAssetChartData = () => {
    if (!selectedAssetId || !distribution[selectedAssetId]) return [];
    return heirs.map((heir) => ({
      name: heir.name,
      value: distribution[selectedAssetId][heir.id] || 0,
    }));
  };

  // Validate that each asset's distribution sums to 100%.
  const validateDistributions = (): boolean => {
    for (const assetId in distribution) {
      const total = Object.values(distribution[assetId]).reduce((sum, val) => sum + val, 0);
      if (Math.abs(total - 100) > 0.1) {
        return false;
      }
    }
    return true;
  };

  // Handler to save assignments (per asset-heir pair) using a server action.
  const handleSaveAssignments = async () => {
    if (!user?.id || !localTestament || localAssets.length === 0) return;
    if (!validateDistributions()) {
      alert("Cada activo debe tener un total de 100% asignado.");
      return;
    }
    flushSync(() => {
      setSavingAssignments(true);
    });
    let didNavigate = false;
    try {
      // For each asset and each heir's percentage, call the server action.
      const assignmentPromises: Promise<any>[] = [];
      localAssets.forEach((asset) => {
        const assetDist = distribution[asset.id];
        Object.entries(assetDist).forEach(([heirId, perc]) => {
          if (perc > 0) {
            const assignmentData = {
              assetId: asset.id,
              assignmentId: heirId, // using heir's id as the assignment target
              assignmentType: AssignmentType.C, // Use your enum (e.g., "C")
              notes: "",
              percentage: perc,
            };
            assignmentPromises.push(createAssignmentAction(localTestament.id, assignmentData));
          }
        });
      });
      const responses = await Promise.all(assignmentPromises);
      console.log("Assignments created:", responses);
      router.push("/summary");
      didNavigate = true;
    } catch (error) {
      console.error("Error creating assignments:", error);
    } finally {
      if (!didNavigate) {
        setSavingAssignments(false);
      }
    }
  };

  // Chart helper functions
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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

  return (
    <DashboardLayout>
      {/* Modal for adding a new heir/contact */}
      <Add showModal={showModal} setShowModal={setShowModal} onAddHeir={handleAddHeir} />
      <motion.div
        className="min-h-screen bg-[#f5f5f7]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-5 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
            {/* Left Column: Asset distribution inputs */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md">
                    <span className="text-[#047aff] text-[14px] font-medium">
                      DISTRIBUCIÓN POR ACTIVO
                    </span>
                  </div>
                  <Link href="#" className="inline-flex items-center h-[32px] text-[#047aff] hover:text-[#0456b0]">
                    <span className="w-5 h-5 inline-flex items-center justify-center rounded-full border border-[#047aff] text-sm">
                      ?
                    </span>
                  </Link>
                </div>
                <h1 className="text-[32px] sm:text-[38px] font-medium tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                  Asigna el % de cada activo a cada{" "}
                  <span
                    style={{ backgroundImage: "linear-gradient(to left, #047aff 30%, #0d4ba3 100%)" }}
                    className="inline-block text-transparent bg-clip-text"
                  >
                    heredero
                  </span>
                </h1>

                <p className="text-[16px] text-[#1d1d1f] leading-6">
                  Para cada activo, ajusta los porcentajes asignados a cada heredero. La suma de cada activo debe ser 100%.
                </p>
              </div>
              {localAssets.map((asset) => {
                const assetDist = distribution[asset.id] || {};
                const total = Object.values(assetDist).reduce((sum, val) => sum + val, 0);
                return (
                  <div key={asset.id} className="bg-white rounded-2xl shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">{asset.name}</h2>
                    {heirs.map((heir) => (
                      <div key={heir.id} className="flex justify-between items-center mb-3">
                        <div className="w-1/2 text-[16px] text-[#1d1d1f]">{heir.name}</div>
                        <div className="flex items-center">
                          <input
                            type="number"
                            value={assetDist[heir.id] ?? 0}
                            onChange={(e) =>
                              handleAssetDistributionChange(
                                asset.id,
                                heir.id,
                                Number(e.target.value)
                              )
                            }
                            className="w-20 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all text-[16px]"
                            min="0"
                            max="100"
                            step="1"
                          />
                          <span className="ml-1">%</span>
                        </div>
                      </div>
                    ))}
                    <div className="mt-2 text-right font-medium">
                      Total: {total.toFixed(1)}%
                    </div>
                    {Math.abs(total - 100) > 0.1 && (
                      <p className="text-[14px] text-[#D00E01] text-right mt-1">
                        El total debe sumar 100%
                      </p>
                    )}
                  </div>
                );
              })}
              <div className="pt-6 flex justify-end">
                <PrimaryButton
                  onClick={handleSaveAssignments}
                  disabled={savingAssignments || !validateDistributions()}
                >
                  {savingAssignments ? <Spinner size={24} /> : "Guardar y continuar"}
                </PrimaryButton>
              </div>
            </div>
            {/* Right Column: Distribution Chart */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-[22px] font-medium text-[#1d1d1f] mb-4">Visualización del Activo</h2>
                {localAssets.length > 0 && (
                  <select
                    value={selectedAssetId}
                    onChange={(e) => setSelectedAssetId(e.target.value)}
                    className="mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-[#047aff]"
                  >
                    {localAssets.map((asset) => (
                      <option key={asset.id} value={asset.id}>
                        {asset.name}
                      </option>
                    ))}
                  </select>
                )}
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getAssetChartData()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {getAssetChartData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        content={({ active, payload }: any) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
                                <p className="text-[#1d1d1f] font-medium">{payload[0].name}</p>
                                <p className="text-[#047aff] font-normal">{payload[0].value.toFixed(1)}%</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default PeoplePageClient;
