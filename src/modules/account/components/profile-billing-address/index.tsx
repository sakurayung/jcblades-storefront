"use client"

import React, { useEffect, useMemo, useActionState } from "react"

import Input from "@modules/common/components/input"
import NativeSelect from "@modules/common/components/native-select"

import AccountInfo from "../account-info"
import { HttpTypes } from "@medusajs/types"
import { addCustomerAddress, updateCustomerAddress } from "@lib/data/customer"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
  regions: HttpTypes.StoreRegion[]
}

const ProfileBillingAddress: React.FC<MyInformationProps> = ({
  customer,
  regions,
}) => {
  const regionOptions = useMemo(() => {
    return (
      regions
        ?.map((region) => {
          return region.countries?.map((country) => ({
            value: country.iso_2,
            label: country.display_name,
          }))
        })
        .flat() || []
    )
  }, [regions])

  const [successState, setSuccessState] = React.useState(false)

  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing
  )

  const initialState: Record<string, any> = {
    isDefaultBilling: true,
    isDefaultShipping: false,
    error: false,
    success: false,
  }

  if (billingAddress) {
    initialState.addressId = billingAddress.id
  }

  const [state, formAction] = useActionState(
    billingAddress ? updateCustomerAddress : addCustomerAddress,
    initialState
  )

  const [formValues, setFormValues] = React.useState({
    first_name: billingAddress?.first_name || "",
    last_name: billingAddress?.last_name || "",
    company: billingAddress?.company || "",
    address_1: billingAddress?.address_1 || "",
    address_2: billingAddress?.address_2 || "",
    postal_code: billingAddress?.postal_code || "",
    city: billingAddress?.city || "",
    province: billingAddress?.province || "",
    phone: billingAddress?.phone || "",
    country_code: billingAddress?.country_code || "",
  })

  const clearState = () => {
    setSuccessState(false)
  }

  useEffect(() => {
    setSuccessState(state.success)
  }, [state])

  useEffect(() => {
    setFormValues({
      first_name: billingAddress?.first_name || "",
      last_name: billingAddress?.last_name || "",
      company: billingAddress?.company || "",
      address_1: billingAddress?.address_1 || "",
      address_2: billingAddress?.address_2 || "",
      postal_code: billingAddress?.postal_code || "",
      city: billingAddress?.city || "",
      province: billingAddress?.province || "",
      phone: billingAddress?.phone || "",
      country_code: billingAddress?.country_code || "",
    })
  }, [billingAddress])

  const currentInfo = useMemo(() => {
    if (!billingAddress) {
      return "No billing address"
    }

    const country =
      regionOptions?.find(
        (country) => country?.value === billingAddress.country_code
      )?.label || billingAddress.country_code?.toUpperCase()

    return (
      <div className="flex flex-col font-semibold" data-testid="current-info">
        <span>
          {billingAddress.first_name} {billingAddress.last_name}
        </span>
        <span>{billingAddress.company}</span>
        <span>
          {billingAddress.address_1}
          {billingAddress.address_2 ? `, ${billingAddress.address_2}` : ""}
        </span>
        <span>
          {billingAddress.postal_code}, {billingAddress.city}
        </span>
        <span>{country}</span>
        {billingAddress.phone && <span>{billingAddress.phone}</span>}
      </div>
    )
  }, [billingAddress, regionOptions])

  return (
    <form action={formAction} onReset={() => clearState()} className="w-full">
      <input type="hidden" name="addressId" value={billingAddress?.id} />
      <AccountInfo
        label="Billing address"
        currentInfo={currentInfo}
        isSuccess={successState}
        isError={!!state.error}
        clearState={clearState}
        data-testid="account-billing-address-editor"
      >
        <div className="grid grid-cols-1 gap-y-2">
          <div className="grid grid-cols-2 gap-x-2">
            <Input
              label="First name"
              name="first_name"
              value={formValues.first_name}
              onChange={(e) =>
                setFormValues((v) => ({ ...v, first_name: e.target.value }))
              }
              required
              data-testid="billing-first-name-input"
            />
            <Input
              label="Last name"
              name="last_name"
              value={formValues.last_name}
              onChange={(e) =>
                setFormValues((v) => ({ ...v, last_name: e.target.value }))
              }
              required
              data-testid="billing-last-name-input"
            />
          </div>
          <Input
            label="Company"
            name="company"
            value={formValues.company}
            onChange={(e) =>
              setFormValues((v) => ({ ...v, company: e.target.value }))
            }
            data-testid="billing-company-input"
          />
          <Input
            label="Address"
            name="address_1"
            value={formValues.address_1}
            onChange={(e) =>
              setFormValues((v) => ({ ...v, address_1: e.target.value }))
            }
            required
            data-testid="billing-address-1-input"
          />
          <Input
            label="Apartment, suite, etc."
            name="address_2"
            value={formValues.address_2}
            onChange={(e) =>
              setFormValues((v) => ({ ...v, address_2: e.target.value }))
            }
            data-testid="billing-address-2-input"
          />
          <div className="grid grid-cols-[144px_1fr] gap-x-2">
            <Input
              label="Postal code"
              name="postal_code"
              value={formValues.postal_code}
              onChange={(e) =>
                setFormValues((v) => ({ ...v, postal_code: e.target.value }))
              }
              required
              data-testid="billing-postcal-code-input"
            />
            <Input
              label="City"
              name="city"
              value={formValues.city}
              onChange={(e) =>
                setFormValues((v) => ({ ...v, city: e.target.value }))
              }
              required
              data-testid="billing-city-input"
            />
          </div>
          <Input
            label="Province"
            name="province"
            value={formValues.province}
            onChange={(e) =>
              setFormValues((v) => ({ ...v, province: e.target.value }))
            }
            data-testid="billing-province-input"
          />
          <Input
            label="Phone"
            name="phone"
            value={formValues.phone}
            onChange={(e) =>
              setFormValues((v) => ({ ...v, phone: e.target.value }))
            }
            data-testid="billing-phone-input"
          />
          <NativeSelect
            name="country_code"
            value={formValues.country_code}
            onChange={(e) =>
              setFormValues((v) => ({ ...v, country_code: e.target.value }))
            }
            required
            data-testid="billing-country-code-select"
          >
            <option value="">-</option>
            {regionOptions.map((option, i) => {
              return (
                <option key={i} value={option?.value}>
                  {option?.label}
                </option>
              )
            })}
          </NativeSelect>
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileBillingAddress
