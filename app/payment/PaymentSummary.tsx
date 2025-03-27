import { FC } from 'react';
import Image from 'next/image';
import { Check, ShieldCheck, Heart } from 'phosphor-react';
import logo from '../../assets/greylogo.svg';

interface PaymentSummaryProps {
  amount: number;
  basePrice: number;
  planName: string;
  features: string[];
  coverage?: number;
  isInsurance?: boolean;
}

const PaymentSummary: FC<PaymentSummaryProps> = ({
  amount,
  basePrice,
  planName,
  features,
  coverage,
  isInsurance = false,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Resumen de {isInsurance ? 'cobertura' : 'compra'}</h2>
      <div className="absolute top-4 right-4 z-10">
            <Image
              src={logo}
              alt="Company Logo"
              width={100}
              height={30}
              className="h-5 w-auto"
            />
          </div>
      <div className="space-y-4">
        <div className="pb-4 border-b border-gray-100">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium text-gray-900">{planName}</h3>
              {isInsurance && coverage && (
                <div className="flex items-center gap-2 mt-1">
                  <ShieldCheck weight="fill" className="text-blue-500 w-4 h-4" />
                  <span className="text-sm text-gray-600">
                    Cobertura hasta {formatCurrency(coverage)}
                  </span>
                </div>
              )}
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-900">${basePrice}</p>
              <p className="text-sm text-gray-500">{isInsurance ? 'MXN/mes' : 'MXN'}</p>
            </div>
          </div>
          
          <div className="space-y-2 mt-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <Check size={16} className="text-green-500" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        {isInsurance && (
          <div className="py-4 border-b border-gray-100">
            <div className="flex items-start gap-3">
              <Heart weight="fill" className="text-red-500 w-5 h-5 mt-1" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Protección Garantizada</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Tu póliza estará activa inmediatamente después del primer pago
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">
              {isInsurance ? 'Pago mensual' : 'Total'}
            </span>
            <div className="text-right">
              <p className="text-2xl font-semibold text-[#047aff]">${amount}</p>
              <p className="text-sm text-gray-500">{isInsurance ? 'MXN/mes' : 'MXN'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;