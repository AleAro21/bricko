'use client';

import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, ArrowLeft, Check, PencilSimple } from 'phosphor-react';
import DashboardLayout from '@/components/common/DashboardLayout';
import PrimaryButton from '@/components/reusables/PrimaryButton';
import { getTestamentPDFAction } from '@/app/actions/testamentActions';

const PreviewPage: FC = () => {
  const router = useRouter();
  const [confirmationChecked, setConfirmationChecked] = useState(false);
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

  const handleProceedToPayment = () => {
    router.push('/payment');
  };

  const handleBackToSummary = () => {
    router.push('/summary');
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
          <div className="w-full max-w-6xl mx-auto flex flex-col min-h-[75vh] mb-4 px-4 sm:px-5 py-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              {/* <button
                onClick={handleBackToSummary}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft size={24} className="text-gray-600" />
              </button> */}
              <div>
                <div className="inline-flex items-center h-[32px] bg-[#f95940] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2">
                  <span className="text-[#f95940] text-[14px] font-[400]">VISTA PREVIA</span>
                </div>
                <h1 className="text-[28px] sm:text-[32px] font-[500] tracking-[-1px] leading-[1.2]">
                  Revisa tu testamento
                </h1>
              </div>
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
                
                <button
                  onClick={() => window.open(pdfUrl, '_blank')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Eye size={20} />
                  <span>Ver documento completo</span>
                </button>
              </div>

              {/* Actions and Confirmation */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h2 className="text-[20px] font-[500] text-[#1d1d1f] mb-4">Confirma tu testamento</h2>
                  <p className="text-[15px] text-gray-600 mb-6">
                    Revisa cuidadosamente tu testamento antes de proceder con el pago y la legalización.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <Check weight="bold" className="w-3.5 h-3.5 text-green-600" />
                      </div>
                      <span className="text-[15px] text-[#1d1d1f] leading-6">
                        Información personal verificada
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <Check weight="bold" className="w-3.5 h-3.5 text-green-600" />
                      </div>
                      <span className="text-[15px] text-[#1d1d1f] leading-6">
                        Distribución de bienes especificada
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <Check weight="bold" className="w-3.5 h-3.5 text-green-600" />
                      </div>
                      <span className="text-[15px] text-[#1d1d1f] leading-6">
                        Beneficiarios designados correctamente
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      id="confirmation"
                      checked={confirmationChecked}
                      onChange={(e) => setConfirmationChecked(e.target.checked)}
                      className="mt-1"
                    />
                    <label htmlFor="confirmation" className="text-[14px] text-gray-600">
                      He revisado mi testamento y confirmo que toda la información es correcta y refleja mis deseos.
                    </label>
                  </div>

                  <div className="space-y-4">
                    <PrimaryButton
                      onClick={handleProceedToPayment}
                      disabled={!confirmationChecked}
                      className="w-full"
                    >
                      Proceder al pago
                    </PrimaryButton>
                    
                    <button
                      onClick={handleBackToSummary}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <PencilSimple size={20} />
                      <span>Realizar cambios</span>
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Eye size={20} className="text-[#f95940]" />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-[500] text-[#1d1d1f] mb-1">Importante</h3>
                      <p className="text-[14px] text-gray-600">
                        Una vez realizado el pago y legalizado el testamento, cualquier modificación requerirá un proceso adicional.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </motion.div>
    </DashboardLayout>
  );
};

export default PreviewPage;