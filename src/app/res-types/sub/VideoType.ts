export type Video = {
  _id: string
  name: string
  hash: string
  ext: string
  mime: string
  size: number
  width: number
  height: number
  url: string
  provider: string
  related: [string]
  createdAt: string
  updatedAt: string
  id: string
}
