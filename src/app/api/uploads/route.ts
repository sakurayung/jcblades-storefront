import { NextRequest, NextResponse } from "next/server"
import axios from "axios"
import { getCartId } from "@lib/data/cookies"


export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // Get form data from request
    const formData = await request.formData();
    const medusaFormData = new FormData();
    
    // Get cart ID from cookies directly (server component can access cookies)
    const cartId = await getCartId();
    
    if (!cartId) {
      console.error("No cart ID found in cookies");
      return NextResponse.json(
        { message: "No cart found. Please add items to your cart first." },
        { status: 400 }
      );
    }
    
    // Add cart_id to Medusa form data
    medusaFormData.append('cart_id', cartId);
    
    // Copy files from incoming form data to new form data for Medusa
    const files = formData.getAll('files');
    for (const file of files) {
      medusaFormData.append('files', file);
    }
    
    const response = await axios.post(
      `${process.env.MEDUSA_BACKEND_URL}/receipt/upload/public`,
      medusaFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
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