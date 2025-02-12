'use client';

import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Contact } from '@/types';

interface AddChildProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  setChild: (child: Contact) => void;
  isEditing: boolean;
  existingChild: Contact | null;
}

const AddChild: FC<AddChildProps> = ({ showModal, setShowModal, setChild, isEditing, existingChild }) => {
  const [name, setName] = useState<string>('');
  const [fatherLastName, setFatherLastName] = useState<string>('');
  const [motherLastName, setMotherLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  // Load existing child data when editing
  useEffect(() => {
    if (isEditing && existingChild) {
      setName(existingChild.name || '');
      setFatherLastName(existingChild.fatherLastName || '');
      setMotherLastName(existingChild.motherLastName || '');
      setEmail(existingChild.email || '');
    } else {
      // Reset form when not editing
      setName('');
      setFatherLastName('');
      setMotherLastName('');
      setEmail('');
    }
  }, [isEditing, existingChild, showModal]);

  const handleSubmit = () => {
    // Validate required fields
    if (!name || !fatherLastName || !motherLastName) {
      alert("Por favor, complete los campos obligatorios (nombre y apellidos).");
      return;
    }

    // Create the child object
    const childData: Contact = {
      name,
      fatherLastName,
      motherLastName,
      email,
      relationToUser: 'child',
      trustedContact: false,
      countryPhoneCode: '',
      phoneNumber: '',
      country: 'MX',
    };

    // Update child state in Parent
    setChild(childData);
    
    // Close the modal
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="bg-white rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-6 text-[#1d1d1f]">
          {isEditing ? 'Editar Hijo' : 'Agregar Hijo'}
        </h2>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-[#6e6e73] mb-1">Nombre</label>
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#047aff]"
            />
          </div>

          {/* Father's Last Name */}
          <div>
            <label className="block text-sm font-medium text-[#6e6e73] mb-1">Apellido Paterno</label>
            <input
              type="text"
              placeholder="Apellido Paterno"
              value={fatherLastName}
              onChange={(e) => setFatherLastName(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#047aff]"
            />
          </div>

          {/* Mother's Last Name */}
          <div>
            <label className="block text-sm font-medium text-[#6e6e73] mb-1">Apellido Materno</label>
            <input
              type="text"
              placeholder="Apellido Materno"
              value={motherLastName}
              onChange={(e) => setMotherLastName(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#047aff]"
            />
          </div>

          {/* Email (Optional) */}
          <div>
            <label className="block text-sm font-medium text-[#6e6e73] mb-1">
              Correo Electrónico (Opcional)
            </label>
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#047aff]"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => setShowModal(false)}
            className="px-6 py-2 text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-[#047aff] text-white rounded-lg hover:bg-[#0456b0] transition-colors"
          >
            {isEditing ? 'Guardar' : 'Agregar'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AddChild;