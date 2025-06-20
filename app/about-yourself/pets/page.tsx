'use client';

import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import Add from "./Add";
import PrimaryButton from "@/components/reusables/PrimaryButton";
import ProgressIndicator from "@/components/reusables/ProgressIndicator";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { apiService } from '@/app/apiService';
import { fetchAuthSession } from "aws-amplify/auth";
import Spinner from "@/components/reusables/Spinner";
import { Pet } from '@/types';

interface PetOption {
  title: string;
  subTitle: string;
  value: string;
}

const PetsPage: FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedOption, setSelectedOption] = useState<PetOption | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);

  const data: PetOption[] = [
    {
      title: "Sí",
      value: "yes",
      subTitle: "Tengo mascotas que quiero incluir en mi testamento.",
    },
    {
      title: "No",
      value: "no",
      subTitle: "No tengo mascotas que incluir en mi testamento.",
    },
  ];

  useEffect(() => {
    const loadData = async () => {
      if (!user?.id) {
        setIsInitialLoading(false);
        return;
      }

      try {
        // Check session storage for pets data
        const storedPets = sessionStorage.getItem('userPets');
        const storedHasPets = sessionStorage.getItem('userHasPets');

        if (storedPets && storedHasPets) {
          const petsData = JSON.parse(storedPets);
          setPets(petsData);
          const hasPets = JSON.parse(storedHasPets);
          const selectedValue = hasPets ? 'yes' : 'no';
          const selected = data.find(item => item.value === selectedValue) || null;
          setSelectedOption(selected);
          const index = data.findIndex(item => item.value === selectedValue);
          if (index !== -1) setActiveIndex(index);
          setIsInitialLoading(false);
          return;
        }

        // Fetch pets from API only if no data in session storage
        const { tokens } = await fetchAuthSession();
        if (!tokens?.accessToken) {
          throw new Error("No authentication token available");
        }

        apiService.setToken(tokens.accessToken.toString());
        const petsResponse = await apiService.getPets(user.id);
        
        // Store in session storage
        sessionStorage.setItem('userPets', JSON.stringify(petsResponse));
        sessionStorage.setItem('userHasPets', JSON.stringify(petsResponse.length > 0));

        setPets(petsResponse);
        const selectedValue = petsResponse.length > 0 ? 'yes' : 'no';
        const selected = data.find(item => item.value === selectedValue) || null;
        setSelectedOption(selected);
        const index = data.findIndex(item => item.value === selectedValue);
        if (index !== -1) setActiveIndex(index);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    loadData();
  }, [user?.id]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, index: number, option: PetOption): void => {
    e.preventDefault();
    setActiveIndex(index === activeIndex ? null : index);
    setSelectedOption(option);
    setErrorMessage(null);

    // If "No" is selected, clear pets and update session storage.
    if (option.value === 'no') {
      setPets([]);
      sessionStorage.setItem('userPets', JSON.stringify([]));
      sessionStorage.setItem('userHasPets', JSON.stringify(false));
    }
    // If "Sí" is selected, update session storage to indicate pets should be created.
    if (option.value === 'yes') {
      sessionStorage.setItem('userHasPets', JSON.stringify(true));
    }
  };

  const handleAddPet = (): void => {
    setIsEditing(false);
    setEditingPet(null);
    setShowModal(true);
  };

  const handleEditPet = (pet: Pet): void => {
    setIsEditing(true);
    setEditingPet(pet);
    setShowModal(true);
  };

  const handleDeletePet = (petId: string): void => {
    if (confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
      const updatedPets = pets.filter(pet => pet.id !== petId);
      setPets(updatedPets);
      sessionStorage.setItem('userPets', JSON.stringify(updatedPets));
      sessionStorage.setItem('userHasPets', JSON.stringify(updatedPets.length > 0));
    }
  };

  const handleSave = async (): Promise<void> => {
    if (!selectedOption) {
      setErrorMessage("Por favor, selecciona una opción");
      return;
    }
  
    if (!user?.id) {
      setErrorMessage("No se encontró información del usuario");
      return;
    }
  
    // Helper function: any error in fetching pets is treated as "no pets"
    const getExistingPets = async (): Promise<Pet[]> => {
      try {
        return await apiService.getPets(user.id);
      } catch (error: any) {
        console.error("Error in getExistingPets:", error);
        // Treat any error as if there are no pets in the API.
        return [];
      }
    };
  
    try {
      setLoading(true);
      const { tokens } = await fetchAuthSession();
      if (!tokens?.accessToken) {
        throw new Error("No authentication token available");
      }
  
      apiService.setToken(tokens.accessToken.toString());
      console.log('Selected option:', selectedOption);
      if (selectedOption.value === 'no') {
        // For "No": Delete all existing pets (if any).
        const existingPets = await getExistingPets();
        if (existingPets.length > 0) {
          await Promise.all(
            existingPets.map(async (pet) => {
              try {
                await apiService.deletePet(user.id, pet.id);
              } catch (error: any) {
                // If the pet was already deleted, ignore the error.
                if (error.message.includes('404')) {
                  console.warn(`Pet ${pet.id} already deleted, ignoring.`);
                } else {
                  throw error;
                }
              }
            })
          );
        }
      } else {
        // For "Sí": Fetch the existing pets from the API.
        const existingPets = await getExistingPets();
        const sessionPets = pets;
  
        // Delete pets that exist in the API but are not in session storage.
        // const petsToDelete = existingPets.filter(
        //   existingPet => !sessionPets.some(sessionPet => sessionPet.id === existingPet.id)
        // );
        // console.log('Pets to delete:', petsToDelete);
        // if (petsToDelete.length > 0) {
        //   await Promise.all(
        //     petsToDelete.map(async (pet) => {
        //       try {
        //         await apiService.deletePet(user.id, pet.id);
        //       } catch (error: any) {
        //         if (error.message.includes('404')) {
        //           console.warn(`Pet ${pet.id} already deleted, ignoring.`);
        //         } else {
        //           throw error;
        //         }
        //       }
        //     })
        //   );
        // }
  
        // For each pet in session storage, either update it (if it exists)
        // or create it (if it does not exist in the API).
        for (const pet of sessionPets) {
          const petData = {
            name: pet.name,
            species: pet.species,
            dateOfBirth: new Date(pet.dateOfBirth).toISOString(),
            notes: pet.notes || '',
          };
  
          const petExists = existingPets.some(existingPet => existingPet.id === pet.id);
          if (petExists) {
            await apiService.updatePet(user.id, pet.id, petData);
          } else {
            await apiService.createPet(user.id, petData);
          }
        }
      }
  
      router.push("/summary?completed=about-your-self");
    } catch (error) {
      console.error('Error saving pets data:', error);
      setErrorMessage("Error al guardar los cambios. Por favor, intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <DashboardLayout>
      <div className="relative min-h-screen">
        <Add
          showModal={showModal}
          setShowModal={setShowModal}
          setPets={setPets}
          isEditing={isEditing}
          existingPet={editingPet}
          pets={pets}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="container mx-auto flex flex-col flex-grow bg-[#f5f5f7]"
        >
          <div className="w-full max-w-6xl mx-auto flex flex-col min-h-[100vh] mb-4 px-4 sm:px-5">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 h-full py-12">
              {/* Left column - Title section */}
              <div className="lg:w-1/3">
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="inline-flex items-center h-[32px] bg-[#f95940] bg-opacity-10 px-[12px] py-[6px] rounded-md">
                    <span className="text-[#f95940] text-[14px] font-[400]">MASCOTAS</span>
                  </div>
                  <Link href="#" className="inline-flex items-center h-[32px] text-[#f95940] hover:text-[#0456b0]">
                    <span className="w-5 h-5 inline-flex items-center justify-center rounded-full border border-[#f95940] text-sm">?</span>
                  </Link>
                </div>

                <h1 className='text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]'>
                  <span className='text-[#1d1d1f]'>¿Tienes </span>
                  <span className='bg-gradient-to-r from-[#3d9bff] to-[#f95940] inline-block text-transparent bg-clip-text'>mascotas</span>
                  <span className='text-[#1d1d1f]'>?</span>
                </h1>

                <div className="space-y-4 mb-5">
                  <p className="text-[16px] text-[#1d1d1f] leading-6">
                    Puedes elegir tutores para tus mascotas en la siguiente sección.
                  </p>
                  <p className="text-[16px] text-[#1d1d1f] leading-6">
                    Agrega todas las mascotas que desees incluir en tu testamento.
                  </p>
                  <p className="text-[16px] text-[#1d1d1f] leading-6 mb-8">
                    Podrás actualizar esta información en cualquier momento.
                  </p>
                </div>

                <ProgressIndicator
                  currentSection={5}
                  totalSections={5}
                  title="Progreso de la sección"
                />

                {/* Pets List */}
                {pets.length > 0 && (
                  <div className="mt-8 space-y-4">
                    {pets.map((pet) => (
                      <div key={pet.id} className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-semibold">{pet.name}</h3>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditPet(pet)}
                              className="text-[#f95940] hover:text-blue-800"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeletePet(pet.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          <strong>Especie:</strong> {pet.species}<br />
                          <strong>Fecha de Nacimiento:</strong> {new Date(pet.dateOfBirth).toLocaleDateString()}<br />
                          {pet.notes && (
                            <>
                              <strong>Notas:</strong> {pet.notes}
                            </>
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right column - Form in white container */}
              <div className='w-full lg:w-3/5'>
                <div className="bg-white rounded-2xl px-4 sm:px-8 md:px-12 py-8 shadow-lg relative">
                  {(loading || isInitialLoading) && (
                    <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50 rounded-2xl">
                      <div className="text-center">
                        <Spinner size={50} />
                        <p className="mt-4 text-[#f95940] font-medium">
                          {loading ? 'Guardando...' : 'Cargando...'}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    {data.map((option, index) => (
                      <div
                        key={index}
                        className="cursor-pointer transition-colors"
                        onClick={(e) => handleClick(e, index, option)}
                      >
                        <div
                          className={`px-6 py-4 rounded-xl border ${
                            activeIndex === index
                              ? 'bg-[#f95940] border-[#f95940]'
                              : 'border-gray-200 hover:border-[#f95940]'
                          }`}
                        >
                          <h3
                            className={`text-[17px] font-[400] ${
                              activeIndex === index
                                ? 'text-white'
                                : 'text-[#1d1d1f]'
                            }`}
                          >
                            {option.title}
                          </h3>
                          <p
                            className={`mt-1 text-[14px] ${
                              activeIndex === index
                                ? 'text-blue-100'
                                : 'text-[#6e6e73]'
                            }`}
                          >
                            {option.subTitle}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedOption?.value === 'yes' && (
                    <div
                      onClick={handleAddPet}
                      className="bg-white rounded-xl border border-gray-200 hover:border-[#f95940] transition-colors cursor-pointer mt-4"
                    >
                      <div className="flex items-center justify-center gap-2 py-4 text-[#f95940] font-medium">
                        <div className="bg-[#f95940] rounded-full p-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            width="16"
                            height="16"
                            className="fill-white"
                          >
                            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                          </svg>
                        </div>
                        Agregar Mascota
                      </div>
                    </div>
                  )}

                  {errorMessage && (
                    <p className="text-red-500 text-[14px] text-center mt-4">{errorMessage}</p>
                  )}

                  <div className="flex justify-end pt-4 mt-4">
                    <PrimaryButton onClick={handleSave}>
                      Guardar y continuar
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default PetsPage;
