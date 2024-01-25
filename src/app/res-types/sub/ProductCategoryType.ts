import { Image } from './ImageType'

export type ProductCategory = {
  active: boolean
  providers: [string]
  whitelabelapps: [string]
  _id: string
  title: string
  description: string
  published_at: string
  createdAt: string
  updatedAt: string
  __v: number
  Image: Image
  provider_product: null
  id: string
}

export type ProductCategories = ProductCategory[]
