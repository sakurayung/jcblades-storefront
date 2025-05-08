import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import { LuUserRound } from "react-icons/lu"
import RegionSelection from "@modules/layout/components/regions";
import Image from "next/image"
import NavItems from "./navitems/NavItems"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="relative top-0 inset-x-0 z-50 group">
      <header id="main-navbar" className="relative mx-auto border-b duration-200 bg-[#ffffff] py-6 border-[#e5e7eb]">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="flex h-full items-center justify-center">
              <LocalizedClientLink href={'/'} className="font-aquireOne cursor-pointer text-md lg:text-xl">
                <Image
                  src="/logo/jcblades.png"
                  alt="Navbar Logo"
                  width={120}
                  height={120}
                />
              </LocalizedClientLink>
            </div>
          </div>
          
          <div className="flex flex-row items-center justify-center">
            <NavItems isDropdown={true}/>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <RegionSelection regions={regions} />
              <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href="/account"
                data-testid="nav-account-link"
              >
                <LuUserRound className="cursor-pointer text-[#000000] w-[18px] h-[18px] transition-transform duration-500 hover:scale-125" />
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}