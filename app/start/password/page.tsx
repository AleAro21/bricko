// app/start/password/page.tsx (Server Component)
import Image from "next/image";
import graylogo from "../../../assets/greylogo.png";
import FooterTwo from "@/components/common/FooterTwo";
import PasswordForm from "@/components/password/PasswordForm";
import MotionWrapper from "@/components/reusables/MotionWapper";

export default function PasswordPage() {
  return (
    <MotionWrapper>
      <main className="container mx-auto flex flex-col flex-grow bg-[#f5f5f7] overflow-hidden">
        <div className="w-full max-w-6xl mx-auto flex flex-col min-h-[75vh] mb-4">
          <div className="py-4 px-4 sm:px-5">
            <a href="https://testador.mx">
              <Image src={graylogo} width={150} height={150} alt="Testador Logo" />
            </a>
          </div>
          <div className="px-4 sm:px-5 flex-grow">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 h-full">
              {/* Left column - Title section (hidden on mobile) */}
              <div className="hidden lg:block lg:w-1/3">
                <div className="inline-flex items-center h-[32px] bg-[#f95940] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5 mt-5">
                  <span className="text-[#f95940] text-[14px] font-[400]">
                    CREA TU CONTRASEÑA
                  </span>
                </div>
                <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                  Protege tu{" "}
                  <span
                    style={{
                      backgroundImage:
                        "linear-gradient(to left, #f95940 30%, #f95940 100%)",
                    }}
                    className="inline-block text-transparent bg-clip-text"
                  >
                    cuenta
                  </span>
                </h1>
                <p className="text-[16px] text-[#1d1d1f] leading-6 mb-8">
                  Una contraseña fuerte es tu primera defensa. Asegúrate de no compartirla.
                </p>
              </div>
              {/* Right column - Password Form */}
              <div className="w-full lg:w-3/5 flex items-center mt-[30px] lg:mt-0">
                <PasswordForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterTwo />
    </MotionWrapper>
  );
}
