import { Image } from './ImageType'

export type Provider = {
  type: string
  stores: [string]
  whitelabelapps: [string]
  _id: string
  title: string
  createdAt: string
  updatedAt: string
  __v: number
  image: Image
  coupon: string
  users_permissions_user: string
  id: string
}
