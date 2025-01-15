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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar de navegación */}
          <div className="lg:w-1/4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Configuración</h2>
            <nav className="space-y-1">
              <a
                href="#email"
                className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-900 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                Correo electrónico
              </a>
              <a
                href="#password"
                className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-900 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                Contraseña
              </a>
              <a
                href="#contact"
                className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-900 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                Preferencias de contacto
              </a>
              <a
                href="#delete"
                className="block px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                Eliminar cuenta
              </a>
            </nav>
          </div>

          {/* Contenido principal */}
          <div className="lg:w-3/4">
            <div className="space-y-8">
              {/* Sección de correo electrónico */}
              <section id="email" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Cambiar correo electrónico</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Nuevo correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Contraseña actual
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                      required
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex justify-center px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      Guardar cambios
                    </button>
                  </div>
                </form>
              </section>

              {/* Sección de contraseña */}
              <section id="password" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Cambiar contraseña</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Contraseña actual
                    </label>
                    <input
                      type="password"
                      id="oldPassword"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Nueva contraseña (mínimo 10 caracteres)
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                      required
                      minLength={10}
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex justify-center px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      Actualizar contraseña
                    </button>
                  </div>
                </form>
              </section>

              {/* Sección de preferencias de contacto */}
              <section id="contact" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Preferencias de contacto</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="callPreference"
                        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors"
                      />
                      <label htmlFor="callPreference" className="ml-3 text-sm text-gray-700">
                        Recibir llamadas sobre el testamento
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="emailPreference"
                        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors"
                      />
                      <label htmlFor="emailPreference" className="ml-3 text-sm text-gray-700">
                        Recibir correos de marketing
                      </label>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    No puede darse de baja de ciertos correos electrónicos como: verificación de testamentos, pagos y actualizaciones de productos.
                  </p>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex justify-center px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      Guardar preferencias
                    </button>
                  </div>
                </form>
              </section>

              {/* Sección de eliminar cuenta */}
              <section id="delete" className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Eliminar cuenta</h3>
                <p className="text-sm text-gray-500 mb-6">
                  Al eliminar tu cuenta, perderás todo el progreso en tu testamento y eliminaremos todos tus datos permanentemente.
                </p>
                <form onSubmit={handleSubmit}>
                  <button
                    type="submit"
                    className="inline-flex justify-center px-6 py-3 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                  >
                    Eliminar cuenta
                  </button>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AccountPage;