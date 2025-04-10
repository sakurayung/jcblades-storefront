import { FocusModal, Button } from "@medusajs/ui"
import Link from "next/link"

type LoginPromptProps = {
  isOpen: boolean
  onClose: () => void
}

export default function LoginPrompt({ isOpen }: LoginPromptProps) {
  return (
    <FocusModal open={isOpen}>
      <FocusModal.Content>
        <FocusModal.Body className="flex items-center justify-center px-12">
          <div className="flex flex-col items-center gap-4 p-6">
            <p className="text-gray-700">
              Please log in to add items to your cart
            </p>
            <div className="flex gap-2">
              <Link href="/account">
                <button className="btn-primary">Login</button>
              </Link>
            </div>
          </div>
        </FocusModal.Body>
      </FocusModal.Content>
    </FocusModal>
  )
}
