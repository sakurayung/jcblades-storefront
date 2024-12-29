"use client"

import { useEffect, useState } from "react"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"

export default function Collections() {
  const [loading, setLoading] = useState(true)
  const [collections, setCollections] = useState<HttpTypes.StoreCollection[]>([])

  useEffect(() => {
    if (!loading) {
      return 
    }

    fetch("http://localhost:9000/store/collections", {
      credentials: "include",
      headers: {
        "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "temp",
      },
    })
      .then((res) => res.json())
      .then(({ collections: dataCollections }) => {
        setCollections(dataCollections)
        setLoading(false)
      })
      .catch(console.error)
  }, [loading])

  if (loading) {
    return <span>Loading...</span>
  }

  if (collections.length === 0) {
    return <span>No product collections found.</span>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {collections.map((collection) => (
        <div key={collection.id}>
          {/* Use collection.thumbnail or the appropriate image field */}
          <Image
            src="/landingpageimage.png"
            alt={collection.title ?? "Collection Image"}
            width={200}
            height={200}
            className="object-cover"
          />
          <h2 className="mt-2 text-lg font-bold">{collection.title}</h2>
        </div>
      ))}
    </div>
  )
}