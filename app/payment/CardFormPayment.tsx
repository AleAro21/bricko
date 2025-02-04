import { FC, FormEvent } from 'react';
import PrimaryButton from '@/components/reusables/PrimaryButton';

interface CardFormPaymentProps {
  onSubmit: (e: FormEvent) => void;
}

const CardFormPayment: FC<CardFormPaymentProps> = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="cardNumber" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
          Número de Tarjeta <span className="text-[#047aff]">*</span>
        </label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          required
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all text-[16px]"
          placeholder="1234 5678 9012 3456"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="expiry" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
            Fecha de Expiración <span className="text-[#047aff]">*</span>
          </label>
          <input
            type="text"
            id="expiry"
            name="expiry"
            required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all text-[16px]"
            placeholder="MM/YY"
          />
        </div>
        <div>
          <label htmlFor="cvv" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
            CVV <span className="text-[#047aff]">*</span>
          </label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all text-[16px]"
            placeholder="123"
          />
        </div>
      </div>

      <div>
        <label htmlFor="cardName" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
          Nombre en la Tarjeta <span className="text-[#047aff]">*</span>
        </label>
        <input
          type="text"
          id="cardName"
          name="cardName"
          required
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all text-[16px]"
          placeholder="Juan Pérez"
        />
      </div>

      <div className="pt-2">
        <PrimaryButton type="submit" className="w-full">
          Pagar Ahora
        </PrimaryButton>
      </div>
    </form>
  );
}

export default CardFormPayment;