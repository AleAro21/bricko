'use client';
import { FC, FormEvent } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/common/DashboardLayout';
import PrimaryButton from "@/components/reusables/PrimaryButton";

const AccountPage: FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('submitted');
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="container mx-auto flex flex-col flex-grow bg-[#f5f5f7] overflow-hidden"
      >
        <div className="w-full max-w-6xl mx-auto flex flex-col min-h-[100vh] mb-4 px-4 sm:px-5">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 h-full py-12">
            {/* Left column - Title section */}
            <div className="lg:w-1/3">
              <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5">
                <span className="text-[#047aff] text-[14px] font-[400]">CONFIGURACIÓN</span>
              </div>

              <h1 className='text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]'>
                <span className='text-[#1d1d1f]'>Ajustes de tu </span>
                <span className='bg-gradient-to-r from-[#3d9bff] to-[#047aff] inline-block text-transparent bg-clip-text'>cuenta</span>
              </h1>

              <p className="text-[16px] text-[#1d1d1f] leading-6 mb-8">
                Administra tu cuenta, actualiza tus preferencias y mantén tu información segura.
              </p>

              <nav className="space-y-2">
                {[
                  { href: '#email', text: 'Correo electrónico' },
                  { href: '#password', text: 'Contraseña' },
                  { href: '#contact', text: 'Preferencias de contacto' },
                  { href: '#delete', text: 'Eliminar cuenta', isDelete: true }
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-3 rounded-xl text-[14px] font-[400] transition-colors ${
                      item.isDelete 
                        ? 'text-red-600 hover:bg-red-50' 
                        : 'text-[#1d1d1f] hover:bg-[#047aff] hover:bg-opacity-10 hover:text-[#047aff]'
                    }`}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>

            {/* Right column - Settings forms */}
            <div className='w-full lg:w-3/5'>
              <div className="space-y-6">
                {/* Email Section */}
                <section id="email" className="bg-white rounded-2xl px-8 py-6 shadow-lg">
                  <h3 className="text-[22px] font-[500] text-[#1d1d1f] mb-6">Cambiar correo electrónico</h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="email" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                        Nuevo correo electrónico
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                        Contraseña actual
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all"
                        required
                      />
                    </div>
                    <div className="flex justify-end pt-2">
                      <PrimaryButton type="submit">
                        Guardar cambios
                      </PrimaryButton>
                    </div>
                  </form>
                </section>

                {/* Password Section */}
                <section id="password" className="bg-white rounded-2xl px-8 py-6 shadow-lg">
                  <h3 className="text-[22px] font-[500] text-[#1d1d1f] mb-6">Cambiar contraseña</h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="oldPassword" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                        Contraseña actual
                      </label>
                      <input
                        type="password"
                        id="oldPassword"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                        Nueva contraseña
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all"
                        required
                        minLength={10}
                      />
                      <p className="mt-2 text-[14px] text-[#6e6e73]">Mínimo 10 caracteres</p>
                    </div>
                    <div className="flex justify-end pt-2">
                      <PrimaryButton type="submit">
                        Actualizar contraseña
                      </PrimaryButton>
                    </div>
                  </form>
                </section>

                {/* Contact Preferences Section */}
                <section id="contact" className="bg-white rounded-2xl px-8 py-6 shadow-lg">
                  <h3 className="text-[22px] font-[500] text-[#1d1d1f] mb-6">Preferencias de contacto</h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-4">
                      {[
                        { id: 'callPreference', label: 'Recibir llamadas sobre el testamento' },
                        { id: 'emailPreference', label: 'Recibir correos de marketing' }
                      ].map((preference) => (
                        <div key={preference.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={preference.id}
                            className="h-5 w-5 rounded border-gray-300 text-[#047aff] focus:ring-[#047aff] transition-colors"
                          />
                          <label htmlFor={preference.id} className="ml-3 text-[16px] text-[#1d1d1f]">
                            {preference.label}
                          </label>
                        </div>
                      ))}
                    </div>
                    <p className="text-[14px] text-[#6e6e73] mt-4">
                      No puede darse de baja de ciertos correos electrónicos como: verificación de testamentos, pagos y actualizaciones de productos.
                    </p>
                    <div className="flex justify-end pt-2">
                      <PrimaryButton type="submit">
                        Guardar preferencias
                      </PrimaryButton>
                    </div>
                  </form>
                </section>

                {/* Delete Account Section */}
                <section id="delete" className="bg-white rounded-2xl px-8 py-6 shadow-lg">
                  <h3 className="text-[22px] font-[500] text-[#1d1d1f] mb-6">Eliminar cuenta</h3>
                  <p className="text-[16px] text-[#6e6e73] mb-6">
                    Al eliminar tu cuenta, perderás todo el progreso en tu testamento y eliminaremos todos tus datos permanentemente.
                  </p>
                  <button
                    type="button"
                    className="px-6 py-2.5 rounded-lg bg-red-600 text-white text-[14px] font-[400] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                  >
                    Eliminar cuenta
                  </button>
                </section>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default AccountPage;