import { User } from '../auth/user'
import { Supplier, SupplierForm } from '../main/suppliers/SuppliersApi'
import { Image } from '../res-types/sub/ImageType'
import { User as ResUser } from '../res-types/sub/User'

export const mapToUser = (user: ResUser): User => ({
  uid: user._id,
  role: 'admin',
  data: {
    displayName: user.username,
    email: user.email,
  },
})

export const mapToFormSupplier = (data: Supplier): SupplierForm | null => {
  return data
    ? {
        type: data.type,
        whitelabelapps: data.whitelabelapps.map(label => label._id),
        id: data.id,
        title: data.title,
        image: data.image as Image & File,
      }
    : null
}
