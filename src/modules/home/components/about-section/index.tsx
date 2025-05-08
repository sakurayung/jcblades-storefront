"use client"
import { Button } from "@medusajs/ui";
import { useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const AboutSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="mx-[100px] ">
        <div className="py-32">
           <h1 className="font-poppins text-[20px]  mb-2">WHO WE ARE</h1>
           <div className="flex flex-col items-center justify-center">
            
            <div className="bg-[#100c08] h-[0.5px] w-full mb-10"></div>
            <p className="font-poppins font-regular text-6xl w-full mb-6 text-center uppercase font-bold ">
            At JCBlades, we craft more than just blades – we create timeless pieces of art, forged with precision and passion. Each blade carries a legacy of craftsmanship, made to endure and stand out in both form and function.
            </p>
            <div>
            <LocalizedClientLink href="/about">
            <Button variant="transparent" className="text-[#ffffff] bg-[#212427] hover:text-white hover:bg-[#212427] rounded-none duration-200 border font-poppins border-[#212427] uppercase px-10 py-4  mb-8">
              LEARN MORE
            </Button>
          </LocalizedClientLink>
            </div>
            <div className="bg-[#100c08] h-[0.5px] w-full mb-10"></div>
           </div>
        </div>
    </div>
  )
}

export default AboutSection