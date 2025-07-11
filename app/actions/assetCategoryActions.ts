// app/actions/assetCategoryActions.ts
'use server';

import { apiService } from '@/app/apiService';
import type { GetAssetsCategoriesResponse } from '@/types';

export async function getAssetsCategoriesAction(): Promise<GetAssetsCategoriesResponse> {
  try {
    const categoriesResponse = await apiService.getAssetsCategories();
    console.log("categoriesResponse:", categoriesResponse);
    console.log("categorie metadata", categoriesResponse.categories[0].metadata)
    return categoriesResponse;

  } catch (error: any) {
    console.error("Error in getAssetsCategoriesAction:", error);
    throw error;
  }
}
