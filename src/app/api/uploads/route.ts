import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Call your custom store endpoint instead of the admin endpoint
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/upload`,
      body,
      {
        headers: {

          "Content-Type": "application/json",
          "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error uploading to Medusa:", error.response?.data || error.message);
    return NextResponse.json(
      { message: "Error uploading file" },
      { status: error.response?.status || 500 }
    );
  }
}