'use client';

import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/common/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  House, 
  MapPin, 
  Coins, 
  CreditCard, 
  Bank,
  Calculator,
  ShieldCheck,
  Question,
  ArrowLeft,
  TrendDown,
  Warning,
  Buildings
} from 'phosphor-react';
import PrimaryButton from '@/components/reusables/PrimaryButton';
import Modal from '@/components/common/Modal';

interface PropertyData {
  id: string;
  title: string;
  location: string;
  image: string;
  tokenPrice: number;
  tokensOwned: number;
  currentValue: number;
  purchaseValue: number;
  expectedReturn: number;
  type: string;
}

const PROPERTIES_DATA: { [key: string]: PropertyData } = {
  '2': {
    id: '2',
    title: 'Hacienda Real San Miguel Ometusco',
    location: 'Ometusco, Estado de México',
    image: '/hotel_1.png',
    tokenPrice: 45000,
    tokensOwned: 15,
    currentValue: 675000,
    purchaseValue: 650000,
    expectedReturn: 14.5,
    type: 'hotel'
  },
  '3': {
    id: '3',
    title: 'Departamentos Matías Romero 315',
    location: 'Matías Romero 315, CDMX',
    image: '/apartment_1.png',
    tokenPrice: 7500,
    tokensOwned: 8,
    currentValue: 60000,
    purchaseValue: 58000,
    expectedReturn: 11.8,
    type: 'apartment'
  }
};

