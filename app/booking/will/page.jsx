'use client';
import { useRouter } from 'next/navigation';
import graylogo from '../../../assets/greylogo.png';
import Image from 'next/image';
const page = () => {
  const router = useRouter();
  return (
    <>
      <main className='container w-3/4 mx-auto flex flex-col h-full min-h-screen'>
        <div className='py-4 '>
          <Image src={graylogo} width={100} />
        </div>
        <div className='flex flex-col md:w-[50%] max-w-[500px] mx-auto items-center justify-center h-full min-h-[80vh]'>
          <div className=''>
            <p className='title py-2 text-center'></p>
            <p className='text-style py-4 text-center'>
              Nos pondremos en contacto contigo en breve para ayudarte a
              evaluar tus necesidades y responder a tus preguntas.
            </p>
            <div className='py-4'>
              <form>
                <div class='mb-6'>
                  <div className='py-3'>
                    <label for='country' class='text-style'>
                      Nombre Completo
                    </label>
                    <input
                      type='text'
                      id='country'
                      class='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6'
                      required
                    />
                  </div>
                  <div className='py-3'>
                    <label for='country' class='text-style'>
                      Número de Teléfono
                    </label>
                    <input
                      type='text'
                      id='country'
                      class='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6'
                      required
                    />
                  </div>
                  <div className='py-3'>
                    <label for='email' class='text-style'>
                      Email
                    </label>
                    <input
                      type='email'
                      id='email'
                      class='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6'
                      required
                    />
                  </div>
                  <button className='w-full text-[14px] text-[#4a4a4a] font-[600] bg-[#FFDF4E] px-4 py-4 rounded-[5px] uppercase'>
                    Enviar
                  </button>
                  <p className='text-style py-4'>
                    Al hacer clic en “Enviar”, aceptas nuestros{' '}
                    <a href='#' className='text-[#4a4a4a]'>
                      Términos y Condiciones
                    </a>{' '}
                    y nuestra{' '}
                    <a href='#' className='text-[#4a4a4a]'>
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
    </>
  );
};

export default page;
