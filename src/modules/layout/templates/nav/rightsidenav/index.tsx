import { Suspense } from "react";
import { listRegions } from "@lib/data/regions";
import { StoreRegion } from "@medusajs/types";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import CartButton from "@modules/layout/components/cart-button";
import { LuShoppingCart } from "react-icons/lu";
import { LuUserRound } from "react-icons/lu";
import RegionSelection from "@modules/layout/components/regions";



export default async function LeftNavbar() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions);

  return (
    <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
      <div className="h-full flex items-center">
        {/* Place Navbar here */}
       
        <RegionSelection regions={regions} />
      </div>
      
      <div className="hidden small:flex items-center gap-x-6 h-full">
        <LocalizedClientLink
          className="hover:text-ui-fg-base"
          href="/account"
          data-testid="nav-account-link"
        >
          <LuUserRound className="cursor-pointer w-[18px] h-[18px] transition-transform duration-500 hover:scale-125 " />
        </LocalizedClientLink>
      </div>
      
      <Suspense
        fallback={
          <LocalizedClientLink
            className="hover:text-ui-fg-base flex gap-2"
            href="/cart"
            data-testid="nav-cart-link"
          >
            <LuShoppingCart className="cursor-pointer w-[18px] h-[18px] transition-transform duration-500 hover:scale-125 " />
          </LocalizedClientLink>
        }
      >
        <CartButton />
      </Suspense>
    </div>
  );
}
