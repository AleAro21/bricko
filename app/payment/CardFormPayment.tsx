import { FC, FormEvent } from 'react';
import PrimaryButton from '@/components/reusables/PrimaryButton';

interface CardFormPaymentProps {
  onSubmit: (e: FormEvent) => void;
}

const CardFormPayment: FC<CardFormPaymentProps> = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Número de Tarjeta
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg focus:ring-[#0171e3] focus:border-[#0171e3]"
          placeholder="1234 5678 9012 3456"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Expiración
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring-[#0171e3] focus:border-[#0171e3]"
            placeholder="MM/YY"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CVV
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring-[#0171e3] focus:border-[#0171e3]"
            placeholder="123"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre en la Tarjeta
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg focus:ring-[#0171e3] focus:border-[#0171e3]"
          placeholder="Juan Pérez"
          required
        />
      </div>

      <PrimaryButton type="submit" className="w-full">
        Pagar Ahora
      </PrimaryButton>
    </form>
  );
}

export default CardFormPayment;