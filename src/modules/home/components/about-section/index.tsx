"use client"
import { ArrowLongRight, ArrowUpRightMicro } from "@medusajs/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useState } from "react"

const AboutSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="content-container">
        <div className="py-32">
           <div>
            <p className="font-poppins text-5xl w-[1200px] mb-6">
            JC Blades is a knifemaker hobbyist situated in Davao, Philippines. We design high-quality knives that attract people's curiosity.
            </p>
            <div className="flex items-center gap-5">
            <p className="font-poppins text-xl">
              Read the full story
            </p>
            <LocalizedClientLink 
              href="/about" 
              className="flex items-center gap-5"
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className={`transition-transform duration-500 ease-in-out ${isHovered ? 'transform translate-y-[-2px] translate-x-[2px] scale-110' : 'scale-100'}`}>
                {isHovered ? <ArrowUpRightMicro /> : <ArrowLongRight />}
              </div>
            </LocalizedClientLink>
            </div>
           </div>
        </div>
    </div>
  )
}

export default AboutSection