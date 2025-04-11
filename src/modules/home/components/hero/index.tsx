"use client"
import { Button } from "@medusajs/ui"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { motion } from "framer-motion"
import { ArrowRightMini } from "@medusajs/icons"

const Hero = () => {
  return (
    <div className="h-screen w-full">
      <div className="relative w-full h-full">
       
       <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="absolute top-1/3 left-[10%] text-white text-[7vw] z-10 uppercase font-poppins font-semibold text-center whitespace-nowrap tracking-tighter"
        >
          <h1>Precision In Every Blade</h1>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="absolute top-[50%] left-[47%] transform z-10"
        >
          <LocalizedClientLink href="/store">
            <Button variant="transparent" className="text-white hover:text-black duration-200  uppercase px-6 py-4 mt-5">
              Shop Now
              <ArrowRightMini/> 
            </Button>
          </LocalizedClientLink>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero