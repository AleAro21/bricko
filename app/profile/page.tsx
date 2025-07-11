'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/common/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  Coins, 
  TrendUp, 
  TrendDown, 
  Eye, 
  ArrowsClockwise, 
  Download,
  Calendar,
  MapPin,
  House,
  Buildings,
  Plus,
  Wallet,
  Receipt,
  Bell,
  Star,
  CreditCard,
  Bank
} from 'phosphor-react';
import PrimaryButton from '@/components/reusables/PrimaryButton';
import Navbar from '@/components/common/Navbar';

interface TokenHolding {
  id: string;
  propertyTitle: string;
  propertyLocation: string;
  propertyImage: string;
  tokensOwned: number;
  totalTokens: number;
  tokenValue: number;
  currentValue: number;
  purchaseValue: number;
  monthlyReturn: number;
  totalReturns: number;
  purchaseDate: string;
  propertyType: 'house' | 'apartment' | 'office' | 'hotel';
  status: 'active' | 'pending' | 'sold';
  lastDividend: string;
  nextDividend: string;
}

interface Transaction {
  id: string;
  type: 'purchase' | 'sale' | 'dividend';
  propertyTitle: string;
  amount: number;
  tokens?: number;
  date: string;
  status: 'completed' | 'pending';
}

const MOCK_HOLDINGS: TokenHolding[] = [
  {
    id: '2',
    propertyTitle: 'Hacienda Real San Miguel Ometusco',
    propertyLocation: 'Ometusco, Estado de México',
    propertyImage: '/hotel_1.png',
    tokensOwned: 15,
    totalTokens: 1000,
    tokenValue: 45000,
    currentValue: 675000,
    purchaseValue: 650000,
    monthlyReturn: 8100,
    totalReturns: 24300,
    purchaseDate: '2024-01-20',
    propertyType: 'hotel',
    status: 'active',
    lastDividend: '2024-01-01',
    nextDividend: '2024-02-01'
  },
  {
    id: '3',
    propertyTitle: 'Departamentos Matías Romero 315',
    propertyLocation: 'Matías Romero 315, CDMX',
    propertyImage: '/apartment_1.png',
    tokensOwned: 8,
    totalTokens: 1000,
    tokenValue: 7500,
    currentValue: 60000,
    purchaseValue: 58000,
    monthlyReturn: 720,
    totalReturns: 2160,
    purchaseDate: '2024-01-18',
    propertyType: 'apartment',
    status: 'active',
    lastDividend: '2024-01-01',
    nextDividend: '2024-02-01'
  }
];

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    type: 'dividend',
    propertyTitle: 'Hacienda Real San Miguel Ometusco',
    amount: 8100,
    date: '2024-01-01',
    status: 'completed'
  },
  {
    id: '2',
    type: 'purchase',
    propertyTitle: 'Hacienda Real San Miguel Ometusco',
    amount: 675000,
    tokens: 15,
    date: '2024-01-20',
    status: 'completed'
  },
  {
    id: '3',
    type: 'dividend',
    propertyTitle: 'Departamentos Matías Romero 315',
    amount: 720,
    date: '2024-01-01',
    status: 'completed'
  },
  {
    id: '4',
    type: 'purchase',
    propertyTitle: 'Departamentos Matías Romero 315',
    amount: 60000,
    tokens: 8,
    date: '2024-01-18',
    status: 'completed'
  }
];

const PropertyTypeIcons = {
  house: House,
  apartment: Buildings,
  office: Buildings,
  hotel: Buildings
};

