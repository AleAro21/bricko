"use client";
import { FC, useState } from 'react';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import Add, { PropertyData } from "./Add";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

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
      const existingType = acc.find(item => item.name === property.type);
      if (existingType) {
        existingType.value += property.value;
      } else {
        acc.push({
          name: property.type,
          value: property.value
        });
      }
      return acc;
    }, [] as { name: string; value: number }[]);

    return data;
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(value);
  };

  return (
    <>
      <Add setShowModal={setShowModal} showModal={showModal} onAddProperty={handleAddProperty} />
      <DashboardLayout>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-semibold text-gray-900">
                    Enumere sus cuentas y propiedades
                  </h1>
                  <p className="mt-4 text-lg text-gray-600">
                    Esto incluye cuentas bancarias, pensiones, pólizas de
                    seguros de propiedad y de vida. Ayuda a tus albaceas, las
                    personas que se ocuparán de su patrimonio después de su
                    muerte, a saber con qué proveedores comunicarse.
                  </p>
                  <p className="mt-4 text-lg text-gray-600">
                    No solicitaremos detalles específicos como números de
                    cuenta.
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
                        onChange={(e) => router.push('/estate/charities')}
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
                    <span className="text-blue-600 font-medium">Agregar cuenta o propiedad</span>
                  </div>
                </div>

                {properties.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Propiedades y Cuentas</h2>
                      <div className="space-y-4">
                        {properties.map((property) => (
                          <div
                            key={property.id}
                            className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-gray-900">{property.name}</h3>
                                <p className="text-sm text-gray-500">{property.type}</p>
                                {property.location && (
                                  <p className="text-sm text-gray-500">{property.location}</p>
                                )}
                                {property.description && (
                                  <p className="text-sm text-gray-500 mt-1">{property.description}</p>
                                )}
                              </div>
                              <p className="font-medium text-gray-900">
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
                  <button
                    onClick={() => router.push("/summary?completed=account-and-property")}
                    className="inline-flex justify-center px-6 py-3 rounded-xl bg-blue-600 text-white text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Guardar y continuar
                  </button>
                </div>
              </div>

              {properties.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Distribución de Activos</h2>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getChartData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
                          outerRadius={150}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {getChartData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: number) => formatCurrency(value)}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-lg font-medium text-gray-900">
                      Total: {formatCurrency(properties.reduce((sum, prop) => sum + prop.value, 0))}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default AccountAndPropertyPage;