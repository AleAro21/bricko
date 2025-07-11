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
  ArrowLeft
} from 'phosphor-react';
import PrimaryButton from '@/components/reusables/PrimaryButton';
import Modal from '@/components/common/Modal';
import PaymentMethodSelector from '@/app/payment/PaymentMethodSelection';
import CardPaymentForm from '@/app/payment/CardPaymentForm';
import OxxoPayment from '@/app/payment/OxxoPayment';

interface PropertyData {
  id: string;
  title: string;
  location: string;
  image: string;
  tokenPrice: number;
  availableTokens: number;
  expectedReturn: number;
  type: 'house' | 'apartment' | 'office' | 'hotel';
}

const PROPERTIES_DATA: { [key: string]: PropertyData } = {
  '1': {
    id: '1',
    title: 'Casa Residencial Polanco',
    location: 'Polanco, CDMX',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
    tokenPrice: 8500,
    availableTokens: 650,
    expectedReturn: 12.5,
    type: 'house'
  },
  '2': {
    id: '2',
    title: 'Hacienda Real San Miguel Ometusco',
    location: 'Ometusco, Estado de México',
    image: '/hotel_1.png',
    tokenPrice: 45000,
    availableTokens: 850,
    expectedReturn: 14.5,
    type: 'hotel'
  },
  '3': {
    id: '3',
    title: 'Departamentos Matías Romero 315',
    location: 'Matías Romero 315, CDMX',
    image: '/apartment_1.png',
    tokenPrice: 7500,
    availableTokens: 720,
    expectedReturn: 11.8,
    type: 'apartment'
  },
  '4': {
    id: '4',
    title: 'Departamento Santa Fe',
    location: 'Santa Fe, CDMX',
    image: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=800',
    tokenPrice: 4200,
    availableTokens: 280,
    expectedReturn: 10.8,
    type: 'apartment'
  },
  '5': {
    id: '5',
    title: 'Oficina Corporativa Roma Norte',
    location: 'Roma Norte, CDMX',
    image: 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=800',
    tokenPrice: 6800,
    availableTokens: 420,
    expectedReturn: 15.2,
    type: 'office'
  }
};

