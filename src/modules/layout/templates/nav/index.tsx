// import LocalizedClientLink from "@modules/common/components/localized-client-link"
// import CountryDropdown from "./regions"
// import { User, ShoppingBag } from "@medusajs/icons"

// export default async function Nav() {
//   return (
//     <header className="m-8">
//       <nav className="flex flex-row justify-between items-center">
//         <div>
//           <h1 className="font-bold text-4xl">JC Blades</h1>
//         </div>
//         <div className="flex flex-row justify-between gap-x-4 text-xl">
//           <LocalizedClientLink href="/about">About</LocalizedClientLink>
//           <LocalizedClientLink href="/inspiration">
//             Inspiration
//           </LocalizedClientLink>
//           <LocalizedClientLink href="/store">Store</LocalizedClientLink>
//         </div>
//         <div className="w-52 h-auto flex flex-col items-center justify-center">
//           <div className="flex flex-row items-center justify-center gap-x-2">
//             <CountryDropdown />

//             <User />
//             <ShoppingBag />
//           </div>
//         </div>
//       </nav>
//     </header>
//   )
// }

'use client'
import { useEffect, useRef, useState } from 'react';
import { useWindowScroll } from 'react-use';
import gsap from "gsap";
import { TbMenu } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import CountryDropdown from "./regions"
import { User, ShoppingBag } from "@medusajs/icons"
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import { usePathname } from 'next/navigation';

interface NavContProps {
  isFloating: boolean;
  isDropdown: boolean;
}
const navItems = ['ABOUT', 'INSPIRATION', 'STORE'];

const NavCont = ({ isFloating, isDropdown }: NavContProps) => {
    return (
        <ul className="flex flex-col lg:flex-row sm:justify-center space-y-4 lg:space-y-0 lg:space-x-10 items-center gap-4 relative z-20 lg:gap-6">
            {navItems.map((item) => (
                <LocalizedClientLink key={item} href={`/${item.toLowerCase()}`} className={`relative ms-10 font-bigShoulder font-bold text-md uppercase cursor-pointer 
                     ${isDropdown ? 'text-[#eaeaea] after:bg-[#eaeaea]' : (isFloating ? 'text-[#eaeaea] after:bg-[#eaeaea]' : 'text-[#eaeaea] after:bg-[#121212]')}
                    after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full 
                    after:origin-bottom-right after:scale-x-0 
                    after:transition-transform after:duration-300 
                    after:ease-[cubic-bezier(0.65_0.05_0.36_1)] 
                    hover:after:origin-bottom-left hover:after:scale-x-100`}>
                    {item}
                </LocalizedClientLink>
            ))}
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
            <header className="absolute top-1/2 w-full -translate-y-1/2">
                <nav className={`flex size-full items-center justify-around `}>
                    <div ref={logoRef} className="flex items-center gap-7">
                        <LocalizedClientLink href={'/'} className={`font-aquireOne cursor-pointer text-md lg:text-xl  ${isFloating ? 'text-[#eaeaea]' : 'text-[#eaeaea]'}`}>JC Blades</LocalizedClientLink>
                    </div>
                    <div className="flex h-full items-center">
                        <div ref={aboutRef}  className="flex flex-row items-center">
                            <div className="hidden lg:flex space-x-10">
                                <NavCont isFloating={isFloating} isDropdown={true} />
                            </div>
                            
                            <button
                                onClick={toggleMenu}
                                className="focus:outline-none lg:hidden flex"
                                aria-label="toggle menu"
                            >
                                {isOpen ? (
                                    <IoClose className={`w-8 h-8 text-[#eaeaea] ${isFloating ? 'text-[#eaeaea] ' : 'text-[#eaeaea] '}`} />
                                ) : (
                                    <TbMenu className={`w-8 h-8 text-[#eaeaea] ${isFloating ? 'text-[#eaeaea] ' : 'text-[#eaeaea] '}`} />
                                )}
                            </button>
                        </div>
                    </div>
                      <div className="relative h-auto flex flex-col items-center justify-center">
                                <div className="absolute flex flex-row items-center justify-center gap-x-2">
                                <CountryDropdown isScrolled={isScrolled} />
                                  <User className={` text-[#eaeaea] ${isFloating ? 'text-[#eaeaea] ' : 'text-[#eaeaea] '}`}/>
                                  <ShoppingBag className={` text-[#eaeaea] ${isFloating ? 'text-[#eaeaea] ' : 'text-[#eaeaea] '}`}/>
                                </div>
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
