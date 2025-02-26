// app/actions/assignmentActions.ts
'use server';

import { apiService } from '@/app/apiService';
import type { 
  CreateAssignmentRequest, 
  ResponseAssignation, 
  UpdateAssignmentRequest, 
  Assignation 
} from '@/types';

/**
 * Creates assignments for a given testament.
 * Returns an array of assignment responses.
 */
export async function createAssignmentAction(
  testamentId: string, 
  assignmentData: CreateAssignmentRequest
): Promise<ResponseAssignation[]> {
  try {
    const response = await apiService.createAssignment(testamentId, assignmentData);
    console.log('Assignment created (server action):', response);
    return response;
  } catch (error: any) {
    console.error('Error in createAssignmentAction:', error);
    throw error;
  }
}

/**
 * Updates an assignment with the given assignment ID.
 */
export async function updateAssignmentAction(
  assignmentId: string, 
  assignmentData: UpdateAssignmentRequest
): Promise<Assignation> {
  try {
    const response = await apiService.updateAssignment(assignmentId, assignmentData);
    console.log('Assignment updated (server action):', response);
    return response;
  } catch (error: any) {
    console.error('Error in updateAssignmentAction:', error);
    throw error;
  }
}
