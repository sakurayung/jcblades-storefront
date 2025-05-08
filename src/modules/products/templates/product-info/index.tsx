import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info" className="w-[500px]">
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] ">
       
        <Heading
          level="h2"
          className="text-3xl text-ui-fg-base font-spaceGrotesk"
          data-testid="product-title"
        >
          {product.title}
        </Heading>
        <div className="bg-[#e5e7eb]  h-[1px] w-full"></div>

        <Text 
          className="text-medium w-[500px]"
          data-testid="product-description"
        >
          {product.description}
        </Text>
        
      </div>
    </div>
  )
}

export default ProductInfo
