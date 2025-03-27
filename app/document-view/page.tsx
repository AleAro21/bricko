'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import logo from '../../assets/greylogo.svg';
import {
  Download,
  Eye,
  Users,
  CaretRight,
  CheckCircle,
  User,
  Heart,
  FirstAid,
  Phone,
  X,
  Coins,
  ShieldStar
} from 'phosphor-react';
import DashboardLayout from '@/components/common/DashboardLayout';
import PrimaryButton from '@/components/reusables/PrimaryButton';
import Image from 'next/image';

interface Beneficiary {
  name: string;
  relationship: string;
  tokens: number;
  percentage: number;
  benefits: string[];
}

interface Document {
  id: number;
  name: string;
  description: string;
  type: string;
  icon: any;
  date: string;
  url: string;
}

const DocumentView: FC = () => {
  const router = useRouter();
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

 
  const documents: Document[] = [
    {
      id: 1,
      name: 'Póliza de Seguro',
      description: 'Documento oficial de tu seguro de vida',
      type: 'pdf',
      icon: CheckCircle,
      date: '15 de Enero, 2024',
      url: '/gnp_ins.pdf' // Replace with actual PDF URL
    },
    {
      id: 2,
      name: 'NOM-151',
      description: 'Norma Oficial Mexicana de Seguros',
      type: 'pdf',
      icon: CheckCircle,
      date: '15 de Enero, 2024',
      url: '/nom.pdf' // Replace with actual PDF URL
    }
  ];

  const beneficiaries: Beneficiary[] = [
    {
      name: 'Paulina García Estrada',
      relationship: 'Esposa',
      tokens: 50,
      percentage: 50,
      benefits: [
        'Tokens de propiedad',
        'Derechos de voto',
        'Cobertura básica',
        'Beneficio por fallecimiento'
      ]
    },
    {
      name: 'Carlos Arouesty García',
      relationship: 'Hijo',
      tokens: 50,
      percentage: 50,
      benefits: [
        'Tokens de propiedad',
        'Derechos de voto',
        'Cobertura básica',
        'Beneficio por fallecimiento'
      ]
    }
  ];

  const totalTokens = 100;
  const tokenValue = 30000;
  const insuranceCoverage = 1000000;

  const handleDownload = (documentId: number) => {
    const doc = documents.find(d => d.id === documentId);
    if (doc?.url) {
      window.open(doc.url, '_blank');
    }
  };

  const handlePreview = (documentId: number) => {
    const doc = documents.find(d => d.id === documentId);
    if (doc) {
      setSelectedDoc(doc);
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
        <div className="absolute top-4 right-4">
          <Image src={logo} alt="Company Logo" width={150} height={50} className="h-12 w-auto" />
        </div>

        <main className="container mx-auto flex flex-col flex-grow overflow-hidden">
          <div className="w-full max-w-6xl mx-auto flex flex-col min-h-[75vh] mb-4">
            <div className="py-4 px-4 sm:px-5">
              <div className="flex items-center justify-between mb-2.5">
                <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md">
                  <span className="text-[#047aff] text-[14px] font-[400]">MI PORTAFOLIO</span>
                </div>
              </div>
            </div>

            <div className="flex-grow px-4 sm:px-5">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg mb-8">
                <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] text-center mb-4">
                  <span className="text-[#1d1d1f]">Tu activo y </span>
                  <span
                    style={{
                      backgroundImage: "linear-gradient(to left, #047aff 30%, #0d4ba3 100%)",
                    }}
                    className="inline-block text-transparent bg-clip-text"
                  >
                    protección
                  </span>
                </h1>

                <p className="text-[16px] text-center text-[#1d1d1f] mb-8 max-w-md mx-auto">
                  Aquí encontrarás todos los documentos relacionados con tu activo tokenizado y tu seguro de vida.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Tokens Totales</p>
                    <p className="text-xl font-semibold text-blue-600">{totalTokens}</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Valor por Token</p>
                    <p className="text-xl font-semibold text-blue-600">
                      {new Intl.NumberFormat('es-MX', {
                        style: 'currency',
                        currency: 'MXN'
                      }).format(tokenValue)}
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Valor del Activo</p>
                    <p className="text-xl font-semibold text-blue-600">
                      {new Intl.NumberFormat('es-MX', {
                        style: 'currency',
                        currency: 'MXN'
                      }).format(tokenValue * totalTokens)}
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Cobertura del Seguro</p>
                    <p className="text-xl font-semibold text-green-600">
                      {new Intl.NumberFormat('es-MX', {
                        style: 'currency',
                        currency: 'MXN'
                      }).format(insuranceCoverage)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Documents Section */}
                <div className="space-y-6">
                  <h2 className="text-[24px] font-[500] text-[#1d1d1f] mb-6">Documentos</h2>

                  {documents.map((doc) => (
                    <div key={doc.id} className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <doc.icon size={24} className="text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-[18px] font-[500] text-[#1d1d1f] mb-1">{doc.name}</h3>
                          <p className="text-[14px] text-gray-600 mb-2">{doc.description}</p>
                          <p className="text-[12px] text-gray-500 mb-4">Última actualización: {doc.date}</p>

                          <div className="flex gap-3">
                            <button
                              onClick={() => handlePreview(doc.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                            >
                              <Eye size={16} />
                              <span>Ver</span>
                            </button>
                            <button
                              onClick={() => handleDownload(doc.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                            >
                              <Download size={16} />
                              <span>Descargar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6">
                      <div className="flex items-start gap-3">
                        <Coins size={24} className="text-green-600" />
                        <div>
                          <h3 className="text-[16px] font-[500] text-[#1d1d1f] mb-2">
                            Tokens Verificados
                          </h3>
                          <p className="text-[14px] text-gray-600">
                            Tus tokens están respaldados por un activo real y verificado.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6">
                      <div className="flex items-start gap-3">
                        <ShieldStar size={24} className="text-blue-600" />
                        <div>
                          <h3 className="text-[16px] font-[500] text-[#1d1d1f] mb-2">
                            Seguro Activo
                          </h3>
                          <p className="text-[14px] text-gray-600">
                            Tu seguro de vida está vigente y al corriente.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Beneficiaries Section */}
                <div className="space-y-6">
                  <h2 className="text-[24px] font-[500] text-[#1d1d1f] mb-6">Beneficiarios</h2>

                  {beneficiaries.map((beneficiary, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <User size={24} className="text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-[18px] font-[500] text-[#1d1d1f]">{beneficiary.name}</h3>
                            <div className="flex gap-2">
                              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">
                                {beneficiary.tokens} tokens
                              </span>
                              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded">
                                {beneficiary.percentage}% seguro
                              </span>
                            </div>
                          </div>
                          <p className="text-[14px] text-gray-600 mb-3">{beneficiary.relationship}</p>

                          <div className="space-y-2">
                            {beneficiary.benefits.map((benefit, benefitIndex) => (
                              <div key={benefitIndex} className="flex items-center gap-2 text-sm text-gray-600">
                                <CheckCircle size={16} className="text-blue-500" />
                                <span>{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6">
                    <div className="flex items-start gap-3">
                      <Users size={24} className="text-blue-600" />
                      <div>
                        <h3 className="text-[16px] font-[500] text-[#1d1d1f] mb-2">
                          Protección Integral
                        </h3>
                        <p className="text-[14px] text-gray-600">
                          Tus beneficiarios están protegidos tanto con tokens del activo como con el seguro de vida.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* PDF Viewer Modal */}
        {selectedDoc && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-[95vw] h-[95vh] flex flex-col">
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="text-xl font-semibold">{selectedDoc.name}</h3>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 p-0 relative">
                <iframe
                  src={selectedDoc.url}
                  className="absolute inset-0 w-full h-full"
                  title={selectedDoc.name}
                  style={{ minHeight: '700px' }}
                />
              </div>
              
              <div className="border-t p-6 bg-gray-50">
                <div className="flex gap-4 max-w-md mx-auto">
                  <button
                    onClick={() => window.open(selectedDoc.url, '_blank')}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Eye size={20} />
                    <span>Ver completo</span>
                  </button>
                  <button
                    onClick={() => handleDownload(selectedDoc.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    <Download size={20} />
                    <span>Descargar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default DocumentView;