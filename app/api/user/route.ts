// app/api/user/route.ts
import { NextResponse } from 'next/server';
import { apiService } from '@/app/apiService';

// Example: Verify the token from cookies and fetch user data securely.
export async function GET(request: Request) {
  // Get token from cookies
  const cookies = require('next/headers').cookies();
  const token = cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    // Set the token in your API service
    apiService.setToken(token);
    // Assume the token payload has a userId or your API can determine it.
    // For example, if you have the userId stored in a cookie or from the token itself.
    const userId = cookies.get('userId')?.value;
    if (!userId) {
      throw new Error("User ID not found");
    }
    const user = await apiService.getUser(userId);
    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch user" }, { status: 500 });
  }
}
