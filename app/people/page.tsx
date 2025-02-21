'use client';

import { FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/common/DashboardLayout";
import { motion } from "framer-motion";
import { Baby, Users, Dog, Heart, UserPlus, Pencil, Trash, CaretLeft } from 'phosphor-react';
import Link from "next/link";
import { useUser } from '@/context/UserContext';
import { apiService } from '@/app/apiService';
import { Contact, Pet } from '@/types';
import { fetchAuthSession } from "aws-amplify/auth";

// Types
interface CategoryCardProps {
  title: string;
  description: string;
  icon: JSX.Element;
  count: number;
  onClick: () => void;
}

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (contactId: string) => void;
}

interface PetCardProps {
  pet: Pet;
  onEdit: (pet: Pet) => void;
  onDelete: (petId: string) => void;
}

type Category = 'children' | 'trusted' | 'pets' | 'charity' | null;

// Constants
const relationshipLabels: Record<string, string> = {
  sibling: "Hermano/a",
  child: "Hijo/a",
  spouse: "Cónyuge",
  friend: "Amigo/a",
  parent: "Padre/Madre",
  albacea: "Albacea",
  none: "Otro"
};

// Helper function to calculate age from a date string
const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const diffMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(diffMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

// Components
const CategoryCard: FC<CategoryCardProps> = ({ title, description, icon, onClick, count }) => (
  <div    
    onClick={onClick}
    className="relative flex flex-col items-start p-8 rounded-xl transition-all duration-500 cursor-pointer w-full min-h-[150px] bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg hover:scale-[1.02]"
  >
    <div className="flex items-center justify-between w-full mb-3">
      <div className="w-10 h-10 flex items-center justify-center text-[#047aff]">
        {icon}
      </div>
      <div className="px-3 py-1 rounded-full bg-[#047aff] bg-opacity-10">
        <span className="text-[#047aff] text-sm font-medium">{count}</span>
      </div>
    </div>
    <h3 className="text-[24px] sm:text-[24px] text-[#1d1d1f] font-[500] mb-2 pr-2 tracking-[0.1px] leading-[1.3]">
      {title}
    </h3>
    <p className="text-[14px] sm:text-[14px] font-[300] text-[#1d1d1f] mb-0 pr-4 tracking-[0.1px] leading-[1.3]">
      {description}
    </p>
  </div>
);

const ContactCard: FC<ContactCardProps> = ({ contact, onEdit, onDelete }) => {
  // Determine age label based on birthDate
  const ageLabel = contact.birthDate
    ? (calculateAge(contact.birthDate) < 18 ? "Menor de edad" : "Mayor de edad")
    : "Mayor de edad";
  
  // Format the birth date to a pretty format (e.g., "12 de octubre de 2023")
  const formattedBirthDate = contact.birthDate
    ? new Date(contact.birthDate).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-md rounded-xl p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-medium text-[#1d1d1f]">
            {contact.name} {contact.fatherLastName}
          </h3>
          <span className="text-sm text-[#047aff] bg-[#047aff]/10 px-2 py-1 rounded-full mr-2">
            {relationshipLabels[contact.relationToUser] || "Otro"}
          </span>
          <span className="text-sm text-[#047aff] bg-[#047aff]/10 px-2 py-1 rounded-full">
            {ageLabel}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(contact)}
            className="p-2 text-gray-600 hover:text-[#047aff] transition-colors"
          >
            <Pencil size={20} />
          </button>
          <button
            onClick={() => onDelete(contact.id!)}
            className="p-2 text-gray-600 hover:text-red-500 transition-colors"
          >
            <Trash size={20} />
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Email:</span> {contact.email}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">País:</span> {contact.country}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Fecha de nacimiento:</span> {formattedBirthDate}
        </p>
        {contact.governmentId && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">ID de Gobierno:</span> {contact.governmentId}
          </p>
        )}
        {contact.trustedContact && (
          <div className="mt-2">
            <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Contacto de confianza
            </span>
          </div>
        )}
      </div>
    </div>
  );
};



