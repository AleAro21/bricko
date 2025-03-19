'use server';

import { apiService } from '@/app/apiService';
import type { Will, CreateWillRequest, UpdateWillRequest } from '@/types';
import { WillStatus } from '@/types';

export async function getAllWillsAction(userId: string): Promise<Will[]> {
  try {
    const wills = await apiService.getAllWills(userId);
    return Array.isArray(wills) ? wills : [];
  } catch (error: any) {
    console.error("Error in getAllWillsAction:", error);
    return [];
  }
}

export async function createWillAction(userId: string, willData: CreateWillRequest): Promise<Will> {
  try {
    // Ensure inheritanceType is provided (should be one of "HP", "HL", or "HU")
    if (!willData.inheritanceType) {
      throw new Error("inheritanceType is required in the payload.");
    }
    const newWill = await apiService.createWill(userId, willData);
    return newWill;
  } catch (error: any) {
    console.error("Error in createWillAction:", error);
    throw error;
  }
}

export async function updateWillAction(testamentId: string, updateData: UpdateWillRequest): Promise<Will> {
  try {
    const updatedWill = await apiService.updateWill(testamentId, updateData);
    if (!updatedWill) {
      throw new Error("Failed to update will");
    }
    return updatedWill;
  } catch (error: any) {
    console.error("Error in updateWillAction:", error);
    throw error;
  }
}
