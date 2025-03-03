// components/Payment/PaymentMethod.tsx
import { FC } from "react";
import { FaCreditCard, FaUniversity } from "react-icons/fa";

interface PaymentMethodProps {
  method: "card" | "transfer";
  selected: boolean;
  onSelect: () => void;
}

const PaymentMethod: FC<PaymentMethodProps> = ({ method, selected, onSelect }) => {
  const Icon = method === "card" ? FaCreditCard : FaUniversity;
  const title = method === "card" ? "Tarjeta de Crédito/Débito" : "Transferencia Bancaria";
  const description =
    method === "card" ? "Pago seguro con tarjeta" : "Transferencia directa a nuestra cuenta";

  return (
    <div
      onClick={onSelect}
      className={`p-6 rounded-2xl shadow-md cursor-pointer transition-all ${
        selected ? "bg-[#047aff] text-white" : "bg-white hover:bg-[#047aff] hover:bg-opacity-5"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${selected ? "bg-white bg-opacity-20" : "bg-[#f5f5f7]"}`}>
          <Icon size={24} className={selected ? "text-white" : "text-[#047aff]"} />
        </div>
        <div>
          <h3 className="text-[17px] font-[500]">{title}</h3>
          <p className={`text-[14px] ${selected ? "text-white text-opacity-80" : "text-gray-500"}`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
