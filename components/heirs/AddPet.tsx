// AddPet.tsx
'use client';

import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'phosphor-react';
import type { Pet } from '@/types';
import { createPetAction, updatePetAction } from '@/app/actions/petActions';

interface AddProps {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    setPets: (pets: Pet[]) => void;
    pets: Pet[];
    isEditing: boolean;
    existingPet: Pet | null;
    userId: string;
}

const AddPet: FC<AddProps> = ({ showModal, setShowModal, setPets, pets, isEditing, existingPet, userId }) => {
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

    const speciesOptions = [
        { value: "Dog", label: "Perro" },
        { value: "Cat", label: "Gato" },
        { value: "Bird", label: "Ave" },
        { value: "Other", label: "Otro" },
    ];

    const handleSubmit = async () => {
        if (!name || !species || !dateOfBirth) {
            setError("Por favor, complete todos los campos obligatorios.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Convert the dateOfBirth to an ISO-8601 string format
            const isoDateOfBirth = new Date(dateOfBirth).toISOString();

            if (isEditing && existingPet) {
                // If editing, update the pet via API
                const updatedPet = await updatePetAction(userId, existingPet.id, {
                    name,
                    species,
                    dateOfBirth: isoDateOfBirth,
                    notes: notes || '',
                });
                const updatedPets = pets.map(pet => pet.id === existingPet.id ? updatedPet : pet);
                setPets(updatedPets);
            } else {
                // Create a new pet via API
                const petData: Omit<Pet, 'id'> = {
                    name,
                    species,
                    dateOfBirth: isoDateOfBirth,
                    notes: notes || '',
                };
                const createdPet = await createPetAction(userId, petData);
                setPets([...pets, createdPet]);
            }
            setShowModal(false);
        } catch (err) {
            console.error('Error saving pet:', err);
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
                    className="absolute top-4 right-4 w-8 h-8 bg-[#e8e8ed] rounded-full flex items-center justify-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text[#6e6e73]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
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

export default AddPet;
