'use client';

import { FC, useEffect } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/common/DashboardLayout";
import PrimaryButton from "@/components/reusables/PrimaryButton";
import { 
  LockSimple, 
  CaretRight, 
  Heart, 
  Buildings, 
  Coins, 
  Users, 
  Gift, 
  Globe,
  Check,
  PencilSimple
} from 'phosphor-react';
import { useUser } from "@/context/UserContext";
import { motion } from 'framer-motion';

interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  duration: string;
  route: string;
  onClick: () => void;
  isOptional?: boolean;
  progress?: number;
  icon?: React.ReactNode;
}

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
}

const getProgressColor = (progress: number): string => {
  if (progress === 100) return '#047aff';
  if (progress >= 11) return '#f97316';
  return '#ef4444';
};

const getProgressBadgeColor = (progress: number): { bg: string; text: string } => {
  if (progress === 100) return { bg: 'bg-blue-100', text: 'text-blue-800' };
  if (progress >= 11) return { bg: 'bg-orange-100', text: 'text-orange-800' };
  return { bg: 'bg-red-100', text: 'text-red-800' };
};

const ProgressBar: FC<ProgressBarProps> = ({ progress, showLabel = true }) => {
  const color = getProgressColor(progress);
  
  return (
    <div className="w-full">
      {showLabel && (
        <p className="font-medium text-[15px] mb-3" style={{ color }}>
          Completado: {progress}%
        </p>
      )}
      <div className="w-full h-[4px] bg-gray-100 rounded-full">
        <div
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{ 
            width: `${progress}%`, 
            backgroundColor: color 
          }}
        ></div>
      </div>
    </div>
  );
};

