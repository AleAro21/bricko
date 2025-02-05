"use client";
import { FC, useState } from 'react';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import Add, { DigitalAssetData } from "./Add";
import { motion } from 'framer-motion';
import PrimaryButton from "@/components/reusables/PrimaryButton";
import Link from "next/link";
import {
  Users,
  Envelope,
  CurrencyBtc,
  Cloud,
  CreditCard,
  Globe,
  GameController,
  Question,
  Plus
} from "phosphor-react";

const DigitalAssetsPage: FC = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [assets, setAssets] = useState<DigitalAssetData[]>([]);

  const handleAddAsset = (asset: DigitalAssetData): void => {
    setAssets([...assets, asset]);
  };

  const assetTypeIcons: Record<string, JSX.Element> = {
    social: <Users className="w-6 h-6" weight="thin" />,
    email: <Envelope className="w-6 h-6" weight="thin" />,
    crypto: <CurrencyBtc className="w-6 h-6" weight="thin" />,
    cloud: <Cloud className="w-6 h-6" weight="thin" />,
    subscription: <CreditCard className="w-6 h-6" weight="thin" />,
    domain: <Globe className="w-6 h-6" weight="thin" />,
    gaming: <GameController className="w-6 h-6" weight="thin" />,
    other: <Question className="w-6 h-6" weight="thin" />,
  };

  const assetTypeNames: Record<string, string> = {
    social: "Redes Sociales",
    email: "Correo Electrónico",
    crypto: "Criptomonedas",
    cloud: "Almacenamiento en la Nube",
    subscription: "Suscripciones",
    domain: "Dominios Web",
    gaming: "Juegos",
    other: "Otros",
  };

  return (
    <>
      <Add setShowModal={setShowModal} showModal={showModal} onAddAsset={handleAddAsset} />
      <DashboardLayout>
        <motion.div 
          className="min-h-screen bg-[#f5f5f7]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-5 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-8 lg:gap-24">
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md">
                      <span className="text-[#047aff] text-[14px] font-[400]">ACTIVOS DIGITALES</span>
                    </div>
                    <Link href="#" className="inline-flex items-center h-[32px] text-[#047aff] hover:text-[#0456b0]">
                      <span className="w-5 h-5 inline-flex items-center justify-center rounded-full border border-[#047aff] text-sm">?</span>
                    </Link>
                  </div>

                  <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                    <span className="text-[#1d1d1f]">¿Tiene algún </span>
                    <span className="bg-gradient-to-r from-[#3d9bff] to-[#047aff] inline-block text-transparent bg-clip-text">
                      activo digital
                    </span>
                    <span className="text-[#1d1d1f]">?</span>
                  </h1>
                  <p className="text-[16px] text-[#1d1d1f] leading-6">
                    Los activos digitales incluyen cuentas en línea, redes sociales, 
                    criptomonedas y otros contenidos digitales que desee gestionar 
                    después de su fallecimiento.
                  </p>
                </div>

                <div
                  onClick={() => setShowModal(true)}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden"
                >
                  <div className="flex items-center justify-center gap-2 py-8">
                    <div className="w-8 h-8 rounded-full bg-[#047aff] flex items-center justify-center">
                      <Plus className="w-5 h-5 text-white"/>
                    </div>
                    <span className="text-[#047aff] font-[500]">Agregar Activo Digital</span>
                  </div>
                </div>

                {assets.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="p-6">
                      <h2 className="text-[22px] font-[500] text-[#1d1d1f] mb-4">Activos Digitales</h2>
                      <div className="space-y-4">
                        {assets.map((asset) => (
                          <div
                            key={asset.id}
                            className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0"
                          >
                            <div className="flex items-start gap-4">
                              <div className="p-3 bg-[#047aff] bg-opacity-10 rounded-lg text-[#047aff]">
                                {assetTypeIcons[asset.type] || <Question className="w-6 h-6" weight="thin" />}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="text-[17px] font-[500] text-[#1d1d1f]">{asset.platform}</h3>
                                    <p className="text-[14px] text-gray-500">{assetTypeNames[asset.type]}</p>
                                    <p className="text-[14px] text-gray-500">{asset.accountName}</p>
                                  </div>
                                  {asset.hasBackupCodes && (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      Códigos de respaldo disponibles
                                    </span>
                                  )}
                                </div>
                                {asset.instructions && (
                                  <p className="mt-2 text-[14px] text-[#1d1d1f]">
                                    {asset.instructions}
                                  </p>
                                )}
                                {asset.backupLocation && (
                                  <p className="mt-1 text-[14px] text-gray-500">
                                    Ubicación de respaldo: {asset.backupLocation}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-6 flex justify-end">
                  <PrimaryButton
                    onClick={() => router.push("/summary?completed=digital-assets")}
                  >
                    Guardar y continuar
                  </PrimaryButton>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6 h-fit lg:sticky lg:top-6">
                <h2 className="text-[20px] font-[500] text-[#1d1d1f] mb-4">¿Qué son los activos digitales?</h2>
                <div className="space-y-4">
                  <p className="text-[15px] text-[#1d1d1f] leading-6">
                    Los activos digitales son cualquier contenido o cuenta que existe en formato digital:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#047aff] flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[15px] text-[#1d1d1f] leading-6">
                        Redes sociales y cuentas de correo electrónico
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#047aff] flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[15px] text-[#1d1d1f] leading-6">
                        Criptomonedas y activos digitales financieros
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#047aff] flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[15px] text-[#1d1d1f] leading-6">
                        Almacenamiento en la nube y documentos digitales
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#047aff] flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[15px] text-[#1d1d1f] leading-6">
                        Suscripciones y servicios digitales
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </DashboardLayout>
    </>
  );
};

export default DigitalAssetsPage;