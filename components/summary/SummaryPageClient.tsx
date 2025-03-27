'use client';

import { FC } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/common/DashboardLayout";
import { motion } from "framer-motion";
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
  Clock,
  ShieldCheck,
  Eye,
} from "phosphor-react";
import { useUser } from "@/context/UserContext";
import SummaryCard from "@/components/common/SummaryCard";

interface Step {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  duration: string;
  route: string;
  icon?: React.ReactNode;
}

interface SummaryPageClientProps {
  progressMapping: Record<string, number>;
}

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
}

interface StepCardProps extends Step {
  isOptional?: boolean;
  progress: number;
}

const getProgressColor = (progress: number): string => {
  if (progress === 100) return "#047aff";
  if (progress >= 11) return "#f97316";
  return "#ef4444";
};

const getProgressBadgeColor = (progress: number): { bg: string; text: string } => {
  if (progress === 100) return { bg: "bg-blue-100", text: "text-blue-800" };
  if (progress >= 11) return { bg: "bg-orange-100", text: "text-orange-800" };
  return { bg: "bg-red-100", text: "text-red-800" };
};

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
            backgroundColor: color,
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
  isOptional,
  progress = 0,
  icon,
}) => {
  const badgeColors = getProgressBadgeColor(progress);
  return (
    <div className="relative pt-8">
      <div className="absolute top-0 left-0 z-10">
        <div
          className={`inline-flex items-center h-[32px] ${
            isOptional ? "bg-gray-200" : "bg-[#047aff] bg-opacity-10"
          } px-[15px] py-[5px] rounded-t-md`}
        >
          <span
            className={`${
              isOptional ? "text-gray-600" : "text-[#047aff]"
            } text-[14px] font-[600]`}
          >
            {isOptional ? "Opcional" : `Paso ${stepNumber}`}
          </span>
        </div>
      </div>
      <div
        className="bg-white rounded-xl p-[25px] transition-all duration-500 w-full shadow-md hover:shadow-lg relative"
        style={{ borderTopLeftRadius: "0" }}
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
              <span
                className={`inline-flex items-center px-[10px] py-[5px] rounded-full text-xs font-medium ${badgeColors.bg} ${badgeColors.text}`}
              >
                {progress}% completado
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface PaymentSectionProps {
  onClick: () => void;
  disabled?: boolean;
  progress: number;
}

const PaymentSection: FC<PaymentSectionProps> = ({ onClick, disabled, progress }) => {
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={`mt-5 rounded-xl group ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
    >
      <div className="p-[1px] bg-gradient-to-br from-[#047aff] via-[#3d9bff] to-[#047aff] rounded-xl">
        <div className="bg-white rounded-[11px] p-[25px] hover:bg-gradient-to-br hover:from-[#f8faff] hover:to-white transition-all duration-500">
          <div className="flex items-start gap-5 flex-wrap">
            <div className={`bg-gradient-to-br ${disabled ? "from-[#047aff]/70 to-[#3d9bff]/70" : "from-[#047aff] to-[#3d9bff]"} p-[15px] rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300`}>
              <LockSimple weight="regular" className="text-white w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="mb-5">
                <h3 className="text-[20px] sm:text-[22px] text-[#1d1d1f] font-[500] tracking-[-0.5px] leading-[1.3] mb-2.5 break-words">
                  {disabled ? "Completa tu Testamento" : "Legaliza tu Testamento"}
                </h3>
                {disabled ? (
                  <div>
                    <p className="text-[15px] font-[300] text-[#1d1d1f]/80 tracking-[0.1px] leading-[1.3] break-words mb-4">
                      Termina tu testamento para poder legalizarlo y compartirlo con tus seres queridos.
                    </p>
                    <div className="flex items-center gap-3 text-[14px] font-[300] text-[#1d1d1f]/80 mb-2">
                      <ShieldCheck weight="fill" className="text-[#047aff] w-5 h-5" />
                      <span>Protege el futuro de tu familia</span>
                    </div>
                    <p className="text-[12px] mt-5 font-medium text-blue-700 mb-0">
                      Te falta completar el {100 - progress}% para poder legalizar tu testamento
                    </p>
                  </div>
                ) : (
                  <p className="text-[15px] font-[300] text-[#1d1d1f]/80 tracking-[0.1px] leading-[1.3] break-words">
                    Completa tu proceso realizando el pago para generar tu testamento oficial
                  </p>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  disabled={disabled}
                  className={`${
                    disabled
                      ? "bg-gradient-to-r from-[#047aff]/70 to-[#3d9bff]/70"
                      : "bg-gradient-to-r from-[#047aff] to-[#3d9bff] hover:shadow-md"
                  } text-white px-[25px] py-[10px] rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-5`}
                >
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

const mainSteps: Step[] = [
  {
    id: "personal-info",
    stepNumber: 1,
    title: "Cuéntanos sobre ti",
    description: "Información para personalizar tu testamento",
    duration: "2-4 minutos",
    route: "/about-yourself/name",
    icon: <Heart size={32} weight="regular" />,
  },
  {
    id: "assets",
    stepNumber: 2,
    title: "Cuentas y Propiedades",
    description: "Menciona dónde están tus activos",
    duration: "1-4 minutos",
    route: "/account-and-property",
    icon: <Buildings size={32} weight="regular" />,
  },
  {
    id: "inheritance",
    stepNumber: 3,
    title: "Herencia",
    description: "Define a las personas o entidades que heredarán tus bienes",
    duration: "3-5 minutos",
    route: "/estate/introduction",
    icon: <Coins size={32} weight="regular" />,
  },
];

const optionalSteps: Step[] = [
  {
    id: "executors",
    stepNumber: 0,
    title: "Albaceas",
    description: "Selecciona a la persona o personas encargadas de cumplir tus últimas voluntades",
    duration: "3-5 minutos",
    route: "/executers/introduction",
    icon: <Users size={32} weight="regular" />,
  },
  {
    id: "guardians",
    stepNumber: 0,
    title: "Tutores o guardianes",
    description: "Selecciona a la persona o personas tutoras o guardianas de tus hijos menores",
    duration: "3-5 minutos",
    route: "/guardians/introduction",
    icon: <Users size={32} weight="regular" />,
  },
  {
    id: "special-gifts",
    stepNumber: 0,
    title: "Regalos Especiales",
    description: "Se conocen como Legados. Define objetos o bienes específicos para personas especiales.",
    duration: "3-5 minutos",
    route: "/special-gifts",
    icon: <Gift size={32} weight="regular" />,
  },
  {
    id: "digital-assets",
    stepNumber: 0,
    title: "Activos Digitales",
    description: "Gestiona tus cuentas y activos en línea",
    duration: "3-5 minutos",
    route: "/digital-asset",
    icon: <Globe size={32} weight="regular" />,
  },
];

const SummaryPageClient: FC<SummaryPageClientProps> = ({ progressMapping }) => {
  const router = useRouter();
  const { user } = useUser();

  const getStepProgress = (stepId: string): number => {
    return progressMapping[stepId] || 0;
  };

  const calculateTotalProgress = (): number => {
    const mainStepsProgress = mainSteps.map((step) => getStepProgress(step.id));
    const totalProgress = mainStepsProgress.reduce((acc, curr) => acc + curr, 0);
    return Math.round(totalProgress / mainSteps.length);
  };

  const totalProgress = calculateTotalProgress();

  const handlePaymentClick = () => {
    if (totalProgress === 100) {
      router.push('/preview');
    } else {
      alert("Completa tu testamento para proceder con el pago");
    }
  };

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
              <span
                style={{
                  backgroundImage: "linear-gradient(to left, #3d9bff, #348aff)",
                }}
                className="inline-block text-transparent bg-clip-text"
              >
                {user?.name || "Usuario"}
              </span>
            </h1>

            <p className="text-[15px] sm:text-[17px] font-[400] tracking-[-0.1px] leading-[1.3] text-[#1d1d1f] text-start mb-[15px] break-words">
              Te guiamos en cada etapa para asegurar que tu voluntad se refleje con claridad.
            </p>
            <div className="space-y-[15px]">
              {mainSteps.map((step, index) => {
                const isDisabled =
                  index !== 0 &&
                  !mainSteps.slice(0, index).every((s) => getStepProgress(s.id) === 100);
                const handleClick = () => {
                  if (isDisabled) {
                    alert("Completa los pasos anteriores primero");
                  } else {
                    router.push(step.route);
                  }
                };
                return (
                  <div
                    key={step.id}
                    onClick={handleClick}
                    className={isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                  >
                    <StepCard {...step} progress={getStepProgress(step.id)} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="lg:w-2/5 w-full">
            <div className="sticky top-[25px]">
              <div className="bg-white rounded-xl p-5 sm:p-[25px] shadow-md">
                <ProgressBar progress={totalProgress} />
                <h2 className="text-[20px] sm:text-[22px] font-[500] text-[#1d1d1f] mt-[25px] mb-2.5 tracking-[0.1px] leading-[1.3] break-words">
                  Tu Voluntad
                </h2>
                <p className="text-[14px] font-[300] text-[#1d1d1f] pb-10 tracking-[0.1px] leading-[1.3] break-words">
                  La primera parte de tu testamento tiene que ver contigo y tu familia.
                  Completa la información en el Paso 1 para avanzar.
                </p>

                {totalProgress === 100 && (
                  <div 
                    onClick={() => router.push('/preview')}
                    className="mb-5 p-4 bg-blue-50 rounded-xl cursor-pointer hover:bg-blue-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Eye size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-[16px] font-[500] text-[#1d1d1f] mb-1">Vista Previa Disponible</h3>
                        <p className="text-[14px] text-gray-600">
                          Revisa tu testamento antes de proceder con el pago
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <PaymentSection
                  onClick={handlePaymentClick}
                  disabled={totalProgress !== 100}
                  progress={totalProgress}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-[35px] w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {optionalSteps.map((step) => {
              const isOptionalDisabled = !mainSteps.every((s) => getStepProgress(s.id) === 100);
              const handleClick = () => {
                if (isOptionalDisabled) {
                  alert("Completa todos los pasos principales primero");
                } else {
                  router.push(step.route);
                }
              };
              return (
                <div
                  key={step.id}
                  onClick={handleClick}
                  className={isOptionalDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                >
                  <SummaryCard
                    icon={step.icon}
                    title={step.title}
                    description={step.description}
                    {...(!isOptionalDisabled && { href: step.route })}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default SummaryPageClient;