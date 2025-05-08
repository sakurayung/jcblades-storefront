"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"

type Category = {
  name: string
  handle: string
  id: string
  parent_category?: any
  category_children?: Category[]
}

export default function NavItemsClient({
  isDropdown,
  bladeTypes,
  navbarItems,
}: {
  isDropdown: boolean
  bladeTypes: Category[]
  navbarItems: string[]
}) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const buttonRef = React.useRef<HTMLSpanElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <span>
      <ul className="flex flex-col md:flex-row md:justify-center space-y-2 md:space-y-0 md:space-x-8 items-center gap-2 md:gap-8 relative z-20">
        {navbarItems.map((item) => (
          <li key={item} className="relative flex flex-row w-full md:w-auto">
            {item === "Blade Types" ? (
              <span
                ref={buttonRef}
                className={`font-poppins text-[15px] w-full font-medium cursor-pointer px-4 py-2 md:px-0 md:py-0
                ${
                  isDropdown
                    ? "text-[#919090] after:bg-white"
                    : "text-[#919090] after:bg-white"
                } after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full 
                  after:origin-bottom-right after:scale-x-0 
                  after:transition-transform after:duration-300 
                  after:ease-[cubic-bezier(0.65_0.05_0.36_1)] 
                  hover:after:origin-bottom-left hover:after:scale-x-100 hover:text-black`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="flex items-center gap-2">
                  {item}
                  {dropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
              </span>
            ) : (
              <LocalizedClientLink
                href={`/${item.toLowerCase()}`}
                className={`font-poppins text-[15px] font-medium cursor-pointer flex flex-row gap-4 items-center justify-center px-4 py-2 md:px-0 md:py-0
                ${
                  isDropdown
                    ? "text-[#919090] after:bg-white"
                    : "text-[#919090] after:bg-white"
                } after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full 
                  after:origin-bottom-right after:scale-x-0 
                  after:transition-transform after:duration-300 
                  after:ease-[cubic-bezier(0.65_0.05_0.36_1)] 
                  hover:after:origin-bottom-left hover:after:scale-x-100 hover:text-black`}
              >
                {item}
              </LocalizedClientLink>
            )}
          </li>
        ))}

        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute left-0 md:left-[-20px] w-full md:w-60 p-2 top-12 md:top-8 border-[0.01px] border-[#f5f5f5] bg-[#f5f5f5] text-[#52525b] shadow-lg z-30 rounded-md"
          >
            {bladeTypes.length > 0 ? (
              bladeTypes.map((type) => (
                <LocalizedClientLink
                  key={type.id}
                  href={`/categories/${type.handle}`}
                  className="block px-6 py-3 font-poppins uppercase cursor-pointer text-[13px] hover:text-black transition duration-200 rounded hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  {type.name}
                </LocalizedClientLink>
              ))
            ) : (
              <span className="block px-8 py-2 font-poppins uppercase cursor-pointer text-[12px] hover:text-black transition duration-200">
                No blade types available
              </span>
            )}
          </div>
        )}
      </ul>
    </span>
  )
}
