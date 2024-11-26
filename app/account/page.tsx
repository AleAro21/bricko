'use client';
import { FC, FormEvent } from 'react';
import DashboardLayout from '@/components/common/DashboardLayout';
import { useRouter } from 'next/navigation';
import PrimaryButton from "@/components/reusables/PrimaryButton";

const AccountPage: FC = () => {
  const router = useRouter();

  const onClick = (): void => {
    console.log('clicked');
  };

  const onSubmit = (): void => {
    console.log('submitted');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('submitted');
  };

  return (
    <DashboardLayout>
      <div className='container w-3/4 mx-auto flex flex-col h-full min-h-screen'>
        <div className='w-full flex flex-col py-12'>
          <p className='title py-4'>Configuraciones de la cuenta</p>
          <div className='w-full flex'>
            <div className='w-[40%] flex flex-col'>
              <div className='flex flex-col'>
                <p className='sm-title py-2'>Contenido</p>
                <a href='#email' className='text-style py-2 cursor-pointer'>
                  Su dirección de correo electrónico
                </a>
                <a href='#password' className='text-style py-2 cursor-pointer'>
                  cambia tu contraseña
                </a>
                <a href='#contact' className='text-style py-2 cursor-pointer'>
                  Cambiar preferencias de contacto
                </a>
                <a href='#delete' className='text-style py-2 cursor-pointer'>
                  Borrar cuenta
                </a>
              </div>
            </div>
            <div className='w-[60%]'>
              <form id='email' className='w-full flex py-12 border-b' onSubmit={handleSubmit}>
                <div className='w-full flex flex-col'>
                  <div className='w-full py-3'>
                    <p className='title py-6'>Cambia tu direccion de correo electronico</p>
                    <label htmlFor='email' className='text-style'>
                      Correo electrónico
                    </label>
                    <input
                      type='email'
                      id='email'
                      className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                      required
                    />
                  </div>
                  <div className='w-full py-3'>
                    <label htmlFor='password' className='text-style'>
                      Contraseña
                    </label>
                    <input
                      type='password'
                      id='password'
                      className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                      required
                    />
                  </div>
                  <div className='flex py-4'>
                    <PrimaryButton type="submit" onClick={onClick}>
                      Guardar y continuar
                    </PrimaryButton>
                  </div>
                </div>
              </form>
              <form id='password' className='w-full flex py-12 border-b' onSubmit={handleSubmit}>
                <div className='w-full flex flex-col'>
                  <div className='w-full py-3'>
                    <p className='title py-6'>cambia tu contraseña</p>
                    <label htmlFor='oldPassword' className='text-style'>
                      Contraseña anterior
                    </label>
                    <input
                      type='password'
                      id='oldPassword'
                      className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                      required
                    />
                  </div>
                  <div className='w-full py-3'>
                    <label htmlFor='newPassword' className='text-style'>
                      Contraseña (mínimo 10 caracteres)
                    </label>
                    <input
                      type='password'
                      id='newPassword'
                      className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                      required
                      minLength={10}
                    />
                  </div>
                  <div className='flex py-4'>
                    <PrimaryButton type="submit" onClick={onClick}>
                      Guardar y continuar
                    </PrimaryButton>
                  </div>
                </div>
              </form>
              <form id='contact' className='w-full flex py-12 border-b' onSubmit={handleSubmit}>
                <div className='w-full flex flex-col'>
                  <p className='title py-6'>Preferencias de contacto</p>
                  <div className='w-full py-3 flex items-center gap-3'>
                    <input
                      type='checkbox'
                      id='callPreference'
                      className='bg-white flex flex-start h-6 w-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-6 my-2'
                    />
                    <label htmlFor='callPreference' className='text-style'>
                      Recibir llamadas sobre el testamento de mi despedida.
                    </label>
                  </div>
                  <div className='w-full py-3 flex items-center gap-3'>
                    <input
                      type='checkbox'
                      id='emailPreference'
                      className='bg-white h-6 w-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-6 my-2'
                    />
                    <label htmlFor='emailPreference' className='text-style'>
                      Recibir correo electrónico de Markiting de mi despedida
                    </label>
                  </div>
                  <div className='w-full py-3 flex gap-3'>
                    <p className='text-style'>
                      No puede darse de baja de ciertos correos electrónicos de Testador. Estos incluyen: verificación de testamentos, pago y actualizaciones de productos.
                    </p>
                  </div>
                  <div className='flex py-4'>
                    <PrimaryButton type="submit" onClick={onClick}>
                      Guardar y continuar
                    </PrimaryButton>
                  </div>
                </div>
              </form>
              <form id='delete' className='w-full flex py-12 border-b' onSubmit={handleSubmit}>
                <div className='w-full flex flex-col'>
                  <p className='title py-6'>Elimina tu cuenta</p>
                  <div className='w-full py-3 flex gap-3'>
                    <p className='text-style'>
                      Si necesita eliminar su cuenta, haga clic en el botón a continuación. Perderá cualquier progreso en su testamento y eliminaremos todos sus datos.
                    </p>
                  </div>
                  <div className='flex py-4'>
                    <PrimaryButton type="submit" onClick={onClick}>
                      Borrar
                    </PrimaryButton>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AccountPage;