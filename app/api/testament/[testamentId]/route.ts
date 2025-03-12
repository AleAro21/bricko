// app/api/testament/[testamentId]/route.ts
import { NextResponse } from 'next/server';
import { apiService } from '@/app/apiService';
import { cookies } from 'next/headers';

export async function GET(request: Request, { params }: { params: { testamentId: string } }) {
  try {
    const tokenCookie = cookies().get("token");
    if (!tokenCookie) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }
    // Set the token in your API service
    apiService.setToken(tokenCookie.value);

    // Call the API service to get the PDF blob for the provided testamentId
    const pdfBlob = await apiService.getTestamentPDF(params.testamentId);


    // Return the PDF blob with proper headers so it can be displayed inline or downloaded
    return new NextResponse(pdfBlob, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=testament.pdf",
      },
    });
  } catch (error: any) {
    console.error("Error fetching testament PDF:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch testament PDF" }, { status: 500 });
  }
}
