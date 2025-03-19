'use server';

import { apiService } from '@/app/apiService';
import { cookies } from 'next/headers';
import { fetchAuthSession } from 'aws-amplify/auth';
import type { Executor } from '@/types';

export async function getAllExecutorsAction(userId: string): Promise<{ success: boolean; executors?: Executor[]; error?: string }> {
  try {
    let tokenStr = "";
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
    apiService.setToken(tokenStr);
    const executors = await apiService.getAllExecutors(userId);
    const executorArray = Array.isArray(executors) ? executors : [executors];
    // Sort executors by priority order
    executorArray.sort((a, b) => (a.priorityOrder || 0) - (b.priorityOrder || 0));
    return { success: true, executors: executorArray };
  } catch (error: any) {
    console.error("Error in getAllExecutorsAction:", error);
    return { success: false, error: error.message || "Error fetching executors" };
  }
}

export async function createExecutorAction(
  testamentId: string,
  contactId: string,
  executorType: string,
  priorityOrder: number
): Promise<{ success: boolean; executor?: Executor; error?: string }> {
  try {
    let tokenStr = "";
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
    apiService.setToken(tokenStr);
    const executor = await apiService.createExecutor(testamentId, contactId, executorType, priorityOrder);
    console.log("Executor created (server action):", executor);
    return { success: true, executor };
  } catch (error: any) {
    console.error("Error in createExecutorAction:", error);
    return { success: false, error: error.message || "Error creating executor" };
  }
}

export async function updateExecutorAction(
  execId: string,
  data: { contactId: string; type: string; priorityOrder: number }
): Promise<{ success: boolean; executor?: Executor; error?: string }> {
  try {
    let tokenStr = "";
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
    apiService.setToken(tokenStr);
    const executor = await apiService.updateExecutor(execId, data);
    return { success: true, executor };
  } catch (error: any) {
    console.error("Error in updateExecutorAction:", error);
    return { success: false, error: error.message || "Error updating executor" };
  }
}