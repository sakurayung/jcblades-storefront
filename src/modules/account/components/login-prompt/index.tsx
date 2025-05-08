import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react"
import { Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useEffect, useState } from "react"

type LoginPromptProps = {
  isOpen: boolean
  onClose: () => void
}

export default function LoginPrompt({ isOpen, onClose }: LoginPromptProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      // Small delay before starting the animation in
      setTimeout(() => setIsAnimating(true), 10)
    } else {
      setIsAnimating(false)
      // Wait for animation to finish before unmounting
      const timer = setTimeout(() => setShouldRender(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!shouldRender) return null

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <DialogBackdrop 
        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 font-poppins">
        <DialogPanel 
          className={`max-w-lg border bg-white p-12 border-gray-200 rounded-lg shadow-lg transition-all duration-300 transform ${
            isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <DialogTitle className="font-semibold">
            Authentication Required
          </DialogTitle>
          <Description className="text-xs mb-10">
            You must be logged in to purchase products from our store.
          </Description>
          <div className="flex justify-center w-full">
            <div className="flex-col mt-4 w-full">
              <p className="text-sm flex justify-center">Already have an account?</p>
              <LocalizedClientLink href="/account" className="flex justify-center mt-2 w-full">
                <Button className="w-full">Login Now</Button>
              </LocalizedClientLink>
            </div>
          </div>

          <div className="relative py-2 mt-3">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or</span>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <div className="flex-col mt-4 w-full">
              <p className="text-sm flex justify-center">Don't have an account yet?</p>
              <LocalizedClientLink href="/account" className="flex justify-center mt-2 w-full">
                <Button className="w-full" variant="secondary">Register Now</Button>
              </LocalizedClientLink>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
