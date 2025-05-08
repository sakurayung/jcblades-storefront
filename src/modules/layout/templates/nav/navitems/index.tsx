"use client"
import { useState, useEffect, useRef } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { IoIosArrowDown } from "react-icons/io"
import { IoIosArrowUp } from "react-icons/io"

interface NavContProps {
  isDropdown: boolean
}

const navbarItems = ["About", "Inspiration", "Store"]


const NavItems = ({ isDropdown }: NavContProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLSpanElement>(null)

  // Close the dropdown when clicking outside
  useEffect(() => {
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
      <ul className="flex flex-col lg:flex-row sm:justify-center space-y-4 lg:space-y-0 lg:space-x-10 items-center gap-10 relative z-20 ">
        {navbarItems.map((item) => (
          <li key={item} className="relative flex flex-row items-center justify-center ">
            {item === "Blade Types" ? (
              <span
                ref={buttonRef}
                className={`font-poppins text-[14px] w-full font-medium text-md cursor-pointer
                ${
                  isDropdown
                    ? "text-[#000000] after:bg-white"
                    : "text-[#919090] after:bg-white"
                } after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full 
                            after:origin-bottom-right after:scale-x-0 
                            after:transition-transform after:duration-300 
                            after:ease-[cubic-bezier(0.65_0.05_0.36_1)] 
                            hover:after:origin-bottom-left hover:after:scale-x-100 hover:text-white`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="flex items-center">
                  {item}
                  {dropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
              </span>
            ) : (
              <LocalizedClientLink
                href={`/${item.toLowerCase()}`}
                className={`font-poppins text-[14px] font-medium text-md cursor-pointer flex flex-row  items-center justify-center uppercase
                ${
                  isDropdown
                    ? "text-[#000000] after:bg-black"
                    : "text-[#000000] after:bg-black"
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

       
      </ul>
    </span>
  )
}

export default NavItems
