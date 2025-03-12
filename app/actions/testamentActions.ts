// app/actions/testamentActions.ts
"use server";

import { apiService } from "@/app/apiService";
import { cookies } from "next/headers";

/**
 * Fetches the PDF for the given testamentId, returning it as a base64 string.
 */
export async function getTestamentPDFAction(
  testamentId: string
): Promise<{ pdfBase64?: string; error?: string }> {
  try {
    const token = cookies().get("token")?.value;
    if (!token) throw new Error("No authentication token available");
    // Set the token in your API service
    apiService.setToken(token);
    // This method already includes the ?type=pdf query param in its URL.
    const blob = await apiService.getTestamentPDF(testamentId);
    // Convert the Blob to an ArrayBuffer, then to a base64 string.
    const arrayBuffer = await blob.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    return { pdfBase64: base64 };
  } catch (error: any) {
    return { error: error.message || "Failed to fetch PDF" };
  }
}
