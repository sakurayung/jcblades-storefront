'use client'
import { useEffect, useRef, useState } from 'react';
import { useWindowScroll } from 'react-use';
import gsap from "gsap";
import { TbMenu } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import { usePathname } from 'next/navigation';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import Image from "next/image"

interface NavContProps {
  isFloating: boolean;
  isDropdown: boolean;
}
const navItems = ['Blade Types', 'About', 'Inspiration', 'Store'];
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

  const NavCont = ({ isFloating, isDropdown }: NavContProps) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    

    return (
        <ul className="flex flex-col lg:flex-row sm:justify-center space-y-4 lg:space-y-0 lg:space-x-10 items-center gap-4 relative z-20 lg:gap-10">
            {navItems.map((item) => (
                <li key={item} className="relative flex flex-row ">
                    {item === "Blade Types" ? (
                        <span
                            className={` font-poppins text-[14px] font-medium text-md cursor-pointer 
                           ${isDropdown || isFloating ? 'text-[#919090] after:bg-white' : 'text-[#919090] after:bg-white'}
                            after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full 
                            after:origin-bottom-right after:scale-x-0 
                            after:transition-transform after:duration-300 
                            after:ease-[cubic-bezier(0.65_0.05_0.36_1)] 
                            hover:after:origin-bottom-left hover:after:scale-x-100 hover:text-white`}
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <span className="flex items-center gap-2">
                                {item}
                                {dropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </span>
                        </span>
                    ) : (
                        <LocalizedClientLink
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className={`font-poppins text-[14px] font-medium text-md cursor-pointer 
                                ${isDropdown || isFloating ? 'text-[#919090] after:bg-white' : 'text-[#919090] after:bg-white'}
                                after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full 
                                after:origin-bottom-right after:scale-x-0 
                                after:transition-transform after:duration-300 
                                after:ease-[cubic-bezier(0.65_0.05_0.36_1)] 
                                hover:after:origin-bottom-left hover:after:scale-x-100 hover:text-white`}
                        >
                            {item}
                        </LocalizedClientLink>
                    )}
                </li>
            ))}

            {dropdownOpen && (
                <div className="absolute left-[-20px] max-x-full py-4 px-4 top-8 w-60 border-[0.01px] border-[#919090] bg-black text-[#919090] shadow-lg z-30 ">
                    {bladeTypes.map((type) => (
                        <span
                            key={type}
                            className="block px-8 py-2 cursor-pointer hover:text-white transition duration-200"
                            onClick={() => {
                                // Handle the action on selecting a blade type
                                setDropdownOpen(false);
                            }}
                        >
                            {type}
                        </span>
                    ))}
                </div>
            )}
        </ul>
    );
};




const Navbar = () => {

    const aboutRef = useRef(null)
   const logoRef = useRef(null)


    

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen((prevIsOpen) => !prevIsOpen);
    
    const navContainerRef = useRef<HTMLDivElement>(null);

    const { y: currentScrollY } = useWindowScroll();
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isFloating, setIsFloating] = useState(false);
    const [isScrolled] = useState(false)

    useEffect(() => {
        if (currentScrollY === 0) {
            setIsNavVisible(true);
            setIsFloating(false);
            navContainerRef.current?.classList.remove("floating-nav");
        } else if (currentScrollY > lastScrollY) {
            setIsNavVisible(false);
            setIsFloating(true);
            navContainerRef.current?.classList.add("floating-nav");
        } else if (currentScrollY < lastScrollY) {
            setIsNavVisible(true);
            setIsFloating(true);
            navContainerRef.current?.classList.add("floating-nav");
        }

        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2,
        });
       
    }, [isNavVisible]);
    const pathname = usePathname();
    const [textColor, setTextColor] = useState('bg-transparent');
    useEffect(() => {
      const pathSegments = pathname.split('/').filter(Boolean);
      const page = pathSegments.length > 1 ? pathSegments[1] : '';
  
      if (!page) {
          setTextColor('bg-transparent'); // Home Page
      } else if(page === 'about' || page === 'store' || page === 'inspiration') {
          setTextColor('bg-black'); // Other Pages
      } 
  }, [pathname, isFloating]);

    return (
        <div ref={navContainerRef} className={`fixed top-0 left-0 right-0 z-50 h-20  border-none 
          ${isFloating ? 'sm:inset-x-6 top-4' : 'inset-x-0 '} 
          transition-all duration-700 ${textColor}`}>
            <header className="absolute top-1/2 w-full -translate-y-1/2 ">
                <nav className={`flex items-center size-full lg:justify-around justify-around p-8 ${isFloating ? 'mt-0' : 'mt-10'}`}>
                    <button onClick={toggleMenu}
                            className="focus:outline-none lg:hidden flex"
                            aria-label="toggle menu"
                                >
                                    {isOpen ? (
                                        <IoClose className={`w-8 h-8  ${isFloating ? 'text-[#eaeaea] ' : 'text-[#eaeaea] '}`} />
                                    ) : (
                                        <TbMenu className={`w-8 h-8 ${isFloating ? 'text-[#eaeaea] ' : 'text-[#eaeaea] '}`} />
                                    )}
                    </button>
                    
                    <div ref={logoRef} className="flex items-center justify-center gap-10">
                        <LocalizedClientLink href={'/'} className={`flex flex-col items-center justify-center pt-1 font-aquireOne cursor-pointer text-md lg:text-xl  ${isFloating ? 'text-white' : 'text-white'}`}>
                        <Image
                            src="/logo/logos.png"
                            alt="Navbar Logo"
                            width={150}
                            height={150}
                        />
                        </LocalizedClientLink>
                        <div ref={aboutRef} className="flex flex-row h-full items-center">
                            <div className="hidden lg:flex space-x-10">
                                <NavCont isFloating={isFloating} isDropdown={false} />
                            </div>
                    </div>
                    </div>
                   
                    <div className="relative h-auto flex flex-row gap-4 items-center justify-center">
                            
                    </div>
                </nav>
                <div className={`absolute left-0 right-0 bg-[#121212] backdrop-blur-lg transition-all duration-300 ease-in-out  overflow-hidden z-20 mx-auto lg:hidden ${isOpen ? "max-h-screen" : "max-h-0"}`}>
                    <nav className="p-5">
                        <NavCont isFloating={isFloating} isDropdown={true} />
                    </nav>
                </div>

            </header>
        </div>
    );
};

export default Navbar;
