import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react"
import { Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
type LoginPromptProps = {
  isOpen: boolean
  onClose: () => void
}

export default function LoginPrompt({ isOpen, onClose }: LoginPromptProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 font-poppins">
        <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 border-black rounded-3xl">
          <DialogTitle className="font-bold">Login Prompt</DialogTitle>
          <Description>Please sign in to add items to cart!</Description>
          <LocalizedClientLink href="/account">
            <Button>Login</Button>
          </LocalizedClientLink>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
