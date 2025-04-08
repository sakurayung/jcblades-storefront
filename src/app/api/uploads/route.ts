import { NextRequest, NextResponse } from "next/server"
import axios from "axios"
import { Readable } from 'stream';

export async function POST(request: NextRequest) {
  try {
    // Get form data from request
    const formData = await request.formData();
    const medusaFormData = new FormData();
    
    // Copy files from incoming form data to new form data for Medusa
    const files = formData.getAll('files');
    for (const file of files) {
      medusaFormData.append('files', file);
    }
    
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/receipt/upload/public`,
      medusaFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-publishable-api-key": 
            process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
        },
      }
    )

    return NextResponse.json(response.data)
  } catch (error: any) {
    console.error(
      "Error uploading to Medusa:",
      error.response?.data || error.message
    )
    return NextResponse.json(
      { message: "Error uploading file" },
      { status: error.response?.status || 500 }
    )
  }
}