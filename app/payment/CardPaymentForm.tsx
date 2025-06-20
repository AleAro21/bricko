import { FC, useState } from 'react';

interface CardPaymentFormProps {
  onSubmit: () => void;
}

const CardPaymentForm: FC<CardPaymentFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      formattedValue = formattedValue.substring(0, 19);
    }

    // Format expiry date
    if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2, 4);
      }
      formattedValue = formattedValue.substring(0, 5);
    }

    // Limit CVV to 3-4 digits
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically validate the form data
    const isValid = formData.cardNumber.length >= 16 &&
                   formData.expiry.length === 5 &&
                   formData.cvv.length >= 3 &&
                   formData.name.length > 0;

    if (isValid) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Número de tarjeta
        </label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleInputChange}
          placeholder="1234 5678 9012 3456"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#f95940] focus:border-[#f95940]"
          maxLength={19}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de expiración
          </label>
          <input
            type="text"
            id="expiry"
            name="expiry"
            value={formData.expiry}
            onChange={handleInputChange}
            placeholder="MM/YY"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#f95940] focus:border-[#f95940]"
            maxLength={5}
            required
          />
        </div>

        <div>
          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={formData.cvv}
            onChange={handleInputChange}
            placeholder="123"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#f95940] focus:border-[#f95940]"
            maxLength={4}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre en la tarjeta
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Como aparece en la tarjeta"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#f95940] focus:border-[#f95940]"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#f95940] text-white py-3 rounded-lg font-medium hover:bg-[#f95940 transition-colors duration-200"
      >
        Pagar ahora
      </button>
    </form>
  );
};

export default CardPaymentForm;