import { FC } from "react";
import { Check, ShieldCheck, Clock } from "phosphor-react";
import { Subscription } from "@/types";

interface PaymentSummaryProps {
  amount: number;
  subscription?: Subscription;
}

const PaymentSummary: FC<PaymentSummaryProps> = ({ amount, subscription }) => {
  // Use the selected subscription name if available
  const subscriptionName = subscription?.name || "Testamento Digital";
  // Format the amount correctly (no division by 100 since it's already in the correct format)
  const formattedAmount = amount.toFixed(2);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
      <h2 className="text-[22px] font-[500] text-[#1d1d1f] mb-6">Resumen de Pago</h2>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-[16px] text-[#1d1d1f]">{subscriptionName}</span>
          <span className="text-[16px] font-[500] text-[#1d1d1f]">
            ${formattedAmount} MXN
          </span>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-[17px] font-[500] text-[#1d1d1f]">Total</span>
            <span className="text-[22px] font-[500] text-[#047aff]">
              ${formattedAmount} MXN
            </span>
          </div>
        </div>

        <div className="space-y-4 mt-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#047aff] flex items-center justify-center mt-0.5">
              <Check weight="bold" className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[16px] text-[#1d1d1f] leading-6">Pago único sin renovaciones automáticas</span>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#047aff] flex items-center justify-center mt-0.5">
              <Check weight="bold" className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[16px] text-[#1d1d1f] leading-6">Soporte técnico incluido</span>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#047aff] flex items-center justify-center mt-0.5">
              <Check weight="bold" className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[16px] text-[#1d1d1f] leading-6">Actualizaciones gratuitas</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-gray-500">
            <ShieldCheck weight="thin" size={20} />
            <span className="text-[14px]">Pago 100% seguro y encriptado</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-500 mt-2">
            <Clock weight="thin" size={20} />
            <span className="text-[14px]">Proceso de pago: 2-3 minutos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;