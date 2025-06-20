'use client';

import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Share, Download, Eye, Lock } from 'phosphor-react';
import PrimaryButton from '@/components/reusables/PrimaryButton';
import DashboardLayout from '@/components/common/DashboardLayout';
import { getTestamentPDFAction } from '@/app/actions/testamentActions';

const DocumentViewClient: FC = () => {
  const router = useRouter();
  const [showShareModal, setShowShareModal] = useState(false);
  // Default fallback URL in case fetching fails.
  const [pdfUrl, setPdfUrl] = useState('/sample-testament.pdf');

  useEffect(() => {
    async function fetchPDF() {
      const result = await getTestamentPDFAction('d376d12b-9beb-41ed-bed8-f103dfc185d1');
      if (result.error) {
        console.error("Error fetching PDF: ", result.error);
        return;
      }
      if (result.pdfBase64) {
        // Create a data URL from the base64 string
        const url = `data:application/pdf;base64,${result.pdfBase64}`;
        setPdfUrl(url);
      }
    }
    fetchPDF();
  }, []);

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'testamento-digital.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
                <div className="inline-flex items-center h-[32px] bg-[#f95940] bg-opacity-10 px-[12px] py-[6px] rounded-md">
                  <span className="text-[#f95940] text-[14px] font-[400]">TESTAMENTO DIGITAL</span>
                </div>
                <div className="flex items-center gap-2">
                  <a href="#" className="inline-flex items-center h-[32px] text-[#f95940] hover:text-[#0456b0]">
                    <span className="w-5 h-5 inline-flex items-center justify-center rounded-full border border-[#f95940] text-sm">?</span>
                  </a>
                  <p className="text-[14px] text-[#000000]">Artículo relacionado</p>
                </div>
              </div>
            </div>
            
            <div className="flex-grow px-4 sm:px-5">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg mb-8">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle weight="fill" size={48} className="text-green-600" />
                  </div>
                </div>
                
                <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] text-center mb-4">
                  <span className="text-[#1d1d1f]">Tu testamento está </span>
                  <span className="bg-gradient-to-r from-[#3d9bff] to-[#f95940] inline-block text-transparent bg-clip-text">
                    listo
                  </span>
                </h1>
                
                <p className="text-[16px] text-center text-[#1d1d1f] mb-8 max-w-md mx-auto">
                  Tu testamento ha sido legalizado y validado correctamente. Ahora puedes visualizarlo y compartirlo de forma segura.
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
                      onClick={handleDownload}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Download size={20} />
                      <span>Descargar</span>
                    </button>
                  </div>
                </div>

                {/* Actions and Info */}
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h2 className="text-[20px] font-[500] text-[#1d1d1f] mb-4">Compartir de forma segura</h2>
                    <p className="text-[15px] text-gray-600 mb-6">
                      Comparte tu testamento de manera segura con tus seres queridos o representantes legales.
                    </p>
                    <PrimaryButton onClick={handleShare} className="w-full">
                      Compartir testamento
                    </PrimaryButton>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-start gap-3 mb-4">
                      <Lock size={24} className="text-[#f95940]" />
                      <div>
                        <h3 className="text-[17px] font-[500] text-[#1d1d1f] mb-2">Seguridad garantizada</h3>
                        <p className="text-[14px] text-gray-600">
                          Tu testamento está protegido con cifrado y almacenado de forma segura.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h2 className="text-[20px] font-[500] text-[#1d1d1f] mb-4">Próximos pasos</h2>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f95940] flex items-center justify-center mt-0.5">
                          <CheckCircle weight="fill" className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-[15px] text-[#1d1d1f] leading-6">
                          Descarga una copia de seguridad
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f95940] flex items-center justify-center mt-0.5">
                          <CheckCircle weight="fill" className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-[15px] text-[#1d1d1f] leading-6">
                          Comparte con tus beneficiarios
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f95940] flex items-center justify-center mt-0.5">
                          <CheckCircle weight="fill" className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-[15px] text-[#1d1d1f] leading-6">
                          Actualiza cuando sea necesario
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <PrimaryButton onClick={() => router.push('/summary')} className="px-8">
                  Ir al resumen
                </PrimaryButton>
              </div>
            </div>
          </div>
        </main>

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-[20px] font-[500] text-[#1d1d1f] mb-4">Compartir testamento</h3>
              <div className="space-y-4">
                <button className="w-full flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Share size={20} className="text-[#f95940]" />
                  </div>
                  <div className="text-left">
                    <p className="text-[15px] font-[500] text-[#1d1d1f]">Generar enlace seguro</p>
                    <p className="text-[13px] text-gray-600">Válido por 24 horas</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Download size={20} className="text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-[15px] font-[500] text-[#1d1d1f]">Descargar copia</p>
                    <p className="text-[13px] text-gray-600">PDF con marca de agua</p>
                  </div>
                </button>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="mt-6 w-full text-center text-[15px] text-gray-600 hover:text-gray-800"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default DocumentViewClient;
