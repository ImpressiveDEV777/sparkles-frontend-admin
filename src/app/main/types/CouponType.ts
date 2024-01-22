export type Coupon = {
  ImpactOnPrice: string
  wantToNotifyUser: boolean
  isExpired: boolean
  noOfDays: number
  expiryType: string
  discount_amount: number
  appliedFor: string
  whitelabelapps: [string]
  provider_products: [string]
  suppliers: [string]
  _id: string
  published_at: string
  message: string
  subject: string
  CouponCode: string
  createdAt: string
  updatedAt: string
  __v: number
  coupon_type: string
  id: string
}
export type Coupons = [Coupon]
