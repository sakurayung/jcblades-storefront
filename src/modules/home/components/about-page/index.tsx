"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronRight, Award, Shield, PenToolIcon as Tool } from "lucide-react"
import { Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"



const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white  mt-[90px]">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative h-[95vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/about-hero-image.jpg"
            alt="Master craftsman forging a knife"
            fill
            priority
            className="object-cover brightness-[0.7]"
          />
        </div>
        <div className="container relative z-10 text-center px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-bold font-poppins text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Crafting Excellence Since 2020
          </motion.h1>
          <motion.p
            className="text-xl text-white/90 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Dedicated to the art of blade crafting, delivering personalized premium knives for culinary enthusiasts and
            professionals.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
          </motion.div>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <section className="py-20 px-4 content-container">
        <div className="container mx-auto">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="relative h-[400px] overflow-hidden">
              <Image src="/process-hero-image-1.jpg" alt="Our workshop" fill className="object-cover" />
            </motion.div>
            <motion.div variants={fadeIn} className="space-y-6">
              <h2 className="text-3xl font-bold">Our Story</h2>
              <p className="text-gray-700">
                Founded in 2020 by bladesmith PLTCOL Jed G. Clamor, our journey began in a small workshop with a
                simple mission: to create knives that combine artistry with functionality. What started as a passion
                project has grown into a renowned brand trusted by chefs and culinary enthusiasts worldwide.
              </p>
              <p className="text-gray-700">
                Each knife we create tells a story – of tradition, innovation, and the pursuit of perfection. Our team
                of skilled artisans brings decades of experience to every piece, ensuring that when you hold one of our
                knives, you're holding a legacy of craftsmanship.
              </p>
              {/* <Button variant="outline">Learn More About Our Journey</Button> */}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="content-container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Our Craftsmanship</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              We combine traditional forging techniques with modern precision technology to create blades of exceptional
              quality and durability.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                icon: <Tool className="h-10 w-10 mb-4 text-gray-800" />,
                title: "Hand-Forged",
                description:
                  "Each blade is individually forged by our master craftsmen, ensuring unique character and optimal performance.",
              },
              {
                icon: <Award className="h-10 w-10 mb-4 text-gray-800" />,
                title: "Premium Materials",
                description:
                  "We source only the finest high-carbon steels and handle materials from sustainable suppliers around the world.",
              },
              {
                icon: <Shield className="h-10 w-10 mb-4 text-gray-800" />,
                title: "Lifetime Guarantee",
                description:
                  "We stand behind our work with a lifetime warranty against manufacturing defects for every knife we create.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                {item.icon}
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4">
        <div className="content-container mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Personalization Process
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-2 gap-16 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="space-y-8">
              {[
                {
                  number: "01",
                  title: "Consultation",
                  description:
                    "We begin with a detailed consultation to understand your specific needs and preferences.",
                },
                {
                  number: "02",
                  title: "Design",
                  description:
                    "Our designers create a custom blueprint for your knife, considering ergonomics, balance, and aesthetics.",
                },
                {
                  number: "03",
                  title: "Crafting",
                  description: "Our master smiths forge, grind, and heat-treat your blade to precise specifications.",
                },
                {
                  number: "04",
                  title: "Finishing",
                  description:
                    "We meticulously finish each knife with your chosen handle materials and personalized engravings.",
                },
              ].map((step, index) => (
                <motion.div key={index} className="flex gap-6" whileHover={{ x: 10, transition: { duration: 0.2 } }}>
                  <div className="text-3xl font-bold text-gray-300">{step.number}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-700">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={fadeIn} className="relative h-[600px]  overflow-hidden">
              <Image
                src="/making-image.jpg"
                alt="Knife crafting process"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="py-20 px-4 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Exceptional Craftsmanship?</h2>
          <p className="text-gray-700 mb-8">
            Discover our collection of premium personalized knives or start your custom design journey today.
          </p>
          <LocalizedClientLink href="/store" className="inline-block mb-4">
            <Button variant="primary" className="px-6 py-3 text-lg font-semibold">
              Explore Our Store
            </Button>
          </LocalizedClientLink>
        </div>
      </motion.section>

      {/* <Separator /> */}

    </div>
  )
}
