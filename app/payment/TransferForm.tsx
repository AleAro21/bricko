import { FC } from 'react';
import { FaCopy } from 'react-icons/fa';

const TransferForm: FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#f5f5f7] rounded-2xl p-6">
        <h3 className="text-[17px] font-[500] text-[#1d1d1f] mb-4">Datos Bancarios</h3>
        
        <div className="space-y-4">
          <div>
            <span className="text-[14px] text-gray-500">Banco:</span>
            <div className="flex justify-between items-center mt-1">
              <span className="text-[16px] text-[#1d1d1f]">BBVA</span>
              <button 
                onClick={() => copyToClipboard('BBVA')}
                className="text-[#047aff] hover:text-[#047aff]/80 transition-colors"
              >
                <FaCopy size={16} />
              </button>
            </div>
          </div>

          <div>
            <span className="text-[14px] text-gray-500">Cuenta CLABE:</span>
            <div className="flex justify-between items-center mt-1">
              <span className="text-[16px] text-[#1d1d1f]">012345678901234567</span>
              <button 
                onClick={() => copyToClipboard('012345678901234567')}
                className="text-[#047aff] hover:text-[#047aff]/80 transition-colors"
              >
                <FaCopy size={16} />
              </button>
            </div>
          </div>

          <div>
            <span className="text-[14px] text-gray-500">Beneficiario:</span>
            <div className="flex justify-between items-center mt-1">
              <span className="text-[16px] text-[#1d1d1f]">Testamentos Digitales SA de CV</span>
              <button 
                onClick={() => copyToClipboard('Testamentos Digitales SA de CV')}
                className="text-[#047aff] hover:text-[#047aff]/80 transition-colors"
              >
                <FaCopy size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#047aff] bg-opacity-5 p-6 rounded-2xl border border-[#047aff] border-opacity-20">
        <p className="text-[14px] text-[#1d1d1f]">
          Una vez realizada la transferencia, por favor envía el comprobante a{' '}
          <a 
            href="mailto:pagos@testamentos.com" 
            className="text-[#047aff] font-[500] hover:text-[#047aff]/80 transition-colors"
          >
            pagos@testamentos.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default TransferForm;