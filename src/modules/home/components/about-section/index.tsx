"use client"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useState } from "react"
import { IoIosArrowForward } from "react-icons/io";

const AboutSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="content-container">
        <div className="py-32">
           <div className="flex flex-col items-center justify-center">
            <p className="font-poppins font-bold text-5xl w-[1100px] mb-6 text-center">
            JC Blades, a knifemaker in Davao. Designing high-quality, curiosity-sparking knives.
            </p>
            <div className="flex items-center gap-2 bg-black text-white px-5 py-3 font-light hover:scale-110 hover:duration-200 ">
           
            <LocalizedClientLink 
              href="/about" 
              className="flex items-center gap-2 "
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)}
            >
             <p className="font-poppins ">
              About Me
             </p>
             <IoIosArrowForward />
            </LocalizedClientLink>
            </div>
           </div>
        </div>
    </div>
  )
}

export default AboutSection