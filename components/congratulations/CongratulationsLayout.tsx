// components/congratulations/CongratulationsLayout.tsx
import Image from 'next/image';
import graylogo from '@/assets/greylogo.png';
import { motion } from 'framer-motion';

interface CongratulationsLayoutProps {
  userName: string;
  children: React.ReactNode;
}

export default function CongratulationsLayout({ userName, children }: CongratulationsLayoutProps) {
  return (
    <motion.main
      className="container mx-auto flex flex-col min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="py-5 px-4 sm:px-5">
          <a href="https://testador.mx">
            <Image src={graylogo} width={150} height={150} alt="Testador Logo" />
          </a>
        </div>
        <div className="flex flex-col justify-start sm:justify-center min-h-[80vh] px-4 sm:px-5">
          <div className="mb-8 sm:mb-[30px]">
            <h1 className="text-[32px] sm:text-[46px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
              <span
                style={{ backgroundImage: "linear-gradient(to left, #047aff 30%, #0d4ba3 100%)" }}
                className="inline-block text-transparent bg-clip-text"
              >
                ¡Felicidades {userName}!
              </span>
              <span className="text-[#1d1d1f]">
                {" "}Estás un paso más cerca de la tranquilidad
              </span>
            </h1>

            <p className="text-[18px] sm:text-[20px] font-[400] tracking-[-0.1px] leading-[1.3] text-[#1d1d1f] text-start mb-[5px] sm:mb-[55px]">
              Nos encantaría saber, ¿cómo descubriste Testamento.mx?
            </p>
          </div>
          {children}
        </div>
      </div>
    </motion.main>
  );
}
