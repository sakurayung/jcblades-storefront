import React from "react"

const CategoriesSection = () => {
  return (
    <div className="py-12 content-container">
      <h1 className="text-3xl-regular font-poppins">Categories</h1>
      <div className="grid grid-cols-2 mt-5">
        <div className="h-[500px] border-r border-b border-gray-600">01</div>
        <div className="h-[500px]  border-b border-gray-600">02</div>
        <div className="h-[500px] border-r  border-b border-gray-600">03</div>
        <div className="h-[500px]   border-b border-gray-600">04</div>
      </div>
    </div>
  )
}

export default CategoriesSection
