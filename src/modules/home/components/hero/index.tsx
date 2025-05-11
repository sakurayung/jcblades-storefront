"use client"

import { Button } from "@medusajs/ui"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useState, useEffect, useRef } from "react"
import { FaCircle } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion"

const Hero = () => {
  const slides = [
    {
      image: "/hero/image221.png",
      title: "Deuslach",
      details: [
        `Blade : 7.5 inches molye`,
        `Handle : Eagle hilt, composite wood, aluminum handguard`,
        `Sheath : Full-grain leather with crocodile skin inlay`
      ]
    },
    {
      image: "/hero/image1111.png",
      title: "Orcus Fang",
      details: [
        `Blade : 8 inches, obsidian-steel hybrid`,
        `Handle : Antler grip with copper wire inlay and resin finish`,
        `Sheath : Waxed leather with rune engravings`
      ]
    },
    {
      image: "/hero/coco11.png",
      title: "Croco Blade",
      details: [
        `Blade : 6 inches, obsidian-steel hybrid`,
        `Handle : Full-grain leather with crocodile skin inlay`,
        `Sheath : Waxed leather with rune engravings`
      ]
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const resetAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, 5000)
  }

 

  useEffect(() => {
    resetAutoSlide()

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div className="h-screen w-full ">
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
        <motion.div
          key={slides[currentIndex].image}
          initial={{ x: 70, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className=""
        >
          <Image
            src={slides[currentIndex].image}
            width={1400}
            height={1400}
            quality={100}
            priority
            alt="Knife Image"
          />
        </motion.div>
        <div className="flex flex-col absolute top-[14%] lg:top-[20%] left-[10%] gap-0 ">
            <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className=" flex flex-col items-start justify-center z-10"
          >
            <motion.h1 className="text-[50px] lg:text-[70px]  font-black uppercase text-black font-poppins ">
              {slides[currentIndex].title}
            </motion.h1>

            <div className=" text-black text-[16px] lg:text-[20px] font-poppins w-[500px] lg:w-[900px]">
              {slides[currentIndex].details.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            <LocalizedClientLink href="/store">
              <Button className="mt-3 text-white hover:text-black hover:bg-transparent bg-black border-black px-6 py-4 uppercase font-poppins rounded-none ">
                Shop Now
              </Button>
            </LocalizedClientLink>
          </motion.div>
        </div>
          
        </AnimatePresence>
        <div className="absolute top-[90%] left-[50%] translate-x-[-50%] flex gap-2 z-30">
          {slides.map((_, index) => (
            <FaCircle
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                resetAutoSlide()
              }}
              className={`text-[10px] cursor-pointer transition-colors duration-300 ${
                currentIndex === index ? "text-black" : "text-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hero
