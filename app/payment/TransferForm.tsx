// 4. Update TransferForm.tsx to accept amount prop but preserve UI
// components/Payment/TransferForm.tsx
"use client";
import { FC } from "react";
import PrimaryButton from "@/components/reusables/PrimaryButton";
import { useRouter } from "next/navigation";

// Preserving your existing UI with the added amount prop
const TransferForm: FC<{ amount?: number }> = ({ amount = 2499 }) => {
  const router = useRouter();
  
  // Your existing component logic
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/payment-success");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Instrucciones de Transferencia</h3>
          <p className="text-sm text-gray-600 mt-1">
            Realice una transferencia bancaria a la siguiente cuenta:
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <dl className="divide-y divide-gray-200">
            <div className="py-2 flex justify-between">
              <dt className="text-sm font-medium text-gray-500">Banco</dt>
              <dd className="text-sm font-medium text-gray-900">BBVA</dd>
            </div>
            <div className="py-2 flex justify-between">
              <dt className="text-sm font-medium text-gray-500">Titular</dt>
              <dd className="text-sm font-medium text-gray-900">Testame S.A de C.V.</dd>
            </div>
            <div className="py-2 flex justify-between">
              <dt className="text-sm font-medium text-gray-500">Cuenta</dt>
              <dd className="text-sm font-medium text-gray-900">0123456789</dd>
            </div>
            <div className="py-2 flex justify-between">
              <dt className="text-sm font-medium text-gray-500">CLABE</dt>
              <dd className="text-sm font-medium text-gray-900">012345678901234567</dd>
            </div>
            <div className="py-2 flex justify-between">
              <dt className="text-sm font-medium text-gray-500">Concepto</dt>
              <dd className="text-sm font-medium text-gray-900">TESTAME-{new Date().getTime().toString().slice(-6)}</dd>
            </div>
            <div className="py-2 flex justify-between">
              <dt className="text-sm font-medium text-gray-500">Monto</dt>
              <dd className="text-sm font-medium text-gray-900">${(amount / 100).toFixed(2)} MXN</dd>
            </div>
          </dl>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg text-sm text-yellow-800">
          <p>
            <strong>Importante:</strong> Después de realizar la transferencia, envía el comprobante a{" "}
            <a href="mailto:pagos@testame.com" className="underline">pagos@testame.com</a>{" "}
            incluyendo tu número de cuenta en el asunto.
          </p>
        </div>

        <div className="pt-2">
          <PrimaryButton type="submit" className="w-full">
            He Realizado la Transferencia
          </PrimaryButton>
        </div>
      </div>
    </form>
  );
};

export default TransferForm;