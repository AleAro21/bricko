'use client';

import { FC, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Share, Download, Eye, Lock, Eraser, PencilSimple } from 'phosphor-react';
import SignaturePad from 'react-signature-canvas';
import PrimaryButton from '@/components/reusables/PrimaryButton';
import DashboardLayout from '@/components/common/DashboardLayout';
import Spinner from '@/components/reusables/Spinner';

type SignaturePadRef = SignaturePad | null;

const DocumentSignature: FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const signaturePadRef = useRef<SignaturePadRef>(null);
  const [pdfUrl] = useState('/gnp_ins.pdf'); // Replace with actual PDF URL

  const handleClearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
  };

  const handleSaveSignature = () => {
    if (signaturePadRef.current && !signaturePadRef.current.isEmpty()) {
      const dataUrl = signaturePadRef.current.toDataURL('image/png');
      setSignature(dataUrl);
      setShowSignatureModal(false);
    }
  };

  const handleSubmit = async () => {
    if (!signature) {
      alert('Por favor, añade tu firma antes de continuar.');
      return;
    }

    setIsLoading(true);
    try {
      // Here you would typically send the signature to your backend
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
      router.push('/signature-success');
    } catch (error) {
      console.error('Error submitting signature:', error);
      alert('Hubo un error al procesar tu firma. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="relative flex flex-col min-h-screen bg-[#f5f5f7]"
      >
        <main className="container mx-auto flex flex-col flex-grow overflow-hidden">
          <div className="w-full max-w-6xl mx-auto flex flex-col min-h-[75vh] mb-4">
            <div className="py-4 px-4 sm:px-5">
              <div className="flex items-center justify-between mb-2.5">
                <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md">
                  <span className="text-[#047aff] text-[14px] font-[400]">FIRMA DE DOCUMENTO</span>
                </div>
                <div className="flex items-center gap-2">
                  <a href="#" className="inline-flex items-center h-[32px] text-[#047aff] hover:text-[#0456b0]">
                    <span className="w-5 h-5 inline-flex items-center justify-center rounded-full border border-[#047aff] text-sm">?</span>
                  </a>
                  <p className="text-[14px] text-[#000000]">Ayuda</p>
                </div>
              </div>
            </div>
            
            <div className="flex-grow px-4 sm:px-5">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg mb-8">
                <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] text-center mb-4">
                  <span className="text-[#1d1d1f]">Revisa y firma tu </span>
                  <span className="bg-gradient-to-r from-[#3d9bff] to-[#047aff] inline-block text-transparent bg-clip-text">
                    poliza de seguro
                  </span>
                </h1>
                
                <p className="text-[16px] text-center text-[#1d1d1f] mb-8 max-w-md mx-auto">
                  Por favor, revisa cuidadosamente el documento y firma en el área designada para completar el proceso.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* PDF Preview */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="aspect-[3/4] bg-gray-50 rounded-lg mb-6 overflow-hidden">
                    <iframe
                      src={pdfUrl}
                      className="w-full h-full"
                      title="Vista previa del testamento"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      onClick={() => window.open(pdfUrl, '_blank')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Eye size={20} />
                      <span>Ver completo</span>
                    </button>
                    <button
                      onClick={() => window.open(pdfUrl, '_blank')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Download size={20} />
                      <span>Descargar</span>
                    </button>
                  </div>
                </div>

                {/* Signature Section */}
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h2 className="text-[20px] font-[500] text-[#1d1d1f] mb-4">Firma del documento</h2>
                    <p className="text-[15px] text-gray-600 mb-6">
                      Tu firma electrónica tiene la misma validez legal que una firma manuscrita.
                    </p>

                    {signature ? (
                      <div className="mb-6">
                        <div className="border-2 border-blue-500 rounded-lg p-4 bg-blue-50">
                          <img src={signature} alt="Firma" className="max-h-32 mx-auto" />
                        </div>
                        <button
                          onClick={() => setShowSignatureModal(true)}
                          className="mt-4 text-blue-500 text-sm hover:underline w-full text-center"
                        >
                          Volver a firmar
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowSignatureModal(true)}
                        className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-500 transition-colors mb-6"
                      >
                        <div className="flex flex-col items-center gap-2 text-gray-500">
                          <PencilSimple size={32} />
                          <span>Haz clic para añadir tu firma</span>
                        </div>
                      </button>
                    )}

                    <PrimaryButton
                      onClick={handleSubmit}
                      disabled={!signature || isLoading}
                      className="w-full"
                    >
                      {isLoading ? (
                        <Spinner size={24} />
                      ) : (
                        'Firmar y finalizar'
                      )}
                    </PrimaryButton>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-start gap-3">
                      <Lock size={24} className="text-[#047aff]" />
                      <div>
                        <h3 className="text-[17px] font-[500] text-[#1d1d1f] mb-2">Firma segura</h3>
                        <p className="text-[14px] text-gray-600">
                          Tu firma está protegida y cumple con todos los requisitos legales necesarios.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h2 className="text-[20px] font-[500] text-[#1d1d1f] mb-4">Pasos de verificación</h2>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#047aff] flex items-center justify-center mt-0.5">
                          <CheckCircle weight="fill" className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-[15px] text-[#1d1d1f] leading-6">
                          Documento generado correctamente
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#047aff] flex items-center justify-center mt-0.5">
                          <CheckCircle weight="fill" className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-[15px] text-[#1d1d1f] leading-6">
                          Contenido verificado
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#047aff] flex items-center justify-center mt-0.5">
                          <CheckCircle weight="fill" className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-[15px] text-[#1d1d1f] leading-6">
                          Listo para firma digital
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Signature Modal */}
        {showSignatureModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[20px] font-[500] text-[#1d1d1f]">Añade tu firma</h3>
                <button
                  onClick={() => setShowSignatureModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <div className="border-2 border-gray-200 rounded-lg mb-6">
                <SignaturePad
                  ref={signaturePadRef}
                  canvasProps={{
                    className: 'w-full h-64 rounded-lg',
                    style: { width: '100%', height: '256px' }
                  }}
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleClearSignature}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Eraser size={20} />
                  <span>Borrar</span>
                </button>
                <PrimaryButton onClick={handleSaveSignature} className="flex-1">
                  Guardar firma
                </PrimaryButton>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default DocumentSignature;