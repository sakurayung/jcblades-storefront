import React from "react"
import CategoriesPlaceHolder from "@modules/common/components/categories-placeholder"
const CategoriesSection = async () => {
  

  return (
    <div className="py-12 content-container ">
      <h1 className="text-[24px] font-poppins uppercase text-black  mb-4">Categories</h1>
      <div className="bg-[#121214] h-[0.5px] w-full mb-10"></div>
          <CategoriesPlaceHolder/>
    </div>
  )
}

export default CategoriesSection