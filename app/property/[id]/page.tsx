'use client';

import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/common/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  House, 
  MapPin, 
  Calendar, 
  Coins, 
  TrendUp, 
  Download, 
  Eye,
  CaretLeft,
  CaretRight,
  Plus,
  Minus,
  ShoppingCart,
  Info,
  FileText,
  ChartLine,
  Clock,
  Buildings
} from 'phosphor-react';
import PrimaryButton from '@/components/reusables/PrimaryButton';
import Modal from '@/components/common/Modal';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PropertyDetails {
  id: string;
  title: string;
  description: string;
  location: string;
  images: string[];
  totalValue: number;
  tokenPrice: number;
  totalTokens: number;
  availableTokens: number;
  expectedReturn: number;
  type: 'house' | 'apartment' | 'office' | 'hotel';
  featured: boolean;
  investmentGrade: 'A' | 'B' | 'C';
  lastUpdated: string;
  specifications: {
    area?: string;
    bedrooms?: number;
    bathrooms?: number;
    parking?: number;
    yearBuilt: number;
    amenities: string[];
    rooms?: number; // For hotels
    totalArea?: string; // For hotels
    constructionArea?: string; // For hotels
  };
  financials: {
    monthlyIncome: number;
    annualIncome: number;
    expenses: number;
    netIncome: number;
    occupancyRate: number;
  };
  legalDocuments: {
    title: string;
    type: string;
    url: string;
    date: string;
  }[];
  transactionHistory: {
    date: string;
    type: 'purchase' | 'sale';
    tokens: number;
    price: number;
    buyer?: string;
    seller?: string;
  }[];
  priceHistory: {
    date: string;
    price: number;
  }[];
}

const PROPERTIES_DATA: { [key: string]: PropertyDetails } = {
  '1': {
    id: '1',
    title: 'Casa Residencial Polanco',
    description: 'Elegante casa de 3 recámaras en la exclusiva zona de Polanco, Ciudad de México. Esta propiedad combina el lujo moderno con la comodidad familiar, ubicada en una de las zonas más prestigiosas de la capital. Con acabados de primera calidad y una ubicación privilegiada, representa una excelente oportunidad de inversión.',
    location: 'Polanco, Ciudad de México',
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    totalValue: 8500000,
    tokenPrice: 8500,
    totalTokens: 1000,
    availableTokens: 650,
    expectedReturn: 12.5,
    type: 'house',
    featured: true,
    investmentGrade: 'A',
    lastUpdated: '2024-01-15',
    specifications: {
      area: '320 m²',
      bedrooms: 3,
      bathrooms: 2,
      parking: 2,
      yearBuilt: 2018,
      amenities: ['Jardín privado', 'Terraza', 'Cocina integral', 'Clóset vestidor', 'Seguridad 24/7']
    },
    financials: {
      monthlyIncome: 85000,
      annualIncome: 1020000,
      expenses: 15000,
      netIncome: 840000,
      occupancyRate: 95
    },
    legalDocuments: [
      {
        title: 'Escritura Pública',
        type: 'PDF',
        url: '/documents/escritura-publica.pdf',
        date: '2023-06-15'
      },
      {
        title: 'Certificado de Libertad de Gravamen',
        type: 'PDF',
        url: '/documents/certificado-libertad.pdf',
        date: '2023-12-01'
      },
      {
        title: 'Avalúo Comercial',
        type: 'PDF',
        url: '/documents/avaluo-comercial.pdf',
        date: '2024-01-10'
      }
    ],
    transactionHistory: [
      {
        date: '2024-01-15',
        type: 'purchase',
        tokens: 50,
        price: 8500,
        buyer: 'Inversor***1234'
      },
      {
        date: '2024-01-10',
        type: 'purchase',
        tokens: 100,
        price: 8400,
        buyer: 'Inversor***5678'
      },
      {
        date: '2024-01-05',
        type: 'sale',
        tokens: 25,
        price: 8300,
        seller: 'Inversor***9012'
      }
    ],
    priceHistory: [
      { date: '2023-07', price: 7800 },
      { date: '2023-08', price: 7900 },
      { date: '2023-09', price: 8100 },
      { date: '2023-10', price: 8200 },
      { date: '2023-11', price: 8300 },
      { date: '2023-12', price: 8400 },
      { date: '2024-01', price: 8500 }
    ]
  },
  '2': {
    id: '2',
    title: 'Hacienda Real San Miguel Ometusco',
    description: 'En el hermoso valle de Apan conocido por su tradición pulquera en el Estado de México, se encuentra ubicada la majestuosa Hacienda Real San Miguel Ometusco. Una construcción colonial del siglo XVIII, santuario de la civilización Tolteca. En una fabulosa extensión amurallada, construida a principios del siglo XVIII por las familias Torres Adalid y Rivas. Fue restaurada en el estilo del siglo XIX, época que comenzó el apogeo de la industria del pulque, su decoración integra elementos de arte y artesanía mexicanos.',
    location: 'Ometusco, Estado de México',
    images: [
      '/hotel_1.png',
      '/hotel_2.png',
      '/hotel_3.png',
      '/hotel_4.png',
      '/hotel_5.png'
    ],
    totalValue: 45000000,
    tokenPrice: 45000,
    totalTokens: 1000,
    availableTokens: 850,
    expectedReturn: 14.5,
    type: 'hotel',
    featured: true,
    investmentGrade: 'A',
    lastUpdated: '2024-01-20',
    specifications: {
      totalArea: '52,615.62 m²',
      constructionArea: '8,375.36 m²',
      rooms: 34,
      yearBuilt: 1700,
      amenities: [
        'Restaurante',
        'Bar / Karaoke',
        'Alberca',
        'Capilla',
        'Salón para convenciones',
        'Picadero para eventos',
        'Charros',
        'Jardines',
        'Cerca de las Pirámides de Teotihuacán'
      ]
    },
    financials: {
      monthlyIncome: 450000,
      annualIncome: 5400000,
      expenses: 120000,
      netIncome: 4680000,
      occupancyRate: 85
    },
    legalDocuments: [
      {
        title: 'Escritura Pública Hacienda',
        type: 'PDF',
        url: '/documents/escritura-hacienda.pdf',
        date: '2023-10-15'
      },
      {
        title: 'Certificado INAH',
        type: 'PDF',
        url: '/documents/certificado-inah.pdf',
        date: '2023-11-20'
      },
      {
        title: 'Avalúo Comercial Hotelero',
        type: 'PDF',
        url: '/documents/avaluo-hotelero.pdf',
        date: '2024-01-15'
      }
    ],
    transactionHistory: [
      {
        date: '2024-01-20',
        type: 'purchase',
        tokens: 20,
        price: 45000,
        buyer: 'Inversor***4567'
      },
      {
        date: '2024-01-15',
        type: 'purchase',
        tokens: 35,
        price: 44500,
        buyer: 'Inversor***8901'
      }
    ],
    priceHistory: [
      { date: '2023-07', price: 40000 },
      { date: '2023-08', price: 41000 },
      { date: '2023-09', price: 42000 },
      { date: '2023-10', price: 43000 },
      { date: '2023-11', price: 43500 },
      { date: '2023-12', price: 44500 },
      { date: '2024-01', price: 45000 }
    ]
  },
  '3': {
    id: '3',
    title: 'Departamentos Matías Romero 315',
    description: 'Matías Romero cuenta con 7 departamentos de estilo minimalista, el diseño de sus espacios está creado para su máximo aprovechamiento. Cada departamento cuenta con dos habitaciones, terrazas y amplios ventanales que permiten una ventilación correcta, también cuenta con un cajón de estacionamiento y bodega por departamento. Proyecto inspirado en la filosofía de Le Corbusier: "Architecture is the learned game, correct and magnificent, of forms assembled in the light".',
    location: 'Matías Romero 315, CDMX',
    images: [
      '/apartment_1.png',
      '/apartment_2.png',
      '/apartment_3.png',
      '/apartment_4.png',
      '/apartment_5.png'
    ],
    totalValue: 7500000,
    tokenPrice: 7500,
    totalTokens: 1000,
    availableTokens: 720,
    expectedReturn: 11.8,
    type: 'apartment',
    featured: true,
    investmentGrade: 'A',
    lastUpdated: '2024-01-18',
    specifications: {
      area: '100-142 m²',
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
      yearBuilt: 2023,
      amenities: [
        'Asador Roof Garden',
        'Elevador de autos',
        'Elevador',
        'Vigilancia 24/7',
        'Bodega por departamento',
        'Amplios ventanales',
        'Terrazas y balcones'
      ]
    },
    financials: {
      monthlyIncome: 75000,
      annualIncome: 900000,
      expenses: 18000,
      netIncome: 684000,
      occupancyRate: 94
    },
    legalDocuments: [
      {
        title: 'Escritura Pública MR315',
        type: 'PDF',
        url: '/documents/escritura-mr315.pdf',
        date: '2023-12-10'
      },
      {
        title: 'Planos Arquitectónicos',
        type: 'PDF',
        url: '/documents/planos-mr315.pdf',
        date: '2023-11-25'
      },
      {
        title: 'Avalúo Comercial MR315',
        type: 'PDF',
        url: '/documents/avaluo-mr315.pdf',
        date: '2024-01-12'
      }
    ],
    transactionHistory: [
      {
        date: '2024-01-18',
        type: 'purchase',
        tokens: 25,
        price: 7500,
        buyer: 'Inversor***5678'
      },
      {
        date: '2024-01-12',
        type: 'purchase',
        tokens: 45,
        price: 7400,
        buyer: 'Inversor***9012'
      }
    ],
    priceHistory: [
      { date: '2023-07', price: 6800 },
      { date: '2023-08', price: 6900 },
      { date: '2023-09', price: 7000 },
      { date: '2023-10', price: 7100 },
      { date: '2023-11', price: 7200 },
      { date: '2023-12', price: 7400 },
      { date: '2024-01', price: 7500 }
    ]
  },
  '4': {
    id: '4',
    title: 'Departamento Santa Fe',
    description: 'Moderno departamento de 2 recámaras con vista panorámica en Santa Fe.',
    location: 'Santa Fe, CDMX',
    images: [
      'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    totalValue: 4200000,
    tokenPrice: 4200,
    totalTokens: 1000,
    availableTokens: 280,
    expectedReturn: 10.8,
    type: 'apartment',
    featured: false,
    investmentGrade: 'B',
    lastUpdated: '2024-01-12',
    specifications: {
      area: '120 m²',
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
      yearBuilt: 2020,
      amenities: ['Vista panorámica', 'Balcón', 'Cocina moderna', 'Gimnasio', 'Roof garden']
    },
    financials: {
      monthlyIncome: 35000,
      annualIncome: 420000,
      expenses: 8000,
      netIncome: 336000,
      occupancyRate: 92
    },
    legalDocuments: [
      {
        title: 'Escritura Pública',
        type: 'PDF',
        url: '/documents/escritura-publica-sf.pdf',
        date: '2023-08-20'
      },
      {
        title: 'Avalúo Comercial',
        type: 'PDF',
        url: '/documents/avaluo-comercial-sf.pdf',
        date: '2024-01-05'
      }
    ],
    transactionHistory: [
      {
        date: '2024-01-12',
        type: 'purchase',
        tokens: 30,
        price: 4200,
        buyer: 'Inversor***2345'
      },
      {
        date: '2024-01-08',
        type: 'purchase',
        tokens: 75,
        price: 4150,
        buyer: 'Inversor***6789'
      }
    ],
    priceHistory: [
      { date: '2023-07', price: 3800 },
      { date: '2023-08', price: 3900 },
      { date: '2023-09', price: 4000 },
      { date: '2023-10', price: 4050 },
      { date: '2023-11', price: 4100 },
      { date: '2023-12', price: 4150 },
      { date: '2024-01', price: 4200 }
    ]
  },
  '5': {
    id: '5',
    title: 'Oficina Corporativa Roma Norte',
    description: 'Espacio de oficina premium en el corazón de Roma Norte, completamente equipado.',
    location: 'Roma Norte, CDMX',
    images: [
      'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    totalValue: 6800000,
    tokenPrice: 6800,
    totalTokens: 1000,
    availableTokens: 420,
    expectedReturn: 15.2,
    type: 'office',
    featured: true,
    investmentGrade: 'A',
    lastUpdated: '2024-01-10',
    specifications: {
      area: '250 m²',
      parking: 3,
      yearBuilt: 2019,
      amenities: ['Recepción', 'Salas de juntas', 'Cocina ejecutiva', 'Terraza', 'Seguridad 24/7']
    },
    financials: {
      monthlyIncome: 68000,
      annualIncome: 816000,
      expenses: 12000,
      netIncome: 672000,
      occupancyRate: 98
    },
    legalDocuments: [
      {
        title: 'Escritura Pública',
        type: 'PDF',
        url: '/documents/escritura-publica-rn.pdf',
        date: '2023-09-15'
      },
      {
        title: 'Avalúo Comercial',
        type: 'PDF',
        url: '/documents/avaluo-comercial-rn.pdf',
        date: '2024-01-08'
      }
    ],
    transactionHistory: [
      {
        date: '2024-01-10',
        type: 'purchase',
        tokens: 40,
        price: 6800,
        buyer: 'Inversor***3456'
      },
      {
        date: '2024-01-05',
        type: 'purchase',
        tokens: 60,
        price: 6750,
        buyer: 'Inversor***7890'
      }
    ],
    priceHistory: [
      { date: '2023-07', price: 6200 },
      { date: '2023-08', price: 6300 },
      { date: '2023-09', price: 6450 },
      { date: '2023-10', price: 6550 },
      { date: '2023-11', price: 6650 },
      { date: '2023-12', price: 6750 },
      { date: '2024-01', price: 6800 }
    ]
  }
};

const PropertyDetailsClient: FC = () => {
  const router = useRouter();
  const params = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [tokensToBuy, setTokensToBuy] = useState(1);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'transactions' | 'financials'>('overview');

  // Get property data based on ID from URL
  const propertyId = params?.id as string;
  const PROPERTY_DATA = PROPERTIES_DATA[propertyId];

  // Redirect if property not found
  useEffect(() => {
    if (!PROPERTY_DATA) {
      router.push('/dashboard');
    }
  }, [PROPERTY_DATA, router]);

  if (!PROPERTY_DATA) {
    return null;
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === PROPERTY_DATA.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? PROPERTY_DATA.images.length - 1 : prev - 1
    );
  };

  const handleTokenChange = (increment: boolean) => {
    if (increment && tokensToBuy < PROPERTY_DATA.availableTokens) {
      setTokensToBuy(prev => prev + 1);
    } else if (!increment && tokensToBuy > 1) {
      setTokensToBuy(prev => prev - 1);
    }
  };

  const handlePurchase = () => {
    setShowPurchaseModal(true);
  };

  const confirmPurchase = () => {
    setShowPurchaseModal(false);
    // Redirect to token purchase page with property ID
    router.push(`/purchase-tokens/${PROPERTY_DATA.id}`);
  };

  // Chart data
  const priceChartData = {
    labels: PROPERTY_DATA.priceHistory.map(item => item.date),
    datasets: [
      {
        label: 'Precio por Token',
        data: PROPERTY_DATA.priceHistory.map(item => item.price),
        borderColor: '#f95940',
        backgroundColor: 'rgba(249, 89, 64, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${formatCurrency(context.parsed.y)}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value: any) => formatCurrency(value),
        },
      },
    },
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
            <div className="w-full max-w-7xl mx-auto flex flex-col min-h-[75vh] mb-4 px-4 sm:px-5 py-8">
              
              {/* Back Button */}
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 mb-6 text-[#f95940] hover:text-[#f95940]/80 transition-colors"
              >
                <CaretLeft className="w-5 h-5" />
                <span>Volver al mercado</span>
              </button>

              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] text-[#1d1d1f] mb-2">
                      {PROPERTY_DATA.title}
                    </h1>
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <span className="text-[16px] text-gray-600">{PROPERTY_DATA.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-2 bg-[#f95940] bg-opacity-10 px-3 py-1 rounded-full mb-2">
                      <span className="text-[#f95940] text-[14px] font-[500]">
                        Grado {PROPERTY_DATA.investmentGrade}
                      </span>
                    </div>
                    <p className="text-[14px] text-gray-500">
                      Actualizado: {formatDate(PROPERTY_DATA.lastUpdated)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Image Carousel */}
                  <div className="relative">
                    <div className="relative h-96 bg-gray-200 rounded-xl overflow-hidden">
                      <img
                        src={PROPERTY_DATA.images[currentImageIndex]}
                        alt={`${PROPERTY_DATA.title} - Imagen ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Navigation buttons */}
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
                      >
                        <CaretLeft className="w-6 h-6 text-gray-800" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
                      >
                        <CaretRight className="w-6 h-6 text-gray-800" />
                      </button>
                      
                      {/* Image indicators */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {PROPERTY_DATA.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Thumbnail navigation */}
                    <div className="flex gap-2 mt-4">
                      {PROPERTY_DATA.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                            index === currentImageIndex ? 'border-[#f95940]' : 'border-gray-200'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="flex border-b">
                      {[
                        { id: 'overview', label: 'Descripción', icon: Info },
                        { id: 'documents', label: 'Documentos', icon: FileText },
                        { id: 'transactions', label: 'Transacciones', icon: Clock },
                        { id: 'financials', label: 'Financieros', icon: ChartLine }
                      ].map(tab => {
                        const Icon = tab.icon;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as typeof activeTab)}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                              activeTab === tab.id
                                ? 'bg-[#f95940] text-white'
                                : 'text-gray-600 hover:text-[#f95940]'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>

                    <div className="p-6">
                      {activeTab === 'overview' && (
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-[20px] font-[500] text-[#1d1d1f] mb-4">
                              Descripción de la propiedad
                            </h3>
                            <p className="text-[16px] text-gray-700 leading-relaxed">
                              {PROPERTY_DATA.description}
                            </p>
                          </div>

                          <div>
                            <h3 className="text-[20px] font-[500] text-[#1d1d1f] mb-4">
                              Características
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {PROPERTY_DATA.type === 'hotel' ? (
                                <>
                                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <p className="text-[14px] text-gray-600">Terreno Total</p>
                                    <p className="text-[16px] font-[500] text-[#1d1d1f]">
                                      {PROPERTY_DATA.specifications.totalArea}
                                    </p>
                                  </div>
                                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <p className="text-[14px] text-gray-600">Construcción</p>
                                    <p className="text-[16px] font-[500] text-[#1d1d1f]">
                                      {PROPERTY_DATA.specifications.constructionArea}
                                    </p>
                                  </div>
                                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <p className="text-[14px] text-gray-600">Habitaciones</p>
                                    <p className="text-[16px] font-[500] text-[#1d1d1f]">
                                      {PROPERTY_DATA.specifications.rooms}
                                    </p>
                                  </div>
                                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <p className="text-[14px] text-gray-600">Año</p>
                                    <p className="text-[16px] font-[500] text-[#1d1d1f]">
                                      {PROPERTY_DATA.specifications.yearBuilt}
                                    </p>
                                  </div>
                                </>
                              ) : (
                                <>
                                  {PROPERTY_DATA.specifications.area && (
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                      <p className="text-[14px] text-gray-600">Área</p>
                                      <p className="text-[16px] font-[500] text-[#1d1d1f]">
                                        {PROPERTY_DATA.specifications.area}
                                      </p>
                                    </div>
                                  )}
                                  {PROPERTY_DATA.specifications.bedrooms && (
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                      <p className="text-[14px] text-gray-600">Recámaras</p>
                                      <p className="text-[16px] font-[500] text-[#1d1d1f]">
                                        {PROPERTY_DATA.specifications.bedrooms}
                                      </p>
                                    </div>
                                  )}
                                  {PROPERTY_DATA.specifications.bathrooms && (
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                      <p className="text-[14px] text-gray-600">Baños</p>
                                      <p className="text-[16px] font-[500] text-[#1d1d1f]">
                                        {PROPERTY_DATA.specifications.bathrooms}
                                      </p>
                                    </div>
                                  )}
                                  {PROPERTY_DATA.specifications.parking && (
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                      <p className="text-[14px] text-gray-600">Estacionamiento</p>
                                      <p className="text-[16px] font-[500] text-[#1d1d1f]">
                                        {PROPERTY_DATA.specifications.parking}
                                      </p>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-[20px] font-[500] text-[#1d1d1f] mb-4">
                              Amenidades
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {PROPERTY_DATA.specifications.amenities.map((amenity, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-[#f95940] bg-opacity-10 text-[#f95940] rounded-full text-[14px]"
                                >
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'documents' && (
                        <div className="space-y-4">
                          <h3 className="text-[20px] font-[500] text-[#1d1d1f] mb-4">
                            Documentos legales
                          </h3>
                          {PROPERTY_DATA.legalDocuments.map((doc, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-[#f95940]" />
                                <div>
                                  <p className="text-[16px] font-[500] text-[#1d1d1f]">{doc.title}</p>
                                  <p className="text-[14px] text-gray-600">
                                    {doc.type} • {formatDate(doc.date)}
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <button className="flex items-center gap-2 px-3 py-1 text-[#f95940] hover:bg-[#f95940] hover:bg-opacity-10 rounded-lg transition-colors">
                                  <Eye className="w-4 h-4" />
                                  Ver
                                </button>
                                <button className="flex items-center gap-2 px-3 py-1 text-[#f95940] hover:bg-[#f95940] hover:bg-opacity-10 rounded-lg transition-colors">
                                  <Download className="w-4 h-4" />
                                  Descargar
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeTab === 'transactions' && (
                        <div className="space-y-4">
                          <h3 className="text-[20px] font-[500] text-[#1d1d1f] mb-4">
                            Historial de transacciones
                          </h3>
                          {PROPERTY_DATA.transactionHistory.map((transaction, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${
                                  transaction.type === 'purchase' ? 'bg-green-500' : 'bg-blue-500'
                                }`} />
                                <div>
                                  <p className="text-[16px] font-[500] text-[#1d1d1f]">
                                    {transaction.type === 'purchase' ? 'Compra' : 'Venta'} de {transaction.tokens} tokens
                                  </p>
                                  <p className="text-[14px] text-gray-600">
                                    {formatDate(transaction.date)} • {transaction.buyer || transaction.seller}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-[16px] font-[500] text-[#1d1d1f]">
                                  {formatCurrency(transaction.price)}
                                </p>
                                <p className="text-[14px] text-gray-600">por token</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeTab === 'financials' && (
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-[20px] font-[500] text-[#1d1d1f] mb-4">
                              Rendimiento financiero
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <p className="text-[14px] text-gray-600">Ingresos mensuales</p>
                                <p className="text-[16px] font-[500] text-[#1d1d1f]">
                                  {formatCurrency(PROPERTY_DATA.financials.monthlyIncome)}
                                </p>
                              </div>
                              <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <p className="text-[14px] text-gray-600">Gastos mensuales</p>
                                <p className="text-[16px] font-[500] text-[#1d1d1f]">
                                  {formatCurrency(PROPERTY_DATA.financials.expenses)}
                                </p>
                              </div>
                              <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <p className="text-[14px] text-gray-600">Ingreso neto anual</p>
                                <p className="text-[16px] font-[500] text-green-600">
                                  {formatCurrency(PROPERTY_DATA.financials.netIncome)}
                                </p>
                              </div>
                              <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <p className="text-[14px] text-gray-600">Ocupación</p>
                                <p className="text-[16px] font-[500] text-[#1d1d1f]">
                                  {PROPERTY_DATA.financials.occupancyRate}%
                                </p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-[20px] font-[500] text-[#1d1d1f] mb-4">
                              Evolución del precio por token
                            </h3>
                            <div className="h-80">
                              <Line data={priceChartData} options={chartOptions} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-8 space-y-6">
                    {/* Purchase Card */}
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h3 className="text-[20px] font-[500] text-[#1d1d1f] mb-4">
                        Comprar tokens
                      </h3>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-[14px] text-gray-600">Precio por token:</span>
                          <span className="text-[16px] font-[500] text-[#f95940]">
                            {formatCurrency(PROPERTY_DATA.tokenPrice)}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-[14px] text-gray-600">Disponibles:</span>
                          <span className="text-[16px] font-[500] text-[#1d1d1f]">
                            {PROPERTY_DATA.availableTokens} tokens
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-[14px] text-gray-600">Rendimiento esperado:</span>
                          <span className="text-[16px] font-[500] text-green-600">
                            {PROPERTY_DATA.expectedReturn}% anual
                          </span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-[14px] font-[500] text-gray-700 mb-2">
                          Cantidad de tokens
                        </label>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleTokenChange(false)}
                            disabled={tokensToBuy <= 1}
                            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <input
                            type="number"
                            value={tokensToBuy}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 1;
                              if (value >= 1 && value <= PROPERTY_DATA.availableTokens) {
                                setTokensToBuy(value);
                              }
                            }}
                            className="flex-1 text-center px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f95940] focus:border-transparent"
                            min="1"
                            max={PROPERTY_DATA.availableTokens}
                          />
                          <button
                            onClick={() => handleTokenChange(true)}
                            disabled={tokensToBuy >= PROPERTY_DATA.availableTokens}
                            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[14px] text-gray-600">Total a pagar:</span>
                          <span className="text-[18px] font-[500] text-[#f95940]">
                            {formatCurrency(tokensToBuy * PROPERTY_DATA.tokenPrice)}
                          </span>
                        </div>
                        <p className="text-[12px] text-gray-500">
                          Rendimiento mensual estimado: {formatCurrency((tokensToBuy * PROPERTY_DATA.tokenPrice * PROPERTY_DATA.expectedReturn) / 100 / 12)}
                        </p>
                      </div>

                      <PrimaryButton
                        onClick={handlePurchase}
                        className="w-full"
                        disabled={PROPERTY_DATA.availableTokens === 0}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <ShoppingCart className="w-4 h-4" />
                          {PROPERTY_DATA.availableTokens === 0 ? 'Agotado' : 'Comprar tokens'}
                        </div>
                      </PrimaryButton>
                    </div>

                    {/* Property Summary */}
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h3 className="text-[20px] font-[500] text-[#1d1d1f] mb-4">
                        Resumen de la propiedad
                      </h3>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[14px] text-gray-600">Valor total:</span>
                          <span className="text-[14px] font-[500] text-[#1d1d1f]">
                            {formatCurrency(PROPERTY_DATA.totalValue)}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-[14px] text-gray-600">Tokens emitidos:</span>
                          <span className="text-[14px] font-[500] text-[#1d1d1f]">
                            {PROPERTY_DATA.totalTokens}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-[14px] text-gray-600">Tokens vendidos:</span>
                          <span className="text-[14px] font-[500] text-[#1d1d1f]">
                            {PROPERTY_DATA.totalTokens - PROPERTY_DATA.availableTokens}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-[14px] text-gray-600">Grado de inversión:</span>
                          <span className="text-[14px] font-[500] text-[#f95940]">
                            {PROPERTY_DATA.investmentGrade}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[14px] text-gray-600">Progreso de venta:</span>
                          <span className="text-[14px] font-[500] text-[#1d1d1f]">
                            {Math.round(((PROPERTY_DATA.totalTokens - PROPERTY_DATA.availableTokens) / PROPERTY_DATA.totalTokens) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#f95940] h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${((PROPERTY_DATA.totalTokens - PROPERTY_DATA.availableTokens) / PROPERTY_DATA.totalTokens) * 100}%` 
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </motion.div>

        {/* Purchase Confirmation Modal */}
        {showPurchaseModal && (
          <Modal showModal={showPurchaseModal} setShowModal={setShowPurchaseModal}>
            <h2 className="text-[30px] font-semibold text-[#1d1d1f] mb-4">
              Confirmar compra
            </h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-[16px] text-gray-600">Propiedad:</span>
                <span className="text-[16px] font-[500] text-[#1d1d1f]">
                  {PROPERTY_DATA.title}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[16px] text-gray-600">Tokens a comprar:</span>
                <span className="text-[16px] font-[500] text-[#1d1d1f]">
                  {tokensToBuy}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[16px] text-gray-600">Precio por token:</span>
                <span className="text-[16px] font-[500] text-[#f95940]">
                  {formatCurrency(PROPERTY_DATA.tokenPrice)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-[18px] font-[500] text-gray-900">Total a pagar:</span>
                <span className="text-[18px] font-[600] text-[#f95940]">
                  {formatCurrency(tokensToBuy * PROPERTY_DATA.tokenPrice)}
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <PrimaryButton onClick={confirmPurchase} className="flex-1">
                Confirmar compra
              </PrimaryButton>
            </div>
          </Modal>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PropertyDetailsClient;