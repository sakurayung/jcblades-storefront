"use client"

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react"
import { Fragment, useEffect, useMemo, useState } from "react"

import { StateType } from "@lib/hooks/use-toggle-state"
import { useParams, usePathname } from "next/navigation"
import { updateRegion } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"

type CountryOption = {
  country: string
  region: string
  label: string
}

type CountrySelectProps = {
  toggleState: StateType
  regions: HttpTypes.StoreRegion[]
}

const CountrySelect = ({ toggleState, regions }: CountrySelectProps) => {
  const [current, setCurrent] = useState<
    | { country: string | undefined; region: string; label: string | undefined }
    | undefined
  >(undefined)

  const { countryCode } = useParams()
  const currentPath = usePathname().split(`/${countryCode}`)[1]

  const { state, close } = toggleState

  const options = useMemo(() => {
    return regions
      ?.map((r) => {
        return r.countries?.map((c) => ({
          country: c.iso_2,
          region: r.id,
          label: c.display_name,
        }))
      })
      .flat()
      .sort((a, b) => (a?.label ?? "").localeCompare(b?.label ?? ""))
  }, [regions])

  useEffect(() => {
    if (countryCode) {
      const option = options?.find((o) => o?.country === countryCode)
      setCurrent(option)
    }
  }, [options, countryCode])

  const handleChange = (option: CountryOption) => {
    updateRegion(option.country, currentPath)
    close()
  }

  return (
    <div>
      <Listbox
        as="span"
        onChange={handleChange}
        defaultValue={
          countryCode
            ? options?.find((o) => o?.country === countryCode)
            : undefined
        }
      >
        <ListboxButton className="py-1 w-full">
          <div className="txt-compact-small flex items-start gap-x-2">
           
          {current && (
  <span className="txt-compact-small">{current.label}</span>
)}

          </div>
        </ListboxButton>
        <div className="flex relative w-full">
          <Transition
            show={state}
            as={Fragment}
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions
              className=" w-[220px] absolute px-4 py-2 left-20 xsmall:left-auto xsmall:right-0 max-h-[442px] overflow-y-scroll border-[0.01px] border-[#141414] z-[900] bg-black drop-shadow-md text-small-regular uppercase text-white no-scrollbar "
              className=" w-[220px] absolute top-2 px-4 py-2 left-20 xsmall:left-auto xsmall:right-0 max-h-[442px] overflow-y-scroll border-[0.01px] shadow-lg border-[#f5f5f5] z-[900] bg-[#f5f5f5] drop-shadow-md text-small-regular uppercase no-scrollbar "
              static
            >
              {options?.map((o, index) => {
                return (
                  <ListboxOption
                    key={index}
                    value={o}
                    className="py-2 font-poppins hover:text-white  text-[#919090] px-3 cursor-pointer flex items-center justify-center text-center gap-x-2"
                    className="py-2 font-poppins hover:text-black  text-[#52525b] px-3 cursor-pointer flex  gap-x-2"
                  >
                    {/* @ts-ignore */}
                    
                    {o?.label}
                  </ListboxOption>
                )
              })}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CountrySelect
