"use client";
import { useRouter } from "next/navigation";
import graylogo from "../../../assets/greylogo.png";
import Image from "next/image";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const page = () => {
  const router = useRouter();
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/start/otp");
  };

  return (
    <>
      <main className="container w-3/4 mx-auto flex flex-col h-full min-h-screen">
        <div className="py-4">
          <Image src={graylogo} width={100} />
        </div>
        <div className="flex flex-col md:w-[50%] max-w-[500px] mx-auto items-center justify-center h-full">
          <div>
            <p className="title py-2 text-center md:w-[60%] mx-auto">
              Ingresa tu número de teléfono
            </p>
            <p className="text-style py-4 text-center md:w-[60%] mx-auto">
              Te enviaremos un código de verificación para confirmar tu número
            </p>
            <form onSubmit={handleSubmit} className="">
              <div className="mb-4">
                <PhoneInput
                  country={"us"}
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                  containerStyle={{ width: "100%" }}
                  inputStyle={{
                    width: "100%",
                    padding: "30px 10px 30px 50px", // Adds space on the left
                    fontSize: "16px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  buttonStyle={{ border: "none" }}
                  placeholder="Número de teléfono"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-[14px] text-[#FFFFFF] font-[600] bg-[#0171e3] px-4 py-4 rounded-[100px] uppercase my-2"
              >
                CONTINUAR
              </button>
              <p className="text-style text-center pt-4">
                Creando una cuenta, aceptas estar en conformidad con nuestros
                Términos y Políticas de Privacidad.
              </p>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default page;
