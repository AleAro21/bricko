// app/actions/petActions.ts
'use server';

import { apiService } from '@/app/apiService';
import type { Pet } from '@/types';

export async function getPetsAction(userId: string): Promise<Pet[]> {
  try {
    const pets = await apiService.getPets(userId);
    return pets;
  } catch (error: any) {
    console.error("Error in getPetsAction:", error);
    return [];
  }

}

export async function createPetAction(userId: string, petData: Omit<Pet, 'id'>): Promise<Pet> {
  try {
    const pet = await apiService.createPet(userId, petData);
    return pet;
  } catch (error) {
    console.error("Error creating pet:", error);
    throw error;
  }
}

export async function updatePetAction(userId: string, petId: string, petData: Partial<Pet>): Promise<Pet> {
  try {
    const pet = await apiService.updatePet(userId, petId, petData);
    return pet;
  } catch (error) {
    console.error("Error updating pet:", error);
    throw error;
  }
}

export async function deletePetAction(userId: string, petId: string): Promise<void> {
  try {
    await apiService.deletePet(userId, petId);
  } catch (error) {
    console.error("Error deleting pet:", error);
    throw error;
  }
}


