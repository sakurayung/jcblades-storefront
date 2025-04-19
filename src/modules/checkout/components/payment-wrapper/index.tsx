"use client"

import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import StripeWrapper from "./stripe-wrapper"
import { HttpTypes } from "@medusajs/types"
import { isPaypal, isStripe } from "@lib/constants"
import PayPalWrapper from "./paypal-wrapper"

type PaymentWrapperProps = {
  cart: HttpTypes.StoreCart
  children: React.ReactNode
}

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY
const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
const stripePromise = stripeKey ? loadStripe(stripeKey) : null

const PaymentWrapper: React.FC<PaymentWrapperProps> = ({ cart, children }) => {
  const paymentSession = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  )

  if (
    isStripe(paymentSession?.provider_id) &&
    paymentSession &&
    stripePromise
  ) {
    return (
      <StripeWrapper
        paymentSession={paymentSession}
        stripeKey={stripeKey}
        stripePromise={stripePromise}
      >
        {children}
      </StripeWrapper>
    )
  }

  if (
    isPaypal(paymentSession?.provider_id) &&
    paymentSession &&
    paypalClientId
  ) {
    return (
      <PayPalWrapper
        paymentSession={paymentSession}
        paypalClientId={paypalClientId}
      >
        {children}
      </PayPalWrapper>
    )
  }

  return <div>{children}</div>
}

export default PaymentWrapper