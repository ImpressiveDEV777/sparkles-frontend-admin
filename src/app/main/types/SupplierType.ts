import { Coupons } from './CouponType'
import { CouponTypes } from './CouponTypesType'
import { Image } from './ImageType'
import { Orders } from './Order'
import { OrderProducts } from './OrderProductType'
import { ProductCategories } from './ProductCategoryType'
import { ProviderProducts } from './ProviderProductType'
import { Store } from './StoreType'
import { Whitelabels } from './WhitelabelType'

export type Supplier = {
  type: string
  stores: [Store]
  whitelabelapps: Whitelabels
  _id: string
  title: string
  createdAt: string
  updatedAt: string
  __v: number
  image: Image
  provider_products: ProviderProducts
  product_categories: ProductCategories
  coupon: string
  coupons: Coupons
  coupon_types: CouponTypes
  order_products: OrderProducts
  orders: Orders
  id: string
}

export type Suppliers = Supplier[]