const ProfileClient: FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'portfolio' | 'transactions'>('portfolio');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate portfolio metrics
  const totalInvestment = MOCK_HOLDINGS.reduce((sum, holding) => sum + holding.purchaseValue, 0);
  const currentPortfolioValue = MOCK_HOLDINGS.reduce((sum, holding) => sum + holding.currentValue, 0);
  const totalGains = currentPortfolioValue - totalInvestment;
  const totalGainsPercentage = (totalGains / totalInvestment) * 100;
  const monthlyIncome = MOCK_HOLDINGS.reduce((sum, holding) => sum + holding.monthlyReturn, 0);
  const totalReturns = MOCK_HOLDINGS.reduce((sum, holding) => sum + holding.totalReturns, 0);

  const handleSellTokens = (propertyId: string) => {
    router.push(`/sell-tokens/${propertyId}`);
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
                  <span className="text-[#f95940] text-[14px] font-[400]">MI PORTAFOLIO</span>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px]">
                    <span className="text-[#1d1d1f]">Tu portafolio </span>
                    <span
                      style={{
                        backgroundImage: "linear-gradient(to left, #f95940 30%, #f95940 100%)",
                      }}
                      className="inline-block text-transparent bg-clip-text"
                    >
                      inmobiliario
                    </span>
                  </h1>
                  <PrimaryButton
                    onClick={() => router.push('/dashboard')}
                    className="w-auto px-6"
                  >
                    <div className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Explorar propiedades
                    </div>
                  </PrimaryButton>
                </div>

                {/* Portfolio Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-[#f95940] to-[#f95940]/80 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <Wallet className="w-8 h-8 text-white/80" />
                      <div className="flex items-center gap-1">
                        {totalGains >= 0 ? (
                          <TrendUp className="w-5 h-5" />
                        ) : (
                          <TrendDown className="w-5 h-5" />
                        )}
                        <span className="text-sm font-medium">
                          {totalGainsPercentage >= 0 ? '+' : ''}{totalGainsPercentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <p className="text-white/80 text-sm mb-1">Valor Total del Portafolio</p>
                    <p className="text-2xl font-bold">{formatCurrency(currentPortfolioValue)}</p>
                    <p className="text-white/80 text-sm mt-2">
                      Ganancia: {formatCurrency(totalGains)}
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <Coins className="w-8 h-8 text-green-500" />
                      <Bell className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-gray-600 text-sm mb-1">Ingresos Mensuales</p>
                    <p className="text-2xl font-bold text-[#1d1d1f]">{formatCurrency(monthlyIncome)}</p>
                    <p className="text-green-600 text-sm mt-2">Próximo pago: 1 Ago 2025</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <Buildings className="w-8 h-8 text-blue-500" />
                      <Star className="w-5 h-5 text-yellow-400" />
                    </div>
                    <p className="text-gray-600 text-sm mb-1">Propiedades</p>
                    <p className="text-2xl font-bold text-[#1d1d1f]">{MOCK_HOLDINGS.length}</p>
                    <p className="text-gray-600 text-sm mt-2">
                      {MOCK_HOLDINGS.reduce((sum, h) => sum + h.tokensOwned, 0)} tokens totales
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <Receipt className="w-8 h-8 text-purple-500" />
                      <TrendUp className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-gray-600 text-sm mb-1">Rendimientos Totales</p>
                    <p className="text-2xl font-bold text-[#1d1d1f]">{formatCurrency(totalReturns)}</p>
                    <p className="text-green-600 text-sm mt-2">Desde el inicio</p>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b mb-8">
                  <button
                    onClick={() => setActiveTab('portfolio')}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
                      activeTab === 'portfolio'
                        ? 'border-b-2 border-[#f95940] text-[#f95940]'
                        : 'text-gray-600 hover:text-[#f95940]'
                    }`}
                  >
                    <House className="w-4 h-4" />
                    Mis Propiedades
                  </button>
                  <button
                    onClick={() => setActiveTab('transactions')}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
                      activeTab === 'transactions'
                        ? 'border-b-2 border-[#f95940] text-[#f95940]'
                        : 'text-gray-600 hover:text-[#f95940]'
                    }`}
                  >
                    <Receipt className="w-4 h-4" />
                    Transacciones
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="flex-1">
                {activeTab === 'portfolio' && (
                  <div className="space-y-6">
                    {/* Next Dividend Alert */}
                    <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <Coins className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-green-800 mb-2">
                            Próximo pago de dividendos
                          </h3>
                          <p className="text-green-700 mb-3">
                            Recibirás {formatCurrency(monthlyIncome)} el 1 de febrero por tus inversiones.
                          </p>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm text-green-600">
                              <Calendar className="w-4 h-4" />
                              <span>1 Ago 2025</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-green-600">
                              <Bank className="w-4 h-4" />
                              <span>Depósito automático</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Property Holdings */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {MOCK_HOLDINGS.map((holding) => {
                        const Icon = PropertyTypeIcons[holding.propertyType];
                        const ownershipPercentage = (holding.tokensOwned / holding.totalTokens) * 100;
                        const gainLoss = holding.currentValue - holding.purchaseValue;
                        const gainLossPercentage = (gainLoss / holding.purchaseValue) * 100;
                        
                        return (
                          <motion.div
                            key={holding.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                          >
                            <div className="relative">
                              <img
                                src={holding.propertyImage}
                                alt={holding.propertyTitle}
                                className="w-full h-48 object-cover"
                              />
                              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                                <Icon className="w-5 h-5 text-[#f95940]" />
                              </div>
                              <div className="absolute top-4 right-4 bg-[#f95940] text-white rounded-lg px-3 py-1">
                                <span className="text-xs font-medium">
                                  {ownershipPercentage.toFixed(1)}%
                                </span>
                              </div>
                              <div className="absolute bottom-4 left-4 right-4">
                                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                                  <h3 className="font-semibold text-[#1d1d1f] text-sm mb-1">
                                    {holding.propertyTitle}
                                  </h3>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3 text-gray-500" />
                                    <span className="text-xs text-gray-600">{holding.propertyLocation}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="p-6">
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                  <p className="text-xs text-gray-500 mb-1">Valor Actual</p>
                                  <p className="font-semibold text-[#1d1d1f]">
                                    {formatCurrency(holding.currentValue)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 mb-1">Ganancia/Pérdida</p>
                                  <p className={`font-semibold ${
                                    gainLoss >= 0 ? 'text-green-600' : 'text-red-600'
                                  }`}>
                                    {gainLoss >= 0 ? '+' : ''}{formatCurrency(gainLoss)}
                                  </p>
                                  <p className={`text-xs ${
                                    gainLoss >= 0 ? 'text-green-600' : 'text-red-600'
                                  }`}>
                                    ({gainLossPercentage >= 0 ? '+' : ''}{gainLossPercentage.toFixed(1)}%)
                                  </p>
                                </div>
                              </div>

                              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-xs text-gray-600">Ingreso mensual:</span>
                                  <span className="text-sm font-semibold text-green-600">
                                    {formatCurrency(holding.monthlyReturn)}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-600">Tokens:</span>
                                  <span className="text-sm font-semibold text-[#1d1d1f]">
                                    {holding.tokensOwned}
                                  </span>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <button
                                  onClick={() => router.push(`/property/${holding.id}`)}
                                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                                >
                                  <Eye className="w-4 h-4" />
                                  Ver
                                </button>
                                <button 
                                  onClick={() => handleSellTokens(holding.id)}
                                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#f95940] text-white rounded-lg hover:bg-[#f95940]/90 transition-colors text-sm"
                                >
                                  <ArrowsClockwise className="w-4 h-4" />
                                  Vender
                                </button>
                              </div>

                              <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-xs text-gray-500">
                                  Comprado: {formatDate(holding.purchaseDate)}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeTab === 'transactions' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-[#1d1d1f]">Historial de Transacciones</h2>
                      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                        <Download className="w-4 h-4" />
                        Exportar
                      </button>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                      <div className="divide-y divide-gray-100">
                        {MOCK_TRANSACTIONS.map((transaction) => (
                          <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                  transaction.type === 'purchase' ? 'bg-blue-100' : 
                                  transaction.type === 'sale' ? 'bg-red-100' : 'bg-green-100'
                                }`}>
                                  {transaction.type === 'purchase' ? (
                                    <Plus className={`w-6 h-6 text-blue-600`} />
                                  ) : transaction.type === 'sale' ? (
                                    <ArrowsClockwise className={`w-6 h-6 text-red-600`} />
                                  ) : (
                                    <Coins className={`w-6 h-6 text-green-600`} />
                                  )}
                                </div>
                                <div>
                                  <p className="font-semibold text-[#1d1d1f] mb-1">
                                    {transaction.type === 'purchase' ? 'Compra de tokens' : 
                                     transaction.type === 'sale' ? 'Venta de tokens' : 'Pago de dividendos'}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {transaction.propertyTitle}
                                    {transaction.tokens && ` • ${transaction.tokens} tokens`}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {formatDate(transaction.date)}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className={`text-lg font-semibold ${
                                  transaction.type === 'dividend' ? 'text-green-600' : 
                                  transaction.type === 'sale' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {transaction.type === 'purchase' ? '-' : '+'}
                                  {formatCurrency(transaction.amount)}
                                </p>
                                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                                  transaction.status === 'completed' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {transaction.status === 'completed' ? 'Completado' : 'Pendiente'}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ProfileClient;