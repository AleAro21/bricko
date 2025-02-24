// app/api/user/route.ts
import { NextResponse } from 'next/server';
import { apiService } from '@/app/apiService';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const tokenCookie = cookies().get("token");
    const userIdCookie = cookies().get("userId");
    if (!tokenCookie || !userIdCookie) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }
    const userId = userIdCookie.value;
    // Ensure the API service has the token (in case it’s not already set)
    apiService.setToken(tokenCookie.value);
    const user = await apiService.getUser(userId);
    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch user" }, { status: 500 });
  }
}
