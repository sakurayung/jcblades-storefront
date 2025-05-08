  import { Suspense } from "react"

  import { listRegions } from "@lib/data/regions"
  import { StoreRegion } from "@medusajs/types"
  import LocalizedClientLink from "@modules/common/components/localized-client-link"
  import CartButton from "@modules/layout/components/cart-button"
  import { LuUserRound } from "react-icons/lu"
  import RegionSelection from "@modules/layout/components/regions";
  import Image from "next/image"
  import NavItems from "./navitems"

  export default async function Nav() {
    const regions = await listRegions().then((regions: StoreRegion[]) => regions)

    return (
      <div className="fixed top-0 inset-x-0 z-50 group">
        <header id="main-navbar" className="relative mx-auto border-b duration-200 bg-[#ffffff] py-8 border-[#e5e7eb]">
          <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
            {/* Left Section */}
            <div className="flex-1 flex h-full items-center">
              <div className="flex items-center h-full">
                <LocalizedClientLink href={'/'} className="font-kelystone text-black cursor-pointer text-[26px]  items-center  object-center font-bold">
                  JC Blades
                </LocalizedClientLink>
              </div>
            </div>
            <div className="flex items-center">
                  <NavItems isDropdown={true} />
            </div>
            {/* Right Section */}
            <div className="flex-1 flex items-center justify-end  h-full">
              <div className="hidden small:flex items-center  gap-x-6 h-full">
                <RegionSelection regions={regions} />
                <LocalizedClientLink
                  className="hover:text-ui-fg-base"
                  href="/account"
                  data-testid="nav-account-link"
                >
                  <LuUserRound className="cursor-pointer text-[#000000] w-[18px] h-[18px] transition-transform duration-500 hover:scale-125" />
                </LocalizedClientLink>
                <Suspense fallback={<LocalizedClientLink className="hover:text-ui-fg-base flex " href="/cart" data-testid="nav-cart-link">
              </LocalizedClientLink>}>
                <CartButton />
              </Suspense>
              </div>
             
            </div>
          </nav>

        </header>
      </div>
    )
  }