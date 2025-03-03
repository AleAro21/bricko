"use client";
import { FC, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/common/DashboardLayout';
import PaymentMethod from './PaymentMethod';
import PaymentSummary from './PaymentSummary';
import CardFormPayment from './CardFormPayment';
import TransferForm from './TransferForm';
import { motion } from 'framer-motion';

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
      <motion.div 
        className="min-h-screen bg-[#f5f5f7]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-5 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
            {/* Left Column - Title and Payment Form */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5">
                  <span className="text-[#047aff] text-[14px] font-[400]">PAGO</span>
                </div>

                <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                    <span className="text-[#1d1d1f]">Seleccione su </span>
                    <span
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #7abaff 1%, #047aff 60%, #0d4ba3 100%)",
                      }}
                      className="inline-block text-transparent bg-clip-text"
                    >
                      método de pago
                    </span>
                  </h1>

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
              </div>

              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="p-6">
                  {paymentMethod === 'card' ? (
                    <CardFormPayment onSubmit={handleSubmit} />
                  ) : (
                    <TransferForm />
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Payment Summary */}
            <div>
              <PaymentSummary amount={2499} />
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default PaymentClient;