
import CountryDropdown from "./regions"
import { User, ShoppingBag } from "@medusajs/icons"


export default async function Nav() {
 

  return (
    <header className="m-8">
      <nav className="flex flex-row justify-between items-center">
        <div>
          <h1 className="font-bold text-4xl">JC Blades</h1>
        </div>
        <div className="flex flex-row justify-between gap-x-4 text-xl">
          <a href="#">About</a>
          <a href="#">Inspiration</a>
          <a href="#">Store</a>
        </div>
        <div className="w-52 h-auto flex flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-center gap-x-2">
          <CountryDropdown/>
          
          <User/>
          <ShoppingBag/>
         
         
          </div>
        </div>
      </nav>
    </header>
  )
}
