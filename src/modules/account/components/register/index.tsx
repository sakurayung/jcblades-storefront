"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"
import Image from "next/image"
import { Text } from "@medusajs/ui"
import { motion } from "framer-motion"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <motion.div
      className="flex flex-col md:flex-row w-full min-h-screen"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      style={{ minHeight: "100vh" }}
    >
      {/* Left side - Image */}
      <motion.div
        className="hidden md:block md:w-1/2 h-full relative"
        variants={fadeIn}
      >
        <Image
          src="/register-page.jpg"
          alt="hero"
          fill
          sizes="(min-width: 1000px) 300vw, 100vw"
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Right side - Registration form */}
      <motion.div
        className="w-full md:w-1/2 flex items-center justify-center px-4 md:px-8 py-6 md:pt-20"
        variants={fadeIn}
        style={{ minHeight: "100vh" }}
      >
        <motion.div
          className="flex flex-col gap-y-6 border rounded-3xl w-full max-w-[500px] px-6 md:px-8 py-10 md:py-[60px] bg-white shadow-lg"
          data-testid="register-page"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex items-center justify-center mb-2"
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
            className="flex flex-col justify-between gap-y-2"
            variants={fadeIn}
          >
            <Text className="font-poppins font-bold text-4xl md:text-5xl text-center md:text-left">
              Register
            </Text>
            <Text className="font-poppins text-center md:text-left">
              Create your account to continue and shop with us.
            </Text>
          </motion.div>
          <motion.form
            className="w-full flex flex-col"
            action={formAction}
            variants={fadeIn}
          >
            <div className="flex flex-col w-full gap-y-3">
              <Input
                label="First name"
                name="first_name"
                required
                autoComplete="given-name"
                data-testid="first-name-input"
              />
              <Input
                label="Last name"
                name="last_name"
                required
                autoComplete="family-name"
                data-testid="last-name-input"
              />
              <Input
                label="Email"
                name="email"
                required
                type="email"
                autoComplete="email"
                data-testid="email-input"
              />
              <Input
                label="Phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                data-testid="phone-input"
              />
              <Input
                label="Password"
                name="password"
                required
                type="password"
                autoComplete="new-password"
                data-testid="password-input"
              />
              <ErrorMessage error={message} data-testid="register-error" />
              <SubmitButton
                className="w-full mt-1"
                data-testid="register-button"
              >
                Register
              </SubmitButton>
            </div>
          </motion.form>
          <motion.div variants={fadeIn}>
            <Text className="text-center md:text-left">
              Have an account already?{" "}
              <span
                onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
                className="cursor-pointer text-blue-500"
              >
                Sign in!
              </span>
            </Text>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Register