const PurchaseTokensClient: FC = () => {
  const router = useRouter();
  const params = useParams();
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'oxxo'>('card');
  const [tokensToBuy, setTokensToBuy] = useState(10);

  // Get property data based on ID from URL
  const propertyId = params?.id as string;
  const PROPERTY_DATA = PROPERTIES_DATA[propertyId];

  // Redirect if property not found
  useEffect(() => {
    if (!PROPERTY_DATA) {
      router.push('/dashboard');
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

  const totalAmount = tokensToBuy * PROPERTY_DATA.tokenPrice;
  const monthlyReturn = (totalAmount * PROPERTY_DATA.expectedReturn) / 100 / 12;
  const annualReturn = (totalAmount * PROPERTY_DATA.expectedReturn) / 100;

  const handleSubmit = () => {
    router.push('/purchase-success');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <DashboardLayout>
      <div className="relative min-h-screen">
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <h2 className="text-[30px] font-semibold text-[#1d1d1f] mb-4">
            ¿Cómo funcionan los tokens inmobiliarios?
          </h2>
          <p className="text-[17px] font-[400] text-gray-700 tracking-[0.1px] leading-[1.6] mb-6">
            Los tokens inmobiliarios representan una fracción de la propiedad del activo. 
            Al comprar tokens, te conviertes en copropietario y tienes derecho a recibir 
            una parte proporcional de los ingresos generados por la propiedad.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">
                Beneficios de los tokens:
              </h3>
              <ul className="space-y-3 text-[17px] text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#f95940] mt-1">•</span>
                  <span>Ingresos pasivos mensuales por rentas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#f95940] mt-1">•</span>
                  <span>Apreciación del valor del activo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#f95940] mt-1">•</span>
                  <span>Liquidez mejorada vs. bienes raíces tradicionales</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#f95940] mt-1">•</span>
                  <span>Diversificación de portafolio con menor capital</span>
                </li>
              </ul>
            </div>
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
                <span>Volver a la propiedad</span>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                {/* Left Column */}
                <div className="space-y-8">
                  <div>
                    <div className="inline-flex items-center h-[32px] bg-[#f95940] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5">
                      <span className="text-[#f95940] text-[14px] font-[400]">COMPRA DE TOKENS</span>
                    </div>
                    <div className="flex items-center gap-2 mb-[15px]">
                      <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px]">
                        <span className="text-[#1d1d1f]">Compra </span>
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
                              <p className="text-[12px] text-gray-500">Precio por token</p>
                              <p className="text-[16px] font-[500] text-[#f95940]">
                                {formatCurrency(PROPERTY_DATA.tokenPrice)}
                              </p>
                            </div>
                            <div>
                              <p className="text-[12px] text-gray-500">Rendimiento</p>
                              <p className="text-[16px] font-[500] text-green-600">
                                {PROPERTY_DATA.expectedReturn}% anual
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Token Selection */}
                    <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                      <h3 className="text-[18px] font-[500] text-[#1d1d1f] mb-4">
                        Selecciona la cantidad de tokens
                      </h3>
                      
                      <div className="mb-6">
                        <label className="block text-[14px] font-[500] text-gray-700 mb-2">
                          Número de tokens
                        </label>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setTokensToBuy(Math.max(1, tokensToBuy - 1))}
                            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={tokensToBuy}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 1;
                              if (value >= 1 && value <= PROPERTY_DATA.availableTokens) {
                                setTokensToBuy(value);
                              }
                            }}
                            className="flex-1 text-center px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f95940] focus:border-transparent"
                            min="1"
                            max={PROPERTY_DATA.availableTokens}
                          />
                          <button
                            onClick={() => setTokensToBuy(Math.min(PROPERTY_DATA.availableTokens, tokensToBuy + 1))}
                            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-[12px] text-gray-500 mt-2">
                          Disponibles: {PROPERTY_DATA.availableTokens} tokens
                        </p>
                      </div>

                      {/* Quick Selection */}
                      <div className="grid grid-cols-4 gap-2 mb-6">
                        {[5, 10, 25, 50].map((amount) => (
                          <button
                            key={amount}
                            onClick={() => setTokensToBuy(Math.min(amount, PROPERTY_DATA.availableTokens))}
                            className={`py-2 px-3 rounded-lg border text-sm transition-colors ${
                              tokensToBuy === amount
                                ? 'border-[#f95940] bg-[#f95940]/20 text-[#f95940]'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            {amount}
                          </button>
                        ))}
                      </div>

                      {/* Investment Summary */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-4">
                          <Calculator className="text-[#f95940] w-5 h-5" />
                          <h4 className="text-[16px] font-[500] text-[#1d1d1f]">
                            Resumen de inversión
                          </h4>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-[14px] text-gray-600">Total a invertir:</span>
                            <span className="text-[14px] font-[500] text-[#1d1d1f]">
                              {formatCurrency(totalAmount)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[14px] text-gray-600">Rendimiento mensual estimado:</span>
                            <span className="text-[14px] font-[500] text-green-600">
                              {formatCurrency(monthlyReturn)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[14px] text-gray-600">Rendimiento anual estimado:</span>
                            <span className="text-[14px] font-[500] text-green-600">
                              {formatCurrency(annualReturn)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h3 className="text-[18px] font-[500] text-[#1d1d1f] mb-4">
                        Método de pago
                      </h3>
                      
                      <PaymentMethodSelector onMethodSelect={setPaymentMethod} />
                      
                      <div className="mt-6">
                        {paymentMethod === 'card' ? (
                          <CardPaymentForm onSubmit={handleSubmit} />
                        ) : (
                          <OxxoPayment />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Summary */}
                <div>
                  <div className="sticky top-8 space-y-6">
                    {/* Purchase Summary */}
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h3 className="text-[20px] font-[500] text-[#1d1d1f] mb-4">
                        Resumen de compra
                      </h3>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-[14px] text-gray-600">Tokens a comprar:</span>
                          <span className="text-[16px] font-[500] text-[#1d1d1f]">
                            {tokensToBuy}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-[14px] text-gray-600">Precio por token:</span>
                          <span className="text-[16px] font-[500] text-[#f95940]">
                            {formatCurrency(PROPERTY_DATA.tokenPrice)}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center pt-4 border-t">
                          <span className="text-[18px] font-[500] text-gray-900">Total:</span>
                          <span className="text-[20px] font-[600] text-[#f95940]">
                            {formatCurrency(totalAmount)}
                          </span>
                        </div>
                      </div>

                      <div className="bg-[#f95940]/20 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Coins className="text-[#f95940] w-5 h-5" />
                          <span className="text-[14px] font-[500] text-[#1d1d1f]">
                            Rendimiento proyectado
                          </span>
                        </div>
                        <p className="text-[12px] text-gray-600 mb-2">
                          Basado en el rendimiento histórico de {PROPERTY_DATA.expectedReturn}% anual
                        </p>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-[12px] text-gray-600">Mensual:</span>
                            <span className="text-[12px] font-[500] text-green-600">
                              {formatCurrency(monthlyReturn)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[12px] text-gray-600">Anual:</span>
                            <span className="text-[12px] font-[500] text-green-600">
                              {formatCurrency(annualReturn)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Security Notice */}
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="text-green-500 w-6 h-6 mt-1" />
                        <div>
                          <h4 className="text-[16px] font-[500] text-[#1d1d1f] mb-2">
                            Compra segura
                          </h4>
                          <ul className="text-[14px] text-gray-600 space-y-1">
                            <li>• Transacción protegida con encriptación SSL</li>
                            <li>• Tokens registrados en blockchain</li>
                            <li>• Propiedad verificada legalmente</li>
                            <li>• Soporte 24/7 disponible</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Legal Notice */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-[12px] text-gray-600 leading-relaxed">
                        Al completar esta compra, aceptas los términos y condiciones de la plataforma. 
                        Los rendimientos mostrados son estimaciones basadas en el desempeño histórico 
                        y no garantizan resultados futuros. Toda inversión conlleva riesgos.
                      </p>
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

export default PurchaseTokensClient;