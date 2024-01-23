import { User } from '../auth/user'
import { Supplier, SupplierForm } from '../main/suppliers/SuppliersApi'
import { User as ResUser } from '../res-types/sub/User'

export const mapToUser = (user: ResUser): User => ({
  uid: user._id,
  role: 'admin',
  data: {
    displayName: user.username,
    email: user.email,
  },
})

export const mapToFormSupplier = (data: Supplier): SupplierForm => {
  return (
    data && {
      type: data.type,
      whitelabelapps: data.whitelabelapps.map(label => label._id),
      id: data.id,
      title: data.title,
      image: data.image,
    }
  )
}
