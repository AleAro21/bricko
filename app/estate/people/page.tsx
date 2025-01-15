"use client";
import { FC, useState } from 'react';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import Add, { HeirData } from "./Add";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const PeoplePage: FC = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [useEqualDistribution, setUseEqualDistribution] = useState<boolean>(false);
  const [heirs, setHeirs] = useState<HeirData[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddClick = (): void => {
    setShowModal(true);
  };

  const handleAddHeir = (heir: HeirData): void => {
    setHeirs([...heirs, heir]);
  };

  const handlePercentageChange = (id: string, newPercentage: number): void => {
    setHeirs(prevHeirs => 
      prevHeirs.map(heir => 
        heir.id === id 
          ? { ...heir, percentage: Math.min(100, Math.max(0, newPercentage)) }
          : heir
      )
    );
  };

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

  return (
    <>
      <Add setShowModal={setShowModal} showModal={showModal} onAddHeir={handleAddHeir} />
      <DashboardLayout>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-semibold text-gray-900">
                    ¿Quién le gustaría que heredara su patrimonio?
                  </h1>
                  <p className="mt-4 text-lg text-gray-600">
                    Puedes decidir cuánto recibe cada persona en el siguiente
                    paso. También podrás elegir copias de seguridad en caso de
                    que alguno de ellos muera antes que tú.
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Herederos legales por partes iguales
                      </h2>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        checked={useEqualDistribution}
                        onChange={(e) => setUseEqualDistribution(e.target.checked)}
                        className="h-6 w-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div
                  onClick={handleAddClick}
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
                    <span className="text-blue-600 font-medium">Agregar Heredero</span>
                  </div>
                </div>

                {heirs.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Lista de Herederos</h2>
                      <div className="space-y-4">
                        {heirs.map((heir) => (
                          <div
                            key={heir.id}
                            className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-gray-900">{heir.name}</h3>
                                <p className="text-sm text-gray-500">{heir.relationship}</p>
                                {heir.backupHeir && (
                                  <p className="text-sm text-gray-500 mt-1">
                                    Heredero de respaldo: {heir.backupHeir}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                {useEqualDistribution ? (
                                  <p className="font-medium text-gray-900">
                                    {(100 / heirs.length).toFixed(1)}%
                                  </p>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="number"
                                      value={heir.percentage}
                                      onChange={(e) => handlePercentageChange(heir.id, Number(e.target.value))}
                                      className="w-20 px-2 py-1 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      min="0"
                                      max="100"
                                      step="1"
                                    />
                                    <span className="text-gray-600">%</span>
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
                  <button
                    onClick={() => router.push("/estate/charities")}
                    className="inline-flex justify-center px-6 py-3 rounded-xl bg-blue-600 text-white text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!useEqualDistribution && totalPercentage !== 100}
                  >
                    Guardar y continuar
                  </button>
                </div>
              </div>

              {heirs.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Distribución de Herencia</h2>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getChartData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                          outerRadius={150}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {getChartData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  {!useEqualDistribution && (
                    <div className="mt-4 text-center">
                      <p className="text-lg font-medium text-gray-900">
                        Total asignado: {totalPercentage}%
                      </p>
                      {totalPercentage !== 100 && (
                        <p className="text-sm text-red-500 mt-1">
                          El total debe sumar 100%
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default PeoplePage;