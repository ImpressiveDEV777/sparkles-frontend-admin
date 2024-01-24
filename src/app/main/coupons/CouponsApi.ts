import { apiService as api } from 'app/store/apiService'
import { mapToFormCoupon } from 'src/app/utils/maps'
import { ProviderProducts } from 'src/app/res-types/sub/ProviderProductType'
import { Whitelabels } from '../whitelabel-apps/WhitelabelAppsApi'
import { Suppliers } from '../suppliers/SuppliersApi'

export const addTagTypes = [
  'coupons',
  'coupon',
  'coupon_type',
  'checkCouponCode',
] as const

const CouponAppsApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: build => ({
      getCoupons: build.query<GetCouponsApiResponse, GetCouponsApiArg>({
        query: () => ({ url: '/coupons' }),
        providesTags: ['coupons'],
      }),
      getCoupon: build.query<GetCouponApiResponse, GetCouponApiArg>({
        query: couponId => ({ url: `/coupons/${couponId}` }),
        providesTags: ['coupon', 'coupons'],
        transformResponse: (response: Coupon) => mapToFormCoupon(response),
      }),
      createCoupon: build.mutation<CreateCouponApiResponse, CreateCouponApiArg>(
        {
          query: newCoupon => ({
            url: `/coupons`,
            method: 'POST',
            data: newCoupon,
          }),
          invalidatesTags: ['coupons', 'coupon'],
        },
      ),
      updateCoupon: build.mutation<UpdateCouponApiResponse, UpdateCouponApiArg>(
        {
          query: coupon => ({
            url: `/coupons/${coupon.id}`,
            method: 'PUT',
            data: coupon,
          }),
          invalidatesTags: ['coupons', 'coupon'],
        },
      ),
      deleteCoupon: build.mutation<DeleteCouponApiResponse, DeleteCouponApiArg>(
        {
          query: couponId => ({
            url: `/coupons/${couponId}`,
            method: 'DELETE',
          }),
          invalidatesTags: ['coupons', 'coupon'],
        },
      ),
      getCouponTypes: build.query<
        GetCouponTypesApiResponse,
        GetCouponTypesApiArg
      >({
        query: suppliers => ({
          url: suppliers.reduce(
            (prev, supplier, i) =>
              `${prev}${i ? '&' : '?'}_where[suppliers_in]=${supplier._id}`,
            '/coupon-types',
          ),
        }),
        providesTags: ['coupon_type'],
        keepUnusedDataFor: 5,
      }),
    }),
    overrideExisting: false,
  })
export { CouponAppsApi }

export type GetCouponsApiResponse = /** status 200 OK */ Coupon[]
export type GetCouponsApiArg = void

export type GetCouponApiResponse = /** status 200 OK */ CouponForm
export type GetCouponApiArg = string

export type CreateCouponApiResponse = /** status 200 OK */ CouponForm
export type CreateCouponApiArg = CouponForm

export type UpdateCouponApiResponse = /** status 200 OK */ CouponForm
export type UpdateCouponApiArg = CouponForm

export type DeleteCouponApiResponse = /** status 200 OK */ unknown
export type DeleteCouponApiArg = string

export type GetCouponTypesApiResponse = /** status 200 OK */ CouponTypes
export type GetCouponTypesApiArg = Suppliers

export type Coupon = {
  ImpactOnPrice: string
  wantToNotifyUser: boolean
  isExpired: boolean
  noOfDays: number
  expiryType: string
  discount_amount: number
  appliedFor: string
  whitelabelapps: Whitelabels
  provider_products: ProviderProducts
  suppliers: Suppliers
  _id: string
  published_at: string
  message: string
  subject: string
  CouponCode: string
  createdAt: string
  updatedAt: string
  coupon_type: CouponType
  id: string
}

export type Coupons = [Coupon]

export type CouponForm = {
  ImpactOnPrice: string
  wantToNotifyUser: boolean
  isExpired: boolean
  noOfDays: number
  expiryType: string
  discount_amount: number
  appliedFor: string
  whitelabelapps: string[]
  provider_products: string[]
  suppliers: string[]
  message: string
  subject: string
  CouponCode: string
  coupon_type: string
  id: string
}

export type CouponType = {
  provider_products: ProviderProducts
  suppliers: Suppliers
  _id: string
  title: string
  published_at: string
  createdAt: string
  updatedAt: string
  coupon: null
  expiryType: [string]
  impactOnPrice: [string]
  supplier: string
  id: string
}

export type CouponTypes = [CouponType]

export const {
  useGetCouponsQuery,
  useGetCouponQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  useGetCouponTypesQuery,
} = CouponAppsApi

export type CouponsApiType = {
  [CouponAppsApi.reducerPath]: ReturnType<typeof CouponAppsApi.reducer>
}
