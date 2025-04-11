import React from "react"
import CategoriesPlaceHolder from "@modules/common/components/categories-placeholder"
const CategoriesSection = async () => {
  

  return (
    <div className="py-12 content-container ">
      <h1 className="text-3xl-regular font-poppins text-black">Categories</h1>
          <CategoriesPlaceHolder/>
    </div>
  )
}

export default CategoriesSection