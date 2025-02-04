import { FC } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

interface PaymentSummaryProps {
  amount: number;
}

const PaymentSummary: FC<PaymentSummaryProps> = ({ amount }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-[22px] font-[500] text-[#1d1d1f] mb-6">Resumen de Pago</h2>
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-[16px] text-[#1d1d1f]">Testamento Digital</span>
          <span className="text-[16px] font-[500] text-[#1d1d1f]">
            ${amount.toFixed(2)} MXN
          </span>
        </div>
        
        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-[17px] font-[500] text-[#1d1d1f]">Total</span>
            <span className="text-[22px] font-[500] text-[#1d1d1f]">
              ${amount.toFixed(2)} MXN
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[#047aff]">
            <FaCheckCircle className="flex-shrink-0" />
            <span className="text-[14px]">Pago único</span>
          </div>
          <div className="flex items-center gap-2 text-[#047aff]">
            <FaCheckCircle className="flex-shrink-0" />
            <span className="text-[14px]">Soporte incluido</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSummary;