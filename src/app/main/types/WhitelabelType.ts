import { Banner } from './BannerType'
import { Coupon } from './CouponType'
import { Image } from './ImageType'
import { ProductCategory } from './ProductCategoryType'
import { ProviderProduct } from './ProviderProductType'
import { Provider } from './ProviderType'
import { ThirdPartyApi } from './ThirdPartyApiType'

export type Whitelabel = {
  id: string
  _id: string
  active: boolean
  title: string
  package_name: string
  published_at: string
  createdAt: string
  updatedAt: string
  icon: Image
  product_categories?: [ProductCategory]
  providers?: [Provider]
  provider_products?: [ProviderProduct]
  third_party_apis?: ThirdPartyApi
  banners?: Banner
  coupons?: Coupon
}

export type Whitelabels = Whitelabel[]
