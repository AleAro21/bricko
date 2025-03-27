'use client';

import { FC, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/common/DashboardLayout';
import { motion } from 'framer-motion';
import { UploadSimple, Warning, CaretRight, Info, Check } from 'phosphor-react';
import PrimaryButton from '@/components/reusables/PrimaryButton';
import Spinner from '@/components/reusables/Spinner';

interface FileUpload {
  file: File;
  preview: string;
}

const VerifyIdentity: FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [documentType, setDocumentType] = useState<'id' | 'passport'>('id');
  const [frontImage, setFrontImage] = useState<FileUpload | null>(null);
  const [backImage, setBackImage] = useState<FileUpload | null>(null);
  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    side: 'front' | 'back'
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const upload: FileUpload = {
          file,
          preview: reader.result as string,
        };
        if (side === 'front') {
          setFrontImage(upload);
        } else {
          setBackImage(upload);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Here you would typically upload the images to your backend
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
    router.push('/document-upload-success');
  };

  const isComplete = documentType === 'passport' 
    ? frontImage 
    : (frontImage && backImage);

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
                      <span className="text-[#047aff] text-[14px] font-[400]">VERIFICACIÓN</span>
                    </div>
                    <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                      <span className="text-[#1d1d1f]">Verifica tu </span>
                      <span
                        style={{
                          backgroundImage: "linear-gradient(to left, #047aff 30%, #0d4ba3 100%)",
                        }}
                        className="inline-block text-transparent bg-clip-text"
                      >
                        identidad
                      </span>
                    </h1>

                    <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
                      <div className="flex items-start gap-3 mb-6">
                        <Info weight="fill" className="text-blue-500 w-5 h-5 mt-1" />
                        <p className="text-sm text-gray-600">
                          Para garantizar la validez legal de tu testamento, necesitamos verificar tu identidad. 
                          Esto es un requisito legal y ayuda a prevenir el fraude.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <button
                            onClick={() => setDocumentType('id')}
                            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                              documentType === 'id'
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <h3 className="font-medium mb-1">INE / IFE</h3>
                            <p className="text-sm text-gray-500">Identificación oficial mexicana</p>
                          </button>
                          <button
                            onClick={() => setDocumentType('passport')}
                            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                              documentType === 'passport'
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <h3 className="font-medium mb-1">Pasaporte</h3>
                            <p className="text-sm text-gray-500">Pasaporte vigente</p>
                          </button>
                        </div>

                        <div className="space-y-4">
                          {/* Front Image Upload */}
                          <div>
                            <p className="text-sm font-medium mb-2">
                              {documentType === 'id' ? 'Frente de tu INE' : 'Página principal del pasaporte'}
                            </p>
                            <div
                              onClick={() => frontInputRef.current?.click()}
                              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
                                frontImage ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                              }`}
                            >
                              {frontImage ? (
                                <div className="relative">
                                  <img
                                    src={frontImage.preview}
                                    alt="Front preview"
                                    className="max-h-45 mx-auto rounded"
                                  />
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setFrontImage(null);
                                    }}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
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
                          </div>

                          {/* Back Image Upload (only for ID) */}
                          {documentType === 'id' && (
                            <div>
                              <p className="text-sm font-medium mb-2">Reverso de tu INE</p>
                              <div
                                onClick={() => backInputRef.current?.click()}
                                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
                                  backImage ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                                }`}
                              >
                                {backImage ? (
                                  <div className="relative">
                                    <img
                                      src={backImage.preview}
                                      alt="Back preview"
                                      className="max-h-48 mx-auto rounded"
                                    />
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setBackImage(null);
                                      }}
                                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
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
                            </div>
                          )}
                        </div>
                      </div>

                      <input
                        ref={frontInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, 'front')}
                      />
                      <input
                        ref={backInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, 'back')}
                      />
                    </div>

                    <div className="flex items-start gap-3 bg-yellow-50 p-4 rounded-lg">
                      <Warning weight="fill" className="text-yellow-500 w-5 h-5 mt-1" />
                      <div className="text-sm text-yellow-700">
                        <p className="font-medium mb-1">Importante:</p>
                        <ul className="list-disc ml-4 space-y-1">
                          <li>Asegúrate que el documento sea vigente</li>
                          <li>La imagen debe ser clara y legible</li>
                          <li>Todos los bordes deben ser visibles</li>
                          <li>No debe tener reflejos ni sombras</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <div className="sticky top-8">
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h2 className="text-xl font-medium mb-4">Resumen de verificación</h2>
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            documentType ? 'bg-green-500' : 'bg-gray-200'
                          }`}>
                            {documentType && <Check weight="bold" className="text-white w-3 h-3" />}
                          </div>
                          <span className="text-sm">Tipo de documento seleccionado</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            frontImage ? 'bg-green-500' : 'bg-gray-200'
                          }`}>
                            {frontImage && <Check weight="bold" className="text-white w-3 h-3" />}
                          </div>
                          <span className="text-sm">
                            {documentType === 'id' ? 'Frente de INE subido' : 'Página principal subida'}
                          </span>
                        </div>
                        {documentType === 'id' && (
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                              backImage ? 'bg-green-500' : 'bg-gray-200'
                            }`}>
                              {backImage && <Check weight="bold" className="text-white w-3 h-3" />}
                            </div>
                            <span className="text-sm">Reverso de INE subido</span>
                          </div>
                        )}
                      </div>

                      <PrimaryButton
                        onClick={handleSubmit}
                        disabled={!isComplete || isLoading}
                        className="w-full"
                      >
                        {isLoading ? (
                          <Spinner size={24} />
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            Verificar identidad
                            <CaretRight weight="bold" className="w-4 h-4" />
                          </div>
                        )}
                      </PrimaryButton>

                      <p className="text-xs text-gray-500 text-center mt-4">
                        Al continuar, aceptas que verificaremos tu identidad para cumplir con los requisitos legales.
                      </p>
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

export default VerifyIdentity;