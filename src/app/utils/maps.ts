import { map } from 'lodash'
import { User } from '../auth/user'
import { Coupon, CouponForm } from '../main/coupons/CouponsApi'
import { Supplier, SupplierForm } from '../main/suppliers/SuppliersApi'
import { FormImage } from '../res-types/sub/ImageType'
import { User as ResUser } from '../res-types/sub/User'
import {
  Category,
  CategoryForm,
} from '../main/product-management/categories/CategoriesApi'

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
        image: data.image as FormImage,
      }
    : null
}

export const mapToFormCoupon = (data: Coupon): CouponForm | null => {
  return data
    ? {
        ImpactOnPrice: data.ImpactOnPrice,
        wantToNotifyUser: data.wantToNotifyUser,
        isExpired: data.isExpired,
        noOfDays: data.noOfDays,
        expiryType: data.expiryType,
        discount_amount: data.discount_amount,
        appliedFor: data.appliedFor,
        whitelabelapps: data.whitelabelapps.map(label => label._id),
        provider_products: map(data.provider_products, 'id'),
        suppliers: data.suppliers.map(supplier => supplier._id),
        message: data.message,
        subject: data.subject,
        CouponCode: data.CouponCode,
        coupon_type: data.coupon_type._id,
        id: data.id,
      }
    : null
}

export const mapToFormCategory = (data: Category): CategoryForm | null => {
  return data
    ? {
        active: data.active,
        providers: data.providers.map(label => label._id),
        whitelabelapps: data.whitelabelapps.map(label => label._id),
        title: data.title,
        description: data.description,
        Image: data.Image,
        categoryId: data.id,
      }
    : null
}
