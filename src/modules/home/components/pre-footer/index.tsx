import Image from "next/image"
import { Button } from "@medusajs/ui"

export default function HeroSection() {
  return (
    <>
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden mt-10">
      {/* Hero Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/landingpageimage.png"
          alt="Handcrafted premium knives"
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>

      {/* Content Overlay */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 md:px-6">
        <div className="max-w-3xl space-y-4 text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Artisan Crafted Knives</h2>
          <p className="text-lg md:text-xl opacity-90 max-w-xl mx-auto">
            Each knife tells a story of craftsmanship, precision, and dedication. Discover our handcrafted collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="large" className="bg-white text-black hover:bg-white/90">
              Shop Collection
            </Button>
            <Button size="large" variant="primary" className="border-white text-white hover:bg-white/20">
              Our Process
            </Button>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
