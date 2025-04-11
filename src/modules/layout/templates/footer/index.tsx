import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"
import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="w-full bg-[#212427]">
      <div className="content-container flex flex-row w-full py-32 justify-between">
        <div className="flex flex-row gap-x-8">
          <div>
            <LocalizedClientLink href="/" className="">
              <Image
                src="/jcbladeslogo.png"
                alt="JC Blades Logo"
                width={91}
                height={91}
              />
            </LocalizedClientLink>
          </div>
          <div className="flex uppercase text-[#FBFEFC] text-5xl w-[547px] font-rubik font-bold">
            BLADES ARE JEWELRY FOR REAL MEN.
          </div>
        </div>
        <div className="grid grid-cols-4 gap-x-8 text-[#FBFEFC]">
          <ul className="grid grid-col-1">
            <span className="font-bold font-poppins text-base mb-3">
              Category
            </span>
            <li className="flex flex-col gap-y-2">
              <a>Item 1</a>
              <a>Item 1</a>
              <a>Item 1</a>
              <a>Item 1</a>
            </li>
          </ul>
          <ul className="grid grid-col-1">
            <span className="font-bold font-poppins text-base mb-3">
              Category
            </span>
            <li className="flex flex-col gap-y-2">
              <a>Item 1</a>
              <a>Item 1</a>
              <a>Item 1</a>
              <a>Item 1</a>
            </li>
          </ul>
          <ul className="grid grid-col-1">
            <span className="font-bold font-poppins text-base mb-3">
              Category
            </span>
            <li className="flex flex-col gap-y-2">
              <a>Item 1</a>
              <a>Item 1</a>
              <a>Item 1</a>
              <a>Item 1</a>
            </li>
          </ul>
          <ul className="grid grid-col-1">
            <span className="font-bold font-poppins text-base mb-3">
              Category
            </span>
            <li className="flex flex-col gap-y-2">
              <a>Item 1</a>
              <a>Item 1</a>
              <a>Item 1</a>
              <a>Item 1</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
