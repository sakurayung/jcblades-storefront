"use client"

import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import Image from "next/image"
import { useActionState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Text } from "@medusajs/ui"
import { motion } from "framer-motion"

/**TODO: REFACTOR THE LOGIN COMPONENT USING SHADCN  */

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div
      className="flex flex-col gap-y-6 border border-black rounded-3xl justify-center w-[582px] px-8 py-[89px]"
      data-testid="login-page"
    >
      <div>
        <LocalizedClientLink href="/">
          <Image
            src="/jcbladeslogo.png"
            alt="JC Blades Logo"
            width={100}
            height={100}
          />
        </LocalizedClientLink>
      </div>
      <div className="flex flex-col justify-between gap-y-4">
        <Text className="font-poppins font-bold text-5xl">Login</Text>
        <Text className="font-poppins">Please sign in to continue.</Text>
      </div>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col gap-y-5">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Enter your email"
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
          <ErrorMessage error={message} data-testid="login-error-message" />
          <SubmitButton data-testid="sign-in-button" className="w-full">
            Sign In
          </SubmitButton>
        </div>
      </form>
      <Text>
        Not a member?{" "}
        <span
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="cursor-pointer text-blue-500"
        >
          Register here!
        </span>
      </Text>
    </div>
  )
}

export default Login
