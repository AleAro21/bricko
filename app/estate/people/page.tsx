"use client";
import { FC, useState, useEffect } from 'react';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import Add, { HeirData } from "./Add"; // Assume Add is your modal for adding a new heir
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import PrimaryButton from "@/components/reusables/PrimaryButton";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { apiService } from '@/app/apiService';
import { fetchAuthSession } from "aws-amplify/auth";

const COLORS = ['#047aff', '#3d9bff', '#66b2ff', '#8fc7ff', '#b8dcff', '#e0f0ff'];

const PeoplePage: FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [useEqualDistribution, setUseEqualDistribution] = useState<boolean>(false);
  const [heirs, setHeirs] = useState<HeirData[]>([]);
  const [loadingContacts, setLoadingContacts] = useState<boolean>(false);

  // When the component mounts (or when the user changes),
  // load all contacts that the user has added so far.
  useEffect(() => {
    const loadContacts = async () => {
      if (!user?.id) return;
      setLoadingContacts(true);
      try {
        const { tokens } = await fetchAuthSession();
        if (!tokens?.accessToken) {
          throw new Error("No authentication token available");
        }
        apiService.setToken(tokens.accessToken.toString());
        const contacts = await apiService.getContacts(user.id);
        // Map each Contact into a HeirData object.
        const mappedHeirs: HeirData[] = contacts.map((contact: any) => ({
          id: contact.id,
          name: contact.name,
          relationship: contact.relationToUser || "Contacto",
          percentage: 0, // default percentage (the user can adjust later)
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

  const handleAddClick = (): void => {
    setShowModal(true);
  };

  // When a new heir is added via the modal, add it to the heirs state.
  const handleAddHeir = (heir: HeirData): void => {
    setHeirs(prevHeirs => [...prevHeirs, heir]);
  };

  // When a percentage input is changed, update that heir’s percentage.
  const handlePercentageChange = (id: string, newPercentage: number): void => {
    setHeirs(prevHeirs =>
      prevHeirs.map(heir =>
        heir.id === id
          ? { ...heir, percentage: Math.min(100, Math.max(0, newPercentage)) }
          : heir
      )
    );
  };

  // Prepare chart data: if equal distribution is selected, all heirs get the same share;
  // otherwise, use each heir’s individual percentage.
  const getChartData = () => {
    if (useEqualDistribution && heirs.length > 0) {
      const equalShare = 100 / heirs.length;
      return heirs.map(heir => ({
        name: heir.name,
        value: equalShare
      }));
    }
    return heirs.map(heir => ({
      name: heir.name,
      value: heir.percentage
    }));
  };

  const totalPercentage = heirs.reduce((sum, heir) => sum + heir.percentage, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
          <p className="text-[#1d1d1f] font-[500]">{payload[0].name}</p>
          <p className="text-[#047aff] font-[400]">{payload[0].value.toFixed(1)}%</p>
        </div>
      );
    }
    return null;
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
              {/* Left Column: Explanation, checkbox for equal distribution, add button, and list of heirs */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md">
                      <span className="text-[#047aff] text-[14px] font-[400]">HEREDEROS</span>
                    </div>
                    <Link href="#" className="inline-flex items-center h-[32px] text-[#047aff] hover:text-[#0456b0]">
                      <span className="w-5 h-5 inline-flex items-center justify-center rounded-full border border-[#047aff] text-sm">?</span>
                    </Link>
                  </div>
                  <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                    <span className="text-[#1d1d1f]">¿Quién le gustaría que </span>
                    <span className="bg-gradient-to-r from-[#3d9bff] to-[#047aff] inline-block text-transparent bg-clip-text">
                      heredara su patrimonio?
                    </span>
                  </h1>
                  <p className="text-[16px] text-[#1d1d1f] leading-6">
                    Puedes decidir cuánto recibe cada persona en el siguiente paso. También podrás elegir copias de seguridad en caso de que alguno de ellos muera antes que tú.
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-[22px] font-[500] text-[#1d1d1f]">
                        Herederos legales por partes iguales
                      </h2>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        checked={useEqualDistribution}
                        onChange={(e) => setUseEqualDistribution(e.target.checked)}
                        className="h-6 w-6 rounded border-gray-300 text-[#047aff] focus:ring-[#047aff]"
                      />
                    </div>
                  </div>
                </div>

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
                    <span className="text-[#047aff] font-[500]">Agregar Heredero</span>
                  </div>
                </div>

                {heirs.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="p-6">
                      <h2 className="text-[22px] font-[500] text-[#1d1d1f] mb-4">Lista de Herederos</h2>
                      <div className="space-y-4">
                        {heirs.map((heir) => (
                          <div key={heir.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-[17px] font-[500] text-[#1d1d1f]">{heir.name}</h3>
                                <p className="text-[14px] text-gray-500">{heir.relationship}</p>
                                {heir.backupHeir && (
                                  <p className="text-[14px] text-gray-500 mt-1">
                                    Heredero de respaldo: {heir.backupHeir}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                {useEqualDistribution ? (
                                  <p className="text-[17px] font-[500] text-[#1d1d1f]">
                                    {(100 / heirs.length).toFixed(1)}%
                                  </p>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="number"
                                      value={heir.percentage}
                                      onChange={(e) => handlePercentageChange(heir.id, Number(e.target.value))}
                                      className="w-20 px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all text-[16px]"
                                      min="0"
                                      max="100"
                                      step="1"
                                    />
                                    <span className="text-[#1d1d1f]">%</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-6 flex justify-end">
                  <PrimaryButton
                    onClick={() => router.push("/estate/charities")}
                    disabled={!useEqualDistribution && totalPercentage !== 100}
                  >
                    Guardar y continuar
                  </PrimaryButton>
                </div>
              </div>

              {/* Right Column: Chart showing the distribution */}
              {heirs.length > 0 && (
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h2 className="text-[22px] font-[500] text-[#1d1d1f] mb-4">Distribución de Herencia</h2>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getChartData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
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
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="text-[16px] text-[#1d1d1f]">{item.name}</span>
                        </div>
                        <p className="text-[16px] font-[500] text-[#1d1d1f]">{item.value.toFixed(1)}%</p>
                      </div>
                    ))}
                    {!useEqualDistribution && (
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <span className="text-[18px] font-[500] text-[#1d1d1f]">Total</span>
                          <span className="text-[18px] font-[500] text-[#1d1d1f]">
                            {totalPercentage.toFixed(1)}%
                          </span>
                        </div>
                        {totalPercentage !== 100 && (
                          <p className="text-[14px] text-[#D00E01] text-right mt-1">
                            El total debe sumar 100%
                          </p>
                        )}
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

export default PeoplePage;
