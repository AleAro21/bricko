"use server";

import { apiService } from "@/app/apiService";
import { cookies } from "next/headers";
import type { Contact } from "@/types";

/**
 * Retrieves contacts for the given user.
 */
export async function getContactsAction(userId: string): Promise<Contact[]> {
    try {
      const token = cookies().get("token")?.value;
      if (!token) throw new Error("No authentication token available");
      apiService.setToken(token);
      const contacts = await apiService.getContacts(userId);
      console.log("Contacts fetched from getContactsAction:", contacts);
      return contacts;
    } catch (error: any) {
      // If the API returns a 404, it probably means no contacts exist
      if (error.status === 404 || error.message.includes("404")) {
        return [];
      }
      throw error;
    }
  }

/**
 * Creates a new contact for the given user.
 * The contactData should not include an "id" property.
 */
export async function createContactAction(
    userId: string,
    contactData: Omit<Contact, "id">
): Promise<Contact> {
    try {
        const token = cookies().get("token")?.value;
        if (!token) {
            throw new Error("No authentication token available");
        }
        apiService.setToken(token);
        const createdContact = await apiService.createContact(userId, contactData);
        console.log("Contact created in createContactAction:", createdContact);
        return createdContact;
    } catch (error: any) {
        console.error("Error creating contact in createContactAction:", error);
        throw error;
    }
}
