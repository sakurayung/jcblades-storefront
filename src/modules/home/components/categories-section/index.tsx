import React from 'react'

const CategoriesSection = () => {
  return (
    <div className='py-12 content-container'>
      <h1 className='text-3xl-regular font-poppins'>Categories</h1>
      <div className='grid grid-cols-2 gap-4 mt-5'>
        <div className='bg-black/50 h-[500px]'>01</div>
        <div className='bg-black/50 h-[500px]'>02</div>
        <div className='bg-black/50 h-[500px]'>03</div>
        <div className='bg-black/50 h-[500px]'>04</div>
      </div>
    </div>
  )
}

export default CategoriesSection