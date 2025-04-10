import React from 'react'
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { listCategories } from "@lib/data/categories"
import PlaceholderImage from "@modules/common/icons/placeholder-image"

const CategoriesPlaceHolder = async () => {
    const productCategories = await listCategories()  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 mt-5 gap-4 content-container mx-auto px-4">
        {productCategories.map((category) => (
          <LocalizedClientLink 
            key={category.id}
            href={`/categories/${category.handle}`}
            className="group relative block w-full aspect-square sm:h-[500px] transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="h-full border flex flex-col justify-end pb-4 relative overflow-hidden">
              <div className="absolute inset-0 w-full h-full">
                {category.metadata?.image && typeof category.metadata.image === 'object' && 'url' in category.metadata.image ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image 
                      src={category.metadata.image.url as string}
                      alt={category.name}
                      width={1000}
                      height={1000}
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-110"
                      priority
                    />
                    <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-20"/>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <PlaceholderImage size={48} />
                  </div>
                )}
              </div>
              <span className="ml-3 font-poppins relative z-10 text-black group-hover:text-white transition-colors duration-300">
                {category.name}
              </span>
            </div>
          </LocalizedClientLink>
        ))}
      </div>
  )
}

export default CategoriesPlaceHolder