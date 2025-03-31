'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/common/DashboardLayout';
import { motion } from 'framer-motion';
import { User, Phone, Envelope, IdentificationCard, CaretRight, Info, Question } from 'phosphor-react';
import PrimaryButton from '@/components/reusables/PrimaryButton';
import ProgressIndicator from "@/components/reusables/ProgressIndicator";
import Modal from '@/components/common/Modal';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  curp: string;
  rfc: string;
  address: string;
}

const UserProfileClient: FC = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    curp: '',
    rfc: '',
    address: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isFormValid = () => {
    return Object.values(userData).every(value => value.trim() !== '');
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      router.push('/asset-tokenization');
    }
  };

  return (
    <DashboardLayout>
      <div className="relative min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="relative flex flex-col min-h-screen"
        >
          <main className="container mx-auto flex flex-col flex-grow overflow-hidden">
            <div className="w-full max-w-6xl mx-auto flex flex-col min-h-[75vh] mb-4 px-4 sm:px-5 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                {/* Left Column */}
                <div className="space-y-8">
                  <div>
                    <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5">
                      <span className="text-[#047aff] text-[14px] font-[400]">PERFIL</span>
                    </div>
                    <div className="flex items-center space-x-8 mb-[15px]">
                      <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px]">
                        <span className="text-[#1d1d1f]">Completa tu </span>
                        <span
                          style={{
                            backgroundImage: "linear-gradient(to left, #047aff 30%, #0d4ba3 100%)",
                          }}
                          className="inline-block text-transparent bg-clip-text"
                        >
                          información
                        </span>
                      </h1>
                      <div className="flex items-center">
                        <Question 
                          weight="regular"
                          className="text-blue-500 w-7 h-7 cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => setShowModal(true)}
                        />
                      </div>
                    </div>

                    <Modal showModal={showModal} setShowModal={setShowModal}>
                      <h2 className="text-[30px] font-semibold text-[#1d1d1f] mb-4">
                        ¿Por qué necesitamos tu información?
                      </h2>
                      <p className="text-[17px] font-[400] text-gray-700 tracking-[0.1px] leading-[1.6]">
                        La información personal que proporcionas es esencial para el proceso de tokenización de activos. 
                        Esta información nos permite crear un perfil legal y verificable que garantiza la seguridad y 
                        legitimidad de todas las transacciones.
                      </p>
                      <div className="mt-6">
                        <h3 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">
                          Datos requeridos:
                        </h3>
                        <ul className="space-y-3 text-[17px] text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>Información personal: Necesaria para identificarte como propietario legal</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>Datos fiscales: Requeridos para cumplir con las regulaciones financieras</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>Contacto: Necesario para mantener comunicación sobre tu activo</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>Dirección: Importante para la documentación legal del proceso</span>
                          </li>
                        </ul>
                      </div>
                    </Modal>

                    <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
                      <ProgressIndicator
                        currentSection={1}
                        totalSections={4}
                        title="Completa tus datos"
                      />
                      <br />
                      <div className="flex items-start gap-3 mb-6">
                        <Info weight="fill" className="text-blue-500 w-5 h-5 mt-1" />
                        <p className="text-sm text-gray-600">
                          Para poder tokenizar tus activos, necesitamos algunos datos personales. 
                          Esta información es necesaria para el proceso legal.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Nombre(s)
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              value={userData.firstName}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Ej. Juan"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Apellidos
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              value={userData.lastName}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Ej. Pérez González"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Correo electrónico
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="correo@ejemplo.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Teléfono
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={userData.phone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="55 1234 5678"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CURP
                          </label>
                          <input
                            type="text"
                            name="curp"
                            value={userData.curp}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="PECJ800101HDFXXX01"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            RFC
                          </label>
                          <input
                            type="text"
                            name="rfc"
                            value={userData.rfc}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="PECJ800101XXX"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Dirección
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={userData.address}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Calle, número, colonia, ciudad, estado"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <div className="sticky top-8">
                    <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
                      <h2 className="text-xl font-medium mb-4">Resumen de información</h2>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <User className="text-blue-500 w-5 h-5" />
                          <div>
                            <p className="text-sm text-gray-500">Nombre completo</p>
                            <p className="font-medium">
                              {userData.firstName || userData.lastName 
                                ? `${userData.firstName} ${userData.lastName}`.trim()
                                : 'Pendiente'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Envelope className="text-blue-500 w-5 h-5" />
                          <div>
                            <p className="text-sm text-gray-500">Correo electrónico</p>
                            <p className="font-medium">
                              {userData.email || 'Pendiente'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Phone className="text-blue-500 w-5 h-5" />
                          <div>
                            <p className="text-sm text-gray-500">Teléfono</p>
                            <p className="font-medium">
                              {userData.phone || 'Pendiente'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <IdentificationCard className="text-blue-500 w-5 h-5" />
                          <div>
                            <p className="text-sm text-gray-500">Identificación fiscal</p>
                            <p className="font-medium">
                              {userData.rfc || 'Pendiente'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <PrimaryButton
                        onClick={handleSubmit}
                        disabled={!isFormValid()}
                        className="w-full"
                      >
                        <div className="flex items-center justify-center gap-2">
                          Continuar
                          <CaretRight weight="bold" className="w-4 h-4" />
                        </div>
                      </PrimaryButton>

                      <p className="text-xs text-gray-500 text-center mt-4">
                        Al continuar, confirmas que la información proporcionada es correcta.
                      </p>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-6">
                      <div className="flex items-start gap-3">
                        <Info weight="fill" className="text-blue-600 flex-shrink-0 w-5 h-5 mt-1" />
                        <div>
                          <h3 className="text-[16px] font-[500] text-[#1d1d1f] mb-2">
                            Información segura
                          </h3>
                          <p className="text-[14px] text-gray-600">
                            Tus datos están protegidos y solo se utilizarán para el proceso de tokenización.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default UserProfileClient;