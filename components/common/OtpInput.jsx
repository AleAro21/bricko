"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import graylogo from "@/assets/greylogo.png";
import PrimaryButton from "@/components/reusables/PrimaryButton";

function OTPInput() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(30); // Set initial timer value in seconds
  const router = useRouter();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = () => {
    router.push("/start/congratulation");
  };

  // Countdown timer logic
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [timer]);

  const resetTimer = () => {
    setTimer(30); // Reset the timer to 30 seconds
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      {/* Logo positioned slightly to the right at the top */}
      <div className="absolute top-4 left-40">
        <Image src={graylogo} alt="Logo" width={100} />
      </div>

      <div className="container w-3/4 mx-auto flex flex-col">
        <div className="flex flex-col lg:flex-row items-start lg:items-start space-y-8 lg:space-y-0 lg:space-x-8 mt-8">
          {/* Left Section with Title and Information */}
          <div className="lg:w-1/2 w-full">
            <h2 className="text-gray-500 text-lg font-bold mb-2 uppercase">
              Verificación en 2 pasos
            </h2>
            <p className="text-2xl font-semibold mb-4">
              Ingresa el código que te enviamos por SMS
            </p>
            <p className="text-gray-600 mb-6">
              Es un código de 6 dígitos enviado al teléfono terminado en 4558.
            </p>

            {/* Email Container with Icon */}
            <div className="flex items-center mb-4 p-4 bg-gray-50 border border-gray-300 rounded-[100px] shadow-sm inline-flex">
              <FaUser className="text-blue-600 text-xl mr-2" />
              <span className="text-gray-700">
                correodeusuario@testamento.com
              </span>
            </div>

            <div className="border-b border-gray-300 my-4 w-full px-4"></div>

            <a href="#" className="text-blue-600 text-sm">
              Necesito ayuda
            </a>
          </div>

          {/* Right Section with OTP Input and Button */}
          <div className="lg:w-[70%] w-full max-w-xl p-8 bg-gray-50 rounded-lg shadow-md flex flex-col items-center">
            <p className="text-sm text-gray-500 mb-2">Ingresa el código</p>
            <div className="otp-inputs flex space-x-2 mb-4">
              {otp.map((data, index) => (
                <input
                  className="w-12 h-12 border-2 rounded-lg text-center text-xl focus:outline-none focus:border-blue-500"
                  type="text"
                  maxLength="1"
                  key={index}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                />
              ))}
            </div>

            <div className="flex w-full justify-start mb-4">
              <p className="text-gray-500 text-sm">
                {timer > 0 ? (
                  `Reenviar código en 00:${timer < 10 ? `0${timer}` : timer}`
                ) : (
                  <span
                    className="text-blue-600 cursor-pointer"
                    onClick={resetTimer}
                  >
                    Reenviar código
                  </span>
                )}
              </p>
            </div>

            <div className="flex w-full items-center justify-between">
              <div className="flex justify-start ">
                <PrimaryButton onClick={handleSubmit}>Continuar</PrimaryButton>
              </div>
              <a
                href="#"
                className="text-blue-600 text-sm ml-4 whitespace-nowrap"
              >
                Elegir otro método
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTPInput;
