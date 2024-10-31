'use client';
import DashboardLayout from '@/components/common/DashboardLayout';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
  const handleSubmit = (e)=>{
    e.preventDefault()
  router.push('/about-yourself/basic')
  }
  return (
    <DashboardLayout>
      <div className='container w-3/4 mx-auto flex flex-col h-full min-h-screen'>
        <div className='w-full flex flex-col py-12'>
          <p className='title'>Primero, vamos a conocerte</p>
          <div className='w-full flex'>
            <form onSubmit={handleSubmit} className='w-[50%] flex flex-col'>
              <div className='w-full'>
                <p className='sm-title pt-6'>¿Cuál es su nombre legal completo?</p>
                <p className='text-style py-4'>
                Este es el nombre que figura en su pasaporte o permiso de conducir.
                </p>
                <p className='text-style'>Su nombre legal completo</p>
                <label htmlFor='country' className='text-style'>
                  {` Por ejemplo, Elizabeth Joy Smith.`}
                </label>
                <input
                  type='text'
                  id='country'
                  className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                  requir
                />
              </div>
              <div className='w-full'>
                <p className='sm-title pt-6'>
                ¿Cómo te gustaría que te llamemos?
                </p>
                <p className='text-style py-4'>
                Por ejemplo, si le enviamos un correo electrónico o hablamos con usted por teléfono.
                </p>
                <p className='text-style'>Tu nombre preferido (opcional)</p>
                <label htmlFor='country' className='text-style'>
                  {`Por ejemplo, Lizzie`}
                </label>
                <input
                  type='text'
                  id='country'
                  className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                  requir
                />
              </div>
              <div className='w-full border-t-2 mt-3'>
                <p className='text-style pt-4'>Tu fecha de nacimiento</p>
                <p className='text-style pb-4'>Por ejemplo, 19 12 1951</p>
                <div className='flex w-full items-center justify-between'>
                  <div className='w-[25%]'>
                    <label htmlFor='country' className='text-style'>
                      {`Día`}
                    </label>
                    <input
                      type='text'
                      id='country'
                      className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                      required
                    />
                  </div>
                  <div className='w-[25%]'>
                    <label htmlFor='country' className='text-style'>
                      {`Mes`}
                    </label>
                    <input
                      type='text'
                      id='country'
                      className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                      required
                    />
                  </div>
                  <div className='w-[40%]'>
                    <label htmlFor='country' className='text-style'>
                      {`Año`}
                    </label>
                    <input
                      type='text'
                      id='country'
                      className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                      required
                    />
                  </div>
                </div>
                <div className='flex justify-end py-4'>
                  <button
                   type='submit'
                    className='text-[14px] text-[#4a4a4a] font-[600] bg-[#FFDF4E] px-4 py-4 rounded-[100px] uppercase mt-4'
                  >
                    Guardar y continuar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default page;
