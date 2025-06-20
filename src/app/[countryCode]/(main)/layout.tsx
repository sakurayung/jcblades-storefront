import { Metadata } from "next"

import { listCartOptions, retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { getBaseURL } from "@lib/util/env"
import { StoreCartShippingOption } from "@medusajs/types"
import CartMismatchBanner from "@modules/layout/components/cart-mismatch-banner"
import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import FreeShippingPriceNudge from "@modules/shipping/components/free-shipping-price-nudge"
import Script from "next/script";



export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  const customer = await retrieveCustomer()
  const cart = await retrieveCart()
  let shippingOptions: StoreCartShippingOption[] = []

  if (cart) {
    const { shipping_options } = await listCartOptions()
    shippingOptions = shipping_options
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Script id="navbar-scroll-script" strategy="afterInteractive">
        {`
          let lastScrollY = window.scrollY;
          const navbar = document.getElementById("main-navbar");

          if (navbar) {
            window.addEventListener("scroll", () => {
              if (window.scrollY > lastScrollY) {
                // Scrolling Down
                navbar.style.transform = "translateY(-100%)";
              } else {
                // Scrolling Up
                navbar.style.transform = "translateY(0)";
              }
              lastScrollY = window.scrollY;
            });
          }
        `}
      </Script>
      <Nav />
      {customer && cart && (
        <CartMismatchBanner customer={customer} cart={cart} />
      )}
      {cart && (
        <FreeShippingPriceNudge
          variant="popup"
          cart={cart}
          shippingOptions={shippingOptions}
        />
      )}
      <main className="flex-1 flex flex-col">
        {props.children}
      </main>
      <Footer />
    </div>
  )
}
