import AboutPage from "@modules/home/components/about-page"
import { Metadata } from "next"
export const metadata: Metadata = {
  title: "About",
  description: "About JC Blades",
}


export default function Page() {
   return (
    <AboutPage/>
   )
}
