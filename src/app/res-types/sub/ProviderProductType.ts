import { Image } from './ImageType'
import { Video } from './VideoType'

export type ProviderProduct = {
  deliveryTime: string
  productDetails: string
  new: boolean
  quantity: string
  hasVariant: boolean
  isPriceVariantDependent: boolean
  active: boolean
  is_customisable: boolean
  profit: number
  final_price: number
  base_price: number
  custom_name: boolean
  markup: number
  videos: [Video]
  catalog: [Image]
  gallery: [Image]
  whitelabelapps: [string]
  _id: string
  published_at: string
  title: string
  createdAt: string
  updatedAt: string
  __v: number
  product_provider: string
  store: null
  coupon_discount: null
  cover: Image
  cover_render_id: string
  render_properties: {
    mask_image_url: string
    render_id: number
    artwork: {
      mask_src_url: string
      height: number
      width: number
      upload_min_height: number
      upload_min_width: number
      scope: string
    }
    method: string
  }
  product_category: string
  skuID: string
  id: string
}
export type ProviderProducts = [ProviderProduct]
