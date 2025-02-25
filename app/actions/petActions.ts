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
