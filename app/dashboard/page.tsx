'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/common/DashboardLayout';
import { motion } from 'framer-motion';
import { House, Car, Buildings, Coins, TrendUp, Eye, MapPin, Calendar, Question } from 'phosphor-react';
import PrimaryButton from '@/components/reusables/PrimaryButton';
import Modal from '@/components/common/Modal';
import Navbar from '@/components/common/Navbar';

interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  images: string[];
  totalValue: number;
  tokenPrice: number;
  totalTokens: number;
  availableTokens: number;
  expectedReturn: number;
  type: 'house' | 'apartment' | 'office' | 'hotel';
  featured: boolean;
  investmentGrade: 'A' | 'B' | 'C';
  lastUpdated: string;
}

const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Casa Residencial Polanco',
    description: 'Elegante casa de 3 recámaras en la exclusiva zona de Polanco, Ciudad de México.',
    location: 'Polanco, CDMX',
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    totalValue: 8500000,
    tokenPrice: 8500,
    totalTokens: 1000,
    availableTokens: 650,
    expectedReturn: 12.5,
    type: 'house',
    featured: true,
    investmentGrade: 'A',
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    title: 'Hacienda Real San Miguel Ometusco',
    description: 'En el hermoso valle de Apan conocido por su tradición pulquera en el Estado de México, se encuentra ubicada la majestuosa Hacienda Real San Miguel Ometusco. Una construcción colonial del siglo XVIII, santuario de la civilización Tolteca.',
    location: 'Ometusco, Estado de México',
    images: [
      '/hotel_1.png',
      '/hotel_2.png',
      '/hotel_3.png',
      '/hotel_4.png',
      '/hotel_5.png'
    ],
    totalValue: 45000000,
    tokenPrice: 45000,
    totalTokens: 1000,
    availableTokens: 850,
    expectedReturn: 14.5,
    type: 'hotel',
    featured: true,
    investmentGrade: 'A',
    lastUpdated: '2024-01-20'
  },
  {
    id: '3',
    title: 'Departamentos Matías Romero 315',
    description: 'Matías Romero cuenta con 7 departamentos de estilo minimalista, el diseño de sus espacios está creado para su máximo aprovechamiento. Cada departamento cuenta con dos habitaciones, terrazas y amplios ventanales.',
    location: 'Matías Romero 315, CDMX',
    images: [
      '/apartment_1.png',
      '/apartment_2.png',
      '/apartment_3.png',
      '/apartment_4.png',
      '/apartment_5.png'
    ],
    totalValue: 7500000,
    tokenPrice: 7500,
    totalTokens: 1000,
    availableTokens: 720,
    expectedReturn: 11.8,
    type: 'apartment',
    featured: true,
    investmentGrade: 'A',
    lastUpdated: '2024-01-18'
  },
  {
    id: '4',
    title: 'Departamento Santa Fe',
    description: 'Moderno departamento de 2 recámaras con vista panorámica en Santa Fe.',
    location: 'Santa Fe, CDMX',
    images: [
      'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    totalValue: 4200000,
    tokenPrice: 4200,
    totalTokens: 1000,
    availableTokens: 280,
    expectedReturn: 10.8,
    type: 'apartment',
    featured: false,
    investmentGrade: 'B',
    lastUpdated: '2024-01-12'
  },
  {
    id: '5',
    title: 'Oficina Corporativa Roma Norte',
    description: 'Espacio de oficina premium en el corazón de Roma Norte, completamente equipado.',
    location: 'Roma Norte, CDMX',
    images: [
      'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    totalValue: 6800000,
    tokenPrice: 6800,
    totalTokens: 1000,
    availableTokens: 420,
    expectedReturn: 15.2,
    type: 'office',
    featured: true,
    investmentGrade: 'A',
    lastUpdated: '2024-01-10'
  }
];

const PropertyTypeIcons = {
  house: House,
  apartment: Buildings,
  office: Buildings,
  hotel: Buildings
};

const DashboardClient: FC = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'featured' | 'available'>('all');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredProperties = MOCK_PROPERTIES.filter(property => {
    switch (selectedFilter) {
      case 'featured':
        return property.featured;
      case 'available':
        return property.availableTokens > 0;
      default:
        return true;
    }
  });

  const handlePropertyClick = (propertyId: string) => {
    router.push(`/property/${propertyId}`);
  };

  const getTotalPortfolioValue = () => {
    return MOCK_PROPERTIES.reduce((sum, property) => sum + property.totalValue, 0);
  };

  const getAverageReturn = () => {
    const total = MOCK_PROPERTIES.reduce((sum, property) => sum + property.expectedReturn, 0);
    return total / MOCK_PROPERTIES.length;
  };

  return (
    <DashboardLayout>
        <Navbar />
      <div className="relative min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="relative flex flex-col min-h-screen"
        >
          <main className="container mx-auto flex flex-col flex-grow overflow-hidden">
            <div className="w-full max-w-7xl mx-auto flex flex-col min-h-[75vh] mb-4 px-4 sm:px-5 py-8">
              {/* Header */}
              <div className="mb-8">
                <div className="inline-flex items-center h-[32px] bg-[#f95940] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5">
                  <span className="text-[#f95940] text-[14px] font-[400]">MERCADO</span>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px]">
                      <span className="text-[#1d1d1f]">Propiedades </span>
                      <span
                        style={{
                          backgroundImage: "linear-gradient(to left, #f95940 30%, #f95940 100%)",
                        }}
                        className="inline-block text-transparent bg-clip-text"
                      >
                        tokenizadas
                      </span>
                    </h1>
                    <Question 
                      weight="regular"
                      className="text-[#f95940] w-7 h-7 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setShowModal(true)}
                    />
                  </div>
                </div>

                <Modal showModal={showModal} setShowModal={setShowModal}>
                  <h2 className="text-[30px] font-semibold text-[#1d1d1f] mb-4">
                    ¿Cómo funciona la inversión en propiedades tokenizadas?
                  </h2>
                  <p className="text-[17px] font-[400] text-gray-700 tracking-[0.1px] leading-[1.6] mb-6">
                    Las propiedades tokenizadas te permiten invertir en bienes raíces de alta calidad 
                    con montos más accesibles. Cada propiedad se divide en tokens que representan 
                    una fracción de la propiedad y sus beneficios.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">
                        Beneficios de invertir:
                      </h3>
                      <ul className="space-y-3 text-[17px] text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-[#f95940] mt-1">•</span>
                          <span>Acceso a propiedades premium con inversión mínima</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#f95940] mt-1">•</span>
                          <span>Diversificación de portafolio inmobiliario</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#f95940] mt-1">•</span>
                          <span>Rendimientos por apreciación y rentas</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#f95940] mt-1">•</span>
                          <span>Liquidez mejorada comparada con bienes raíces tradicionales</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Modal>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-[16px] font-[500] text-gray-600">Valor Total del Mercado</h3>
                      <TrendUp className="text-[#f95940] w-6 h-6" />
                    </div>
                    <p className="text-[24px] font-[600] text-[#1d1d1f]">
                      {formatCurrency(getTotalPortfolioValue())}
                    </p>
                    <p className="text-[14px] text-green-600 mt-1">+8.5% este mes</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-[16px] font-[500] text-gray-600">Propiedades Disponibles</h3>
                      <Buildings className="text-[#f95940] w-6 h-6" />
                    </div>
                    <p className="text-[24px] font-[600] text-[#1d1d1f]">
                      {MOCK_PROPERTIES.length}
                    </p>
                    <p className="text-[14px] text-gray-600 mt-1">Activos verificados</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-[16px] font-[500] text-gray-600">Retorno Promedio</h3>
                      <Coins className="text-[#f95940] w-6 h-6" />
                    </div>
                    <p className="text-[24px] font-[600] text-[#1d1d1f]">
                      {getAverageReturn().toFixed(1)}%
                    </p>
                    <p className="text-[14px] text-gray-600 mt-1">Rendimiento anual</p>
                  </div>
                </div>

                {/* Filter Buttons */}
                <div className="flex gap-4 mb-8">
                  <button
                    onClick={() => setSelectedFilter('all')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedFilter === 'all'
                        ? 'bg-[#f95940] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Todas las propiedades
                  </button>
                  <button
                    onClick={() => setSelectedFilter('featured')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedFilter === 'featured'
                        ? 'bg-[#f95940] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Destacadas
                  </button>
                  <button
                    onClick={() => setSelectedFilter('available')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedFilter === 'available'
                        ? 'bg-[#f95940] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Disponibles
                  </button>
                </div>
              </div>

              {/* Property Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.map((property) => {
                  const Icon = PropertyTypeIcons[property.type];
                  const availabilityPercentage = (property.availableTokens / property.totalTokens) * 100;
                  
                  return (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                      onClick={() => handlePropertyClick(property.id)}
                    >
                      {property.featured && (
                        <div className="bg-[#f95940] text-white text-center py-2 text-sm font-medium">
                          Propiedad Destacada
                        </div>
                      )}
                      
                      <div className="relative">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-lg p-2">
                          <Icon className="w-5 h-5 text-[#f95940]" />
                        </div>
                        <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-lg px-2 py-1">
                          <span className="text-xs font-medium text-[#f95940]">
                            Grado {property.investmentGrade}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-[18px] font-[500] text-[#1d1d1f] leading-tight">
                            {property.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-[14px] text-gray-600">{property.location}</span>
                        </div>

                        <p className="text-[14px] text-gray-600 mb-4 line-clamp-2">
                          {property.description}
                        </p>

                        <div className="space-y-3 mb-4">
                          <div className="flex justify-between items-center">
                            <span className="text-[14px] text-gray-600">Valor total:</span>
                            <span className="text-[14px] font-[500] text-[#1d1d1f]">
                              {formatCurrency(property.totalValue)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[14px] text-gray-600">Precio por token:</span>
                            <span className="text-[14px] font-[500] text-[#f95940]">
                              {formatCurrency(property.tokenPrice)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[14px] text-gray-600">Rendimiento esperado:</span>
                            <span className="text-[14px] font-[500] text-green-600">
                              {property.expectedReturn}% anual
                            </span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[14px] text-gray-600">Disponibilidad:</span>
                            <span className="text-[14px] font-[500] text-[#1d1d1f]">
                              {property.availableTokens}/{property.totalTokens} tokens
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-[#f95940] h-2 rounded-full transition-all duration-300"
                              style={{ width: `${availabilityPercentage}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <PrimaryButton
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePropertyClick(property.id);
                            }}
                            className="flex-1"
                          >
                            <div className="flex items-center justify-center gap-2">
                              <Eye className="w-4 h-4" />
                              Ver detalles
                            </div>
                          </PrimaryButton>
                        </div>

                        <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-[12px] text-gray-500">
                            Actualizado: {new Date(property.lastUpdated).toLocaleDateString('es-MX')}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </main>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardClient;