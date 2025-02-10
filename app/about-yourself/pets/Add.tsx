'use client';

import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'phosphor-react';
import { Pet } from '@/types';

interface AddProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  setPets: (pets: Pet[]) => void;
  isEditing: boolean;
  existingPet: Pet | null;
  pets: Pet[];
}

const Add: FC<AddProps> = ({ showModal, setShowModal, setPets, pets, isEditing, existingPet }) => {
  const [name, setName] = useState<string>('');
  const [species, setSpecies] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing && existingPet) {
      setName(existingPet.name || '');
      setSpecies(existingPet.species || '');
      setDateOfBirth(existingPet.dateOfBirth || '');
      setNotes(existingPet.notes || '');
    } else {
      setName('');
      setSpecies('');
      setDateOfBirth('');
      setNotes('');
    }
  }, [isEditing, existingPet, showModal]);

  const handleSubmit = () => {
    // Validate required fields
    if (!name || !species || !dateOfBirth) {
      setError("Por favor, complete todos los campos obligatorios.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const petData: Pet = {
        id: isEditing && existingPet ? existingPet.id : `temp-${Date.now()}`,
        name,
        species,
        dateOfBirth,
        notes: notes || '',
      };

      // Get current pets from session storage
      const storedPets = sessionStorage.getItem('userPets');
      let currentPets: Pet[] = storedPets ? JSON.parse(storedPets) : [];

      if (isEditing && existingPet) {
        // Update existing pet in session storage
        currentPets = currentPets.map(pet => 
          pet.id === existingPet.id ? petData : pet
        );
      } else {
        // Add new pet to session storage
        currentPets.push(petData);
      }

      // Update session storage and state
      sessionStorage.setItem('userPets', JSON.stringify(currentPets));
      setPets(currentPets);
      setShowModal(false);
    } catch (error) {
      console.error('Error saving pet:', error);
      setError("Error al guardar la mascota. Por favor, intente nuevamente.");
    } finally {
      setLoading(false);
    }
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
      <div className="bg-white rounded-2xl p-8 w-full max-w-md relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} weight="bold" />
        </button>

        <h2 className="text-xl font-semibold mb-6 text-[#1d1d1f]">
          {isEditing ? 'Editar Mascota' : 'Agregar Mascota'}
        </h2>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-[#6e6e73] mb-1">
              Nombre <span className="text-[#047aff]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#047aff]"
              placeholder="Nombre de la mascota"
            />
          </div>

          {/* Species */}
          <div>
            <label className="block text-sm font-medium text-[#6e6e73] mb-1">
              Especie <span className="text-[#047aff]">*</span>
            </label>
            <select
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#047aff]"
            >
              <option value="">Seleccionar especie</option>
              <option value="dog">Perro</option>
              <option value="cat">Gato</option>
              <option value="bird">Ave</option>
              <option value="other">Otro</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-[#6e6e73] mb-1">
              Fecha de Nacimiento <span className="text-[#047aff]">*</span>
            </label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#047aff]"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-[#6e6e73] mb-1">
              Notas
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#047aff]"
              placeholder="Características especiales, necesidades, etc."
            />
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-4">{error}</p>
        )}

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => setShowModal(false)}
            className="px-6 py-2 text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-[#047aff] text-white rounded-lg hover:bg-[#0456b0] transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Guardando...' : isEditing ? 'Guardar' : 'Agregar'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Add;