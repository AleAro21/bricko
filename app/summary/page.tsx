'use client';
import { FC } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/common/DashboardLayout";
import PrimaryButton from "@/components/reusables/PrimaryButton";
import { FaLock, FaChevronRight } from 'react-icons/fa';

// Types
interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  duration: string;
  route: string;
  onClick: () => void;
  isOptional?: boolean;
}

interface ProgressBarProps {
  progress: number;
}

// Internal Components
const StepCard: FC<StepCardProps> = ({
  stepNumber,
  title,
  description,
  duration,
  onClick,
  isOptional
}) => {
  return (
    <div className="border bg-white rounded-lg p-3 md:p-6 md:w-[80%] mt-4">
      <p className="text-style">{isOptional ? title : `Paso ${stepNumber} (${duration}):`}</p>
      <p className="title py-1">{isOptional ? description : title}</p>
      <p className="text-style">{isOptional ? duration : description}</p>
      <PrimaryButton onClick={onClick}>
        Continuar
      </PrimaryButton>
    </div>
  );
};

const ProgressBar: FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full">
      <p className="font-semibold text-[18px]" style={{ color: '#0171e3' }}>
        Completado: {progress}%
      </p>
      <div className="flex w-full h-[10px] bg-gray-300 rounded-lg items-center my-2">
        <div
          className="h-full flex rounded-lg"
          style={{ width: `${progress}%`, backgroundColor: '#0171e3' }}
        ></div>
      </div>
    </div>
  );
};

const PaymentSection: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="mt-8 border-2 rounded-lg p-6 cursor-pointer transition-colors hover:bg-[rgba(1,113,227,0.05)]"
      style={{ 
        borderColor: '#0171e3'
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2" style={{ color: '#0171e3' }}>
            Asegura tu Testamento
          </h3>
          <p className="text-gray-600">
            Completa tu proceso realizando el pago para generar tu testamento oficial
          </p>
        </div>
        <div className="ml-4">
          <div className="w-16 h-16 relative flex items-center justify-center" style={{ color: '#0171e3' }}>
            <FaLock size={40} />
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center" style={{ color: '#0171e3' }}>
        <span className="font-medium">Proceder al pago</span>
        <FaChevronRight className="w-4 h-4 ml-2" />
      </div>
    </div>
  );
};

// Step Data
const mainSteps = [
  {
    stepNumber: 1,
    title: "Cuentanos sobre ti",
    description: "Información para personalizar tu testamento.",
    duration: "2-4 minutos",
    route: "/about-yourself/name"
  },
  {
    stepNumber: 2,
    title: "Cuentas y Propiedades",
    description: "Menciona donde estan tus activos",
    duration: "1-4 minutos",
    route: "/account-and-property"
  },
  {
    stepNumber: 3,
    title: "Herencia",
    description: "Define a las personas o entidades que heredarán tus bienes.",
    duration: "3-5 minutos",
    route: "/estate/introduction"
  },
  {
    stepNumber: 4,
    title: "Albaceas",
    description: "Selecciona a la persona o personas encargadas de cumplir tus últimas voluntades.",
    duration: "3-5 minutos",
    route: "/executers/introduction"
  }
];

const optionalSteps = [
  {
    title: "Regalos",
    description: "Regalos",
    duration: "Oportunidad de dejar regalos a personas especiales",
    route: ""
  },
  {
    title: "Activos digitales",
    description: "Activos digitales",
    duration: "Distribuye tus bienes o derechos digitales",
    route: "/digital-asset"
  }
];

// Main Component
const SummaryPage: FC = () => {
  const router = useRouter();
  const params = useSearchParams();
  const paramValue = params ? params.get("completed") : null;
  const pass: number = 5;

  const handlePaymentClick = () => {
    router.push("/payment");
  };

  return (
    <DashboardLayout>
      <div className="container w-3/4 mx-auto flex flex-col h-full min-h-screen">
        <div className="w-full flex flex-col py-12">
          <p className="title">Tu Testamento</p>
          <p className="text-style py-4">
            Te guiamos en cada etapa para asegurar que tu voluntad se refleje
            con claridad.
          </p>
          
          <div className="w-full flex">
            <div className="w-[50%] flex flex-col">
              {mainSteps.map((step) => (
                <StepCard
                  key={step.stepNumber}
                  {...step}
                  onClick={() => router.push(step.route)}
                />
              ))}
              
              <p className="sm-title pt-4">Opcional</p>
              {optionalSteps.map((step, index) => (
                <StepCard
                  key={index}
                  stepNumber={0}
                  {...step}
                  onClick={() => router.push(step.route)}
                  isOptional
                />
              ))}
            </div>

            <div className="w-[50%]">
              <div className="md:w-[80%] mt-3">
                <ProgressBar progress={pass} />
                
                <div className="w-full mt-[50px]">
                  <p className="title py-1">Tu voluntad</p>
                  <p className="text-style py-2">
                    La primera parte de su testamento tiene que ver contigo y tu
                    familia. Completa la informacion en el Paso 1 para avanzar
                  </p>
                  
                  <PaymentSection onClick={handlePaymentClick} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SummaryPage;