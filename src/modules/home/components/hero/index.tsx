import Image from "next/image"

const Hero = () => {
  return (
    <div className="h-screen w-full">
      <div className="relative w-full h-full">
        <Image
          src="/landingpageimage.png"
          fill
          sizes="100vw"
          className="object-cover"
          quality={100}
          priority
          alt="Knife Image"
        />
      </div>
    </div>
  )
}

export default Hero