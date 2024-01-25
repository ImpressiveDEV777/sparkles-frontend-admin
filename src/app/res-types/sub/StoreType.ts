import { Image } from './ImageType'

export type Store = {
  product_categories: [string]
  _id: string
  name: string
  address: string
  phone: string
  lat: number
  lng: number
  published_at: string
  createdAt: string
  updatedAt: string
  thumbnail: Image
  zipcode: string
  users_permissions_user: null
  manager: string
  cart: string
  id: string
}

export type Stores = [Stores]
