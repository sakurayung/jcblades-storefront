import React from "react"
import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import PlaceholderImage from "@modules/common/icons/placeholder-image"

const CategoriesSection = async () => {
  const productCategories = await listCategories()  

  return (
    <div className="py-12 content-container ">
      <h1 className="text-3xl-regular font-poppins text-black">Categories</h1>
      <div className="grid grid-cols-2 mt-5 bg-gray-50">
        {productCategories.map((category) => (
          <div key={category.id} className="h-[500px] border-x border-y border-gray-600 border-dashed flex flex-col justify-end pb-4 relative">
            <div className="absolute inset-0 w-full h-full">
              {category.metadata?.image && typeof category.metadata.image === 'object' && 'url' in category.metadata.image ? (
                <div className="relative w-full h-full">
                  <Image 
                    src={category.metadata.image.url as string}
                    alt={category.name}
                    width={1000}
                    height={1000}
                    className="object-cover object-center"
                    priority
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <PlaceholderImage size={48} />
                </div>
              )}
              <div className="absolute inset-0"/>
            </div>
            <LocalizedClientLink 
              className="ml-3 font-poppins relative z-10 text-black"
              href={`/categories/${category.handle}`}
            >
              {category.name}
            </LocalizedClientLink>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoriesSection