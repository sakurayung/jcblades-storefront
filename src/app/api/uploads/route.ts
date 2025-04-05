import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    /* Call the custom upload endpoint in Medusa to upload the file.
       This endpoint is defined in the Medusa server and is used to handle file uploads.
       The request body should contain the file data and any other necessary information.
       The response will contain the URL of the uploaded file, which can be used to access it later.
       The request headers include the content type and the publishable API key for authentication. 
     */

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/upload`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
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
