export type CouponType = {
  provider_products: [string]
  suppliers: [string]
  _id: string
  title: string
  published_at: string
  createdAt: string
  updatedAt: string
  coupon: null
  expiryType: [string]
  impactOnPrice: [string]
  supplier: string
  id: string
}

export type CouponTypes = [CouponType]
