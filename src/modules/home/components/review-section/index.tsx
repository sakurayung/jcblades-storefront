import React from 'react'



const text = "Crafted with unparalleled precision and expertise, our blades are the epitome of superior quality and performance. Each blade is forged from the finest materials, meticulously tempered to achieve the perfect balance of strength, sharpness, and durability. Whether you're slicing through the toughest materials or executing the most delicate tasks, our blades deliver unmatched precision and reliability. Designed to withstand the test of time, they are a testament to the artistry and innovation that go into every detail. When you choose our blades, you're not just getting a tool—you're investing in a legacy of excellence that cuts above the rest."

const ReviewSection = () => {
  return (
    <div className='mt-12 py-12 bg-gray-100 h-[600px]'>
        <div className='mt-20 content-container'>
            <h1 className='text-black font-poppins text-2xl-regular'>About the Blades</h1>
            <p className='font-poppins w-[800px]'>{text}</p>
        </div>
    </div>
  )
}

export default ReviewSection