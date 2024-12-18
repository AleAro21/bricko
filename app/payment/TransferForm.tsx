import { FC } from 'react';
import { FaCopy } from 'react-icons/fa';

const TransferForm: FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Datos Bancarios</h4>
        
        <div className="space-y-3">
          <div>
            <span className="text-sm text-gray-600">Banco:</span>
            <div className="flex justify-between items-center">
              <span className="font-medium">BBVA</span>
              <button 
                onClick={() => copyToClipboard('BBVA')}
                className="text-[#0171e3] hover:text-[#0171e3]/80"
              >
                <FaCopy />
              </button>
            </div>
          </div>

          <div>
            <span className="text-sm text-gray-600">Cuenta CLABE:</span>
            <div className="flex justify-between items-center">
              <span className="font-medium">012345678901234567</span>
              <button 
                onClick={() => copyToClipboard('012345678901234567')}
                className="text-[#0171e3] hover:text-[#0171e3]/80"
              >
                <FaCopy />
              </button>
            </div>
          </div>

          <div>
            <span className="text-sm text-gray-600">Beneficiario:</span>
            <div className="flex justify-between items-center">
              <span className="font-medium">Testamentos Digitales SA de CV</span>
              <button 
                onClick={() => copyToClipboard('Testamentos Digitales SA de CV')}
                className="text-[#0171e3] hover:text-[#0171e3]/80"
              >
                <FaCopy />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0171e3]/5 p-4 rounded-lg border border-[#0171e3]">
        <p className="text-sm">
          Una vez realizada la transferencia, por favor envía el comprobante a{' '}
          <a href="mailto:pagos@testamentos.com" className="text-[#0171e3] font-medium">
            pagos@testamentos.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default TransferForm;