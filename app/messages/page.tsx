'use client';
import { FC } from 'react';
import DashboardLayout from '@/components/common/DashboardLayout';
import { useRouter } from 'next/navigation';

const MessagesPage: FC = () => {
  const router = useRouter();

  return (
    <DashboardLayout>
      <div className='container w-3/4 mx-auto flex flex-col h-full min-h-screen'>
        <div className='w-full flex flex-col py-12'>
          <p className='title'>Mis mensajes</p>
          <div className='w-full flex'>
            <div className='w-[50%] flex flex-col'>
              <p className='text-style py-6'>
                Una vez que haya terminado con su testamento, uno de nuestros expertos legales lo revisará para asegurarse de que todo esté bien. Si hay algún problema, le enviaremos un mensaje de inmediato.
              </p>
            </div>
            <div className='w-[50%]'></div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;