"use client"
import { Button } from "@medusajs/ui"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { motion } from "framer-motion"
import { ArrowRightMini } from "@medusajs/icons"

const Hero = () => {
  return (
    <div className="h-screen w-full ">
      <div className="relative w-full h-full">
        <Image
          src="/heross.png"
          fill
          sizes="100vw"
          className=" mt-[40px]"
          quality={100}
          priority
          alt="Knife Image"
        />
       <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="absolute top-[10%] left-[50%] w-[900px] text-white text-[50px] z-10 uppercase font-poppins font-semibold  "
        >
          <h1>BLADES ARE JEWELRY FOR REAL MEN.</h1>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="absolute top-[17%] left-[50%] w-[800px] text-white text-[20px] z-10  font-poppins font-regular  "
        >
          <h1>Masterfully forged from bone, wood, and tradition. Every blade is a one of a kind creation made for those who value craftsmanship and legacy</h1>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="absolute top-[22%] left-[50%] transform z-10"
        >
          <LocalizedClientLink href="/store">
            <Button variant="transparent" className="text-white hover:text-black rounded-none duration-200 border font-poppins border-white uppercase px-6 py-4 mt-5">
              Shop Now
             
            </Button>
          </LocalizedClientLink>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero