// app/actions/assignmentActions.ts
'use server';

import { apiService } from '@/app/apiService';
import { cookies } from 'next/headers';
import { fetchAuthSession } from 'aws-amplify/auth';
import type { 
  CreateAssignmentRequest, 
  ResponseAssignation, 
  UpdateAssignmentRequest, 
  Assignation 
} from '@/types';

/**
 * Retrieves the authentication token from cookies or from the auth session.
 */
async function getAuthToken(): Promise<string> {
  let tokenStr = '';
  const tokenCookie = cookies().get("token");
  if (tokenCookie && tokenCookie.value) {
    tokenStr = tokenCookie.value;
  } else {
    const session = await fetchAuthSession();
    if (!session.tokens?.accessToken) {
      throw new Error("No authentication token available");
    }
    tokenStr = session.tokens.accessToken.toString();
  }
  return tokenStr;
}

/**
 * Creates assignments for a given testament.
 * Returns an object with a success flag and, if successful, the assignment responses.
 */
export async function createAssignmentAction(
  testamentId: string, 
  assignmentData: CreateAssignmentRequest
): Promise<{ success: boolean; response?: ResponseAssignation[]; error?: string }> {
  try {
    // Ensure token is set as in our login flow
    const token = await getAuthToken();
    apiService.setToken(token);
    const response = await apiService.createAssignment(testamentId, assignmentData);
    console.log('Assignment created (server action):', response);
    return { success: true, response };
  } catch (error: any) {
    console.error('Error in createAssignmentAction:', error);
    return { success: false, error: error.message || 'Error creating assignment' };
  }
}

/**
 * Updates an assignment with the given assignment ID.
 * Returns an object with a success flag and, if successful, the updated assignment.
 */
export async function updateAssignmentAction(
  assignmentId: string, 
  assignmentData: UpdateAssignmentRequest
): Promise<{ success: boolean; response?: Assignation; error?: string }> {
  try {
    // Ensure token is set
    const token = await getAuthToken();
    apiService.setToken(token);
    const response = await apiService.updateAssignment(assignmentId, assignmentData);
    console.log('Assignment updated (server action):', response);
    return { success: true, response };
  } catch (error: any) {
    console.error('Error in updateAssignmentAction:', error);
    return { success: false, error: error.message || 'Error updating assignment' };
  }
}
