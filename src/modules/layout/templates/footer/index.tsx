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
    <footer className="w-full bg-[#000000] text-[#FBFEFC]">
      <div className="content-container w-full py-8">
        <div className="flex flex-col md:flex-row justify-between gap-y-8 md:gap-y-0">
          <div className="flex flex-col sm:flex-row gap-y-4 gap-x-8">
            <div className="flex justify-center sm:justify-start">
              <LocalizedClientLink href="/" className="">
                <Image
                  src="/jcbladeslogo.png"
                  alt="JC Blades Logo"
                  width={91}
                  height={91}
                />
              </LocalizedClientLink>
            </div>
            <div className="flex uppercase text-2xl sm:text-3xl md:text-5xl max-w-full sm:w-[300px] md:w-[547px] font-rubik font-bold items-center text-center sm:text-left">
              BLADES ARE JEWELRY FOR REAL MEN.
            </div>
          </div>
          <div className="text-small-regular font-poppins gap-6 md:gap-x-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-8 md:mt-0">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="font-semibold txt-ui-fg-base">
                  Categories
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        className="flex flex-col gap-2 txt-small"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-ui-fg-base",
                            children && "txt-small-plus"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-ui-fg-base"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="font-semibold txt-ui-fg-base">
                  Collections
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2 txt-xsmall-plus",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-ui-fg-base"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-y-4 gap-x-8 mb-3 mt-8 sm:mt-4 items-center justify-center sm:justify-center md:justify-start">
          <Link href="https://www.facebook.com/claymore2003">
            <Image
              src="/facebook-svgrepo-com.svg"
              alt="Facebook Logo"
              width={28}
              height={28}
            />
          </Link>
          <Link href="https://www.instagram.com/clay2003more/">
            <Image
              src="/instagram-svgrepo-com(1).svg"
              alt="Instagram Logo"
              width={28}
              height={28}
            />
          </Link>
          <Link href="https://www.youtube.com/@klamzsharpstuff">
            <Image
              src="/youtube-svgrepo-com.svg"
              alt="Youtube Logo"
              width={28}
              height={28}
            />
          </Link>
          <Link href="https://www.tiktok.com">
            <Image
              src="/tiktok-svgrepo-com.svg"
              alt="TikTok Logo"
              width={28}
              height={28}
            />
          </Link>
        </div>
        <hr className="w-full bg-slate-900 "></hr>
        <div className="flex flex-col md:flex-row justify-between items-end mt-3 gap-y-4">
          <div className="flex flex-col text-right md:text-right w-full md:w-auto">
            <Text className="font-poppins font-semibold text-base">
              claymore0three@gmail.com
            </Text>
            <Text className="font-poppins font-semibold text-base">
              Davao City, 8000
            </Text>
          </div>
          <div className="flex flex-col md:flex-row justify-between w-full md:w-auto my-3 md:my-0 items-center gap-6">
            <div>
              <Text className="font-poppins text-bold text-base text-center md:text-left">
                © {new Date().getFullYear()} JC Blades. All rights reserved.
              </Text>
            </div>
            <div className="flex flex-row items-center justify-center md:justify-between gap-x-6 mt-2 md:mt-0">
              <Image
                src="/visa-svgrepo-com.svg"
                alt="Visa Logo"
                width={20}
                height={20}
              />
              <Image
                src="/gcash-svgrepo-com.svg"
                alt="GCash Logo"
                width={20}
                height={20}
              />
              <Image
                src="/mastercard-svgrepo-com.svg"
                alt="MasterCard Logo"
                width={20}
                height={20}
              />
              <Image
                src="/paypal-svgrepo-com.svg"
                alt="PayPal Logo"
                width={20}
                height={20}
              />
            </div>
          </div>
          <hr className="w-full bg-slate-900 md:hidden"></hr>
        </div>
      </div>
    </footer>
  )
}