const PetCard: FC<PetCardProps> = ({ pet, onEdit, onDelete }) => (
  <div className="bg-white/90 backdrop-blur-sm shadow-md rounded-xl p-6 hover:shadow-lg transition-all duration-300">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-xl font-medium text-[#1d1d1f]">
          {pet.name}
        </h3>
        <span className="text-sm text-[#047aff] bg-[#047aff]/10 px-2 py-1 rounded-full">
          {pet.species}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(pet)}
          className="p-2 text-gray-600 hover:text-[#047aff] transition-colors"
        >
          <Pencil size={20} />
        </button>
        <button
          onClick={() => onDelete(pet.id)}
          className="p-2 text-gray-600 hover:text-red-500 transition-colors"
        >
          <Trash size={20} />
        </button>
      </div>
    </div>
    <div className="space-y-2">
      <p className="text-sm text-gray-600">
        <span className="font-medium">Fecha de nacimiento:</span>{' '}
        {new Date(pet.dateOfBirth).toLocaleDateString()}
      </p>
      {pet.notes && (
        <p className="text-sm text-gray-600">
          <span className="font-medium">Notas:</span> {pet.notes}
        </p>
      )}
    </div>
  </div>
);

const PeoplePage: FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const [selectedCategory, setSelectedCategory] = useState<Category>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        console.log("Fetching auth session...");
        const { tokens } = await fetchAuthSession();
        console.log("Fetched tokens:", tokens);
        if (!tokens?.accessToken) throw new Error("No authentication token available");
        apiService.setToken(tokens.accessToken.toString());
  
        console.log("Fetching contacts for user:", user.id);
        const fetchedContacts = await apiService.getContacts(user.id);
        console.log("Fetched contacts:", fetchedContacts);
  
        // Try to fetch pets, but handle the 404 error gracefully.
        let fetchedPets: Pet[] = [];
        try {
          console.log("Fetching pets for user:", user.id);
          fetchedPets = await apiService.getPets(user.id);
          console.log("Fetched pets:", fetchedPets);
        } catch (err: any) {
          console.error("Error fetching pets:", err);
          console.log("Type of error:", typeof err);
          console.log("Full error object:", err);
          if (
            (typeof err === "string" && err.includes("API call failed: 404")) ||
            (err.message && err.message.includes("API call failed: 404"))
          ) {
            console.log("Encountered 404 error for pets, setting fetchedPets to an empty array");
            fetchedPets = [];
          } else {
            throw err;
          }
        }
        
        setContacts(fetchedContacts);
        setPets(fetchedPets);
      } catch (err) {
        console.error("Error in loadData:", err);
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };
  
    loadData();
  }, [user?.id]);
  
  const handleEdit = {
    contact: (contact: Contact) => {
      console.log('Edit contact:', contact);
    },
    pet: (pet: Pet) => {
      console.log('Edit pet:', pet);
    }
  };

  const handleDelete = {
    contact: async (contactId: string) => {
      if (!user?.id) return;
      
      if (window.confirm('¿Estás seguro de que deseas eliminar este contacto?')) {
        try {
          await apiService.deleteContact(user.id, contactId);
          setContacts(contacts.filter(c => c.id !== contactId));
        } catch (err) {
          console.error('Error deleting contact:', err);
          setError('Error al eliminar el contacto');
        }
      }
    },
    pet: async (petId: string) => {
      if (!user?.id) return;
      
      if (window.confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
        try {
          await apiService.deletePet(user.id, petId);
          setPets(pets.filter(p => p.id !== petId));
        } catch (err) {
          console.error('Error deleting pet:', err);
          setError('Error al eliminar la mascota');
        }
      }
    }
  };

  const filteredContacts = {
    children: contacts.filter(c => c.relationToUser === 'child'),
    trusted: contacts.filter(c => ['sibling', 'spouse', 'parent', 'albacea', 'friend'].includes(c.relationToUser))
  };

  const categories = [
    {
      id: 'children' as const,
      title: "Hijos",
      description: "Agrega información sobre tus hijos o menores a cargo para asegurar su futuro y bienestar",
      icon: <Baby size={28} weight="thin" />,
      count: filteredContacts.children.length
    },
    {
      id: 'trusted' as const,
      title: "Persona de confianza",
      description: "Designa a las personas que confías para manejar aspectos importantes de tu testamento",
      icon: <Users size={28} weight="thin" />,
      count: filteredContacts.trusted.length
    },
    {
      id: 'pets' as const,
      title: "Mascota",
      description: "Asegura el cuidado futuro de tus mascotas designando guardianes y recursos",
      icon: <Dog size={28} weight="thin" />,
      count: pets.length
    },
    {
      id: 'charity' as const,
      title: "Caridad",
      description: "Contribuye a causas importantes incluyendo organizaciones benéficas en tu testamento",
      icon: <Heart size={28} weight="thin" />,
      count: 0
    }
  ];

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#047aff] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
        </div>
      );
    }

    if (!selectedCategory) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              description={category.description}
              icon={category.icon}
              count={category.count}
              onClick={() => setSelectedCategory(category.id)}
            />
          ))}
        </div>
      );
    }

    const getEmptyState = () => {
      const categoryData = categories.find(c => c.id === selectedCategory);
      return (
        <div className="text-center py-12 bg-white/90 backdrop-blur-sm rounded-xl shadow-md">
          {categoryData?.icon && <div className="mx-auto text-gray-400 mb-4 w-12 h-12 flex items-center justify-center">{categoryData.icon}</div>}
          <h3 className="text-xl font-medium text-gray-900 mb-2">No hay {categoryData?.title.toLowerCase()}</h3>
          <p className="text-gray-600 mb-4">Comienza agregando {selectedCategory === 'pets' ? 'mascotas' : 'contactos'}</p>
          <button
            onClick={() => {/* Implement add functionality */}}
            className="inline-flex items-center gap-2 bg-[#047aff] text-white px-4 py-2 rounded-lg hover:bg-[#0456b0] transition-colors"
          >
            <UserPlus size={20} />
            <span>Agregar {selectedCategory === 'pets' ? 'Mascota' : 'Contacto'}</span>
          </button>
        </div>
      );
    };

    let content;
    if (selectedCategory === 'pets') {
      content = pets.length === 0 ? getEmptyState() : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pets.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              onEdit={handleEdit.pet}
              onDelete={handleDelete.pet}
            />
          ))}
        </div>
      );
    } else {
      const categoryContacts = selectedCategory === 'children'
        ? filteredContacts.children
        : selectedCategory === 'trusted'
          ? filteredContacts.trusted
          : [];
      
      content = categoryContacts.length === 0 ? getEmptyState() : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categoryContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onEdit={handleEdit.contact}
              onDelete={handleDelete.contact}
            />
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className="flex items-center gap-2 text-[#047aff] hover:text-[#0456b0] transition-colors"
        >
          <CaretLeft size={20} />
          <span>Volver a categorías</span>
        </button>
        {content}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <motion.div 
        className="min-h-screen bg-[#f5f5f7]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-5 py-12">
          <div className="space-y-8">
            {/* Header section */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md">
                  <span className="text-[#047aff] text-[14px] font-[400]">
                    {selectedCategory ? categories.find(c => c.id === selectedCategory)?.title.toUpperCase() : 'CONTACTOS'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Link href="#" className="inline-flex items-center h-[32px] text-[#047aff] hover:text-[#0456b0]">
                    <span className="w-5 h-5 inline-flex items-center justify-center rounded-full border border-[#047aff] text-sm">?</span>
                  </Link>
                  <p className="text-[14px] text-[#000000]">Artículo relacionado</p>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                    <span className="text-[#1d1d1f]">Gestiona tus </span>
                    <span className="bg-gradient-to-r from-[#3d9bff] to-[#047aff] inline-block text-transparent bg-clip-text">
                      {selectedCategory ? categories.find(c => c.id === selectedCategory)?.title.toLowerCase() : 'contactos'}
                    </span>
                  </h1>
                  <p className="text-[16px] text-[#1d1d1f] leading-6">
                    {selectedCategory 
                      ? categories.find(c => c.id === selectedCategory)?.description
                      : 'Organiza y administra la información de las personas importantes en tu vida.'}
                  </p>
                </div>
                {selectedCategory && (
                  <button
                    onClick={() => {/* Implement add functionality */}}
                    className="flex items-center gap-2 bg-[#047aff] text-white px-4 py-2 rounded-lg hover:bg-[#0456b0] transition-colors"
                  >
                    <UserPlus size={20} />
                    <span>Agregar {selectedCategory === 'pets' ? 'Mascota' : 'Contacto'}</span>
                  </button>
                )}
              </div>
            </div>

            {renderContent()}
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default PeoplePage;
