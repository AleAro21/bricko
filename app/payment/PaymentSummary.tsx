import { FC } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

interface PaymentSummaryProps {
  amount: number;
}

const PaymentSummary: FC<PaymentSummaryProps> = ({ amount }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Resumen de Pago</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span>Testamento Digital</span>
          <span className="font-medium">${amount.toFixed(2)} MXN</span>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-xl">${amount.toFixed(2)} MXN</span>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex items-center gap-2 text-[#0171e3]">
          <FaCheckCircle />
          <span>Pago único</span>
        </div>
        <div className="flex items-center gap-2 text-[#0171e3]">
          <FaCheckCircle />
          <span>Soporte incluido</span>
        </div>
      </div>
    </div>
  );
}

export default PaymentSummary;