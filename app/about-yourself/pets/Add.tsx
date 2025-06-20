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
        species, // species now holds an allowed value (e.g. "Dog")
        dateOfBirth,
        notes: notes || '',
      };

      const storedPets = sessionStorage.getItem('userPets');
      let currentPets: Pet[] = storedPets ? JSON.parse(storedPets) : [];
      if (isEditing && existingPet) {
        currentPets = currentPets.map(pet =>
          pet.id === existingPet.id ? petData : pet
        );
      } else {
        currentPets.push(petData);
      }
      sessionStorage.setItem('userPets', JSON.stringify(currentPets));
      console.log('Pets saved:', currentPets);
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

  // Define allowed species options with proper values.
  const speciesOptions = [
    { value: "Dog", label: "Perro" },
    { value: "Cat", label: "Gato" },
    { value: "Bird", label: "Ave" },
    { value: "Other", label: "Otro" },
  ];

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
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-[#6e6e73] mb-1">
              Nombre <span className="text-[#f95940]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#f95940]"
              placeholder="Nombre de la mascota"
            />
          </div>

          {/* Species Field */}
          <div>
            <label className="block text-sm font-medium text-[#6e6e73] mb-1">
              Especie <span className="text-[#f95940]">*</span>
            </label>
            <select
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#f95940]"
            >
              <option value="">Seleccionar especie</option>
              {speciesOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date of Birth Field */}
          <div>
            <label className="block text-sm font-medium text-[#6e6e73] mb-1">
              Fecha de Nacimiento <span className="text-[#f95940]">*</span>
            </label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#f95940]"
            />
          </div>

          {/* Notes Field */}
          <div>
            <label className="block text-sm font-medium text-[#6e6e73] mb-1">
              Notas
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#f95940]"
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
            className="px-6 py-2 bg-[#f95940] text-white rounded-lg hover:bg-[#0456b0] transition-colors disabled:opacity-50"
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
