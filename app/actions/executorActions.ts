// app/actions/executorActions.ts
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
    return { success: true, executors: executorArray };
  } catch (error: any) {
    console.error("Error in getAllExecutorsAction:", error);
    return { success: false, error: error.message || "Error fetching executors" };
  }
}

export async function createExecutorAction(
  testamentId: string,
  contactId: string,
  executorType: string
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
    const executor = await apiService.createExecutor(testamentId, contactId, executorType);
    console.log("Executor created (server action):", executor);
    return { success: true, executor };
  } catch (error: any) {
    console.error("Error in createExecutorAction:", error);
    return { success: false, error: error.message || "Error creating executor" };
  }
}
