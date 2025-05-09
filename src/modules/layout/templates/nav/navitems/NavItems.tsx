import { listCategories } from "@lib/data/categories"
import NavItemsClient from "./index"

const navbarItems = ["Blade Types", "About", "Store"]

export default async function NavItems({ isDropdown }: { isDropdown: boolean }) {
  const categories = await listCategories()

  const productTypes = categories.slice(0, 6).map((category ) => {
    return {
      name: category.name,
      href: `/collections/${category.handle}`,
      handle: category.handle,
      id: category.id,
      children: category.category_children?.map((child) => {
        return {
          name: child.name,
          href: `/collections/${child.handle}`,
          handle: child.handle,
          id: child.id,
        }
      }),
    }
  })
  
  return (
    <NavItemsClient
      isDropdown={isDropdown}
      bladeTypes={productTypes}
      navbarItems={navbarItems}
    />
  )
}