import { Metadata } from "next"
export const metadata: Metadata = {
  title: "About",
  description: "About JC Blades",
}

const AboutPage = () => {
  return (
    <div className="content-container my-12 mt-[80px]">
      <div>
        <h1 className="text-5xl mb-6">About JC Blades</h1>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="">
          <img src="/youngowner.png" className="" />
        </div>
        <div className="flex flex-col gap-y-6 w-[600px]">
          <div>
            <h2 className="text-3xl">
              Where passion meets precision, shaping beauty with steel.
            </h2>
          </div>
          <div>
            <p className="text-justify text-2xl">
              Welcome to JC Blades, where every blade tells a story. As a
              lifelong enthusiast, I've always been captivated by the artistry
              and precision of blade crafting. What started as a hobby has
              evolved into a passion project, and I’m thrilled to share my
              creations with you.
            </p>
          </div>
          <div>
            <p className="text-justify text-2xl">
              Each piece is meticulously handcrafted, combining traditional
              techniques with modern innovation. I pour my heart and soul into
              every blade, ensuring it's not just a tool, but a work of art.
              From the sleekest pocket knife to the most formidable sword,
              you'll find a blade that resonates with your spirit.
            </p>
          </div>
          <div>
            <p className="text-justify text-2xl">
              Join me on this journey of passion and craftsmanship. Explore our
              collection and discover the perfect blade for your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
