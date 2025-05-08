import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Button, Text } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  try {
    const {
      response: { products: pricedProducts },
    } = await listProducts({
      regionId: region.id,
      queryParams: {
        //@ts-ignore
        collection_id: collection.id,
        fields: "*variants.calculated_price",
      },
    })

    if (!pricedProducts) {
      return null
    }

    return (
      <div className="content-container small:py-24 mt-10">
        <div className="flex justify-between mb-8 text-black">
          <Text className="text-[24px] uppercase font-poppins text-black">{collection.title}</Text>
          
         
         
        </div>
        <div className="bg-black h-[0.5px] w-full mb-10 "></div>
        <ul className="grid grid-cols-2 small:grid-cols-3 gap-x-6 gap-y-24 small:gap-y-36">
          {pricedProducts.map((product) => (
            <li key={product.id}>
              <ProductPreview product={product} region={region} isFeatured />
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-10">
            <LocalizedClientLink href="/about">
              <Button
                variant="transparent"
                className="text-[#ffffff] bg-[#212427] hover:text-white hover:bg-[#212427] border mt-2 border-[#212427] rounded-none px-10 py-4 uppercase font-spaceGrotesk"
              >
                VIEW ALL
              </Button>
            </LocalizedClientLink>
          </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching products:", error);
    return <Text>Error loading products</Text>;
  }
}
