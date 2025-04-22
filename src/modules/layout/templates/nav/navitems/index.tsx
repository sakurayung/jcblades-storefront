"use client"
import { useState, useEffect, useRef } from 'react';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

interface NavContProps {
  isDropdown: boolean;
}

const navbarItems = ['Blade Types', 'About', 'Inspiration', 'Store'];
const bladeTypes = [
  "Hunting Knife",
  "Bowie Knife",
  "Dagger",
  "Machete",
  "Katana",
  "Dirk",
  "Cleaver",
  "Karambit",
  "Gladius",
  "Tanto"
];

const NavItems = ({ isDropdown }: NavContProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLSpanElement>(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <span>
      <ul className="flex flex-col lg:flex-row sm:justify-center space-y-4 lg:space-y-0 lg:space-x-10 items-center gap-4 relative z-20 lg:gap-10">
      {navbarItems.map((item) => (
        <li key={item} className="relative flex flex-row">
          {item === "Blade Types" ? (
            <span
              ref={buttonRef}
              className={`font-poppins  w-full font-regular text-sm cursor-pointer
                ${isDropdown ? 'text-[#52525b] after:bg-black' : 'text-[#000000] after:bg-black'} after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full 
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
              className={`font-poppins text-[14px] font-regular text-sm cursor-pointer flex flex-row gap-4 items-center justify-center
                ${isDropdown ? 'text-[#53535b] after:bg-black' : 'text-[#000000] after:bg-black'} after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full 
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
        <div ref={dropdownRef} className="absolute left-[-20px] max-x-full p-2 top-8 w-60 border-[0.01px] border-[#f5f5f5] bg-[#f5f5f5] text-[#52525b] shadow-lg z-30">
          {bladeTypes.map((type) => (
            <span
              key={type}
              className="block px-8 py-2 font-poppins uppercase cursor-pointer text-[12px]  hover:text-black transition duration-200"
              onClick={() => {
                
                setDropdownOpen(false);
              }}
            >
              {type}
            </span>
          ))}
        </div>
      )}
    </ul>
    </span>
  );
};

export default NavItems;
