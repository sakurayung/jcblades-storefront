"use client"
import { IoMdArrowRoundForward } from "react-icons/io";
import { clx, useToggleState } from "@medusajs/ui"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"

const RegionSelectionDropdown = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const toggleState = useToggleState()

  return (
                <div className=" font-spaceGrotesk items-center justify-center gap-1 text-black  hover:underline"
                        onMouseEnter={toggleState.open}
                        onMouseLeave={toggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={toggleState}
                            regions={regions}
                          />
                        )}
                       
                </div>
  )
}

export default RegionSelectionDropdown
