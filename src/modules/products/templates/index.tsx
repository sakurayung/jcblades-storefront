import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"
import ThumbnailImage from "./thumbnailimage"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <div
        className="content-container flex flex-col small:flex-row small:items-start py-6 relative items-center justify-center pt-20"
        data-testid="product-container"
      >
        <div className="flex flex-col gap-4 mx-8 ">
                <div className="w-[500px]  relative">
                <ImageGallery images={product.images?.[0] ? [product.images[0]] : []} />
                </div>
                <div className="flex flex-row gap-4 ">
                  {(product.images?.slice(1, 4) || []).map((img) => (
                    <ThumbnailImage key={img.id} image={img} />
                  ))}
                </div>
        </div>
        
        <div className="flex flex-col small:sticky max-w-[500px] w-full py-2 gap-y-4">
          <ProductInfo product={product} />
          <div className="bg-[#e5e7eb] h-[1px] w-full"></div>
          <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[500px] ">
          <ProductOnboardingCta />
          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
        </div>
         <div className="relative">
         <ProductTabs product={product} />
         </div>
        </div>
        
      
      </div>
      <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <div className="bg-[#e5e7eb] h-[1px] w-full mb-10"></div>
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
