'use client';

import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/common/DashboardLayout';
import { Baby, Users, Dog, Heart, UserPlus, Pencil, Trash, CaretLeft } from 'phosphor-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiService } from '@/app/apiService';
import type { Contact, Pet, User } from '@/types';

// Import modal components for adding contacts and pets.
import AddChild from '@/components/heirs/AddChild';
import AddContact from '@/components/heirs/Add';
import AddPet from '@/components/heirs/AddPet';

interface Category {
  id: 'children' | 'trusted' | 'pets' | 'charity';
  title: string;
  description: string;
  icon: string;
  count: number;
}

interface PeoplePageProps {
  user: User;
  contacts: Contact[];
  pets: Pet[];
  categories: Category[];
}

const CategoryCard: FC<{
  title: string;
  description: string;
  icon: JSX.Element;
  count: number;
  onClick: () => void;
}> = ({ title, description, icon, count, onClick }) => (
  <div
    onClick={onClick}
    className="relative flex flex-col items-start p-8 rounded-xl transition-all duration-500 cursor-pointer w-full min-h-[150px] bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg hover:scale-[1.02]"
  >
    <div className="flex items-center justify-between w-full mb-3">
      <div className="w-10 h-10 flex items-center justify-center text-[#f95940]">
        {icon}
      </div>
      <div className="px-3 py-1 rounded-full bg-[#f95940] bg-opacity-10">
        <span className="text-[#f95940] text-sm font-medium">{count}</span>
      </div>
    </div>
    <h3 className="text-[24px] font-[500] mb-2 pr-2 tracking-[0.1px] leading-[1.3]">{title}</h3>
    <p className="text-[14px] font-[300] text-[#1d1d1f] pr-4 tracking-[0.1px] leading-[1.3]">{description}</p>
  </div>
);