const StepCard: FC<StepCardProps> = ({
  stepNumber,
  title,
  description,
  duration,
  onClick,
  isOptional,
  progress = 0,
  icon
}) => {
  const badgeColors = getProgressBadgeColor(progress);
  const color = getProgressColor(progress);

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl p-6 transition-all duration-500 cursor-pointer w-full shadow-md hover:shadow-lg relative"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-[#047aff] w-8 h-8 flex items-center justify-center">
              {icon}
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-gray-500">
                {isOptional ? title : `Paso ${stepNumber} • ${duration}`}
              </p>
            </div>
          </div>
          <h3 className="text-[24px] sm:text-[28px] text-[#000000] font-[500] mb-2 pr-2 tracking-[0.1px] leading-[1.3]">
            {isOptional ? description : title}
          </h3>
          <div className="flex justify-between items-center">
            <p className="text-[14px] sm:text-[15px] font-[300] text-[#1d1d1f] mb-0 tracking-[0.1px] leading-[1.3]">
              {isOptional ? duration : description}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-4">
          {progress > 0 && (
            <>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeColors.bg} ${badgeColors.text}`}>
                {progress}% completado
              </span>
              <div className="w-full" style={{ width: 'calc(98%)' }}>
                <div className="w-full h-[4px] bg-gray-100 rounded-full">
                  <div
                    className="h-full rounded-full transition-all duration-300 ease-out"
                    style={{ 
                      width: `${progress}%`, 
                      backgroundColor: color 
                    }}
                  ></div>
                </div>
              </div>
              {progress === 100 && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#047aff] flex items-center justify-center">
                    <Check weight="bold" className="text-white w-4 h-4" />
                  </div>
                  <PencilSimple className="text-[#047aff] w-5 h-5" />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const PaymentSection: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="mt-8 rounded-xl p-6 cursor-pointer transition-all duration-500 hover:shadow-lg bg-gradient-to-r from-blue-50 to-blue-100"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
          <div className="bg-white p-3 rounded-full shadow-sm">
              <LockSimple weight="thin" className="text-blue-600 w-6 h-6" />
            </div>
            <h3 className="text-[24px] sm:text-[20px] text-blue-600 font-[500] tracking-[0.1px] leading-[1.3]">
              Legaliza tu Testamento
            </h3>
            
          </div>
          <p className="text-[14px] sm:text-[15px] font-[300] text-[#1d1d1f] mb-0 tracking-[0.1px] leading-[1.3]">
            Completa tu proceso realizando el pago para generar tu testamento oficial
          </p>
        </div>
      </div>
      <div className="flex items-center justify-start text-blue-600">
        <PrimaryButton 
          type="button"
          onClick={onClick}
        >
          Proceder al pago
        </PrimaryButton>
      </div>
    </div>
  );
};

const mainSteps = [
  {
    stepNumber: 1,
    title: "Cuéntanos sobre ti",
    description: "Información para personalizar tu testamento",
    duration: "2-4 minutos",
    route: "/about-yourself/name",
    progress: 75,
    icon: <Heart size={32} weight="thin" />
  },
  {
    stepNumber: 2,
    title: "Cuentas y Propiedades",
    description: "Menciona dónde están tus activos",
    duration: "1-4 minutos",
    route: "/account-and-property",
    progress: 30,
    icon: <Buildings size={32} weight="thin" />
  },
  {
    stepNumber: 3,
    title: "Herencia",
    description: "Define a las personas o entidades que heredarán tus bienes",
    duration: "3-5 minutos",
    route: "/estate/introduction",
    progress: 100,
    icon: <Coins size={32} weight="thin" />
  },
  {
    stepNumber: 4,
    title: "Albaceas",
    description: "Selecciona a la persona o personas encargadas de cumplir tus últimas voluntades",
    duration: "3-5 minutos",
    route: "/executers/introduction",
    progress: 5,
    icon: <Users size={32} weight="thin" />
  }
];

const optionalSteps = [
  {
    title: "",
    description: "Regalos Especiales",
    duration: "Oportunidad de dejar regalos a personas especiales",
    route: "/special-gifts",
    progress: 0,
    icon: <Gift size={32} weight="thin" />
  },
  {
    title: "",
    description: "Activos Digitales",
    duration: "Distribuye tus bienes o derechos digitales",
    route: "/digital-asset",
    progress: 0,
    icon: <Globe size={32} weight="thin" />
  }
];

const calculateTotalProgress = () => {
  const totalSteps = mainSteps.length;
  const totalProgress = mainSteps.reduce((acc, step) => acc + step.progress, 0);
  return Math.round(totalProgress / totalSteps);
};

const SummaryPage: FC = () => {
  const params = useSearchParams();
  const totalProgress = calculateTotalProgress();
  const router = useRouter();
  const { user } = useUser();

  const handlePaymentClick = () => {
    router.push("/payment");
  };

  return (
    <DashboardLayout>
      <motion.div 
        className="max-w-6xl mx-auto px-4 sm:px-5 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-3/5">
            <h1 className='text-[32px] sm:text-[46px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]'>
              <span className='text-[#1d1d1f]'>Hola </span>
              <span className='bg-gradient-to-r from-[#3d9bff] to-[#047aff] inline-block text-transparent bg-clip-text'>
                {user?.firstName || 'Usuario'}
              </span>
            </h1>
            <p className="text-[15px] sm:text-[17px] font-[400] tracking-[-0.1px] leading-[1.3] text-[#1d1d1f] text-start mb-6 sm:mb-[55px]">
              Te guiamos en cada etapa para asegurar que tu voluntad se refleje con claridad.
            </p>
            
            <div className="space-y-6">
              {mainSteps.map((step) => (
                <StepCard
                  key={step.stepNumber}
                  {...step}
                  onClick={() => router.push(step.route)}
                />
              ))}
              
              <h2 className="text-[24px] sm:text-[28px] font-[500] text-[#1d1d1f] pt-8 pb-4 tracking-[0.1px] leading-[1.3]">
                Pasos Opcionales
              </h2>
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
          </div>

          <div className="lg:w-2/5">
            <div className="sticky top-8">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <ProgressBar progress={totalProgress} />
                
                <h2 className="text-[24px] sm:text-[28px] font-[500] text-[#1d1d1f] mt-8 mb-4 tracking-[0.1px] leading-[1.3]">
                  Tu Voluntad
                </h2>
                <p className="text-[14px] sm:text-[17px] font-[300] text-[#1d1d1f] mb-6 tracking-[0.1px] leading-[1.3]">
                  La primera parte de tu testamento tiene que ver contigo y tu familia. 
                  Completa la información en el Paso 1 para avanzar.
                </p>
                
                <PaymentSection onClick={handlePaymentClick} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default SummaryPage;