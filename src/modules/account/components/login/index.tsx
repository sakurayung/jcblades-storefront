import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import Image from "next/image"
import { useActionState } from "react"

/**TODO: REFACTOR THE LOGIN COMPONENT USING SHADCN  */

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div className="max-w-sm w-full flex flex-col" data-testid="login-page">
      <div className="flex justify-center mb-6">
        <Image
          src="/jcbladeslogo.png"
          alt="Logo"
          width={150}
          height={150}
          layout="fixed"/>
      </div>
      <h1 className="text-large-semi uppercase font-poppins">Login</h1>
      <p className="text-base-regular text-ui-fg-base mb-8">
        Please sign in to continue.
      </p>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
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
        </div>
        <ErrorMessage error={message} data-testid="login-error-message" />
        <SubmitButton data-testid="sign-in-button" className="w-full mt-6">
          Sign in
        </SubmitButton>
      </form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6 font-rubik">
        Not a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
          data-testid="register-button"
        >
          Register here!
        </button>
        .
      </span>
    </div>
  )
}

export default Login