const SellTokensClient: FC = () => {
  const router = useRouter();
  const params = useParams();
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [tokensToSell, setTokensToSell] = useState(1);

  // Get property data based on ID from URL
  const propertyId = params?.id as string;
  const PROPERTY_DATA = PROPERTIES_DATA[propertyId];

  // Redirect if property not found or user doesn't own tokens
  useEffect(() => {
    if (!PROPERTY_DATA) {
      router.push('/profile');
    }
  }, [PROPERTY_DATA, router]);

  if (!PROPERTY_DATA) {
    return null;
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalAmount = tokensToSell * PROPERTY_DATA.tokenPrice;
  const gainLoss = PROPERTY_DATA.currentValue - PROPERTY_DATA.purchaseValue;
  const gainLossPercentage = (gainLoss / PROPERTY_DATA.purchaseValue) * 100;
  const saleGainLoss = (tokensToSell * PROPERTY_DATA.tokenPrice) - (tokensToSell * (PROPERTY_DATA.purchaseValue / PROPERTY_DATA.tokensOwned));
  const monthlyReturnLoss = (tokensToSell * PROPERTY_DATA.tokenPrice * PROPERTY_DATA.expectedReturn) / 100 / 12;

  const handleSubmit = () => {
    setShowConfirmModal(true);
  };

  const confirmSale = () => {
    setShowConfirmModal(false);
    // Here you would process the sale
    router.push('/profile');
  };

  const handleBack = () => {
    router.back();
  };

  const PropertyIcon = PROPERTY_DATA.type === 'hotel' ? Buildings : Buildings;

  return (
    <DashboardLayout>
      <div className="relative min-h-screen">
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <h2 className="text-[30px] font-semibold text-[#1d1d1f] mb-4">
            ¿Cómo funciona la venta de tokens?
          </h2>
          <p className="text-[17px] font-[400] text-gray-700 tracking-[0.1px] leading-[1.6] mb-6">
            Al vender tus tokens, recibirás el valor actual de mercado de los mismos. 
            Ten en cuenta que perderás los ingresos futuros de esos tokens.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">
                Consideraciones importantes:
              </h3>
              <ul className="space-y-3 text-[17px] text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#f95940] mt-1">•</span>
                  <span>Los fondos se depositan en 3-5 días hábiles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#f95940] mt-1">•</span>
                  <span>Perderás los ingresos mensuales de los tokens vendidos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#f95940] mt-1">•</span>
                  <span>El precio puede fluctuar según el mercado</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#f95940] mt-1">•</span>
                  <span>Comisión del 2% sobre el valor de venta</span>
                </li>
              </ul>
            </div>
          </div>
        </Modal>

        <Modal showModal={showConfirmModal} setShowModal={setShowConfirmModal}>
          <h2 className="text-[30px] font-semibold text-[#1d1d1f] mb-4">
            Confirmar venta de tokens
          </h2>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-[16px] text-gray-600">Propiedad:</span>
              <span className="text-[16px] font-[500] text-[#1d1d1f]">
                {PROPERTY_DATA.title}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[16px] text-gray-600">Tokens a vender:</span>
              <span className="text-[16px] font-[500] text-[#1d1d1f]">
                {tokensToSell}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[16px] text-gray-600">Precio por token:</span>
              <span className="text-[16px] font-[500] text-[#f95940]">
                {formatCurrency(PROPERTY_DATA.tokenPrice)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[16px] text-gray-600">Comisión (2%):</span>
              <span className="text-[16px] font-[500] text-red-600">
                -{formatCurrency(totalAmount * 0.02)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-[18px] font-[500] text-gray-900">Total a recibir:</span>
              <span className="text-[18px] font-[600] text-green-600">
                {formatCurrency(totalAmount * 0.98)}
              </span>
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Warning className="text-yellow-600 w-5 h-5 mt-0.5" />
              <div>
                <p className="text-yellow-800 text-sm">
                  Esta acción no se puede deshacer. Perderás los ingresos mensuales de estos tokens.
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <PrimaryButton onClick={confirmSale} className="flex-1">
              Confirmar venta
            </PrimaryButton>
          </div>
        </Modal>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="relative flex flex-col min-h-screen"
        >
          <main className="container mx-auto flex flex-col flex-grow overflow-hidden">
            <div className="w-full max-w-6xl mx-auto flex flex-col min-h-[75vh] mb-4 px-4 sm:px-5 py-8">
              
              {/* Back Button */}
              <button
                onClick={handleBack}
                className="flex items-center gap-2 mb-6 text-[#f95940] hover:text-[#f95940]/80 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Volver al portafolio</span>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                {/* Left Column */}
                <div className="space-y-8">
                  <div>
                    <div className="inline-flex items-center h-[32px] bg-red-100 px-[12px] py-[6px] rounded-md mb-2.5">
                      <span className="text-red-600 text-[14px] font-[400]">VENTA DE TOKENS</span>
                    </div>
                    <div className="flex items-center gap-2 mb-[15px]">
                      <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px]">
                        <span className="text-[#1d1d1f]">Vender </span>
                        <span
                          style={{
                            backgroundImage: "linear-gradient(to left, #f95940 30%, #f95940 100%)",
                          }}
                          className="inline-block text-transparent bg-clip-text"
                        >
                          tokens
                        </span>
                      </h1>
                      <Question 
                        weight="regular"
                        className="text-[#f95940] w-7 h-7 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setShowModal(true)}
                      />
                    </div>

                    {/* Property Summary */}
                    <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                      <div className="flex gap-4">
                        <img
                          src={PROPERTY_DATA.image}
                          alt={PROPERTY_DATA.title}
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-[18px] font-[500] text-[#1d1d1f] mb-2">
                            {PROPERTY_DATA.title}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-[14px] text-gray-600">{PROPERTY_DATA.location}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="text-[12px] text-gray-500">Tokens que posees</p>
                              <p className="text-[16px] font-[500] text-[#f95940]">
                                {PROPERTY_DATA.tokensOwned}
                              </p>
                            </div>
                            <div>
                              <p className="text-[12px] text-gray-500">Valor actual</p>
                              <p className="text-[16px] font-[500] text-green-600">
                                {formatCurrency(PROPERTY_DATA.currentValue)}
                              </p>
                            </div>
                            <div>
                              <p className="text-[12px] text-gray-500">Ganancia/Pérdida</p>
                              <p className={`text-[16px] font-[500] ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {gainLoss >= 0 ? '+' : ''}{formatCurrency(gainLoss)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Token Selection */}
                    <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                      <h3 className="text-[18px] font-[500] text-[#1d1d1f] mb-4">
                        Selecciona la cantidad de tokens a vender
                      </h3>
                      
                      <div className="mb-6">
                        <label className="block text-[14px] font-[500] text-gray-700 mb-2">
                          Número de tokens
                        </label>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setTokensToSell(Math.max(1, tokensToSell - 1))}
                            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={tokensToSell}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 1;
                              if (value >= 1 && value <= PROPERTY_DATA.tokensOwned) {
                                setTokensToSell(value);
                              }
                            }}
                            className="flex-1 text-center px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f95940] focus:border-transparent"
                            min="1"
                            max={PROPERTY_DATA.tokensOwned}
                          />
                          <button
                            onClick={() => setTokensToSell(Math.min(PROPERTY_DATA.tokensOwned, tokensToSell + 1))}
                            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-[12px] text-gray-500 mt-2">
                          Máximo: {PROPERTY_DATA.tokensOwned} tokens
                        </p>
                      </div>

                      {/* Quick Selection */}
                      <div className="grid grid-cols-4 gap-2 mb-6">
                        {[
                          Math.ceil(PROPERTY_DATA.tokensOwned * 0.25),
                          Math.ceil(PROPERTY_DATA.tokensOwned * 0.5),
                          Math.ceil(PROPERTY_DATA.tokensOwned * 0.75),
                          PROPERTY_DATA.tokensOwned
                        ].map((amount, index) => (
                          <button
                            key={amount}
                            onClick={() => setTokensToSell(amount)}
                            className={`py-2 px-3 rounded-lg border text-sm transition-colors ${
                              tokensToSell === amount
                                ? 'border-[#f95940] bg-[#f95940]/20 text-[#f95940]'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            {index === 0 ? '25%' : index === 1 ? '50%' : index === 2 ? '75%' : 'Todo'}
                          </button>
                        ))}
                      </div>

                      {/* Sale Impact */}
                      <div className="bg-red-50 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-4">
                          <TrendDown className="text-red-600 w-5 h-5" />
                          <h4 className="text-[16px] font-[500] text-[#1d1d1f]">
                            Impacto de la venta
                          </h4>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-[14px] text-gray-600">Valor bruto de venta:</span>
                            <span className="text-[14px] font-[500] text-[#1d1d1f]">
                              {formatCurrency(totalAmount)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[14px] text-gray-600">Comisión (2%):</span>
                            <span className="text-[14px] font-[500] text-red-600">
                              -{formatCurrency(totalAmount * 0.02)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[14px] text-gray-600">Pérdida de ingresos mensuales:</span>
                            <span className="text-[14px] font-[500] text-red-600">
                              -{formatCurrency(monthlyReturnLoss)}
                            </span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-red-200">
                            <span className="text-[14px] font-[500] text-gray-900">Total a recibir:</span>
                            <span className="text-[14px] font-[600] text-green-600">
                              {formatCurrency(totalAmount * 0.98)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sell Button */}
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <PrimaryButton
                        onClick={handleSubmit}
                        className="w-full bg-red-600 hover:bg-red-700"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <TrendDown className="w-4 h-4" />
                          Vender tokens
                        </div>
                      </PrimaryButton>
                      
                      <p className="text-[12px] text-gray-500 text-center mt-3">
                        Los fondos se depositarán en tu cuenta en 3-5 días hábiles
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column - Summary */}
                <div>
                  <div className="sticky top-8 space-y-6">
                    {/* Sale Summary */}
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h3 className="text-[20px] font-[500] text-[#1d1d1f] mb-4">
                        Resumen de venta
                      </h3>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-[14px] text-gray-600">Tokens a vender:</span>
                          <span className="text-[16px] font-[500] text-[#1d1d1f]">
                            {tokensToSell}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-[14px] text-gray-600">Precio por token:</span>
                          <span className="text-[16px] font-[500] text-[#f95940]">
                            {formatCurrency(PROPERTY_DATA.tokenPrice)}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-[14px] text-gray-600">Comisión:</span>
                          <span className="text-[16px] font-[500] text-red-600">
                            -{formatCurrency(totalAmount * 0.02)}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center pt-4 border-t">
                          <span className="text-[18px] font-[500] text-gray-900">Total a recibir:</span>
                          <span className="text-[20px] font-[600] text-green-600">
                            {formatCurrency(totalAmount * 0.98)}
                          </span>
                        </div>
                      </div>

                      <div className="bg-yellow-50 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Warning className="text-yellow-600 w-5 h-5" />
                          <span className="text-[14px] font-[500] text-[#1d1d1f]">
                            Pérdida de ingresos
                          </span>
                        </div>
                        <p className="text-[12px] text-gray-600 mb-2">
                          Al vender estos tokens, perderás ingresos mensuales
                        </p>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-[12px] text-gray-600">Mensual:</span>
                            <span className="text-[12px] font-[500] text-red-600">
                              -{formatCurrency(monthlyReturnLoss)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[12px] text-gray-600">Anual:</span>
                            <span className="text-[12px] font-[500] text-red-600">
                              -{formatCurrency(monthlyReturnLoss * 12)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Remaining Holdings */}
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h3 className="text-[20px] font-[500] text-[#1d1d1f] mb-4">
                        Tokens restantes
                      </h3>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[14px] text-gray-600">Tokens que mantendrás:</span>
                          <span className="text-[14px] font-[500] text-[#1d1d1f]">
                            {PROPERTY_DATA.tokensOwned - tokensToSell}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-[14px] text-gray-600">Valor restante:</span>
                          <span className="text-[14px] font-[500] text-[#1d1d1f]">
                            {formatCurrency((PROPERTY_DATA.tokensOwned - tokensToSell) * PROPERTY_DATA.tokenPrice)}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-[14px] text-gray-600">Ingresos mensuales restantes:</span>
                          <span className="text-[14px] font-[500] text-green-600">
                            {formatCurrency(((PROPERTY_DATA.tokensOwned - tokensToSell) * PROPERTY_DATA.tokenPrice * PROPERTY_DATA.expectedReturn) / 100 / 12)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Security Notice */}
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="text-green-500 w-6 h-6 mt-1" />
                        <div>
                          <h4 className="text-[16px] font-[500] text-[#1d1d1f] mb-2">
                            Proceso seguro
                          </h4>
                          <ul className="text-[14px] text-gray-600 space-y-1">
                            <li>• Transacción protegida con encriptación SSL</li>
                            <li>• Tokens transferidos automáticamente</li>
                            <li>• Depósito en 3-5 días hábiles</li>
                            <li>• Soporte 24/7 disponible</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default SellTokensClient;