'use client';

import { FC, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/common/DashboardLayout';
import { motion } from 'framer-motion';
import { House, Car, Buildings, UploadSimple, Info, CaretRight, Warning, Question, Scroll } from 'phosphor-react';
import PrimaryButton from '@/components/reusables/PrimaryButton';
import ProgressIndicator from "@/components/reusables/ProgressIndicator";
import AddressAutocomplete, { AddressData } from "@/components/common/address/AddressAutocomplete";
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import Modal from '@/components/common/Modal';

interface Asset {
  type: string;
  description: string;
  value: string;
  tokens: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates: {
    lat: number;
    lng: number;
  } | null;
  document: {
    file: File;
    preview: string;
  } | null;
}

const assetTypes = [
  { id: 'house', name: 'Casa', icon: House },
  { id: 'apartment', name: 'Dpt.', icon: Buildings },
  { id: 'car', name: 'Vehículo', icon: Car },
  { id: 'other', name: 'Pagaré', icon: Scroll },
];

const defaultCenter = {
  lat: 19.4326,
  lng: -99.1332
};

const mapContainerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '0.75rem',
};

const FIXED_TOKENS = '1000';

const AssetTokenizationClient: FC = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [asset, setAsset] = useState<Asset>({
    type: '',
    description: '',
    value: '',
    tokens: FIXED_TOKENS,
    street: '',
    city: '',
    state: '',
    zipCode: '',
    coordinates: null,
    document: null,
  });
  const [cursorPosition, setCursorPosition] = useState<number>(0);

  const handleAddressSelect = async (addressData: AddressData): Promise<void> => {
    const fullAddress = `${addressData.street}, ${addressData.city}, ${addressData.state}, ${addressData.postalCode}, ${addressData.country}`;
    
    try {
      const geocoder = new google.maps.Geocoder();
      const result = await geocoder.geocode({ address: fullAddress });
      
      if (result.results[0]?.geometry?.location) {
        const location = result.results[0].geometry.location;
        setAsset(prev => ({
          ...prev,
          street: addressData.street,
          city: addressData.city,
          state: addressData.state,
          zipCode: addressData.postalCode,
          coordinates: {
            lat: location.lat(),
            lng: location.lng()
          }
        }));
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAsset(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const curPos = input.selectionStart || 0;
    const value = input.value;
    
    // Remove all non-numeric characters
    const numericValue = value.replace(/[^\d]/g, '');
    
    // Format the number with commas and dollar sign
    let formattedValue = '';
    if (numericValue !== '') {
      const number = parseInt(numericValue) / 100;
      formattedValue = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(number);
    }

    setAsset(prev => ({
      ...prev,
      value: formattedValue
    }));

    // Calculate new cursor position
    const addedChars = formattedValue.length - value.length;
    const newPosition = curPos + addedChars;
    setCursorPosition(newPosition);

    // Set cursor position after state update
    setTimeout(() => {
      input.selectionStart = newPosition;
      input.selectionEnd = newPosition;
    }, 0);
  };

  const handleValueKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const curPos = input.selectionStart || 0;
    
    // Allow navigation keys
    if (['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab'].includes(e.key)) {
      return;
    }
    
    // Only allow numeric input
    if (!/^\d$/.test(e.key) && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      return;
    }
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
      asset.street &&
      asset.city &&
      asset.state &&
      asset.zipCode &&
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
    if (isNaN(value)) return '0';
    return formatCurrency(String(value / parseInt(FIXED_TOKENS)));
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!} libraries={["places"]}>
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
                      <div className="flex items-center space-x-8 mb-[15px]">
                        <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px]">
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
                          ¿Qué es la tokenización de activos?
                        </h2>
                        <p className="text-[17px] font-[400] text-gray-700 tracking-[0.1px] leading-[1.6]">
                          La tokenización de activos es el proceso de convertir los derechos de un activo del mundo real en tokens digitales en una blockchain. Este proceso permite fraccionar la propiedad del activo en {FIXED_TOKENS} partes iguales, facilitando su transferencia y gestión.
                        </p>
                        <div className="mt-6">
                          <h3 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">
                            Beneficios principales:
                          </h3>
                          <ul className="space-y-3 text-[17px] text-gray-700">
                            <li className="flex items-start gap-2">
                              <span className="text-blue-500 mt-1">•</span>
                              <span>Mayor liquidez y facilidad de transferencia de la propiedad</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blue-500 mt-1">•</span>
                              <span>Transparencia y seguridad garantizada por la blockchain</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blue-500 mt-1">•</span>
                              <span>Reducción de costos de intermediación y gestión</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blue-500 mt-1">•</span>
                              <span>Acceso a inversiones fraccionadas en activos reales</span>
                            </li>
                          </ul>
                        </div>
                      </Modal>

                      <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
                        <ProgressIndicator
                          currentSection={2}
                          totalSections={4}
                          title="Completa tus datos"
                        />

                        <br />
                        <div className="flex items-start gap-3 mb-6">
                          <Info weight="fill" className="text-blue-500 w-5 h-5 mt-1" />
                          <p className="text-sm text-gray-600">
                            Selecciona el tipo de activo que deseas tokenizar y proporciona la información necesaria.
                            El activo será dividido en {FIXED_TOKENS} tokens de igual valor.
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
                              Dirección
                            </label>
                            <AddressAutocomplete
                              onAddressSelect={handleAddressSelect}
                              defaultValue={asset.street}
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Ciudad
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={asset.city}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Estado
                            </label>
                            <input
                              type="text"
                              name="state"
                              value={asset.state}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Código Postal
                            </label>
                            <input
                              type="text"
                              name="zipCode"
                              value={asset.zipCode}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Valor estimado (MXN)
                            </label>
                            <input
                              type="text"
                              name="value"
                              value={asset.value}
                              onChange={handleValueChange}
                              onKeyDown={handleValueKeyDown}
                              className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                              placeholder="$0.00"
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
                            <p className="text-sm text-gray-500 mb-1">Valor del activo (MXN)</p>
                            <p className="text-xl font-semibold text-blue-600">
                              {asset.value || '$0.00'}
                            </p>
                          </div>

                          <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-500 mb-1">Número de tokens</p>
                            <p className="text-xl font-semibold text-blue-600">
                              {FIXED_TOKENS}
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

                      {/* Map Section */}
                      <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
                        <h2 className="text-xl font-medium mb-4">Ubicación del activo</h2>
                        <div className="rounded-lg overflow-hidden">
                          <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            center={asset.coordinates || defaultCenter}
                            zoom={15}
                          >
                            {asset.coordinates && (
                              <Marker position={asset.coordinates} />
                            )}
                          </GoogleMap>
                        </div>
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
                              <li>• Cada token representa 1% del valor total del activo</li>
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
    </LoadScript>
  );
};

export default AssetTokenizationClient;