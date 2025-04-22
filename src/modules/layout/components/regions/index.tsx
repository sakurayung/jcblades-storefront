"use client"
import { IoMdArrowRoundForward } from "react-icons/io";
import { clx, useToggleState } from "@medusajs/ui"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"

const RegionSelectionDropdown = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const toggleState = useToggleState()

  return (
                <div
                        className="flex flex-row border-b-[0.01px] border-b-[#919090] hover:text-white hover:border-white items-center gap-1 text-[#919090] "
                        className="flex flex-row border-b-[0.01px] border-b-[#52525b] hover:text-black hover:border-black items-center gap-1 text-[#52525b] "
                        onMouseEnter={toggleState.open}
                        onMouseLeave={toggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={toggleState}
                            regions={regions}
                          />
                        )}
                        <IoMdArrowRoundForward    
                          className={clx(
                            "transition-transform duration-150 ",
                            toggleState.state ? "rotate-90" : ""
                          )}
                        />
                </div>
  )
}

export default RegionSelectionDropdown
