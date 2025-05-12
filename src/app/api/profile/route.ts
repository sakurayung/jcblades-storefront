import { NextRequest, NextResponse } from "next/server"
import { getAuthHeaders } from "@lib/data/cookies"

export const dynamic = "force-dynamic";

export async function DELETE(req: NextRequest) {
  const backendUrl = process.env.MEDUSA_BACKEND_URL
  const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

  // Get auth headers from cookies (server-side)
  const authHeaders = await getAuthHeaders()
  const authorization = (authHeaders as any).authorization

  if (!authorization || !publishableKey || !backendUrl) {
    console.log("Missing credentials")
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 })
  }

  try {
    const response = await fetch(
      `${backendUrl}/store/customers/me/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: authorization,
          "x-publishable-api-key": publishableKey,
        },
      }
    )

    console.log("Backend response status:", response.status)
    let data = {}
    try {
      data = await response.json()
      console.log("Backend response body:", data)
    } catch (e) {
      console.log("No JSON body in backend response")
    }

    if (response.status === 204) {
      return new NextResponse(null, { status: 204 })
    } else {
      return NextResponse.json(
        { error: (data as any).message || "Failed to delete account" },
        { status: response.status }
      )
    }
  } catch (err) {
    console.error("Error during fetch:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}