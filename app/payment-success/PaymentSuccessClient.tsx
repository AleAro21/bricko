'use client';

import { FC, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/common/DashboardLayout';
import { FaCheckCircle } from 'react-icons/fa';

const PaymentSuccessClient: FC = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/summary');
    }, 5000); // Redirect after 5 seconds
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <DashboardLayout>
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7]">
        <div className="bg-white rounded-2xl shadow-md p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <FaCheckCircle className="text-[#0171e3] w-24 h-24" />
          </div>
          <h1 className="text-3xl font-bold text-[#1d1d1f] mb-2">
            ¡Pago Exitoso!
          </h1>
          <p className="text-gray-600 mb-4">
            Tu pago ha sido procesado correctamente. Serás redirigido a tu resumen en 5 segundos...
          </p>
          <div className="flex justify-center">
            <div className="animate-pulse">
              <div className="w-4 h-4 bg-[#0171e3] rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PaymentSuccessClient;
