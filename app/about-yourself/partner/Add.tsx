'use client';

import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AddProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  setPartner: (partner: any) => void;
  isEditing: boolean;
  existingPartner: any | null;
}

const Add: FC<AddProps> = ({ showModal, setShowModal, setPartner, isEditing, existingPartner }) => {
  const [name, setName] = useState<string>('');
  const [fatherLastName, setFatherLastName] = useState<string>('');
  const [motherLastName, setMotherLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [relationship, setRelationship] = useState<string>('none');

  // Load existing partner data when editing
  useEffect(() => {
    if (isEditing && existingPartner) {
      setName(existingPartner.name || '');
      setFatherLastName(existingPartner.fatherLastName || '');
      setMotherLastName(existingPartner.motherLastName || '');
      setEmail(existingPartner.email || '');
      setRelationship(existingPartner.relationship || 'none');
    } else {
      // Reset form when not editing
      setName('');
      setFatherLastName('');
      setMotherLastName('');
      setEmail('');
      setRelationship('none');
    }
  }, [isEditing, existingPartner, showModal]);

  const handleSubmit = () => {
    // Validate required fields
    if (!name || !fatherLastName || !motherLastName || !email || !relationship) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    // Create the partner object
    const partnerData = {
      id: isEditing && existingPartner ? existingPartner.id : undefined,
      name,
      fatherLastName,
      motherLastName,
      email,
      relationship,
    };

    // Update partner state in Parent
    setPartner(partnerData);
    console.log('Partner Data:', partnerData);
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
          {isEditing ? 'Editar Pareja' : 'Agregar Pareja'}
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

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#6e6e73] mb-1">Correo Electrónico</label>
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#047aff]"
            />
          </div>

          {/* Relationship */}
          <div>
            <label className="block text-sm font-medium text-[#6e6e73] mb-1">Relación</label>
            <select
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#047aff]"
            >
              <option value="none">Seleccione una relación</option>
              <option value="sibling">Hermano/a</option>
              <option value="child">Hijo/a</option>
              <option value="spouse">Cónyuge</option>
              <option value="friend">Amigo/a</option>
              <option value="parent">Padre/Madre</option>
              <option value="albacea">Albacea</option>
            </select>
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

export default Add;