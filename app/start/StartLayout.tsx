// app/components/StartLayout.tsx (Server Component)
import Image from 'next/image';
import graylogo from '../../assets/greylogo.png';
import InteractiveElements from './InteractiveElements';

interface StartLayoutProps {
  heading: string;
  linkNo: string;
  linkyes: string;
  titleNo: string;
  titleYes: string;
  box: string;
}

export default function StartLayout({
  heading,
  linkNo,
  linkyes,
  titleNo,
  titleYes,
  box,
}: StartLayoutProps) {
  return (
    <main className="container mx-auto flex flex-col min-h-screen">
      <div className="w-full max-w-6xl mx-auto">
        <div className="py-5 px-4 sm:px-5">
          <a href="https://testador.mx">
            <Image src={graylogo} width={150} height={150} alt="Testador Logo" />
          </a>
        </div>
        <div className="flex flex-col justify-start min-h-[80vh] px-4 sm:px-5">
          <div className="mb-8 sm:mb-[30px] py-14">
            <div className="max-w-[800px]">
              <h1 className="text-[32px] sm:text-[46px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[5px] mt-0 text-start text-[#1d1d1f]">
                {heading}
              </h1>
              <p className="text-[18px] sm:text-[20px] font-[300] tracking-[-0.1px] leading-[1.3] text-[#1d1d1f] text-start whitespace-nowrap sm:whitespace-normal">
                Selecciona las opciones que mejor describan tu situación
              </p>
            </div>
          </div>
          {/* Embed the interactive part */}
          <InteractiveElements
            linkNo={linkNo}
            linkyes={linkyes}
            titleNo={titleNo}
            titleYes={titleYes}
            box={box}
          />
        </div>
      </div>
    </main>
  );
}
