import { apiService as api } from 'app/store/apiService'
import { Image } from 'src/app/res-types/sub/ImageType'
import { ProductCategories } from 'src/app/res-types/sub/ProductCategoryType'
import { ProviderProducts } from 'src/app/res-types/sub/ProviderProductType'
import { Coupons } from 'src/app/res-types/sub/CouponType'
import { Store } from 'src/app/res-types/sub/StoreType'
import { CouponTypes } from 'src/app/res-types/sub/CouponTypesType'
import { OrderProducts } from 'src/app/res-types/sub/OrderProductType'
import { Orders } from 'src/app/res-types/sub/Order'
import { mapToFormSupplier } from 'src/app/utils/maps'
import { Whitelabels } from '../whitelabel-apps/WhitelabelAppsApi'

export const addTagTypes = ['suppliers', 'supplier'] as const

const SupplierAppsApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: build => ({
      getSuppliers: build.query<GetSuppliersApiResponse, GetSuppliersApiArg>({
        query: () => ({ url: '/product-providers' }),
        providesTags: ['suppliers'],
      }),
      getSupplier: build.query<GetSupplierApiResponse, GetSupplierApiArg>({
        query: supplierId => ({ url: `/product-providers/${supplierId}` }),
        providesTags: ['supplier', 'suppliers'],
        transformResponse: (response: Supplier) => mapToFormSupplier(response),
      }),
      createSupplier: build.mutation<
        CreateSupplierApiResponse,
        CreateSupplierApiArg
      >({
        query: newSupplier => ({
          url: `/product-providers`,
          method: 'POST',
          data: newSupplier,
        }),
        transformResponse: (response: Supplier) => mapToFormSupplier(response),
        invalidatesTags: ['suppliers', 'supplier'],
      }),
      updateSupplier: build.mutation<
        UpdateSupplierApiResponse,
        UpdateSupplierApiArg
      >({
        query: supplier => ({
          url: `/product-providers/${supplier.id}`,
          method: 'PUT',
          data: supplier,
        }),
        transformResponse: (response: Supplier) => mapToFormSupplier(response),
        invalidatesTags: ['suppliers', 'supplier'],
      }),
    }),
    overrideExisting: false,
  })
export { SupplierAppsApi }

export type GetSuppliersApiResponse = /** status 200 OK */ Suppliers
export type GetSuppliersApiArg = void

export type GetSupplierApiResponse = /** status 200 OK */ SupplierForm
export type GetSupplierApiArg = string

export type CreateSupplierApiResponse = /** status 200 OK */ SupplierForm
export type CreateSupplierApiArg = SupplierArg

export type UpdateSupplierApiResponse = /** status 200 OK */ SupplierForm
export type UpdateSupplierApiArg = SupplierArg

export type Supplier = {
  type: string
  stores: [Store]
  whitelabelapps: Whitelabels
  _id: string
  title: string
  createdAt: string
  updatedAt: string
  __v: number
  image: Image
  provider_products: ProviderProducts
  product_categories: ProductCategories
  coupon: string
  coupons: Coupons
  coupon_types: CouponTypes
  order_products: OrderProducts
  orders: Orders
  id: string
}

export type Suppliers = Supplier[]

export type SupplierForm = {
  type: string
  whitelabelapps: string[]
  id?: string
  title: string
  image: ImageData
}

export type SupplierArg = {
  type: string
  whitelabelapps: string[]
  id?: string
  title: string
  image: string
}

type ImageData = Image & File

export const {
  useGetSuppliersQuery,
  useGetSupplierQuery,
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
} = SupplierAppsApi

export type SupplierAppsApiType = {
  [SupplierAppsApi.reducerPath]: ReturnType<typeof SupplierAppsApi.reducer>
}
