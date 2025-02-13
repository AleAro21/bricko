"use client";
import { FC, useState, useEffect } from 'react';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import Add, { HeirData } from "./Add"; // Modal for adding a new heir/contact
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import PrimaryButton from "@/components/reusables/PrimaryButton";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { apiService } from '@/app/apiService';
import { fetchAuthSession } from "aws-amplify/auth";
// Import the enum for assignment types
import { AssignmentType } from "@/types";

const COLORS = ['#047aff', '#3d9bff', '#66b2ff', '#8fc7ff', '#b8dcff', '#e0f0ff'];

type AssetDistribution = { [heirId: string]: number };

const PeoplePage: FC = () => {
  const router = useRouter();
  const { user } = useUser();

  // State for managing heirs (contacts)
  const [showModal, setShowModal] = useState<boolean>(false);
  const [heirs, setHeirs] = useState<HeirData[]>([]);
  const [loadingContacts, setLoadingContacts] = useState<boolean>(false);

  // New states: assets, testament (will) and per‑asset distributions.
  const [assets, setAssets] = useState<any[]>([]);
  const [testament, setTestament] = useState<any>(null);
  // distribution: key is asset.id and value is an object mapping heir.id -> percentage.
  const [distribution, setDistribution] = useState<{ [assetId: string]: AssetDistribution }>({});
  // For chart visualization, allow the user to pick which asset’s distribution to view.
  const [selectedAssetId, setSelectedAssetId] = useState<string>("");
  const [savingAssignments, setSavingAssignments] = useState<boolean>(false);

  // Load heirs (contacts)
  useEffect(() => {
    const loadContacts = async () => {
      if (!user?.id) return;
      setLoadingContacts(true);
      try {
        const { tokens } = await fetchAuthSession();
        if (!tokens?.accessToken) throw new Error("No authentication token available");
        apiService.setToken(tokens.accessToken.toString());
        const contacts = await apiService.getContacts(user.id);
        // Map contacts into HeirData objects.
        const mappedHeirs: HeirData[] = contacts.map((contact: any) => ({
          id: contact.id,
          name: contact.name,
          relationship: contact.relationToUser || "Contacto",
          percentage: 0, // Not used in per‑asset distribution
          backupHeir: contact.backupHeir || ""
        }));
        setHeirs(mappedHeirs);
      } catch (error) {
        console.error("Error loading contacts:", error);
      } finally {
        setLoadingContacts(false);
      }
    };
    loadContacts();
  }, [user]);

  // Load assets
  useEffect(() => {
    const loadAssets = async () => {
      if (!user?.id) return;
      try {
        const { tokens } = await fetchAuthSession();
        if (!tokens?.accessToken) throw new Error("No authentication token available");
        apiService.setToken(tokens.accessToken.toString());
        const fetchedAssets = await apiService.getUserAssets(user.id);
        setAssets(fetchedAssets);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };
    loadAssets();
  }, [user]);

  // Load (or create) the testament (will)
  useEffect(() => {
    const loadTestament = async () => {
      if (!user?.id) return;
      try {
        const { tokens } = await fetchAuthSession();
        if (!tokens?.accessToken) throw new Error("No authentication token available");
        apiService.setToken(tokens.accessToken.toString());
        const willsResponse = await apiService.getAllWills(user.id);
        const willsArray = Array.isArray(willsResponse) ? willsResponse : [];
        if (willsArray.length > 0) {
          setTestament(willsArray[0]);
          console.log("Testament already exists:", willsArray[0]);
        } else {
          // Create a new will if none exists.
          const newWillData = { legalAdvisor: "", notes: "", terms: "" };
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

  // When both assets and heirs are loaded, initialize per‑asset distributions.
  useEffect(() => {
    if (assets.length > 0 && heirs.length > 0) {
      setDistribution(prev => {
        const newDist = { ...prev };
        assets.forEach((asset) => {
          if (!newDist[asset.id]) {
            // Default equal distribution for this asset.
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
      // Set the selected asset for the chart if not already set.
      if (!selectedAssetId && assets.length > 0) {
        setSelectedAssetId(assets[0].id);
      }
    }
  }, [assets, heirs, selectedAssetId]);

  // Handler for when a new heir is added via the modal.
  const handleAddHeir = (heir: HeirData): void => {
    setHeirs(prev => [...prev, heir]);
    // When adding a new heir, update distributions for all assets with a default value.
    setDistribution(prev => {
      const newDist = { ...prev };
      assets.forEach((asset) => {
        // Recalculate equal distribution with the new number of heirs.
        const defaultValue = 100 / (heirs.length + 1);
        // Adjust existing heirs
        Object.keys(newDist[asset.id] || {}).forEach((heirId) => {
          newDist[asset.id][heirId] = Number(defaultValue.toFixed(1));
        });
        // Add the new heir
        newDist[asset.id][heir.id] = Number(defaultValue.toFixed(1));
      });
      return newDist;
    });
  };

  // Handler for updating the distribution percentage for a given asset and heir.
  const handleAssetDistributionChange = (assetId: string, heirId: string, newValue: number) => {
    setDistribution(prev => ({
      ...prev,
      [assetId]: {
        ...prev[assetId],
        [heirId]: newValue
      }
    }));
  };

  // For the chart, compute the distribution data for the selected asset.
  const getAssetChartData = () => {
    if (!selectedAssetId || !distribution[selectedAssetId]) return [];
    return heirs.map((heir) => ({
      name: heir.name,
      value: distribution[selectedAssetId][heir.id] || 0
    }));
  };

  // Validate that for each asset the distribution sums to 100.
  const validateDistributions = (): boolean => {
    for (const assetId in distribution) {
      const total = Object.values(distribution[assetId]).reduce((sum, val) => sum + val, 0);
      if (Math.abs(total - 100) > 0.1) {
        return false;
      }
    }
    return true;
  };

  // Handler to create assignments for each asset–heir pair.
  const handleSaveAssignments = async () => {
    if (!user?.id || !testament || assets.length === 0) return;
    if (!validateDistributions()) {
      alert("Cada activo debe tener un total de 100% asignado.");
      return;
    }
    setSavingAssignments(true);
    try {
      const { tokens } = await fetchAuthSession();
      if (!tokens?.accessToken) throw new Error("No authentication token available");
      apiService.setToken(tokens.accessToken.toString());

      const assignmentPromises: Promise<any>[] = [];
      // Loop over each asset and each heir for that asset.
      assets.forEach((asset) => {
        const assetDist = distribution[asset.id];
        Object.entries(assetDist).forEach(([heirId, perc]) => {
          if (perc > 0) {
            const assignmentData = {
              assetId: asset.id,
              assignmentId: heirId, // Using the heir's id as the assignment target
              assignmentType: AssignmentType.C, // Use the enum value instead of a string literal
              notes: "",
              percentage: perc
            };
            assignmentPromises.push(apiService.createAssignment(testament.id, assignmentData));
          }
        });
      });

      const responses = await Promise.all(assignmentPromises);
      console.log("Assignments created:", responses);
      router.push("/estate/charities");
    } catch (error) {
      console.error("Error creating assignments:", error);
    } finally {
      setSavingAssignments(false);
    }
  };

  return (
    <>
      {/* Modal for adding a new heir/contact */}
      <Add setShowModal={setShowModal} showModal={showModal} onAddHeir={handleAddHeir} />

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
              {/* Left Column: List each asset with per‑asset distribution inputs */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md">
                      <span className="text-[#047aff] text-[14px] font-medium">DISTRIBUCIÓN POR ACTIVO</span>
                    </div>
                    <Link href="#" className="inline-flex items-center h-[32px] text-[#047aff] hover:text-[#0456b0]">
                      <span className="w-5 h-5 inline-flex items-center justify-center rounded-full border border-[#047aff] text-sm">?</span>
                    </Link>
                  </div>
                  <h1 className="text-[32px] sm:text-[38px] font-medium tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                    Asigna el % de cada activo a cada heredero
                  </h1>
                  <p className="text-[16px] text-[#1d1d1f] leading-6">
                    Para cada activo, ajusta los porcentajes asignados a cada heredero. La suma de cada activo debe ser 100%.
                  </p>
                </div>

                {assets.map((asset) => {
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
                              onChange={(e) => handleAssetDistributionChange(asset.id, heir.id, Number(e.target.value))}
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
                    {savingAssignments ? "Guardando..." : "Guardar y continuar"}
                  </PrimaryButton>
                </div>
              </div>

              {/* Right Column: Chart for a selected asset's distribution */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h2 className="text-[22px] font-medium text-[#1d1d1f] mb-4">Visualización del Activo</h2>
                  {assets.length > 0 && (
                    <select
                      value={selectedAssetId}
                      onChange={(e) => setSelectedAssetId(e.target.value)}
                      className="mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-[#047aff]"
                    >
                      {assets.map((asset) => (
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
                          outerRadius={120}
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
    </>
  );
};

export default PeoplePage;
