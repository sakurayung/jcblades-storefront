import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const tags = searchParams.get("tags") as string

  if (!tags) {
    return NextResponse.json({
      error: "No tags provided",
    })
  }


/**
 * Revalidate the following paths when the tags are updated:
 */
  const tagsArray = tags.split(",")
  await Promise.all(
    tagsArray.map(async (tag) => {
        switch (tag) {
            case "products":
                revalidatePath("/[countryCode]/(main)/store", "page")
                revalidatePath("/[countryCode]/(main)/products/[handle]", "page")
                revalidatePath("/[countryCode]/(main)/categories", "page")
                revalidatePath("/[countryCode]/(main)/collections", "page")
        }
    })
  )


  return NextResponse.json({ message: "Revalidation complete" }, { status: 200 })
}
