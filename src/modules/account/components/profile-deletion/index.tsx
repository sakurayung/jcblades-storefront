"use client"

import React from "react"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"

type DeleteAccountButtonProps = {
  customer: HttpTypes.StoreCustomer
}

const DeleteAccountButton: React.FC<DeleteAccountButtonProps> = () => {
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    )
    if (!confirmed) return

    const response = await fetch("/api/profile", {
      method: "DELETE",
    })

    if (response.status === 204) {
      alert("Your account has been deleted successfully.")
      window.location.href = "/"
    } else {
      alert("There was an error deleting your account. Please try again later.")
    }
  }

  return (
    <Button
      type="button"
      onClick={handleDelete}
      style={{
        color: "red",
        border: "1px solid red",
        padding: "0.5rem 1rem",
        background: "white",
        cursor: "pointer",
        borderRadius: "4px",
        marginTop: "1rem",
        width: "fit-content",
        alignSelf: "flex-start"
      }}
      data-testid="delete-account-btn"
    >
      Delete Account
    </Button>
  )
}


export default DeleteAccountButton