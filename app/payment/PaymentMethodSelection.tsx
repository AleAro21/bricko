import { FC, useState } from 'react';
import { CreditCard, Barcode } from 'phosphor-react';

interface PaymentMethodSelectorProps {
  onMethodSelect: (method: 'card' | 'oxxo') => void;
}

const PaymentMethodSelector: FC<PaymentMethodSelectorProps> = ({ onMethodSelect }) => {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'oxxo'>('card');

  const handleMethodChange = (method: 'card' | 'oxxo') => {
    setSelectedMethod(method);
    onMethodSelect(method);
  };

  return (
    <div className="space-y-4">
      {/* Credit Card Option */}
      <div
        onClick={() => handleMethodChange('card')}
        className={`cursor-pointer rounded-lg p-4 transition-all duration-200 ${
          selectedMethod === 'card'
            ? 'bg-blue-50 border-2 border-[#047aff]'
            : 'bg-white border-2 border-gray-100 hover:border-gray-200'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`rounded-full p-2 ${
            selectedMethod === 'card' ? 'bg-[#047aff] text-white' : 'bg-gray-100 text-gray-600'
          }`}>
            <CreditCard size={24} weight="bold" />
          </div>
          <div className="flex-1">
            <h3 className="text-[16px] font-[500] text-[#1d1d1f]">Tarjeta de crédito o débito</h3>
            <p className="text-[14px] text-gray-600">Visa, Mastercard, American Express</p>
          </div>
          <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-200 ${
            selectedMethod === 'card'
              ? 'border-[#047aff] bg-[#047aff]'
              : 'border-gray-300'
          }">
            {selectedMethod === 'card' && (
              <div className="w-2 h-2 rounded-full bg-white" />
            )}
          </div>
        </div>
      </div>

      {/* OXXO Option */}
      <div
        onClick={() => handleMethodChange('oxxo')}
        className={`cursor-pointer rounded-lg p-4 transition-all duration-200 ${
          selectedMethod === 'oxxo'
            ? 'bg-blue-50 border-2 border-[#047aff]'
            : 'bg-white border-2 border-gray-100 hover:border-gray-200'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`rounded-full p-2 ${
            selectedMethod === 'oxxo' ? 'bg-[#047aff] text-white' : 'bg-gray-100 text-gray-600'
          }`}>
            <Barcode size={24} weight="bold" />
          </div>
          <div className="flex-1">
            <h3 className="text-[16px] font-[500] text-[#1d1d1f]">Pago en OXXO</h3>
            <p className="text-[14px] text-gray-600">Genera un código y paga en cualquier OXXO</p>
          </div>
          <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-200 ${
            selectedMethod === 'oxxo'
              ? 'border-[#047aff] bg-[#047aff]'
              : 'border-gray-300'
          }">
            {selectedMethod === 'oxxo' && (
              <div className="w-2 h-2 rounded-full bg-white" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;