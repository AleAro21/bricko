// app/summary/page.tsx (Server Component)
import { getProgressAction } from "@/app/actions/getprogressAction";
import SummaryPageClient from "@/components/summary/SummaryPageClient";
import { cookies } from "next/headers";

export default async function SummaryPageServer() {
  // Retrieve the user ID from the HTTP‑only cookie
  const userIdCookie = cookies().get("userId");
  if (!userIdCookie || !userIdCookie.value) {
    throw new Error("User ID cookie not found");
  }
  const userId = userIdCookie.value; // This should be a valid UUID

  // Call the server action to get progress data
  const progressResult = await getProgressAction(userId);
  if (!progressResult.success) {
    throw new Error(progressResult.error || "Failed to load progress data");
  }
  const progressData = progressResult.progressData;

  // Map the progress values (assuming the API returns percentages as strings, e.g., "50%")
  const parsePercentage = (percentage: string): number => parseFloat(percentage.replace("%", ""));
  const progressMapping: Record<string, number> = {
    "personal-info": parsePercentage(progressData.profile),
    "assets": parsePercentage(progressData.assets),
    "inheritance": parsePercentage(progressData.assignments),
    "executors": parsePercentage(progressData.executors),
  };

  return <SummaryPageClient progressMapping={progressMapping} />;
}
