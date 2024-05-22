'use client';
import DashboardLayout from '@/components/common/DashboardLayout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const page = () => {
  const router = useRouter();
  const [activeAccordion, setActiveAccordion] = useState(null);
  const toggleAccordion = (index) => {
    setActiveAccordion((prev) => (prev === index ? null : index));
  };
  return (
    <DashboardLayout>
      <div className='container w-3/4 mx-auto flex flex-col h-full min-h-screen'>
        <div className='w-full flex flex-col py-12'>
          <div className='w-full flex gap-4'>
            <div className='w-[50%] flex flex-col'>
                <p className="title py-4">invita a tus amigos y familia</p>
                <p className="sm-title py-4">Obtienes £10 y ellos obtienen un 25% de descuento sobre el precio de su testamento.</p>
                <p className="text-style py-4">Por cada persona que complete su testamento, le daremos un año gratuito de actualizaciones por valor de £10..</p>
                <p className="text-style py-4">Además obtendrán un 25% de descuento sobre el precio de su testamento. ¡Eso es £25 de descuento sobre el precio total!</p>
                <p className="title py-6">Comparte tu enlace personal</p>
                <div className="bg-white p-6">
                    <div className="flex ">
                        <p className="text-style w-full border-2 border-dashed	 border-r-0 px-2 py-4">https://testador.mx/r/sdcsdc-16371</p>
                        <button className='bg-blue-900 text-style py-4 border-2 border-blue-900 text-white h-full w-full max-w-[120px] my-auto' style={{color:"white"}}>Copiar</button>
                    </div>
                    <div className="flex gap-2 pt-3">
                        <button className='bg-green-500 text-style rounded-lg py-4  text-white h-full w-full my-auto' style={{color:"white"}}>WhatsApp</button>
                        <button className='bg-sky-400 text-style rounded-lg py-4  text-white h-full w-full my-auto' style={{color:"white"}}>Twitter</button>
                        <button className='bg-blue-500 text-style rounded-lg py-4  text-white h-full w-full my-auto' style={{color:"white"}}>Facebook</button>
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

export default page;
