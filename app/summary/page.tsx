'use client';
import { FC, useEffect } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/common/DashboardLayout";
import PrimaryButton from "@/components/reusables/PrimaryButton";
import { FaLock, FaChevronRight } from 'react-icons/fa';
import Living from "@/assets/Ball.png"
import Estate from "@/assets/Safeestate.png"
import Payment from "@/assets/Payment.png"
import Executers from "@/assets/Trust.png"
import { useUser } from "@/context/UserContext";

interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  duration: string;
  route: string;
  onClick: () => void;
  isOptional?: boolean;
  progress?: number;
  icon?: string;
}

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
}

const getProgressColor = (progress: number): string => {
  if (progress === 100) return '#22c55e'; // verde para 100%
  if (progress >= 11) return '#f97316'; // naranja para 11-99%
  return '#ef4444'; // rojo para 0-10%
};

const getProgressBadgeColor = (progress: number): { bg: string; text: string } => {
  if (progress === 100) return { bg: 'bg-green-100', text: 'text-green-800' };
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
      className="bg-white rounded-2xl p-6 md:w-[90%] mt-4 transition-all duration-200 hover:shadow-lg cursor-pointer border border-gray-100"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {icon && (
              <img
                src={icon}
                alt={`${title} icon`}
                width={32}
                height={32}
                className="object-contain"
              />
            )}
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-gray-500">
                {isOptional ? title : `Paso ${stepNumber} • ${duration}`}
              </p>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {isOptional ? description : title}
          </h3>
          <p className="text-sm text-gray-600">
            {isOptional ? duration : description}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          {progress > 0 && (
            <>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeColors.bg} ${badgeColors.text}`}>
                {progress}% completado
              </span>
              <div className="h-1"></div>
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
      className="mt-8 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg bg-gradient-to-r from-blue-50 to-blue-100"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">
            Asegura tu Testamento
          </h3>
          <p className="text-sm text-gray-600">
            Completa tu proceso realizando el pago para generar tu testamento oficial
          </p>
        </div>
        <div className="bg-white p-3 rounded-full shadow-sm">
          <FaLock className="text-blue-600 w-6 h-6" />
        </div>
      </div>
      <div className="flex items-center text-blue-600">
        <span className="text-sm font-medium">Proceder al pago</span>
        <FaChevronRight className="w-4 h-4 ml-2" />
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
    icon: <img src={Living.src} width={40} height={40} alt="Partner icon" />
  },
  {
    stepNumber: 2,
    title: "Cuentas y Propiedades",
    description: "Menciona dónde están tus activos",
    duration: "1-4 minutos",
    route: "/account-and-property",
    progress: 30,
    icon: <img src={Estate.src} width={40} height={40} alt="Partner icon" />
  },
  {
    stepNumber: 3,
    title: "Herencia",
    description: "Define a las personas o entidades que heredarán tus bienes",
    duration: "3-5 minutos",
    route: "/estate/introduction",
    progress: 100,
    icon: <img src={Payment.src} width={40} height={40} alt="Partner icon" />
  },
  {
    stepNumber: 4,
    title: "Albaceas",
    description: "Selecciona a la persona o personas encargadas de cumplir tus últimas voluntades",
    duration: "3-5 minutos",
    route: "/executers/introduction",
    progress: 5,
    icon: <img src={Executers.src} width={40} height={40} alt="Partner icon" />
  }
];

const optionalSteps = [
  {
    title: "Regalos",
    description: "Regalos Especiales",
    duration: "Oportunidad de dejar regalos a personas especiales",
    route: "",
    progress: 0
  },
  {
    title: "Activos Digitales",
    description: "Activos Digitales",
    duration: "Distribuye tus bienes o derechos digitales",
    route: "/digital-asset",
    progress: 0
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

  useEffect(() => {
    if (!user && !sessionStorage.getItem('userId')) {
      router.push('/start/login');
    }
  }, [user, router]);

  const handlePaymentClick = () => {
    router.push("/payment");
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-3/5">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Tu Testamento, {user?.firstName || 'Usuario'}
            </h1>
            <p className="text-gray-600 mb-8">
              Te guiamos en cada etapa para asegurar que tu voluntad se refleje con claridad.
            </p>
            
            <div className="space-y-6">
              {mainSteps.map((step) => (
                <StepCard
                  key={step.stepNumber}
                  {...step}
                  onClick={() => router.push(step.route)}
                  icon={step.icon.props.src}
                />
              ))}
              
              <h2 className="text-xl font-semibold text-gray-900 pt-8 pb-4">Pasos Opcionales</h2>
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
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <ProgressBar progress={totalProgress} />
                
                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Tu Voluntad</h2>
                <p className="text-gray-600 mb-6">
                  La primera parte de tu testamento tiene que ver contigo y tu familia. 
                  Completa la información en el Paso 1 para avanzar.
                </p>
                
                <PaymentSection onClick={handlePaymentClick} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SummaryPage;