
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

  // Safely parse percentage values with null checks
  const parsePercentage = (percentage: string | undefined): number => {
    if (!percentage) return 0;
    return parseFloat(percentage.replace("%", ""));
  };

  // Create the progress mapping without executors
  const progressMapping: Record<string, number> = {
    "personal-info": parsePercentage(progressData.profile),
    "assets": parsePercentage(progressData.assets),
    "inheritance": parsePercentage(progressData.assignments),
    // Remove executors from the progress mapping entirely
  };

  console.log("Progress mapping:", progressMapping);
  
  return <SummaryPageClient progressMapping={progressMapping} />;
}