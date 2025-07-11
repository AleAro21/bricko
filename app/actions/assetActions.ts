// app/actions/assetActions.ts
'use server';

import { apiService } from '@/app/apiService';
import type { GetAssetsCategoriesResponse, UserAsset } from '@/types';

export async function getUserAssetsAction(userId: string): Promise<UserAsset[]> {
  try {
    const assets = await apiService.getUserAssets(userId);
    return assets;
  } catch (error: any) {
    console.error("Error in getUserAssetsAction:", error);
    return [];
  }
}

export async function createUserAssetAction(userId: string, assetData: UserAsset): Promise<UserAsset> {
  try {
    const createdAsset = await apiService.createUserAsset(userId, assetData);
    return createdAsset;
  } catch (error: any) {
    console.error("Error in createUserAssetAction:", error);
    throw error;
  }
}

export async function getAssetsCategoriesAction(): Promise<GetAssetsCategoriesResponse> {
  try {
    const response = await apiService.getAssetsCategories();
    return response;
  } catch (error: any) {
    console.error("Error in getAssetsCategoriesAction:", error);
    throw error;
  }
}
