import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"
import Image from "next/image"
import Link from "next/link"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="w-full bg-[#212427]">
      <div className="content-container w-full py-32">
        <div className="flex flex-row justify-between">
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
          </div></div>
        <div className="flex flex-row gap-x-8 mb-3">
          <Link href="https://www.facebook.com/claymore2003">
            <Image src="/facebook-svgrepo-com.svg"
              alt="Facebook Logo"
              width={28}
              height={28} />
          </Link>
          <Link href="https://www.instagram.com/clay2003more/">
            <Image src="/instagram-svgrepo-com(1).svg"
              alt="Instagram Logo"
              width={28}
              height={28} />
          </Link>
          <Link href="https://www.youtube.com/@klamzsharpstuff">
            <Image src="/youtube-svgrepo-com.svg"
              alt="Youtube Logo"
              width={28}
              height={28} />
          </Link>
          <Link href="https://www.tiktok.com">
            <Image src="/tiktok-svgrepo-com.svg"
              alt="TikTok Logo"
              width={28}
              height={28} />
          </Link>
        </div>
        <hr className="w-full bg-slate-900 "></hr>
      </div>
    </footer>
  )
}
