'use client';

import { FC, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/common/DashboardLayout";
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
  PencilSimple,
  Clock
} from 'phosphor-react';
import { useUser } from "@/context/UserContext";
import { motion } from 'framer-motion';
import { apiService } from '@/app/apiService';
import { fetchAuthSession } from "aws-amplify/auth";

// ----- Types -----
interface StepProgress {
  id: string;
  progress: number;
}

interface Step {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  duration: string;
  route: string;
  icon?: React.ReactNode;
}

interface StepCardProps extends Step {
  onClick: () => void;
  isOptional?: boolean;
  progress: number;
}

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
}

// ----- Utility Functions -----
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

// ----- Components -----
const ProgressBar: FC<ProgressBarProps> = ({ progress, showLabel = true }) => {
  const color = getProgressColor(progress);
  
  return (
    <div className="w-full">
      {showLabel && (
        <p className="font-medium text-[15px] mb-5" style={{ color }}>
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

  return (
    <div className="relative pt-8">
      <div className="absolute top-0 left-0 z-10">
        <div className={`inline-flex items-center h-[32px] ${isOptional ? 'bg-gray-200' : 'bg-[#047aff] bg-opacity-10'} px-[15px] py-[5px] rounded-t-md`}>
          <span className={`${isOptional ? 'text-gray-600' : 'text-[#047aff]'} text-[14px] font-[400]`}>
            {isOptional ? 'Opcional' : `Paso ${stepNumber}`}
          </span>
        </div>
      </div>
      <div 
        onClick={onClick}
        className="bg-white rounded-xl p-[25px] transition-all duration-500 cursor-pointer w-full shadow-md hover:shadow-lg relative"
        style={{
          borderTopLeftRadius: '0'
        }}
      >
        <div className="flex justify-between items-start flex-wrap">
          <div className="flex items-start gap-5 flex-1 min-w-0">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-5 mb-5 flex-wrap">
                <div className="text-[#047aff] w-8 h-8 flex items-center justify-center flex-shrink-0">
                  {icon}
                </div>
                <h3 className="text-[20px] sm:text-[24px] text-[#000000] font-[500] mb-0 tracking-[0.1px] leading-[1.3] break-words">
                  {title}
                </h3>
              </div>
              <p className="text-[14px] font-[300] text-[#1d1d1f] mb-0 tracking-[0.1px] leading-[1.3] break-words">
                {description}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-5 mt-4 sm:mt-0">
            {progress === 100 ? (
              <div className="flex items-center gap-5">
                <div className="w-6 h-6 rounded-full bg-[#047aff] flex items-center justify-center">
                  <Check weight="bold" className="text-white w-4 h-4" />
                </div>
                <PencilSimple className="text-[#047aff] w-5 h-5" />
              </div>
            ) : progress === 0 ? (
              <div className="flex items-center gap-2 text-[#047aff]">
                <Clock className="w-4 h-4" />
                <span className="text-[12px] font-medium whitespace-nowrap">{duration}</span>
              </div>
            ) : (
              <span className={`inline-flex items-center px-[10px] py-[5px] rounded-full text-xs font-medium ${badgeColors.bg} ${badgeColors.text}`}>
                {progress}% completado
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentSection: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="mt-10 rounded-xl cursor-pointer group"
    >
      <div className="p-[1px] bg-gradient-to-br from-[#047aff] via-[#3d9bff] to-[#047aff] rounded-xl">
        <div className="bg-white rounded-[11px] p-[25px] hover:bg-gradient-to-br hover:from-[#f8faff] hover:to-white transition-all duration-500">
          <div className="flex items-start gap-5 flex-wrap">
            <div className="bg-gradient-to-br from-[#047aff] to-[#3d9bff] p-[15px] rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300">
              <LockSimple weight="thin" className="text-white w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="mb-5">
                <h3 className="text-[20px] sm:text-[22px] text-[#1d1d1f] font-[500] tracking-[-0.5px] leading-[1.3] mb-5 break-words">
                  Legaliza tu Testamento
                </h3>
                <p className="text-[15px] font-[300] text-[#1d1d1f]/80 tracking-[0.1px] leading-[1.3] break-words">
                  Completa tu proceso realizando el pago para generar tu testamento oficial
                </p>
              </div>
              <div className="flex justify-end">
                <button className="bg-gradient-to-r from-[#047aff] to-[#3d9bff] text-white px-[25px] py-[10px] rounded-lg font-medium text-sm hover:shadow-md transition-all duration-300 flex items-center gap-5">
                  Proceder al pago
                  <CaretRight weight="bold" className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ----- Step Definitions -----
const mainSteps: Step[] = [
  {
    id: 'personal-info',
    stepNumber: 1,
    title: "Cuéntanos sobre ti",
    description: "Información para personalizar tu testamento",
    duration: "2-4 minutos",
    route: "/about-yourself/name",
    icon: <Heart size={32} weight="thin" />
  },
  {
    id: 'assets',
    stepNumber: 2,
    title: "Cuentas y Propiedades",
    description: "Menciona dónde están tus activos",
    duration: "1-4 minutos",
    route: "/account-and-property",
    icon: <Buildings size={32} weight="thin" />
  },
  {
    id: 'inheritance',
    stepNumber: 3,
    title: "Herencia",
    description: "Define a las personas o entidades que heredarán tus bienes",
    duration: "3-5 minutos",
    route: "/estate/introduction",
    icon: <Coins size={32} weight="thin" />
  },
  {
    id: 'executors',
    stepNumber: 4,
    title: "Albaceas",
    description: "Selecciona a la persona o personas encargadas de cumplir tus últimas voluntades",
    duration: "3-5 minutos",
    route: "/executers/introduction",
    icon: <Users size={32} weight="thin" />
  }
];

const optionalSteps: Step[] = [
  {
    id: 'special-gifts',
    stepNumber: 0,
    title: "Regalos Especiales",
    description: "Define objetos o bienes específicos para personas especiales",
    duration: "3-5 minutos",
    route: "/special-gifts",
    icon: <Gift size={32} weight="thin" />
  },
  {
    id: 'digital-assets',
    stepNumber: 0,
    title: "Activos Digitales",
    description: "Gestiona tus cuentas y activos en línea",
    duration: "3-5 minutos",
    route: "/digital-asset",
    icon: <Globe size={32} weight="thin" />
  }
];

// ----- SummaryPage Component -----
const SummaryPage: FC = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { user } = useUser();
  const [stepsProgress, setStepsProgress] = useState<StepProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const parsePercentage = (percentage: string): number => {
    return parseFloat(percentage.replace('%', ''));
  };

  useEffect(() => {
    if (!user && !sessionStorage.getItem('userId')) {
      router.push('/start/login');
      return;
    }

    const fetchProgress = async () => {
      try {
        setIsLoading(true);
        if (!user) return;

        const { tokens } = await fetchAuthSession();
        if (!tokens?.accessToken)
          throw new Error("No authentication token available");
        apiService.setToken(tokens.accessToken.toString());

        const progressData = await apiService.getUserProgress(user.id);
        console.log("API progress data:", progressData);

        const progressMapping: Record<string, number> = {
          'personal-info': parsePercentage(progressData.profile),
          'assets': parsePercentage(progressData.assets),
          'inheritance': parsePercentage(progressData.assignments),
          'executors': parsePercentage(progressData.executors),
        };
        console.log("Progress mapping:", progressMapping);

        const initialProgress = [...mainSteps, ...optionalSteps].map(step => ({
          id: step.id,
          progress: progressMapping[step.id] ?? 0
        }));
        console.log("Initial progress array:", initialProgress);

        setStepsProgress(initialProgress);
      } catch (error) {
        console.error('Failed to fetch steps progress:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, [user, router]);

  const getStepProgress = (stepId: string): number => {
    return stepsProgress.find(step => step.id === stepId)?.progress || 0;
  };

  const calculateTotalProgress = (): number => {
    if (stepsProgress.length === 0) return 0;
    const mainStepsProgress = mainSteps.map(step => getStepProgress(step.id));
    const totalProgress = mainStepsProgress.reduce((acc, curr) => acc + curr, 0);
    return Math.round(totalProgress / mainSteps.length);
  };

  const handlePaymentClick = () => {
    router.push("/payment");
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="w-full h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#047aff]"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div 
        className="w-full max-w-6xl mx-auto px-5 sm:px-[25px] py-5 sm:py-[25px] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        <div className="flex flex-col lg:flex-row gap-[25px]">
          <div className="lg:w-3/5 w-full">
            <h1 className="text-[28px] sm:text-[46px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-5 break-words">
              <span className="text-[#1d1d1f]">Hola </span>
              <span className="bg-gradient-to-r from-[#3d9bff] to-[#047aff] inline-block text-transparent bg-clip-text">
                {user?.name || 'Usuario'}
              </span>
            </h1>
            <p className="text-[15px] sm:text-[17px] font-[400] tracking-[-0.1px] leading-[1.3] text-[#1d1d1f] text-start mb-[25px] break-words">
              Te guiamos en cada etapa para asegurar que tu voluntad se refleje con claridad.
            </p>
            
            <div className="space-y-[25px]">
              {mainSteps.map((step) => (
                <StepCard
                  key={step.id}
                  {...step}
                  progress={getStepProgress(step.id)}
                  onClick={() => router.push(step.route)}
                />
              ))}
              
              <h2 className="text-[22px] sm:text-[28px] font-[500] text-[#1d1d1f] mt-[25px] mb-[15px] tracking-[0.1px] leading-[1.3] break-words">
                Pasos Opcionales
              </h2>
              {optionalSteps.map((step) => (
                <StepCard
                  key={step.id}
                  {...step}
                  progress={getStepProgress(step.id)}
                  onClick={() => router.push(step.route)}
                  isOptional
                />
              ))}
            </div>
          </div>

          <div className="lg:w-2/5 w-full">
            <div className="sticky top-[25px]">
              <div className="bg-white rounded-xl p-5 sm:p-[25px] shadow-md">
                <ProgressBar progress={calculateTotalProgress()} />
                
                <h2 className="text-[20px] sm:text-[22px] font-[500] text-[#1d1d1f] mt-[25px] mb-2.5 tracking-[0.1px] leading-[1.3] break-words">
                  Tu Voluntad
                </h2>
                <p className="text-[14px] font-[300] text-[#1d1d1f] mb-2.5 tracking-[0.1px] leading-[1.3] break-words">
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