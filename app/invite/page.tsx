'use client';
import { FC, useState } from 'react';
import DashboardLayout from '@/components/common/DashboardLayout';
import { useRouter } from 'next/navigation';

interface SocialButtonProps {
  color: string;
  platform: string;
}

const SocialButton: FC<SocialButtonProps> = ({ color, platform }) => (
  <button 
    className={`${color} text-style rounded-lg py-4 text-white h-full w-full my-auto`}
    style={{ color: "white" }}
  >
    {platform}
  </button>
);

const InvitePage: FC = () => {
  const router = useRouter();
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number): void => {
    setActiveAccordion((prev) => (prev === index ? null : index));
  };

  const socialButtons = [
    { color: 'bg-green-500', platform: 'WhatsApp' },
    { color: 'bg-sky-400', platform: 'Twitter' },
    { color: 'bg-[#f95940]/200', platform: 'Facebook' }
  ];

  return (
    <DashboardLayout>
      <div className='container w-3/4 mx-auto flex flex-col h-full min-h-screen'>
        <div className='w-full flex flex-col py-12'>
          <div className='w-full flex gap-4'>
            <div className='w-[50%] flex flex-col'>
              <p className="title py-4">Invita a tus amigos y familia</p>
              <p className="sm-title py-4">
                Obtienes £10 y ellos obtienen un 25% de descuento sobre el precio de su testamento.
              </p>
              <p className="text-style py-4">
                Por cada persona que complete su testamento, le daremos un año gratuito de actualizaciones por valor de £10.
              </p>
              <p className="text-style py-4">
                Además obtendrán un 25% de descuento sobre el precio de su testamento. ¡Eso es £25 de descuento sobre el precio total!
              </p>
              <p className="title py-6">Comparte tu enlace personal</p>
              <div className="bg-white p-6">
                <div className="flex">
                  <p className="text-style w-full border-2 border-dashed border-r-0 px-2 py-4">
                    https://testador.mx/r/sdcsdc-16371
                  </p>
                  <button 
                    className='bg-blue-900 text-style py-4 border-2 border-blue-900 text-white h-full w-full max-w-[120px] my-auto'
                    style={{ color: "white" }}
                  >
                    Copiar
                  </button>
                </div>
                <div className="flex gap-2 pt-3">
                  {socialButtons.map((button, index) => (
                    <SocialButton
                      key={index}
                      color={button.color}
                      platform={button.platform}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className='w-[50%]'>
              <div className="bg-yellow-200 p-6 w-[60%]">
                <p className="title">0</p>
                <p className="sm-title">Año libre</p>
                <p className="title pt-2">$0.00</p>
                <p className="sm-title py-2">Dinero ahorrado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InvitePage;