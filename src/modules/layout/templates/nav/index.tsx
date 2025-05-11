  import { Suspense } from "react"
  import { listRegions } from "@lib/data/regions"
  import { StoreRegion } from "@medusajs/types"
  import LocalizedClientLink from "@modules/common/components/localized-client-link"
  import CartButton from "@modules/layout/components/cart-button"
  import { LuUserRound } from "react-icons/lu"
  import RegionSelection from "@modules/layout/components/regions";
  import NavItems from "./navitems/NavItems"
  import { TbMenu } from "react-icons/tb";
  import { IoClose } from "react-icons/io5";
  import { RiMenu4Fill } from "react-icons/ri";

 export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="fixed top-0 inset-x-0 z-50 group">
      <header id="main-navbar" className="relative mx-auto border-b bg-white py-8 border-[#e5e7eb]">
        <nav className="content-container flex items-center justify-between w-full h-full text-small-regular">
          
          {/* Left - Logo */}
          <div className="flex-1 flex items-center">
            <LocalizedClientLink href="/" className="font-kelystone text-black text-[26px] font-bold hidden lg:flex">
              JC Blades
            </LocalizedClientLink>
          </div>
         

          {/* Center - Nav Items (hidden on small screens) */}
          <div className="hidden lg:flex items-center">
            <NavItems isDropdown={true} />
          </div>

          {/* Right - Icons */}
          <div className="flex-1 flex items-center justify-end ">
            <div className="hidden small:flex items-center ">
              <div className="mr-5"><RegionSelection regions={regions} /></div>
              <LocalizedClientLink href="/account">
                <LuUserRound className="text-black w-[18px] h-[18px] hover:scale-125 transition-transform" />
              </LocalizedClientLink>
              <Suspense fallback={<div>Loading...</div>}>
                <CartButton />
              </Suspense>
            </div>
            
          </div>
          <div className="relative flex items-center justify-between w-full lg:hidden">
            {/* Menu Icon and Input */}
            <div className="flex items-center relative top-2">
              <input type="checkbox" id="menu-toggle" className="peer hidden" />
              <label htmlFor="menu-toggle" className="cursor-pointer relative ">
                <RiMenu4Fill className="w-7 h-7 peer-checked:hidden text-black" />
                <IoClose className="w-7 h-7 hidden peer-checked:block" />
              </label>

              {/* Dropdown should be here to be sibling of input */}
              <div className="hidden peer-checked:flex absolute top-10 left-0 w-[400px] bg-white shadow-lg flex-col p-4 gap-4 z-40">
                <NavItems isDropdown={true} />
                <div className="border-t pt-2 flex items-center gap-2">
                  <p className="text-sm text-black pt-[1px]">REGION:</p>
                  <RegionSelection regions={regions} />
                </div>
              </div>
            </div>

            {/* Center Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <LocalizedClientLink href="/" className="font-kelystone text-black text-[24px] font-bold">
                <img src="/jcbladeslogo.png" alt="logo" className="w-auto h-14" />
              </LocalizedClientLink>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-4">
              <LocalizedClientLink href="/account">
                <LuUserRound className="text-black w-[20px] h-[20px] hover:scale-125 transition-transform" />
              </LocalizedClientLink>
              <Suspense fallback={<div>Loading...</div>}>
                <CartButton />
              </Suspense>
            </div>
          </div>

          {/* Hamburger Toggle */}
         
        </nav>
          

      </header>
    </div>
  )
}
