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
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <DashboardLayout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6 p-8 max-w-lg">
          <div className="flex justify-center">
            <FaCheckCircle className="text-[#0171e3] w-24 h-24" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900">
            ¡Pago Exitoso!
          </h1>
          
          <p className="text-gray-600">
            Tu pago ha sido procesado correctamente. Serás redirigido automáticamente 
            en unos segundos...
          </p>

          <div className="animate-pulse inline-block">
            <div className="w-4 h-4 bg-[#0171e3] rounded-full" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PaymentSuccessClient;