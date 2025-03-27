import { FC } from 'react';
import { Barcode } from 'phosphor-react';

const OxxoPayment: FC = () => {
  // Simulate a random reference number
  const referenceNumber = '93000 12345 67890';

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-100">
        <div className="flex items-center justify-center flex-col text-center">
          <Barcode size={48} weight="bold" className="text-yellow-700 mb-4" />
          <h3 className="text-lg font-medium text-yellow-800 mb-2">
            Referencia de pago
          </h3>
          <p className="text-2xl font-mono font-bold text-yellow-900 tracking-wider mb-4">
            {referenceNumber}
          </p>
          <div className="text-sm text-yellow-700 space-y-2">
            <p>1. Acude a tu OXXO más cercano</p>
            <p>2. Indica al cajero que quieres realizar un pago de servicio</p>
            <p>3. Muestra este código al cajero</p>
            <p>4. Conserva tu ticket</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-700 mb-2">Importante:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• El pago se verá reflejado en 24-48 horas hábiles</li>
          <li>• Esta referencia expira en 48 horas</li>
          <li>• Solo se acepta pago en efectivo</li>
        </ul>
      </div>

      <button
        onClick={() => window.print()}
        className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
      >
        Imprimir referencia
      </button>
    </div>
  );
};

export default OxxoPayment;