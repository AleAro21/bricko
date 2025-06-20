import { FC } from "react";
import { CreditCard, Bank } from "phosphor-react";

interface PaymentMethodProps {
  method: "card" | "transfer";
  selected: boolean;
  onSelect: () => void;
}

const PaymentMethod: FC<PaymentMethodProps> = ({ method, selected, onSelect }) => {
  const title = method === "card" ? "Tarjeta de Crédito/Débito" : "Transferencia Bancaria";
  const description =
    method === "card" ? "Pago seguro con tarjeta" : "Transferencia directa a nuestra cuenta";

  return (
    <div
      onClick={onSelect}
      className={`rounded-xl cursor-pointer transition-all duration-300 ${
        selected 
          ? "border-2 border-[#f95940] bg-white shadow-md" 
          : "bg-white hover:bg-[#f8faff] border border-gray-100"
      }`}
    >
      <div className="p-5 flex items-center gap-4">
        <div className={`p-3 rounded-full ${selected ? "bg-[#f95940]/10" : "bg-[#f95940]/5"}`}>
          {method === "card" ? (
            <CreditCard weight="regular" size={24} className="text-[#f95940]" />
          ) : (
            <Bank weight="regular" size={24} className="text-[#f95940]" />
          )}
        </div>
        <div>
          <h3 className={`text-[17px] font-[500] ${selected ? "text-[#f95940]" : "text-[#1d1d1f]"}`}>{title}</h3>
          <p className="text-[14px] text-gray-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;