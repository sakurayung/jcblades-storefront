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
    <footer className="border-t border-ui-border-base w-full bg-[#111210]">
      <div className="content-container flex flex-col w-full py-32">
        <div className="flex flex-row justify-between w-[658px]">
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
        <hr className="w-full my-2 bg-slate-800" />
      </div>
    </footer>
  )
}
