import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description: "About JC Blades",
}

const AboutPage = () => {
  return (
    <div className="content-container">
      <div>
        <h1>About Page</h1>
      </div>
    </div>
  )
}

export default AboutPage