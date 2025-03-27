'use client';

import { FC, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/common/DashboardLayout';
import { motion } from 'framer-motion';
import { House, Car, Buildings, Coins, UploadSimple, Info, CaretRight, Warning } from 'phosphor-react';
import PrimaryButton from '@/components/reusables/PrimaryButton';

interface Asset {
  type: string;
  description: string;
  value: string;
  tokens: string;
  document: {
    file: File;
    preview: string;
  } | null;
}

const assetTypes = [
  { id: 'house', name: 'Casa', icon: House },
  { id: 'apartment', name: 'Dpt.', icon: Buildings },
  { id: 'car', name: 'Vehículo', icon: Car },
  { id: 'other', name: 'Otro', icon: Buildings },
];

const AssetTokenizationClient: FC = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [asset, setAsset] = useState<Asset>({
    type: '',
    description: '',
    value: '',
    tokens: '',
    document: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAsset(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAsset(prev => ({
          ...prev,
          document: {
            file,
            preview: reader.result as string
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeDocument = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAsset(prev => ({
      ...prev,
      document: null
    }));
  };

  const handleSubmit = () => {
    router.push('/beneficiaries');
  };

  const isFormValid = () => {
    return (
      asset.type &&
      asset.description &&
      asset.value &&
      asset.tokens &&
      asset.document
    );
  };

  const formatCurrency = (value: string) => {
    const number = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (isNaN(number)) return '';
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  const calculateTokenValue = () => {
    const value = parseFloat(asset.value.replace(/[^0-9.]/g, ''));
    const tokens = parseInt(asset.tokens);
    if (isNaN(value) || isNaN(tokens) || tokens === 0) return '0';
    return formatCurrency(String(value / tokens));
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
                      <span className="text-[#047aff] text-[14px] font-[400]">TOKENIZACIÓN</span>
                    </div>
                    <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                      <span className="text-[#1d1d1f]">Tokeniza tu </span>
                      <span
                        style={{
                          backgroundImage: "linear-gradient(to left, #047aff 30%, #0d4ba3 100%)",
                        }}
                        className="inline-block text-transparent bg-clip-text"
                      >
                        activo
                      </span>
                    </h1>

                    <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
                      <div className="flex items-start gap-3 mb-6">
                        <Info weight="fill" className="text-blue-500 w-5 h-5 mt-1" />
                        <p className="text-sm text-gray-600">
                          Selecciona el tipo de activo que deseas tokenizar y proporciona la información necesaria.
                          Los tokens representarán partes iguales del valor total del activo.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-4">
                            Tipo de activo
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {assetTypes.map((type) => {
                              const Icon = type.icon;
                              return (
                                <button
                                  key={type.id}
                                  onClick={() => setAsset(prev => ({ ...prev, type: type.id }))}
                                  className={`p-4 rounded-lg border-2 transition-all ${
                                    asset.type === type.id
                                      ? 'border-blue-500 bg-blue-50'
                                      : 'border-gray-200 hover:border-gray-300'
                                  }`}
                                >
                                  <Icon size={24} className="mx-auto mb-2" />
                                  <p className="text-sm text-center">{type.name}</p>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Descripción del activo
                          </label>
                          <textarea
                            name="description"
                            value={asset.description}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            rows={3}
                            placeholder="Ej. Casa de 2 pisos en zona residencial..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Valor estimado
                          </label>
                          <input
                            type="text"
                            name="value"
                            value={asset.value}
                            onChange={(e) => setAsset(prev => ({
                              ...prev,
                              value: formatCurrency(e.target.value)
                            }))}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="$0.00"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Número de tokens
                          </label>
                          <input
                            type="number"
                            name="tokens"
                            value={asset.tokens}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ej. 100"
                            min="1"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Documento de propiedad
                          </label>
                          <div
                            onClick={() => fileInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
                              asset.document ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            {asset.document ? (
                              <div className="relative">
                                <img
                                  src={asset.document.preview}
                                  alt="Document preview"
                                  className="max-h-48 mx-auto rounded"
                                />
                                <button
                                  onClick={removeDocument}
                                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                >
                                  ×
                                </button>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <UploadSimple className="w-8 h-8 mx-auto text-gray-400" />
                                <p className="text-sm text-gray-500">
                                  Haz clic para subir o arrastra la imagen aquí
                                </p>
                              </div>
                            )}
                          </div>
                          <input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
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
                      <h2 className="text-xl font-medium mb-4">Resumen de tokenización</h2>
                      
                      <div className="space-y-4 mb-6">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Valor del activo</p>
                          <p className="text-xl font-semibold text-blue-600">
                            {asset.value || '$0.00'}
                          </p>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Número de tokens</p>
                          <p className="text-xl font-semibold text-blue-600">
                            {asset.tokens || '0'}
                          </p>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Valor por token</p>
                          <p className="text-xl font-semibold text-blue-600">
                            {calculateTokenValue()}
                          </p>
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

                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="flex items-start gap-3">
                        <Warning weight="fill" className="text-yellow-500 w-5 h-5 mt-1" />
                        <div>
                          <h3 className="text-[16px] font-[500] text-[#1d1d1f] mb-2">
                            Importante
                          </h3>
                          <ul className="text-[14px] text-gray-600 space-y-2">
                            <li>• El documento debe ser legible y válido</li>
                            <li>• La tokenización es irreversible</li>
                            <li>• Cada token representa una parte igual del activo</li>
                            <li>• Los beneficiarios recibirán los tokens asignados</li>
                          </ul>
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

export default AssetTokenizationClient;