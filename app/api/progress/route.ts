// app/api/progress/route.ts
import { NextResponse } from "next/server";
import { getProgressAction } from "@/app/actions/getprogressAction";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ success: false, error: "No userId provided" });
  }
  const result = await getProgressAction(userId);
  return NextResponse.json(result);
}
