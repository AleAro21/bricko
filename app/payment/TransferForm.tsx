import { FC, useState } from "react";
import { Copy, CheckCircle, Bank, ArrowRight } from "phosphor-react";
import PrimaryButton from "@/components/reusables/PrimaryButton";
import { useRouter } from "next/navigation";

interface TransferFormProps {
  amount: number;
}

const TransferForm: FC<TransferFormProps> = ({ amount }) => {
  const router = useRouter();
  const [copied, setCopied] = useState<string | null>(null);
  
  // Bank account details
  const bankDetails = {
    bank: "BBVA",
    accountName: "Testamento Digital S.A. de C.V.",
    accountNumber: "0123456789",
    clabe: "012345678901234567",
    reference: "TEST-" + Math.floor(100000 + Math.random() * 900000),
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleConfirmTransfer = () => {
    // Here you would typically send a notification to your backend
    // that the user claims to have made a transfer
    router.push("/payment-pending");
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
        <p className="text-[15px] text-[#1d1d1f]">
          Realiza una transferencia bancaria por el monto de{" "}
          <span className="font-bold text-[#047aff]">${amount.toFixed(2)} MXN</span> a la siguiente cuenta:
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[14px] text-gray-500">Banco</p>
            <p className="text-[16px] font-medium">{bankDetails.bank}</p>
          </div>
          <div className="w-10 h-10 bg-[#f5f5f7] rounded-full flex items-center justify-center">
            <Bank weight="regular" size={24} className="text-[#047aff]" />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-[14px] text-gray-500">Beneficiario</p>
            <p className="text-[16px] font-medium">{bankDetails.accountName}</p>
          </div>
          <button
            onClick={() => copyToClipboard(bankDetails.accountName, "accountName")}
            className="text-[#047aff] hover:text-[#0d4ba3] transition-colors"
          >
            {copied === "accountName" ? (
              <CheckCircle weight="fill" size={20} />
            ) : (
              <Copy size={20} />
            )}
          </button>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-[14px] text-gray-500">Número de Cuenta</p>
            <p className="text-[16px] font-medium">{bankDetails.accountNumber}</p>
          </div>
          <button
            onClick={() => copyToClipboard(bankDetails.accountNumber, "accountNumber")}
            className="text-[#047aff] hover:text-[#0d4ba3] transition-colors"
          >
            {copied === "accountNumber" ? (
              <CheckCircle weight="fill" size={20} />
            ) : (
              <Copy size={20} />
            )}
          </button>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-[14px] text-gray-500">CLABE Interbancaria</p>
            <p className="text-[16px] font-medium">{bankDetails.clabe}</p>
          </div>
          <button
            onClick={() => copyToClipboard(bankDetails.clabe, "clabe")}
            className="text-[#047aff] hover:text-[#0d4ba3] transition-colors"
          >
            {copied === "clabe" ? (
              <CheckCircle weight="fill" size={20} />
            ) : (
              <Copy size={20} />
            )}
          </button>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-[14px] text-gray-500">Referencia (importante)</p>
            <p className="text-[16px] font-medium text-[#047aff]">{bankDetails.reference}</p>
          </div>
          <button
            onClick={() => copyToClipboard(bankDetails.reference, "reference")}
            className="text-[#047aff] hover:text-[#0d4ba3] transition-colors"
          >
            {copied === "reference" ? (
              <CheckCircle weight="fill" size={20} />
            ) : (
              <Copy size={20} />
            )}
          </button>
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100 mt-6">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <ArrowRight weight="bold" size={16} className="text-yellow-600" />
          </div>
          <p className="text-[14px] text-yellow-800">
            Una vez realizada la transferencia, haz clic en el botón de abajo para notificarnos. 
            Verificaremos el pago y activaremos tu testamento en un plazo de 24-48 horas hábiles.
          </p>
        </div>
      </div>

      <div className="pt-4">
        <PrimaryButton onClick={handleConfirmTransfer} className="w-full">
          He realizado la transferencia
        </PrimaryButton>
      </div>
    </div>
  );
};

export default TransferForm;