"use client";
import { FC, useState } from 'react';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import Add, { PropertyData } from "./Add";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import PrimaryButton from "@/components/reusables/PrimaryButton";

// Updated colors to be variations of blue
const COLORS = ['#047aff', '#3d9bff', '#66b2ff', '#8fc7ff', '#b8dcff', '#e0f0ff', '#f0f7ff'];

// Spanish translations for asset types
const assetTypeTranslations: { [key: string]: string } = {
  'real-estate': 'Bienes Raíces',
  'vehicle': 'Vehículos',
  'savings': 'Cuenta de Ahorro',
  'investment': 'Cuenta de Inversión',
  'retirement': 'Cuenta de Retiro',
  'insurance': 'Póliza de Seguro',
  'other': 'Otros Activos'
};

const AccountAndPropertyPage: FC = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [properties, setProperties] = useState<PropertyData[]>([]);

  const handleAddClick = (): void => {
    setShowModal(true);
  };

  const handleAddProperty = (property: PropertyData): void => {
    setProperties([...properties, property]);
  };

  const getChartData = () => {
    const data = properties.reduce((acc, property) => {
      const translatedType = assetTypeTranslations[property.type] || property.type;
      const existingType = acc.find(item => item.name === translatedType);
      if (existingType) {
        existingType.value += property.value;
      } else {
        acc.push({
          name: translatedType,
          value: property.value
        });
      }
      return acc;
    }, [] as { name: string; value: number }[]);

    const total = data.reduce((sum, item) => sum + item.value, 0);
    return data.map(item => ({
      ...item,
      percentage: (item.value / total) * 100
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
          <p className="text-[#1d1d1f] font-[500]">{payload[0].name}</p>
          <p className="text-[#047aff] font-[400]">{payload[0].payload.percentage.toFixed(1)}%</p>
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

    if (percent < 0.05) return null; // Don't show labels for small segments

    return (
      <text
        x={x}
        y={y}
        fill="#1d1d1f"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-[14px] font-[400]"
      >
        {`${name} (${(percent * 100).toFixed(1)}%)`}
      </text>
    );
  };

  return (
    <>
      <Add setShowModal={setShowModal} showModal={showModal} onAddProperty={handleAddProperty} />
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
                  <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5">
                    <span className="text-[#047aff] text-[14px] font-[400]">CUENTAS Y PROPIEDADES</span>
                  </div>

                  <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                    <span className="text-[#1d1d1f]">Enumere sus </span>
                    <span className="bg-gradient-to-r from-[#3d9bff] to-[#047aff] inline-block text-transparent bg-clip-text">
                      cuentas y propiedades
                    </span>
                  </h1>
                  <p className="text-[16px] text-[#1d1d1f] leading-6 mb-4">
                    Esto incluye cuentas bancarias, pensiones, pólizas de seguros de propiedad y de vida. 
                    Ayuda a tus albaceas, las personas que se ocuparán de su patrimonio después de su muerte, 
                    a saber con qué proveedores comunicarse.
                  </p>
                  <p className="text-[16px] text-[#1d1d1f] leading-6">
                    No solicitaremos detalles específicos como números de cuenta.
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
                        onChange={(e) => router.push('/estate/charities')}
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
                    <span className="text-[#047aff] font-[500]">Agregar cuenta o propiedad</span>
                  </div>
                </div>

                {properties.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="p-6">
                      <h2 className="text-[22px] font-[500] text-[#1d1d1f] mb-4">Propiedades y Cuentas</h2>
                      <div className="space-y-4">
                        {properties.map((property) => (
                          <div
                            key={property.id}
                            className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-[17px] font-[500] text-[#1d1d1f]">{property.name}</h3>
                                <p className="text-[14px] text-gray-500">{assetTypeTranslations[property.type]}</p>
                                {property.location && (
                                  <p className="text-[14px] text-gray-500">{property.location}</p>
                                )}
                                {property.description && (
                                  <p className="text-[14px] text-gray-500 mt-1">{property.description}</p>
                                )}
                              </div>
                              <p className="text-[17px] font-[500] text-[#1d1d1f]">
                                {formatCurrency(property.value)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-6 flex justify-end">
                  <PrimaryButton
                    onClick={() => router.push("/summary?completed=account-and-property")}
                  >
                    Guardar y continuar
                  </PrimaryButton>
                </div>
              </div>

              {properties.length > 0 && (
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h2 className="text-[22px] font-[500] text-[#1d1d1f] mb-4">Distribución de Activos</h2>
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
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="text-[16px] text-[#1d1d1f]">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-[16px] font-[500] text-[#1d1d1f]">{formatCurrency(item.value)}</p>
                          <p className="text-[14px] text-gray-500">{item.percentage.toFixed(1)}%</p>
                        </div>
                      </div>
                    ))}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-[18px] font-[500] text-[#1d1d1f]">Total</span>
                        <span className="text-[18px] font-[500] text-[#1d1d1f]">
                          {formatCurrency(properties.reduce((sum, prop) => sum + prop.value, 0))}
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