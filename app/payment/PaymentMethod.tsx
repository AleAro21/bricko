import { FC } from 'react';
import { FaCreditCard, FaUniversity } from 'react-icons/fa';

interface PaymentMethodProps {
  method: 'card' | 'transfer';
  selected: boolean;
  onSelect: () => void;
}

const PaymentMethod: FC<PaymentMethodProps> = ({ method, selected, onSelect }) => {
  const Icon = method === 'card' ? FaCreditCard : FaUniversity;
  const title = method === 'card' ? 'Tarjeta de Crédito/Débito' : 'Transferencia Bancaria';
  const description = method === 'card' 
    ? 'Pago seguro con tarjeta' 
    : 'Transferencia directa a nuestra cuenta';

  return (
    <div
      onClick={onSelect}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
        selected 
          ? 'border-[#0171e3] bg-[#0171e3]/5' 
          : 'border-gray-200 hover:border-[#0171e3]'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${selected ? 'bg-[#0171e3] text-white' : 'bg-gray-100'}`}>
          <Icon size={24} />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethod;