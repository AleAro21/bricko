'use client';

import { FC, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/common/DashboardLayout';
import PaymentMethod from '@/app/payment/PaymentMethod';
import PaymentSummary from '@/app/payment/PaymentSummary';
import CardFormPayment from '@/app/payment/CardFormPayment';
import TransferForm from '@/app/payment/TransferForm';

const PaymentClient: FC = () => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer'>('card');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle payment processing here
    router.push('/payment-success');
  };

  return (
    <DashboardLayout>
      <div className="container w-3/4 mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8">Método de Pago</h1>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-6">
            <div className="space-y-4">
              <PaymentMethod
                method="card"
                selected={paymentMethod === 'card'}
                onSelect={() => setPaymentMethod('card')}
              />
              <PaymentMethod
                method="transfer"
                selected={paymentMethod === 'transfer'}
                onSelect={() => setPaymentMethod('transfer')}
              />
            </div>

            <div className="bg-white p-6 rounded-lg border">
              {paymentMethod === 'card' ? (
                <CardFormPayment onSubmit={handleSubmit} />
              ) : (
                <TransferForm />
              )}
            </div>
          </div>

          <div>
            <PaymentSummary amount={2499} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PaymentClient;