const ContactCard: FC<{
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (contactId: string) => void;
}> = ({ contact, onEdit, onDelete }) => {
  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const diffMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(diffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const ageLabel = contact.birthDate
    ? calculateAge(contact.birthDate) < 18
      ? 'Menor de edad'
      : 'Mayor de edad'
    : 'Mayor de edad';

  const formattedBirthDate = contact.birthDate
    ? new Date(contact.birthDate).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'N/A';

  const relationshipLabels: Record<string, string> = {
    sibling: 'Hermano/a',
    child: 'Hijo/a',
    spouse: 'Cónyuge',
    friend: 'Amigo/a',
    parent: 'Padre/Madre',
    albacea: 'Albacea',
    none: 'Otro',
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-md rounded-xl p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-medium text-[#1d1d1f]">
            {contact.name} {contact.fatherLastName}
          </h3>
          <span className="text-sm text-[#f95940] bg-[#f95940]/10 px-2 py-1 rounded-full mr-2">
            {relationshipLabels[contact.relationToUser] || 'Otro'}
          </span>
          <span className="text-sm text-[#f95940] bg-[#f95940]/10 px-2 py-1 rounded-full">
            {ageLabel}
          </span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onEdit(contact)} className="p-2 text-gray-600 hover:text-[#f95940] transition-colors">
            <Pencil size={20} />
          </button>
          <button onClick={() => onDelete(contact.id!)} className="p-2 text-gray-600 hover:text-red-500 transition-colors">
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
      </div>
    </div>
  );
};

const PetCard: FC<{
  pet: Pet;
  onEdit: (pet: Pet) => void;
  onDelete: (petId: string) => void;
}> = ({ pet, onEdit, onDelete }) => (
  <div className="bg-white/90 backdrop-blur-sm shadow-md rounded-xl p-6 hover:shadow-lg transition-all duration-300">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-xl font-medium text-[#1d1d1f]">{pet.name}</h3>
        <span className="text-sm text-[#f95940] bg-[#f95940]/10 px-2 py-1 rounded-full">{pet.species}</span>
      </div>
      <div className="flex gap-2">
        <button onClick={() => onEdit(pet)} className="p-2 text-gray-600 hover:text-[#f95940] transition-colors">
          <Pencil size={20} />
        </button>
        <button onClick={() => onDelete(pet.id)} className="p-2 text-gray-600 hover:text-red-500 transition-colors">
          <Trash size={20} />
        </button>
      </div>
    </div>
    <div className="space-y-2">
      <p className="text-sm text-gray-600">
        <span className="font-medium">Fecha de nacimiento:</span> {new Date(pet.dateOfBirth).toLocaleDateString()}
      </p>
      {pet.notes && (
        <p className="text-sm text-gray-600">
          <span className="font-medium">Notas:</span> {pet.notes}
        </p>
      )}
    </div>
  </div>
);

const PeoplePageClient: FC<PeoplePageProps> = ({ user, contacts, pets, categories }) => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<'children' | 'trusted' | 'pets' | 'charity' | null>(null);
  const [localContacts, setLocalContacts] = useState<Contact[]>(contacts);
  const [localPets, setLocalPets] = useState<Pet[]>(pets);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal state for adding contacts/pets.
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState<'child' | 'trusted' | 'pet' | null>(null);

  // Handlers for editing and deleting contacts and pets
  const handleEdit = {
    contact: (contact: Contact) => {
      console.log('Edit contact:', contact);
      // Implement contact edit functionality as needed.
    },
    pet: (pet: Pet) => {
      console.log('Edit pet:', pet);
      // Implement pet edit functionality.
    },
  };

  const handleDelete = {
    contact: async (contactId: string) => {
      if (!user?.id) return;
      if (window.confirm('¿Estás seguro de que deseas eliminar este contacto?')) {
        try {
          await apiService.deleteContact(user.id, contactId);
          setLocalContacts(localContacts.filter(c => c.id !== contactId));
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
          setLocalPets(localPets.filter(p => p.id !== petId));
        } catch (err) {
          console.error('Error deleting pet:', err);
          setError('Error al eliminar la mascota');
        }
      }
    },
  };

  // Separate contacts into children and trusted groups.
  const filteredContacts = {
    children: localContacts.filter(c => c.relationToUser === 'child'),
    trusted: localContacts.filter(c =>
      ['sibling', 'spouse', 'parent', 'albacea', 'friend'].includes(c.relationToUser)
    ),
  };

  // Callback when a new contact is created.
  const handleAddContact = (newContact: Contact) => {
    setLocalContacts(prev => [...prev, newContact]);
  };

  // Handler to open the correct modal based on the category.
  const handleAddClick = (type: 'child' | 'trusted' | 'pet') => {
    setModalType(type);
    setShowAddModal(true);
  };

  const getEmptyState = () => {
    const categoryData = categories.find(c => c.id === selectedCategory);
    return (
      <div className="text-center py-12 bg-white/90 backdrop-blur-sm rounded-xl shadow-md">
        <div className="mx-auto text-gray-400 mb-4 w-12 h-12 flex items-center justify-center">
          {selectedCategory === 'pets' ? <Dog size={28} weight="regular" /> : <Users size={28} weight="regular" />}
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          No hay {categoryData?.title.toLowerCase()}
        </h3>
        <p className="text-gray-600 mb-4">
          Comienza agregando {selectedCategory === 'pets' ? 'mascotas' : 'contactos'}
        </p>
        <button
          onClick={() => handleAddClick(selectedCategory === 'pets' ? 'pet' : (selectedCategory === 'children' ? 'child' : 'trusted'))}
          className="inline-flex items-center gap-2 bg-[#f95940] text-white px-4 py-2 rounded-lg hover:bg-[#0456b0] transition-colors"
        >
          <UserPlus size={20} />
          <span>
            Agregar {selectedCategory === 'pets' ? 'Mascota' : selectedCategory === 'children' ? 'Hijo' : 'Contacto'}
          </span>
        </button>
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f95940] mx-auto"></div>
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
              icon={
                category.id === 'children' ? <Baby size={28} weight="regular" /> :
                category.id === 'trusted' ? <Users size={28} weight="regular" /> :
                category.id === 'pets' ? <Dog size={28} weight="regular" /> :
                <Heart size={28} weight="regular" />
              }
              count={category.count}
              onClick={() => setSelectedCategory(category.id)}
            />
          ))}
        </div>
      );
    }

    let content;
    if (selectedCategory === 'pets') {
      content = localPets.length === 0 ? getEmptyState() : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {localPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} onEdit={handleEdit.pet} onDelete={handleDelete.pet} />
          ))}
        </div>
      );
    } else {
      const categoryContacts =
        selectedCategory === 'children'
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
          className="flex items-center gap-2 text-[#f95940] hover:text-[#0456b0] transition-colors"
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
            {/* Header Section */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="inline-flex items-center h-[32px] bg-[#f95940] bg-opacity-10 px-[12px] py-[6px] rounded-md">
                  <span className="text-[#f95940] text-[14px] font-[400]">
                    {selectedCategory ? categories.find(c => c.id === selectedCategory)?.title.toUpperCase() : 'CONTACTOS'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Link href="#" className="inline-flex items-center h-[32px] text-[#f95940] hover:text-[#0456b0]">
                    <span className="w-5 h-5 inline-flex items-center justify-center rounded-full border border-[#f95940] text-sm">?</span>
                  </Link>
                  <p className="text-[14px] text-[#000000]">Artículo relacionado</p>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                    <span className="text-[#1d1d1f]">Gestiona tus </span>
                    <span className="bg-gradient-to-r from-[#3d9bff] to-[#f95940] inline-block text-transparent bg-clip-text">
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
                    onClick={() => {
                      if (selectedCategory === 'children') {
                        handleAddClick('child');
                      } else if (selectedCategory === 'trusted') {
                        handleAddClick('trusted');
                      } else if (selectedCategory === 'pets') {
                        handleAddClick('pet');
                      }
                    }}
                    className="flex items-center gap-2 bg-[#f95940] text-white px-4 py-2 rounded-lg hover:bg-[#0456b0] transition-colors"
                  >
                    <UserPlus size={20} />
                    <span>
                      Agregar {selectedCategory === 'pets' ? 'Mascota' : selectedCategory === 'children' ? 'Hijo' : 'Contacto'}
                    </span>
                  </button>
                )}
              </div>
            </div>

            {renderContent()}
          </div>
        </div>
      </motion.div>

      {/* Render modals based on modalType */}
      {showAddModal && modalType === 'child' && (
        <AddChild
          showModal={showAddModal}
          setShowModal={setShowAddModal}
          onAddChild={(child: Contact) => handleAddContact(child)}
          userId={user.id}
          isEditing={false}
          existingChild={null}
          contacts={localContacts}
        />
      )}
      {showAddModal && modalType === 'trusted' && (
        <AddContact
          showModal={showAddModal}
          setShowModal={setShowAddModal}
          setPartner={(partner: Contact | null) => {
            if (partner) handleAddContact(partner);
          }}
          userId={user.id}
          isEditing={false}
          existingPartner={null}
        />
      )}
      {showAddModal && modalType === 'pet' && (
        <AddPet
          showModal={showAddModal}
          setShowModal={setShowAddModal}
          setPets={setLocalPets}
          pets={localPets}
          isEditing={false}
          existingPet={null}
          userId={user.id}
        />
      )}
    </DashboardLayout>
  );
};

export default PeoplePageClient;
