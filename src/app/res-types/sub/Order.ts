export type Order = {
  status: string
  refunded: boolean
  confirmed: boolean
  tax_applied: number
  products: [string]
  media: []
  provider_product_variants: []
  coupon_discounts: []
  _id: string
  published_at: string
  chargeToken: string
  cardToken: string
  totalPrice: number
  orderDetails: [
    {
      store_line_item_id: string
      sku: string
      quantity: 1
      properties: {
        print_url: string
      }
    },
  ]
  createdAt: string
  updatedAt: string
  user: string
  store: null
  provider: string
  tracking_id: string
  courier: string
  id: string
}

export type Orders = [Order]
