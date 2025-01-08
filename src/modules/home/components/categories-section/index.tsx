import React from "react"
import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"



const CategoriesSection = async () => {
  /**Fetch product categories name and handle */
  const productCategories = await listCategories()  

  return (
    <div className="py-12 content-container">
      <h1 className="text-3xl-regular font-poppins">Categories</h1>
      <div className="grid grid-cols-2 mt-5">
        {productCategories.map((category) => (
          <div key={category.id} className="h-[500px] border-r border-b border-gray-600 border-dashed flex flex-col justify-end pb-4 relative">
            <div className="absolute inset-0 w-full h-full">
              <Image 
                src="/categories/2.1.png"
                alt={category.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0" />
            </div>
            <LocalizedClientLink 
              className="ml-3 font-poppins relative z-10 text-black text-xl"
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
