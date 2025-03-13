import { FC } from "react";
import { Check, ShieldCheck, Clock } from "phosphor-react";

interface PaymentSummaryProps {
  amount: number;
  basePrice: number;
  addonPrice: number;
  addonSelected: boolean;
}

const PaymentSummary: FC<PaymentSummaryProps> = ({ 
  amount, 
  basePrice, 
  addonPrice,
  addonSelected 
}) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
      <h2 className="text-[22px] font-[500] text-[#1d1d1f] mb-6">Resumen de Compra</h2>

      <div className="space-y-6">
        {/* Base Service */}
        <div>
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-[16px] font-medium text-[#1d1d1f]">Testamento Digital</span>
              <p className="text-sm text-gray-600 mt-1">Servicio base completo</p>
            </div>
            <span className="text-[16px] font-[500] text-[#1d1d1f]">
              ${basePrice.toFixed(2)} MXN
            </span>
          </div>
          <ul className="mt-3 space-y-2">
            <li className="flex items-center gap-2 text-sm text-gray-600">
              <Check size={16} className="text-green-500" />
              Creación de testamento digital legal
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-600">
              <Check size={16} className="text-green-500" />
              Asesoría legal incluida
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-600">
              <Check size={16} className="text-green-500" />
              Almacenamiento seguro
            </li>
          </ul>
        </div>

        {/* Add-on Section */}
        {addonSelected && (
          <div className="pt-4 border-t border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[16px] font-medium text-[#047aff]">Seguro de Modificaciones</span>
                <p className="text-sm text-gray-600 mt-1">3 modificaciones futuras incluidas</p>
              </div>
              <span className="text-[16px] font-[500] text-[#047aff]">
                +${addonPrice.toFixed(2)} MXN
              </span>
            </div>
          </div>
        )}

        {/* Total */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-[17px] font-[500] text-[#1d1d1f]">Total</span>
            <span className="text-[22px] font-[500] text-[#047aff]">
              ${amount.toFixed(2)} MXN
            </span>
          </div>
        </div>

        {/* Benefits and Security */}
        <div className="space-y-4 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2 text-gray-500">
            <ShieldCheck weight="regular" size={20} />
            <span className="text-[14px]">Pago 100% seguro y encriptado</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-500">
            <Clock weight="regular" size={20} />
            <span className="text-[14px]">Proceso de pago: 2-3 minutos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;