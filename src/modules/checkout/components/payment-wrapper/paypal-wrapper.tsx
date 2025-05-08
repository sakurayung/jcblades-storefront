"use client"

import { HttpTypes } from "@medusajs/types"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"

type PayPalWrapperProps = {
  paymentSession: HttpTypes.StorePaymentSession
  paypalClientId?: string
  children: React.ReactNode
}

const PayPalWrapper: React.FC<PayPalWrapperProps> = ({
  paymentSession,
  paypalClientId,
  children,
}) => {
  // Check if required props are provided
  if (!paypalClientId) {
    throw new Error(
      "PayPal client ID is missing. Set NEXT_PUBLIC_PAYPAL_CLIENT_ID environment variable."
    )
  }

  if (!paymentSession?.data) {
    throw new Error(
      "Payment session data is missing. Cannot initialize PayPal."
    )
  }

  // Initialize PayPal script options
  const initialOptions = {
    "client-id": paypalClientId,
    currency: paymentSession?.data?.currency || "PHP",
    intent: "authorize",
    components: "buttons"
  };

  return (
    //@ts-ignore
    <PayPalScriptProvider options={initialOptions}>
      {children}
    </PayPalScriptProvider>
  )
}

export default PayPalWrapper