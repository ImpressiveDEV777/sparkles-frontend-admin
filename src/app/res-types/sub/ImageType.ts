export type Image = {
  _id: string
  name: string
  alternativeText: string
  caption: string
  hash: string
  ext: string
  mime: string
  size: number
  width: number
  height: number
  url: string
  formats: {
    thumbnail: {
      name: string
      hash: string
      ext: string
      mime: string
      size: number
      width: number
      height: number
      path: null | string
      url: string
    }
  }
  provider: string
  related: [string]
  createdAt: string
  updatedAt: string
  id: string
}

export type FormImage = Image | string
