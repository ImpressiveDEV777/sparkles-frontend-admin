import { Image } from './ImageType'

export type ProductSubCategory = {
  active: true
  _id: string
  title: string
  description: string
  published_at: string
  createdAt: string
  updatedAt: string
  __v: 0
  Image: Image
  product_category: string
  provider_product: string
  id: string
}

export type ProductSubCategories = ProductSubCategory[]
