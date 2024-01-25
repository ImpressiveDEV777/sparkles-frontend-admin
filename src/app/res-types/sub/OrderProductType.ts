import { Image } from './ImageType'

export type OrderProduct = {
  final_price: number
  _id: string
  title: string
  product_id: string
  quantity: number
  price: number
  createdAt: string
  updatedAt: string
  cart: null
  cover: Image
  supplier: string
  order_category: null
  id: string
}
export type OrderProducts = [OrderProduct]
