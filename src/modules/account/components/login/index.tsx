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
    <motion.div 
      className="flex flex-col md:flex-row w-full min-h-screen"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* Left side - Image */}
      <motion.div 
        className="hidden md:block md:w-1/2 relative"
        variants={fadeIn}
      >
        <Image
          src="/login-page.jpg"
          alt="hero"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Right side - Login form */}
      <motion.div 
        className="w-full md:w-1/2 flex items-center justify-center px-4 md:px-8 py-8 md:py-12"
        variants={fadeIn}
      >
        <motion.div
          className="flex flex-col gap-y-6 border rounded-2xl w-full max-w-[500px] px-6 md:px-8 py-10 md:py-[60px]"
          data-testid="login-page"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="flex items-center justify-center mb-6"
            variants={fadeIn}
          >
            <LocalizedClientLink href="/">
              <Image
                src="/jcbladeslogo.png"
                alt="JC Blades Logo"
                width={90}
                height={90}
                className="md:w-[100px] md:h-[100px]"
              />
            </LocalizedClientLink>
          </motion.div>
          <motion.div 
            className="flex flex-col justify-between gap-y-4"
            variants={fadeIn}
          >
            <Text className="font-poppins font-bold text-4xl md:text-5xl text-center md:text-left">Login</Text>
            <Text className="font-poppins text-center md:text-left">Please sign in to continue.</Text>
          </motion.div>
          <motion.form 
            className="w-full" 
            action={formAction}
            variants={fadeIn}
          >
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
              <SubmitButton 
                data-testid="sign-in-button" 
                className="w-full"
              >
                Sign In
              </SubmitButton>
            </div>
          </motion.form>
          <motion.div variants={fadeIn}>
            <Text className="text-center md:text-left">
              Not a member?{" "}
              <span
                onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
                className="cursor-pointer text-blue-500"
              >
                Register here!
              </span>
            </Text>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Login
