import React from 'react'
import { Button } from "@medusajs/ui"

import Image from "next/image"
import LocalizedClientLink from '@modules/common/components/localized-client-link'


const ReviewSection = () => {
  return (
    <div className=' py-12 bg-[#fdfdfd] h-[700px] '>
        <div className=' mx-[100px]'>
           
            <div className="bg-[#211d1e] h-[0.5px] w-full mb-10 "></div>
            <div className='flex flex-col gap-10'>
              <div className='flex flex-row'>
              <Image
                src={"/bladeone.png"}
                width={900}
                height={1000}
                alt=''
                />
              <div className="w-px h-[508px] ml-8 bg-black border-1 border-black"></div>
             <div className='pl-8'>
             <h1 className='text-[#211d1e] font-poppins  uppercase text-[74px] font-bold'>About the Blades</h1>
             <p className='text-[#211d1e] font-poppins text-[20px]  text-justify mb-8'> Crafted with unparalleled precision and expertise, our blades are the epitome of superior quality and performance. Each blade is forged from the finest materials, meticulously tempered to achieve the perfect balance of strength, sharpness, and durability. Whether you're slicing through the toughest materials or executing the most delicate tasks, our blades deliver unmatched precision and reliability.  Designed to withstand the test of time, they are a testament to the artistry and innovation that go into every detail. When you choose our blades, you're not just getting a tool—you're investing in a legacy of excellence that cuts above the rest.</p>
             <div className="bg-[#211d1e] h-[0.5px] w-full mb-6 "></div>
             <div className="flex justify-start  ">
            <LocalizedClientLink href="/about">
              <Button
                variant="transparent"
                className="text-[#ffffff] bg-[#212427] hover:text-white hover:bg-[#212427] border border-[#212427] rounded-none px-10 py-4 uppercase font-poppins"
              >
                DISCOVER
              </Button>
            </LocalizedClientLink>
          </div>
           
             </div>
              </div>
              <div className="bg-[#211d1e] h-[0.5px] w-full mb-10 "></div>
             
            </div>
           
        </div>
        
    </div>
  )
}

export default ReviewSection