"use client"

import { isManual, isPaypal, isStripe } from "@lib/constants"
import { placeOrder } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useState, useEffect } from "react"
import ErrorMessage from "../error-message"
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { useRouter } from "next/router"

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart
  "data-testid": string
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  "data-testid": dataTestId,
}) => {
  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1

  const paymentSession = cart.payment_collection?.payment_sessions?.[0]

  switch (true) {
    case isStripe(paymentSession?.provider_id):
      return (
        <StripePaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
        />
      )
    case isPaypal(paymentSession?.provider_id):
      return (
        <PayPalPaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
        />
      )
    case isManual(paymentSession?.provider_id):
      return (
        <ManualTestPaymentButton notReady={notReady} data-testid={dataTestId} />
      )
    default:
      console.log("Payment provider:", paymentSession?.provider_id)
      return <Button disabled>Select a payment method</Button>
  }
}

const StripePaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const stripe = useStripe()
  const elements = useElements()
  const card = elements?.getElement("card")

  const session = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  )

  const disabled = !stripe || !elements ? true : false

  const handlePayment = async () => {
    setSubmitting(true)

    if (!stripe || !elements || !card || !cart) {
      setSubmitting(false)
      return
    }

    await stripe
      .confirmCardPayment(session?.data.client_secret as string, {
        payment_method: {
          card: card,
          billing_details: {
            name:
              cart.billing_address?.first_name +
              " " +
              cart.billing_address?.last_name,
            address: {
              city: cart.billing_address?.city ?? undefined,
              country: cart.billing_address?.country_code ?? undefined,
              line1: cart.billing_address?.address_1 ?? undefined,
              line2: cart.billing_address?.address_2 ?? undefined,
              postal_code: cart.billing_address?.postal_code ?? undefined,
              state: cart.billing_address?.province ?? undefined,
            },
            email: cart.email,
            phone: cart.billing_address?.phone ?? undefined,
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          const pi = error.payment_intent

          if (
            (pi && pi.status === "requires_capture") ||
            (pi && pi.status === "succeeded")
          ) {
            onPaymentCompleted()
          }

          setErrorMessage(error.message || null)
          return
        }

        if (
          (paymentIntent && paymentIntent.status === "requires_capture") ||
          paymentIntent.status === "succeeded"
        ) {
          return onPaymentCompleted()
        }

        return
      })
  }

  return (
    <>
      <Button
        disabled={disabled || notReady}
        onClick={handlePayment}
        size="large"
        isLoading={submitting}
        data-testid={dataTestId}
      >
        Place order
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="stripe-payment-error-message"
      />
    </>
  )
}

{
  /* This manual payment should wait for the upload receipt component and if ever click the place order it should validate the data */
}

const ManualTestPaymentButton = ({ notReady }: { notReady: boolean }) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const handlePayment = () => {
    setSubmitting(true)

    onPaymentCompleted()
  }

  return (
    <>
      <Button
        disabled={notReady}
        isLoading={submitting}
        onClick={handlePayment}
        size="large"
        data-testid="submit-order-button"
      >
        Place Order
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="manual-payment-error-message"
      />
    </>
  )
}

const PayPalPaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [{ isPending, isRejected }] = usePayPalScriptReducer()
  // Add a state to track if payment is approved
  const [isApproved, setIsApproved] = useState(false)


  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const session = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  )

  // Check URL for PayPal return parameters
  useEffect(() => {
    // Check if we have approval parameters in the URL
    const searchParams = new URLSearchParams(window.location.search)
    const token = searchParams.get("token") // PayPal order ID
    const paymentId = searchParams.get("paymentId")

    if (token && session?.data.id === token) {
      // We've returned from PayPal with approval
      console.log("Returned from PayPal with approval", token)
      setIsApproved(true)
    }
  }, [session])

  if (notReady) {
    return (
      <Button
        disabled
        size="large"
        data-testid={dataTestId || "paypal-payment-button"}
      >
        Place Order
      </Button>
    )
  }

  if (isPending) {
    return (
      <Button
        disabled
        isLoading
        size="large"
        data-testid={dataTestId || "paypal-payment-button-loading"}
      >
        Loading PayPal...
      </Button>
    )
  }

  if (isRejected) {
    return (
      <>
        <Button
          disabled
          size="large"
          data-testid={dataTestId || "paypal-payment-button-error"}
        >
          PayPal unavailable
        </Button>
        <ErrorMessage
          error="Could not load PayPal. Please try again or select another payment method."
          data-testid="paypal-load-error-message"
        />
      </>
    )
  }

  // Show "Place Order" button if payment is approved
  if (isApproved) {
    return (
      <>
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-700 font-medium">
            PayPal payment approved! Click below to complete your order.
          </p>
        </div>
        <Button
          onClick={onPaymentCompleted}
          isLoading={submitting}
          size="large"
          data-testid={dataTestId || "paypal-complete-order-button"}
        >
          Complete Order
        </Button>
        <ErrorMessage
          error={errorMessage}
          data-testid="paypal-payment-error-message"
        />
      </>
    )
  }

  // Otherwise show PayPal buttons
  return (
    <>
      <div className="w-full">
        <PayPalButtons
          style={{
            layout: "vertical",
            shape: "rect",
            label: "pay",
            height: 48,
          }}
          disabled={submitting}
          forceReRender={[cart.id, cart.total, session?.data.id]}
          createOrder={() => {
            // Return the existing order ID
            return Promise.resolve(session?.data.id || "")
          }}
          onApprove={async (data, actions) => {
            setSubmitting(true)

            // Get redirect URL from session data if available
            const approvalUrl =
              session?.data?.approval_url ||
              session?.data?.links?.find((link) => link.rel === "approve")?.href

            if (approvalUrl) {
              // Redirect to PayPal for approval
              window.location.href = approvalUrl
              return
            }

            // If no redirect URL (unusual), try to complete order directly
            try {
              setIsApproved(true)
            } catch (error) {
              setErrorMessage(
                error instanceof Error ? error.message : "Payment failed"
              )
              setSubmitting(false)
            }
          }}
          onError={(err) => {
            setErrorMessage("PayPal encountered an error. Please try again.")
            console.error("PayPal error:", err)
          }}
          onCancel={() => {
            setErrorMessage("Payment cancelled. Please try again.")
          }}
          data-testid={dataTestId || "paypal-button"}
        />
      </div>
      <ErrorMessage
        error={errorMessage}
        data-testid="paypal-payment-error-message"
      />
    </>
  )
}

export default PaymentButton
