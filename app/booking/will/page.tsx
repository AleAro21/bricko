'use client';
import { FC, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import graylogo from '../../../assets/greylogo.png';

const BookingWillPage: FC = () => {
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <main className="container w-3/4 mx-auto flex flex-col h-full min-h-screen">
      <div className="py-4">
        <Image src={graylogo} width={150} height={150} alt="Gray Logo" />
      </div>
      <div className="flex flex-col md:w-[50%] max-w-[500px] mx-auto items-center justify-center h-full min-h-[80vh]">
        <div>
          <p className="title py-2 text-center"></p>
          <p className="text-style py-4 text-center">
            Nos pondremos en contacto contigo en breve para ayudarte a
            evaluar tus necesidades y responder a tus preguntas.
          </p>
          <div className="py-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <div className="py-3">
                  <label htmlFor="fullName" className="text-style">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6"
                    required
                  />
                </div>
                <div className="py-3">
                  <label htmlFor="phone" className="text-style">
                    Número de Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6"
                    required
                  />
                </div>
                <div className="py-3">
                  <label htmlFor="email" className="text-style">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-[14px] text-[#FFFFFF] font-[600] bg-[#0171e3] px-4 py-4 rounded-[100px] uppercase"
                >
                  Enviar
                </button>
                <p className="text-style py-4">
                  Al hacer clic en "Enviar", aceptas nuestros{' '}
                  <a href="#" className="text-[#000000]">
                    Términos y Condiciones
                  </a>{' '}
                  y nuestra{' '}
                  <a href="#" className="text-[#000000]">
                    Política de Privacidad
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookingWillPage;