import { apiService as api } from 'app/store/apiService'
import { Image } from 'src/app/res-types/sub/ImageType'
import { ProductCategory } from 'src/app/res-types/sub/ProductCategoryType'
import { Provider } from 'src/app/res-types/sub/ProviderType'
import { ProviderProducts } from 'src/app/res-types/sub/ProviderProductType'
import { ThirdPartyApi } from 'src/app/res-types/sub/ThirdPartyApiType'
import { Banner } from 'src/app/res-types/sub/BannerType'
import { Coupon } from 'src/app/res-types/sub/CouponType'

export const addTagTypes = ['whitelabel_apps'] as const

const WhitelabelAppsApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: build => ({
      getWhitelabels: build.query<
        GetWhitelabelsApiResponse,
        GetWhitelabelsApiArg
      >({
        query: () => ({ url: '/whitelabelapps' }),
        providesTags: ['whitelabel_apps'],
      }),
    }),
    overrideExisting: false,
  })
export { WhitelabelAppsApi }

export type GetWhitelabelsApiResponse = /** status 200 OK */ Whitelabel[]
export type GetWhitelabelsApiArg = void

export type Whitelabel = {
  id: string
  _id: string
  active: boolean
  title: string
  package_name: string
  published_at: string
  createdAt: string
  updatedAt: string
  icon: Image
  product_categories?: [ProductCategory]
  providers?: [Provider]
  provider_products?: ProviderProducts
  third_party_apis?: ThirdPartyApi
  banners?: Banner
  coupons?: Coupon
}
export type Whitelabels = Whitelabel[]

export const { useGetWhitelabelsQuery } = WhitelabelAppsApi

export type WhitelabelAppsApiType = {
  [WhitelabelAppsApi.reducerPath]: ReturnType<typeof WhitelabelAppsApi.reducer>
}
