// @modules/products/components/thumbnail-image.tsx

import { HttpTypes } from "@medusajs/types"
import Image from "next/image"

type ThumbnailImageProps = {
  image: HttpTypes.StoreProductImage
}

const ThumbnailImage = ({ image }: ThumbnailImageProps) => {
  if (!image?.url) return null

  return (
    <div className="relative w-[155px] h-[200px]  bg-[#f5f5f5] rounded object-cover">
    <Image
      src={image.url}
      alt="Thumbnail"
      fill  
      style={{ objectFit: "cover" }}
    />
  </div>
  )
}

export default ThumbnailImage
